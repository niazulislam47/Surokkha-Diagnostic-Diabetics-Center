import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Upload, CheckCircle, AlertCircle, Camera, User } from 'lucide-react';
import { useDoctors } from '../context/DoctorContext';
import { cn } from '../lib/utils';

export default function Admin() {
  const { doctors } = useDoctors();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialDoctorId = queryParams.get('doctorId') || '';

  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialDoctorId) {
      setSelectedDoctorId(initialDoctorId);
    }
  }, [initialDoctorId]);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctorId || !file) {
      setStatus({ type: 'error', message: 'দয়া করে ডাক্তার এবং ছবি নির্বাচন করুন।' });
      return;
    }

    setIsUploading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await fetch(`/api/doctors/${selectedDoctorId}/photo`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setStatus({ type: 'success', message: 'ছবি সফলভাবে আপলোড হয়েছে!' });
        setFile(null);
        setPreview(null);
        setSelectedDoctorId('');
      } else {
        throw new Error(data.message);
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: 'আপলোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।' });
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif italic text-slate-800 mb-4">ডাক্তার প্রোফাইল ম্যানেজমেন্ট</h1>
          <p className="text-slate-500">চিকিৎসকদের পেশাদার ছবি আপলোড করুন</p>
        </div>

        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100">
          <form onSubmit={handleUpload} className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest pl-1">চিকিৎসক নির্বাচন করুন</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    type="button"
                    onClick={() => setSelectedDoctorId(doctor.id)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left",
                      selectedDoctorId === doctor.id
                        ? "bg-teal-50 border-teal-500 ring-2 ring-teal-100"
                        : "bg-slate-50 border-slate-100 hover:border-teal-200"
                    )}
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 border border-slate-100 overflow-hidden">
                      {doctor.photoUrl ? (
                        <img src={doctor.photoUrl} alt={doctor.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="text-slate-300" size={24} />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{doctor.name}</p>
                      <p className="text-[10px] text-teal-600 font-bold uppercase tracking-tight">{doctor.specialty}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest pl-1">ছবি নির্বাচন করুন</label>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-[32px] cursor-pointer transition-all overflow-hidden",
                    preview ? "border-teal-500 bg-teal-50/50" : "border-slate-200 bg-slate-50 hover:bg-slate-100/80"
                  )}
                >
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera size={48} className="text-slate-300 mb-4 group-hover:scale-110 transition-transform" />
                      <p className="mb-2 text-sm text-slate-500 font-bold">ছবি নির্বাচন করতে ক্লিক করুন</p>
                      <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {status && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "p-4 rounded-2xl flex items-center gap-3 text-sm",
                  status.type === 'success' ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
                )}
              >
                {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                {status.message}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isUploading || !selectedDoctorId || !file}
              className={cn(
                "w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl active:scale-[0.98]",
                isUploading || !selectedDoctorId || !file
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-teal-600 text-white hover:bg-teal-700 shadow-teal-100"
              )}
            >
              {isUploading ? "আপলোড হচ্ছে..." : "ছবি সেভ করুন"}
              <Upload size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
