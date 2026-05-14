import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Activity, ShieldCheck, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES, CLINIC_INFO } from '../constants';
import DoctorCard from '../components/DoctorCard';
import TestimonialSection from '../components/TestimonialSection';
import { useDoctors } from '../context/DoctorContext';

export default function Home() {
  const { doctors } = useDoctors();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-teal-950 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-900 skew-x-12 translate-x-20 -z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-800 text-teal-300 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
                {CLINIC_INFO.slogan}
              </div>
              <h1 className="text-5xl md:text-7xl font-serif italic mb-6 leading-tight">
                আপনার স্বাস্থ্য <br />
                <span className="text-teal-400 not-italic font-bold">আমাদের প্রতিশ্রুতি</span>
              </h1>
              <p className="text-teal-100/70 text-lg mb-10 max-w-lg leading-relaxed">
                সেনবাগের আধুনিক স্বাস্থ্যসেবা কেন্দ্র। বিশেষজ্ঞ ডাক্তারদের পরামর্শ এবং নির্ভুল ডায়াগনস্টিক রিপোর্ট নিশ্চিত করছি আমরা।
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/appointment" className="bg-teal-500 hover:bg-teal-400 text-teal-950 font-bold px-8 py-4 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center gap-2">
                  অ্যাপয়েন্টমেন্ট নিন
                  <ArrowRight size={20} />
                </Link>
                <Link to="/doctors" className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl transition-all border border-white/20 active:scale-95">
                  ডাক্তারবৃন্দ
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[40px] overflow-hidden border-8 border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop" 
                  alt="Modern Hospital"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center">
                  <Activity size={24} />
                </div>
                <div>
                   <p className="text-[10px] text-slate-400 font-bold uppercase">পেশেন্ট ট্রাস্ট</p>
                   <p className="text-xl font-bold text-teal-900">৫০০০+</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Users />, label: "বিশেষজ্ঞ চিকিৎসক", value: "১০+" },
            { icon: <Activity />, label: "ডায়াগনস্টিক রিপোর্ট", value: "১০০% নির্ভুল" },
            { icon: <ShieldCheck />, label: "সেবা প্রদানের সময়", value: "২৪/৭" },
            { icon: <Clock />, label: "অ্যাপয়েন্টমেন্ট", value: "সহজ ও দ্রুত" }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="text-teal-600 mb-3">{stat.icon}</div>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif italic text-slate-800">আমাদের বিশেষজ্ঞ ডাক্তারগণ</h2>
              <p className="text-slate-500 mt-2">আপনার প্রয়োজনে সর্বদা আমরা পাশে আছি।</p>
            </div>
            <Link to="/doctors" className="hidden md:flex items-center gap-2 text-teal-600 font-bold hover:underline mb-2">
              সবাইকে দেখুন <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.slice(0, 3).map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Call to Action */}
      <section className="py-20 bg-teal-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-teal-800 rounded-full -translate-x-20 -translate-y-20 opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">আজই আপনার অ্যাপয়েন্টমেন্ট বুক করুন</h2>
          <p className="text-teal-100/60 mb-10 text-lg">অপেক্ষা কমিয়ে ঝামেলামুক্ত স্বাস্থ্যসেবা নিন আমাদের ক্লিনিকে।</p>
          <Link 
            to="/appointment" 
            className="inline-flex items-center gap-3 bg-white text-teal-950 px-10 py-5 rounded-3xl font-black uppercase tracking-widest hover:bg-teal-50 transition-all shadow-xl active:scale-95"
          >
            অ্যাপয়েন্টমেন্ট নিন <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
