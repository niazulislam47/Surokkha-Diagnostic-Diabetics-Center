import React from 'react';
import { motion } from 'motion/react';
import { Microscope, Activity, HeartPulse, FileCheck, Stethoscope, CheckCircle } from 'lucide-react';
import { SERVICES } from '../constants';

const iconMap = {
  Microscope,
  Activity,
  HeartPulse,
  FileCheck,
  Stethoscope
};

export default function Services() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-teal-950 text-white py-24 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-serif italic mb-6">আমাদের সেবাসমূহ</h1>
          <p className="text-teal-200/60 max-w-2xl mx-auto text-lg leading-relaxed">
            আমরা সর্বাধুনিক প্রযুক্তিতে নির্ভুল ও দ্রুত ডায়াগনস্টিক সেবা এবং বিশেষজ্ঞ চিকিৎসকদের পরামর্শ প্রদান করছি।
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => {
            const IconComponent = iconMap[service.iconName as keyof typeof iconMap] || Activity;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                   <IconComponent size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{service.name}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed italic">
                  "{service.description}"
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-2 text-sm text-slate-600">
                    <CheckCircle size={18} className="text-teal-500" /> ১০০% ডিজিটাল প্রযুক্তি
                  </li>
                  <li className="flex gap-2 text-sm text-slate-600">
                    <CheckCircle size={18} className="text-teal-500" /> বিএসসি টেকনোলজিস্ট
                  </li>
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
