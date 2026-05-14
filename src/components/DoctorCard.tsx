import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Calendar, GraduationCap, Building2, User, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Doctor } from '../types';

interface DoctorProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorProps> = ({ doctor }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white border rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-teal-100 transition-all border-slate-200 group flex flex-col"
    >
      <div className="p-6 flex gap-6 items-start flex-1">
        <div className="w-24 h-24 bg-teal-50 rounded-2xl shrink-0 flex items-center justify-center border border-teal-100 relative overflow-hidden">
           {doctor.photoUrl ? (
             <img 
               src={doctor.photoUrl} 
               alt={doctor.name} 
               className="w-full h-full object-cover"
             />
           ) : (
             <div className="w-full h-full flex items-center justify-center text-teal-300">
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
               </svg>
             </div>
           )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight leading-tight mb-1">{doctor.name}</h3>
              <p className="text-teal-600 text-[10px] font-bold uppercase tracking-widest leading-relaxed line-clamp-1">{doctor.qualifications}</p>
            </div>
            <span className={cn(
              "px-3 py-1 text-[10px] font-bold rounded-full border flex items-center gap-1.5 whitespace-nowrap",
              doctor.availability.isAvailable 
                ? "bg-green-50 text-green-600 border-green-200" 
                : "bg-red-50 text-red-600 border-red-200"
            )}>
              <span className={cn(
                "w-2 h-2 rounded-full",
                doctor.availability.isAvailable ? "bg-green-500" : "bg-red-500"
              )}></span>
              {doctor.availability.isAvailable ? "অ্যাভেইলেবল" : "অফলাইন"}
            </span>
          </div>

          <p className="text-[11px] text-slate-500 font-medium mt-2 line-clamp-2 italic leading-relaxed">
            "{doctor.bio}"
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
              <p className="text-[9px] text-slate-400 uppercase font-black tracking-tighter mb-1">অভিজ্ঞতা</p>
              <p className="text-[11px] text-slate-700 font-bold leading-tight">{doctor.experience}+ বছর</p>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
              <p className="text-[9px] text-slate-400 uppercase font-black tracking-tighter mb-1">সাক্ষাত</p>
              <p className="text-[11px] text-slate-700 font-bold leading-tight line-clamp-1 truncate">{doctor.schedule[0]?.time}</p>
            </div>
          </div>

          {doctor.availability.availableSlots && doctor.availability.availableSlots.length > 0 && (
            <div className="mt-4">
              <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-2 pl-1">Available Slots Today</p>
              <div className="flex flex-wrap gap-1.5">
                {doctor.availability.availableSlots.slice(0, 3).map((slot, i) => (
                  <span key={i} className="px-2 py-1 bg-teal-50 text-teal-700 text-[9px] font-bold rounded-lg border border-teal-100">
                    {slot}
                  </span>
                ))}
                {doctor.availability.availableSlots.length > 3 && (
                  <span className="px-2 py-1 bg-slate-50 text-slate-400 text-[9px] font-bold rounded-lg border border-slate-100">
                    +{doctor.availability.availableSlots.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 flex flex-col gap-3 mt-auto">
        <Link
          to={`/appointment?doctor=${encodeURIComponent(doctor.name)}`}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all active:scale-[0.98] uppercase tracking-widest text-xs shadow-sm",
            doctor.availability.isAvailable
              ? "bg-teal-600 text-white hover:bg-teal-700 shadow-teal-100"
              : "bg-slate-100 text-slate-500 hover:bg-teal-50 hover:text-teal-600 border border-slate-200"
          )}
        >
          অ্যাপয়েন্টমেন্ট নিন
        </Link>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
