import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, Phone, Stethoscope, Clock, ShieldCheck, Send, CheckCircle } from 'lucide-react';
import { CLINIC_INFO } from '../constants';
import { cn } from '../lib/utils';
import { useDoctors } from '../context/DoctorContext';

export default function Appointment() {
  const { doctors, updateDoctorAvailability } = useDoctors();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialDoctor = searchParams.get('doctor') || '';
  const initialTime = searchParams.get('time') || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    doctor: initialDoctor,
    date: '',
    time: initialTime
  });

  const selectedDoctor = doctors.find(d => d.name === formData.doctor);

  useEffect(() => {
    if (formData.date && formData.doctor && selectedDoctor) {
      const selectedDate = new Date(formData.date);
      const dayName = selectedDate.toLocaleDateString('bn-BD', { weekday: 'long' });
      const isAvailable = selectedDoctor.schedule.some(s => s.day === dayName);
      if (!isAvailable) {
        setFormData(prev => ({ ...prev, date: '' }));
      }
    }
  }, [formData.doctor, selectedDoctor]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const bengaliDayToNum: Record<string, number> = {
    'রবিবার': 0,
    'সোমবার': 1,
    'মঙ্গলবার': 2,
    'বুধবার': 3,
    'বৃহস্পতিবার': 4,
    'শুক্রবার': 5,
    'শনিবার': 6
  };

  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  }).filter(date => {
    if (!formData.doctor || !selectedDoctor) return true;
    
    // If doctor has explicit schedule days, filter by them
    if (selectedDoctor.schedule && selectedDoctor.schedule.length > 0) {
      const dayName = date.toLocaleDateString('bn-BD', { weekday: 'long' });
      return selectedDoctor.schedule.some(s => s.day === dayName);
    }
    
    // Fallback: If no schedule array, try to match day mentioned in nextAvailable string
    const nextAvail = selectedDoctor.availability.nextAvailable;
    const dayName = date.toLocaleDateString('bn-BD', { weekday: 'long' });
    return nextAvail.includes(dayName) || nextAvail.includes("চেয়ারম্যান") || nextAvail.includes("আজ");
  }).map(d => ({
    value: d.toISOString().split('T')[0],
    display: d.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' })
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.doctor || !formData.date || !formData.time) {
      setError('দয়া করে সব তথ্য পূরণ করুন।');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        // Optimistically update UI
        updateDoctorAvailability(formData.doctor, false, formData.time);
        setFormData({ name: '', phone: '', doctor: '', date: '', time: '' });
      } else {
        throw new Error(data.message);
      }
    } catch (err: any) {
      setError('দুঃখিত, কোনো একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Info Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-teal-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-teal-800 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
               <div className="relative z-10">
                 <ShieldCheck className="text-teal-400 mb-6" size={48} />
                 <h1 className="text-3xl font-serif italic mb-4">অনলাইন অ্যাপয়েন্টমেন্ট</h1>
                 <p className="text-teal-100/60 text-sm leading-relaxed mb-10">
                   ৭ দিন অগ্রিম অ্যাপয়েন্টমেন্ট বুক করার সুবিধা। আপনার পছন্দের চিকিৎসক নির্বাচন করুন এবং নির্দিষ্ট সময়ে সেবা নিন।
                 </p>
                 
                 <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-800 flex items-center justify-center shrink-0">
                        <Clock size={20} className="text-teal-400" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-teal-500">রিপ্লাই টাইম</p>
                        <p className="text-sm font-bold">খুব দ্রুত যোগাযোগ করা হবে</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-800 flex items-center justify-center shrink-0">
                        <Phone size={20} className="text-teal-400" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-teal-500">জরুরী সিরিয়াল</p>
                        <a 
                          href={`https://wa.me/88${CLINIC_INFO.phone.replace(/-/g, '')}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-sm font-bold hover:text-teal-400 transition-colors"
                        >
                          {CLINIC_INFO.phone}
                        </a>
                      </div>
                    </div>
                 </div>
               </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
               <h3 className="font-bold text-slate-800 mb-4">কেন আমাদের বেছে নেবেন?</h3>
               <ul className="space-y-4">
                 {[
                   "নির্ভুল ডায়াগনস্টিক রিপোর্ট",
                   "অভিজ্ঞ চিকিৎসক প্যানেল",
                   "সহজেই অ্যাপয়েন্টমেন্ট ব্যবস্থা",
                   "আধুনিক রোগ নির্ণয় পদ্ধতি"
                 ].map((item, idx) => (
                   <li key={idx} className="flex gap-3 text-sm text-slate-600">
                     <CheckCircle className="text-teal-500 shrink-0" size={18} />
                     {item}
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-sm border border-slate-100">
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-4">অভিনন্দন!</h2>
                  <p className="text-slate-500 mb-8 px-10">
                    আপনার অ্যাপয়েন্টমেন্ট বুক করা সফল হয়েছে। আমরা শীঘ্রই আপনার ফোনে সিরিয়াল নম্বর এবং সময় জানিয়ে দেব।
                  </p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="bg-teal-600 text-white font-bold px-10 py-4 rounded-2xl hover:bg-teal-700 transition-all"
                  >
                    আরেকটি বুকিং করুন
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">বুকিং ফর্মটি পূরণ করুন</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest pl-1">রোগীর নাম</label>
                        <div className="relative">
                           <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                           <input 
                              type="text" 
                              placeholder="আপনার নাম লিখুন"
                              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:border-teal-500 outline-none transition-all"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              required
                           />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest pl-1">ফোন নম্বর</label>
                        <div className="relative">
                           <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                           <input 
                              type="tel" 
                              placeholder="০১৭..."
                              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:border-teal-500 outline-none transition-all"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              required
                           />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest pl-1">চিকিৎসক নির্বাচন করুন</label>
                      <div className="relative">
                         <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                         <select 
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:border-teal-500 outline-none transition-all appearance-none"
                            value={formData.doctor}
                            onChange={(e) => setFormData({...formData, doctor: e.target.value})}
                            required
                         >
                            <option value="">ডাক্তার সিলেক্ট করুন</option>
                            {doctors.map(d => (
                              <option key={d.id} value={d.name}>{d.name} ({d.specialty})</option>
                            ))}
                         </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest pl-1">তারিখ নির্বাচন করুন</label>
                        <div className="relative">
                           <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                           <select 
                              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:border-teal-500 outline-none transition-all appearance-none"
                              value={formData.date}
                              onChange={(e) => setFormData({...formData, date: e.target.value})}
                              required
                           >
                              <option value="">তারিখ সিলেক্ট করুন</option>
                              {next7Days.length > 0 ? (
                                next7Days.map(d => (
                                  <option key={d.value} value={d.value}>{d.display}</option>
                                ))
                              ) : formData.doctor ? (
                                <option disabled>দুঃখিত, আগামী ৭ দিনে কোনো শিডিউল নেই</option>
                              ) : null}
                           </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest pl-1">পছন্দের সময়</label>
                        <div className="relative">
                           <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                           <select 
                              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:border-teal-500 outline-none transition-all appearance-none"
                              value={formData.time}
                              onChange={(e) => setFormData({...formData, time: e.target.value})}
                              required
                           >
                              <option value="">সময় সিলেক্ট করুন</option>
                              {selectedDoctor?.availability.availableSlots ? (
                                selectedDoctor.availability.availableSlots.map((slot, i) => (
                                  <option key={i} value={slot}>{slot}</option>
                                ))
                              ) : (
                                <>
                                  <option value="সকাল (০৯টা - ০১টা)">সকাল (০৯টা - ০১টা)</option>
                                  <option value="বিকাল (০৪টা - ০৮টা)">বিকাল (০৪টা - ০৮টা)</option>
                                  <option value="সন্ধ্যা (০৬টা - ০৯টা)">সন্ধ্যা (০৬টা - ০৯টা)</option>
                                </>
                              )}
                           </select>
                        </div>
                      </div>
                    </div>

                    {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100">{error}</p>}

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full bg-teal-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-teal-100/50 flex items-center justify-center gap-3 active:scale-[0.98]",
                        isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-teal-700"
                      )}
                    >
                      {isSubmitting ? "পাঠানো হচ্ছে..." : "বুকিং নিশ্চিত করুন"}
                      <Send size={20} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
