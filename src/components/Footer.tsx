import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CLINIC_INFO } from '../constants';

export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 py-10">
      <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
           <div className="flex items-center gap-3 mb-2">
             <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white">
                <ShieldCheck size={18} />
             </div>
             <p className="text-sm font-bold text-slate-800 tracking-tight">{CLINIC_INFO.name}</p>
           </div>
           <p className="text-xs text-slate-500 leading-relaxed max-w-md">
             ঠিকানা: {CLINIC_INFO.location}
           </p>
           <div className="flex flex-col gap-1 mt-3">
              <a 
                href={`https://wa.me/88${CLINIC_INFO.phone.replace(/-/g, '')}`} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-slate-500 font-bold hover:text-teal-600 transition-colors flex items-center gap-2"
              >
                <Phone size={14} className="text-teal-600" /> {CLINIC_INFO.phone}
              </a>
              <a 
                href={`mailto:${CLINIC_INFO.email}`}
                className="text-xs text-slate-500 font-bold hover:text-teal-600 transition-colors flex items-center gap-2"
              >
                <Mail size={14} className="text-teal-600" /> {CLINIC_INFO.email}
              </a>
            </div>
        </div>

        <div className="flex flex-col md:items-end gap-3">
          <div className="flex gap-4">
             <a href="#" className="text-slate-400 hover:text-teal-600 transition-colors">
               <Facebook size={20} />
             </a>
             <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                <span className="w-2 h-2 rounded-full bg-teal-300"></span>
                <span className="w-2 h-2 rounded-full bg-slate-200"></span>
             </div>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} Surokkha Group • All Rights Reserved | <Link to="/admin" className="hover:text-teal-600 transition-colors">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
