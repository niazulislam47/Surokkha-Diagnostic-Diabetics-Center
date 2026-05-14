import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Calendar, Clock, MapPin, ArrowLeft, Building2, GraduationCap, Award, Camera } from 'lucide-react';
import { cn } from '../lib/utils';
import { Doctor } from '../types';
import { useDoctors } from '../context/DoctorContext';

export default function DoctorProfile() {
  const { id } = useParams();
  const { doctors } = useDoctors();
  const doctor = doctors.find(d => d.id === id) as Doctor | undefined;

  if (!doctor) return <Navigate to="/doctors" />;

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <Link to="/doctors" className="inline-flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-widest mb-10 hover:gap-3 transition-all">
          <ArrowLeft size={16} /> ডাক্তারদের তালিকা
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                 <div className="w-40 h-40 bg-white rounded-[40px] border-8 border-white shadow-2xl shrink-0 overflow-hidden relative">
                    {doctor.photoUrl ? (
                      <img 
                        src={doctor.photoUrl} 
                        alt={doctor.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-teal-50 flex items-center justify-center text-teal-200">
                         <svg viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24">
                           <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                         </svg>
                      </div>
                    )}
                 </div>
                 <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <h1 className="text-4xl font-serif-italic text-slate-800 leading-tight">{doctor.name}</h1>
                      <Link 
                        to={`/admin?doctorId=${doctor.id}`}
                        className="p-2 rounded-full bg-slate-100 text-slate-400 hover:bg-teal-50 hover:text-teal-600 transition-all shadow-sm"
                        title="Manage Photo"
                      >
                        <Camera size={16} />
                      </Link>
                    </div>
                    <p className="text-teal-600 font-bold text-sm tracking-tight">{doctor.title}</p>
                    <div className="flex flex-wrap gap-2">
                       <span className="px-3 py-1 bg-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-full">{doctor.specialty}</span>
                       <span className="px-3 py-1 bg-teal-50 text-teal-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-teal-100">Reg: {doctor.regNo}</span>
                    </div>
                 </div>
              </div>
            </div>

            <div className="space-y-8">
               <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm space-y-6">
                  <h3 className="text-2xl font-serif italic text-slate-800">চিকিৎসকের পরিচিতি</h3>
                  <p className="text-slate-500 leading-relaxed italic">"{doctor.bio}"</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 text-teal-600">
                           <GraduationCap size={20} />
                           <h4 className="font-bold text-sm uppercase tracking-widest">শিক্ষাগত যোগ্যতা</h4>
                        </div>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{doctor.qualifications}</p>
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 text-teal-600">
                           <Building2 size={20} />
                           <h4 className="font-bold text-sm uppercase tracking-widest">বর্তমান কর্মস্থল</h4>
                        </div>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{doctor.institute}</p>
                     </div>
                  </div>
               </div>

               {doctor.testimonials && doctor.testimonials.length > 0 && (
                 <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 uppercase tracking-widest text-center">রোগীদের মন্তব্য</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {doctor.testimonials.map((t, i) => (
                         <div key={i} className="bg-teal-50/50 p-8 rounded-[32px] border border-teal-100 relative">
                            <div className="absolute top-6 right-8 text-teal-200 opacity-50">
                               <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V21H14.017ZM6.017 21L6.017 18C6.017 16.8954 6.91243 16 8.017 16H11.017C11.5693 16 12.017 15.5523 12.017 15V9C12.017 8.44772 11.5693 8 11.017 8H8.01704C7.46476 8 7.01704 8.44772 7.01704 9V12C7.01704 12.5523 6.56932 13 6.01704 13H4.01704V21H6.017Z" /></svg>
                            </div>
                            <p className="text-sm text-slate-600 font-medium italic mb-6">"{t.quote}"</p>
                            <div>
                               <p className="text-xs font-bold text-slate-800">{t.name}</p>
                               <p className="text-[10px] text-teal-600 uppercase font-bold tracking-widest">{t.service}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}
            </div>
          </div>

          {/* Sidebar Booking */}
          <div className="space-y-8">
             <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm space-y-8">
                <div className="space-y-4">
                   <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">সময়সূচী</h4>
                   <div className="space-y-4">
                      {doctor.schedule.map((s, i) => (
                        <div key={i} className="flex justify-between items-center pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                           <span className="text-sm font-bold text-slate-800">{s.day}</span>
                           <span className="text-xs text-slate-500 font-medium">{s.time}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-4">
                   <div className={cn(
                     "p-5 rounded-2xl border text-center flex flex-col gap-1",
                     doctor.availability.isAvailable ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
                   )}>
                      <p className={cn("text-[10px] font-black uppercase tracking-widest", doctor.availability.isAvailable ? "text-green-600" : "text-red-500")}>
                        {doctor.availability.isAvailable ? "● Avilable Now" : "● অফলাইন"}
                      </p>
                      <p className="text-xs font-bold text-slate-700">{doctor.availability.nextAvailable}</p>
                   </div>

                   {doctor.availability.availableSlots && doctor.availability.availableSlots.length > 0 && (
                     <div className="space-y-3">
                       <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Available Slots</h5>
                       <div className="grid grid-cols-2 gap-2">
                         {doctor.availability.availableSlots.map((slot, i) => (
                           <Link
                             key={i}
                             to={`/appointment?doctor=${encodeURIComponent(doctor.name)}&time=${encodeURIComponent(slot)}`}
                             className="py-2.5 rounded-xl border border-teal-100 bg-teal-50/30 text-teal-700 text-xs font-bold text-center hover:bg-teal-50 transition-colors"
                           >
                             {slot}
                           </Link>
                         ))}
                       </div>
                     </div>
                   )}
                   
                   <Link 
                    to={`/appointment?doctor=${encodeURIComponent(doctor.name)}`}
                    className="block w-full text-center py-5 bg-teal-600 text-white rounded-[24px] font-bold uppercase tracking-[0.2em] text-xs hover:bg-teal-700 transition-all shadow-xl shadow-teal-100"
                   >
                     অ্যপয়েন্টমেন্ট নিন
                   </Link>
                </div>
             </div>

             <div className="bg-slate-900 rounded-[40px] p-10 text-white text-center space-y-6">
                <ShieldCheck size={40} className="text-teal-400 mx-auto" />
                <h4 className="text-xl font-serif">নিরাপদ ডায়াগনস্টিক</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">আমরা সুরক্ষা গ্রুপ আপনার তথ্যের গোপনীয়তা এবং নির্ভুল ফলাফল নিশ্চিত করতে অঙ্গীকারবদ্ধ।</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
