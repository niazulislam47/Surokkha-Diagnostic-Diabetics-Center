import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, MapPin, Phone, Mail, Award, Users, Target } from 'lucide-react';
import { CLINIC_INFO } from '../constants';

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <section className="bg-teal-950 py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-900 rounded-full blur-3xl opacity-50 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif italic mb-6">আমাদের সম্পর্কে</h1>
          <p className="text-teal-200/60 max-w-2xl mx-auto text-lg italic">
            "আপনার স্বাস্থ্য, আমাদের অগ্রাধিকার" - এই মূলমন্ত্র নিয়ে আমরা কাজ করছি।
          </p>
        </div>
      </section>

      {/* History & Mission */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">সুরক্ষা ডায়াগনস্টিক এর লক্ষ্য ও উদ্দেশ্য</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
              <p>
                সুরক্ষা ডায়াগনস্টিক এন্ড ডায়াবেটিস সেন্টার সেনবাগ, নোয়াখালী এলাকায় একটি বিশ্বস্ত নাম। আমরা রোগীদের নির্ভুল রোগ নির্ণয় এবং উন্নত চিকিৎসাসেবা প্রদানের অঙ্গীকার নিয়ে প্রতিষ্ঠিত হয়েছি।
              </p>
              <p>
                আমাদের ক্লিনিকে রয়েছে আধুনিক ডিজিটাল ল্যাবরেটরি, ডিজিটাল এক্স-রে এবং অভিজ্ঞ চিকিৎসক প্যানেল। আমাদের লক্ষ্য হলো সুলভ মূল্যে সর্বোচ্চ মানের স্বাস্থ্যসেবা নিশ্চিত করা।
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-12">
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Target size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">আমাদের ভিশন</h4>
                    <p className="text-sm text-slate-500">নোয়াখালীর সেরা স্বাস্থ্যসেবা কেন্দ্র হওয়া।</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">রোগী ও সেবা</h4>
                    <p className="text-sm text-slate-500">৫০০০+ সুখী সন্তুষ্ট রোগী।</p>
                  </div>
               </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-[40px] overflow-hidden border-8 border-slate-50 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop" 
                alt="Clinic Interior"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">গুগল ম্যাপ ও যোগাযোগ</h2>
          <p className="text-slate-500">সরাসরি আমাদের ক্লিনিকে চলে আসুন।</p>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <MapPin size={28} />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">ঠিকানা</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{CLINIC_INFO.location}</p>
           </div>
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Phone size={28} />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">ফোন নম্বর</h4>
              <a 
                href={`https://wa.me/88${CLINIC_INFO.phone.replace(/-/g, '')}`} 
                target="_blank" 
                rel="noreferrer"
                className="text-sm text-slate-500 leading-relaxed font-bold hover:text-teal-600 transition-colors"
              >
                {CLINIC_INFO.phone}
              </a>
              <p className="text-xs text-slate-400 mt-1">সকাল ৯টা - রাত ১০টা</p>
           </div>
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Mail size={28} />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">ইমেইল</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{CLINIC_INFO.email}</p>
           </div>
        </div>
      </section>
    </div>
  );
}
