import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, User } from 'lucide-react';
import DoctorCard from '../components/DoctorCard';
import { useDoctors } from '../context/DoctorContext';

export default function Doctors() {
  const { doctors } = useDoctors();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const specialties = ['All', ...new Set(doctors.map(d => d.specialty))];

  const filteredDoctors = doctors.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || d.specialty === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-teal-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif italic mb-6 text-center"
          >
            আমাদের বিশেষজ্ঞ চিকিৎসকগণ
          </motion.h1>
          <p className="text-teal-200/60 text-center max-w-2xl mx-auto text-lg mb-12">
            আপনার সুস্বাস্থ্য নিশ্চিত করতে আমাদের অভিজ্ঞ চিকিৎসকগণ সর্বদা নিবেদিত। বিভাগ অনুযায়ী ডাক্তার খুঁজুন।
          </p>

          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400" size={20} />
              <input 
                type="text" 
                placeholder="নাম বা স্পেশালিস্ট খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-teal-900/50 border border-teal-800 text-white rounded-2xl py-4 pl-12 pr-4 focus:border-teal-400 outline-none transition-all placeholder:text-teal-700"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400" size={18} />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="h-full bg-teal-900/50 border border-teal-800 text-white rounded-2xl py-4 pl-12 pr-10 focus:border-teal-400 outline-none transition-all appearance-none cursor-pointer"
              >
                {specialties.map(s => (
                  <option key={s} value={s} className="bg-teal-900">{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
                 <User size={32} />
               </div>
               <h3 className="text-xl font-bold text-slate-700">ফলাফল পাওয়া যায়নি</h3>
               <p className="text-slate-400">আপনার সার্চটি পুনরায় পরীক্ষা করুন।</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
