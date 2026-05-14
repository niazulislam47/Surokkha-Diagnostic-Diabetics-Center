import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Quote, User, Star, Send } from 'lucide-react';
import { TESTIMONIALS } from '../constants';
import { cn } from '../lib/utils';

export default function TestimonialSection() {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [quote, setQuote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quote) return;
    
    // Simulate submission
    console.log({ name, service, quote });
    setSubmitted(true);
    setName('');
    setService('');
    setQuote('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-4"
          >
            <Star size={16} fill="currentColor" />
            <span>অনুপ্রেরণা</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">আমাদের রোগীদের মতামত</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            আমাদের সেবার মান সম্পর্কে রোগীদের ব্যক্তিগত অভিজ্ঞতা। আপনার মতামত আমাদের আরও ভালো সেবা প্রদানে উৎসাহিত করে।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-green-100 relative group"
            >
              <Quote className="absolute top-6 right-8 text-green-100 group-hover:text-green-200 transition-colors" size={48} />
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} fill="currentColor" className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6 relative z-10 leading-relaxed text-sm">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                  <p className="text-green-600 text-[10px] font-semibold uppercase tracking-wider">{t.service}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Submission Form */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-green-100 max-w-4xl mx-auto overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-0"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">আপনার মতামত শেয়ার করুন</h3>
            <p className="text-gray-500 mb-8 text-sm">আমাদের সেবা নিয়ে আপনার অভিজ্ঞতা কেমন ছিল? নিচে লিখে আমাদের জানান।</p>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 text-green-700 p-6 rounded-2xl border border-green-100 text-center"
              >
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={24} />
                </div>
                <h4 className="text-lg font-bold mb-1">ধন্যবাদ!</h4>
                <p>আপনার অমূল্য মতামতটি সফলভাবে জমা দেওয়া হয়েছে।</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">আপনার নাম</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="নাম লিখুন"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-green-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">গৃহীত সেবা</label>
                    <input 
                      type="text" 
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      placeholder="উদাঃ শিশু চিকিৎসা"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-green-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">আপনার মন্তব্য</label>
                    <textarea 
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      required
                      rows={4}
                      placeholder="আপনার অভিজ্ঞতা বিস্তারিত লিখুন..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-green-500 outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100 active:scale-95"
                  >
                    মতামত পাঠান
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
