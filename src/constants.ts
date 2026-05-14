import { Doctor, Testimonial, Service } from './types';

export const DOCTORS: Doctor[] = [
  {
    id: "shukla-bakshi",
    name: "ডাঃ শুক্লা বক্সী",
    title: "নবজাতক, শিশু ও কিশোর রোগ চিকিৎসক",
    qualifications: "MBBS, FCPS, FP (Child)",
    institute: "বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয় (পিজি হাসপাতাল)",
    specialty: "Pediatrics",
    regNo: "৭১৬২০",
    schedule: [
      { day: "বৃহস্পতিবার", time: "সন্ধ্যা ৫:০০ টা - রাত ৮:০০ টা" },
      { day: "শুক্রবার", time: "সকাল ৯:০০ টা - বিকাল ৫:০০ টা" }
    ],
    availability: {
      isAvailable: false,
      nextAvailable: "বৃহস্পতিবার সন্ধ্যা ৫:০০ টা",
      availableSlots: ["০৫:০০ PM", "০৫:৩০ PM", "০৬:০০ PM", "০৬:৩০ PM", "০৭:০০ PM", "০৭:৩০ PM"]
    },
    experience: 4,
    bio: "ডাঃ শুক্লা বক্সী নবজাতক ও শিশু রোগে অত্যন্ত অভিজ্ঞ। তিনি শিশুদের দীর্ঘমেয়াদী রোগ এবং সাধারণ শারিরীক সমস্যার নির্ভুল চিকিৎসায় বিশেষ পারদর্শী।",
    testimonials: [
      { name: "আব্দুর রহিম", service: "শিশু চিকিৎসা", quote: "ডাক্তার খুব ধৈর্য ধরে বাচ্চার সমস্যা শুনেছেন। আমরা খুবই সন্তুষ্ট।" }
    ]
  },
  {
    id: "mehedi-hasan",
    name: "সহঃ অধ্যাপক ডাঃ মোঃ মেহেদী হাসান",
    title: "হাড়-জোড়া, ভাঙ্গা, বাত-ব্যথা, পঙ্গু রোগ বিশেষজ্ঞ ও অর্থোপেডিক প্লাস্টিক সার্জন",
    qualifications: "MBBS, D-Ortho (NITOR), FCPS, FP (Plastic Surgery)",
    institute: "ইস্টার্ন মেডিকেল কলেজ হাসপাতাল",
    specialty: "Orthopedic",
    regNo: "এ-৮২০৩১",
    schedule: [
      { day: "শুক্রবার", time: "বিকাল ৪:০০ টা - রাত ৮:০০ টা" }
    ],
    availability: {
      isAvailable: false,
      nextAvailable: "শুক্রবার বিকাল ৪:০০ টা",
      availableSlots: ["০৪:০০ PM", "০৪:৩০ PM", "০৫:০০ PM", "০৬:৩০ PM", "০৭:০০ PM"]
    },
    experience: 4,
    bio: "হাড় ও জোড়া রোগের বিশেষজ্ঞ হিসেবে ডাঃ মেহেদী হাসান অর্থোপেডিক প্লাস্টিক সার্জারিতে দীর্ঘকাল ধরে সুনামের সাথে কাজ করছেন।",
    testimonials: [
      { name: "করিমুন্নেসা", service: "বাত-ব্যথা চিকিৎসা", quote: "ডাক্তারের পরামর্শে আমার হাঁটু ব্যথা অনেক কমেছে।" }
    ]
  },
  {
    id: "emran-hossain",
    name: "ডাঃ এমরান হোসেন চৌধুরী",
    title: "মেডিসিন, গ্যাস্ট্রোএন্টারোলজি ও হৃদরোগ বিশেষজ্ঞ",
    qualifications: "MBBS (Dhaka), FCPS, MD (Medicine), D-Card, BCS (Health)",
    institute: "মেডিসিন বিশেষজ্ঞ",
    specialty: "Medicine & Cardiology",
    regNo: "এ-৭১৬৪৬",
    schedule: [
      { day: "শনিবার", time: "বিকাল ৪:০০ টা - রাত ৮:০০ টা" }
    ],
    availability: {
      isAvailable: false,
      nextAvailable: "শনিবার বিকাল ৪:০০ টা",
      availableSlots: ["০৪:০০ PM", "০৫:০০ PM", "০৫:৩০ PM", "০৬:০০ PM"]
    },
    experience: 4,
    bio: "মেডিসিন ও হৃদরোগ বিশেষজ্ঞ হিসেবে ডাঃ এমরান হোসেন চৌধুরী সেনবাগ এলাকায় অত্যন্ত পরিচিত। তিনি গ্যাস্ট্রোএন্টারোলজির জটিল রোগ নির্ণয়ে পারদর্শী।",
    testimonials: []
  },
  {
    id: "khaleda-yasmin",
    name: "ডাঃ খালেদা ইয়াসমিন",
    title: "গাইনী, প্রসূতি ও হরমোন রোগ চিকিৎসক",
    qualifications: "MBBS (DU), PGT, DMU, CCD, MS (Gynae & Obs)",
    institute: "সরকারি বিএসবি মেটারনিটি হাসপাতাল, সদর, নোয়াখালী",
    specialty: "Gynae & Obs",
    regNo: "এ-৮১২২৪",
    schedule: [
      { day: "শনিবার", time: "বিকাল ৪:০০ টা - রাত ৮:০০ টা" },
      { day: "রবিবার", time: "সন্ধ্যা ৬:০০ টা - রাত ৮:০০ টা" },
      { day: "সোমবার", time: "সন্ধ্যা ৬:০০ টা - রাত ৮:০০ টা" },
      { day: "মঙ্গলবার", time: "সন্ধ্যা ৬:০০ টা - রাত ৮:০০ টা" },
      { day: "বুধবার", time: "সন্ধ্যা ৬:০০ টা - রাত ৮:০০ টা" }
    ],
    availability: {
      isAvailable: false,
      nextAvailable: "মঙ্গলবার সন্ধ্যা ৬:০০ টা",
      availableSlots: ["০৬:০০ PM", "০৬:৩০ PM", "০৭:০০ PM", "০৭:৩০ PM"]
    },
    experience: 8,
    bio: "মাতৃস্বাস্থ্য ও স্ত্রী রোগ বিশেষজ্ঞ ডাঃ খালেদা ইয়াসমিন হরমোনজনিত সমস্যায় সুচিকিৎসা প্রদান করেন।",
    testimonials: [
      { name: "নাসিমা আক্তার", service: "গাইনী চেকআপ", quote: "ম্যাডাম খুবই অমায়িক এবং ভালো পরামর্শ দেন।" }
    ]
  },
  {
    id: "debangsu-mithun",
    name: "ডাঃ দেবাংশু ভৌমিক মিথুন",
    title: "ডায়াবেটিস, মেডিসিন ও চর্ম এলার্জি রোগ চিকিৎসক",
    qualifications: "MBBS (CU), CCD (BIRDEM)",
    institute: "জেনারেল ফিজিশিয়ান ও ডায়াবেটোলজিস্ট",
    specialty: "Diabetes & Skin",
    regNo: "৭১৬৪২",
    schedule: [
      { day: "প্রতিদিন", time: "সকাল ৯:০০ টা - রাত ৮:০০ টা" }
    ],
    availability: {
      isAvailable: true,
      nextAvailable: "বর্তমানে চেম্বারে আছেন",
      availableSlots: ["১০:০০ AM", "১১:০০ AM", "১২:৩০ PM", "০৩:০০ PM", "০৫:০০ PM", "০৭:০০ PM"]
    },
    experience: 7,
    bio: "ডায়াবেটিস নিয়ন্ত্রণে ডাঃ দেবাংশু ভৌমিক মিথুন একজন দক্ষ চিকিৎসক। এছাড়াও তিনি চর্ম ও যৌন রোগের সুচিকিৎসা নিশ্চিত করেন।",
    testimonials: []
  },
  {
    id: "kishore-haldar",
    name: "সহযোগী অধ্যাপক ডাঃ কিশোর কুমার হালদার",
    title: "নাক, কান, গলা ও হেড-নেক সার্জারি বিশেষজ্ঞ",
    qualifications: "MBBS, BCS (Health), MS (ENT)",
    institute: "আব্দুল মালেক উকিল মেডিকেল কলেজ, নোয়াখালী",
    specialty: "ENT",
    regNo: "২৬৩৩৩",
    schedule: [
      { day: "বৃহস্পতিবার", time: "সন্ধ্যা ৬:৩০ টা - রাত ৭:৩০ টা" }
    ],
    availability: {
      isAvailable: false,
      nextAvailable: "বৃহস্পতিবার সন্ধ্যা ৬:৩০ টা",
      availableSlots: ["০৬:৩০ PM", "০৬:৪৫ PM", "০৭:০০ PM", "০৭:১৫ PM"]
    },
    experience: 18,
    bio: "নাক, কান ও গলা রোগের প্রখ্যাত সার্জন ডাঃ কিশোর কুমার হালদার হেড-নেক সার্জারিতে বিশেষজ্ঞ।",
    testimonials: []
  },
  {
    id: "kaniz-fatema",
    name: "ডাঃ কানিজ ফাতেমা আনিকা",
    title: "গাইনী, চর্ম ও গ্যাস্ট্রো-লিভার রোগ চিকিৎসক",
    qualifications: "MBBS (Army Medical College), DOC (Dermatology), CMU (Ultrasonography), FCPS Course (Gastroenterology)",
    institute: "আর্মি মেডিকেল কলেজ",
    specialty: "Gynae, Skin & Gastro-Liver",
    regNo: "১১৪১০৯",
    schedule: [
      { day: "সোমবার", time: "বিকাল ৪:৩০ টা - রাত ৮:০০ টা" },
      { day: "মঙ্গলবার", time: "বিকাল ৪:৩০ টা - রাত ৮:০০ টা" },
      { day: "বুধবার", time: "বিকাল ৪:৩০ টা - রাত ৮:০০ টা" },
      { day: "বৃহস্পতিবার", time: "বিকাল ৪:৩০ টা - রাত ৮:০০ টা" },
      { day: "শুক্রবার", time: "বিকাল ৪:৩০ টা - রাত ৮:০০ টা" }
    ],
    availability: {
      isAvailable: false,
      nextAvailable: "সোমবার বিকাল ৪:৩০ টা",
      availableSlots: ["০৪:৩০ PM", "০৫:০০ PM", "০৫:৩০ PM", "০৬:০০ PM", "০৬:৩০ PM", "০৭:০০ PM", "০৭:৩০ PM"]
    },
    experience: 4,
    bio: "ডাঃ কানিজ ফাতেমা আনিকা গাইনী, চর্ম ও গ্যাস্ট্রো-লিভার রোগের বিশেষজ্ঞ। তিনি অত্যন্ত দক্ষতার সাথে এই রোগসমূহের চিকিৎসা প্রদান করেন।",
    testimonials: []
  }
];

export const TESTIMONIALS = [
  { name: "মোঃ জসিম উদ্দিন", service: "ডায়াবেটিস পরীক্ষা", quote: "এখানে পরীক্ষার রিপোর্ট দ্রুত পাওয়া যায় এবং পরিবেশ বেশ ভালো।" },
  { name: "মরিয়ম বেগম", service: "ডিজিটাল X-RAY", quote: "এক্স-রে রিপোর্ট একদম পরিষ্কার ছিল, ডাক্তার সাহেব খুব প্রশংসা করেছেন।" },
  { name: "সালেহ আহমেদ", service: "মেডিসিন পরামর্শ", quote: "অ্যাপয়েন্টমেন্ট সিস্টেম খুব সহজ। আমাকে বেশিক্ষণ অপেক্ষা করতে হয়নি।" }
];

export const SERVICES: Service[] = [
  { 
    name: "প্যাথলজিক্যাল পরীক্ষা", 
    description: "অটো এনালাইজার ওবায়োকেমেস্ট্রি মেশিন দ্বারা প্যাথলজিক্যাল পরীক্ষা করা হয়।",
    iconName: "Microscope"
  },
  { 
    name: "হরমোন ও ৪ডি আল্ট্রাসনোগ্রাফী", 
    description: "সকল প্রকার হরমোন পরীক্ষা করা হয়। ৪ডি কালার আল্ট্রাসনোগ্রাফী করা হয়।",
    iconName: "Activity"
  },
  { 
    name: "ইসিজি ও ল্যাব", 
    description: "ইসিজি ১২ চ্যানেল। বিএসসি টেকনোলজিস্ট দ্বারা ল্যাব পরিচালনা করা হয়।",
    iconName: "HeartPulse"
  },
  { 
    name: "নির্ভুল রিপোর্ট", 
    description: "সকল প্রকার পরীক্ষায়-নিরিক্ষায় নির্ভুল রির্পোর্ট প্রদানে আমরা অঙ্গীকার বদ্ধ।",
    iconName: "FileCheck"
  },
  { 
    name: "বিশেষজ্ঞ সেবা ও অক্সিজেন", 
    description: "প্রতিদিন মেডিসিন, গাইনী ও ডায়াবেটিস এবং বিশেষজ্ঞ ডাক্তারগন রোগী দেখেন ও আল্ট্রাসনোগ্রাফী করেন। অক্সিজেন এর বিশেষ সুবিধা আছে।",
    iconName: "Stethoscope"
  }
];

export const CLINIC_INFO = {
  name: "সুরক্ষা ডায়াগনস্টিক এন্ড ডায়াবেটিস সেন্টার",
  slogan: "আপনার স্বাস্থ্য, আমাদের অগ্রাধিকার",
  location: "কাতার সেন্টার, সেনবাগ রাস্তার মাথা, সেনবাগ, নোয়াখালী",
  phone: "01716-618261",
  email: "surokkha.dc.info@gmail.com"
};
