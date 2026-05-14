export interface Testimonial {
  name: string;
  service: string;
  quote: string;
}

export interface ScheduleEntry {
  day: string;
  time: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  qualifications: string;
  institute: string;
  specialty: string;
  regNo: string;
  schedule: ScheduleEntry[];
  availability: {
    isAvailable: boolean;
    nextAvailable: string;
    availableSlots?: string[];
  };
  experience: number;
  bio: string;
  photoUrl?: string;
  testimonials: Testimonial[];
}

export interface Service {
  name: string;
  description: string;
  iconName?: string;
}
