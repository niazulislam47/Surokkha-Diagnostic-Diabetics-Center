import React, { createContext, useContext, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { DOCTORS } from '../constants';
import { Doctor } from '../types';

interface DoctorContextType {
  doctors: Doctor[];
  updateDoctorAvailability: (doctorName: string, isAvailable: boolean, time?: string) => void;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>(DOCTORS);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Determine socket URL based on environment
    const socketInstance = io(window.location.origin);
    setSocket(socketInstance);

    socketInstance.on('appointment_booked', (data: { doctorName: string, time: string }) => {
      console.log('Real-time update: appointment booked for', data.doctorName, 'at', data.time);
      setDoctors((prevDoctors) => 
        prevDoctors.map((doc) => 
          doc.name === data.doctorName 
            ? { 
                ...doc, 
                availability: { 
                  ...doc.availability, 
                  // If slots become empty, mark as busy
                  isAvailable: doc.availability.availableSlots 
                    ? doc.availability.availableSlots.filter(s => s !== data.time).length > 0 
                    : false,
                  availableSlots: doc.availability.availableSlots 
                    ? doc.availability.availableSlots.filter(s => s !== data.time)
                    : []
                } 
              }
            : doc
        )
      );
    });

    socketInstance.on('doctor_photo_updated', (data: { doctorId: string, photoUrl: string }) => {
      console.log('Real-time update: doctor photo updated for', data.doctorId);
      setDoctors((prevDoctors) => 
        prevDoctors.map((doc) => 
          doc.id === data.doctorId 
            ? { ...doc, photoUrl: data.photoUrl }
            : doc
        )
      );
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const updateDoctorAvailability = (doctorName: string, isAvailable: boolean, time?: string) => {
    setDoctors((prevDoctors) => 
      prevDoctors.map((doc) => 
        doc.name === doctorName 
          ? { 
              ...doc, 
              availability: { 
                ...doc.availability, 
                isAvailable: time 
                  ? (doc.availability.availableSlots ? doc.availability.availableSlots.filter(s => s !== time).length > 0 : isAvailable)
                  : isAvailable,
                availableSlots: time && doc.availability.availableSlots
                  ? doc.availability.availableSlots.filter(s => s !== time)
                  : doc.availability.availableSlots
              } 
            }
          : doc
      )
    );
  };

  return (
    <DoctorContext.Provider value={{ doctors, updateDoctorAvailability }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctors = () => {
  const context = useContext(DoctorContext);
  if (context === undefined) {
    throw new Error('useDoctors must be used within a DoctorProvider');
  }
  return context;
};
