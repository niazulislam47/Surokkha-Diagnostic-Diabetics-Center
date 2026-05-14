import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { CLINIC_INFO } from '../constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'হোমপেজ', href: '/' },
    { name: 'ডাক্তারবৃন্দ', href: '/doctors' },
    { name: 'অ্যাপয়েন্টমেন্ট', href: '/appointment' },
    { name: 'সেবাসমূহ', href: '/services' },
    { name: 'আমাদের সম্পর্কে', href: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-teal-100">
                <ShieldCheck size={24} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight text-teal-950 leading-tight">সুরক্ষা ডায়াগনস্টিক</h1>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold whitespace-nowrap">এন্ড ডায়াবেটিস সেন্টার</p>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-xs font-bold uppercase tracking-widest transition-colors duration-200",
                  isActive(link.href) 
                    ? "text-teal-600 border-b-2 border-teal-600 pb-1" 
                    : "text-slate-500 hover:text-teal-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/appointment" 
              className="bg-teal-900 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-teal-800 transition-all shadow-md active:scale-95 ml-4"
            >
              অ্যাপয়েন্টমেন্ট নিন
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-800 p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-4 text-xs font-bold uppercase tracking-widest rounded-lg",
                    isActive(link.href)
                      ? "bg-teal-50 text-teal-700"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-3">
                <Link
                  to="/appointment"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-teal-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-sm"
                >
                  অ্যাপয়েন্টমেন্ট নিন
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import { cn } from '../lib/utils';
