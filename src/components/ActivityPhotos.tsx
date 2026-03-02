import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Image as ImageIcon, Calendar, MapPin, Users } from 'lucide-react';

interface Photo {
  id: number;
  activityId: number;
  url: string;
  title: string;
  category: string;
  date: string;
  location: string;
}

const PHOTOS: Photo[] = [
  // Activity 1: Hospital Disposal Workshop
  {
    id: 1,
    activityId: 1,
    url: "https://picui.ogmua.cn/s1/2026/03/02/69a4ee5c50e1a.webp",
    title: "Hospital Disposal Workshop",
    category: "Lecture",
    date: "Oct 2024",
    location: "Shanghai General Hospital"
  },
  {
    id: 101,
    activityId: 1,
    url: "https://picsum.photos/seed/hosp1/800/600",
    title: "Clinical Waste Sorting",
    category: "Workshop",
    date: "Oct 2024",
    location: "Shanghai General Hospital"
  },
  {
    id: 102,
    activityId: 1,
    url: "https://picsum.photos/seed/hosp2/800/600",
    title: "Safety Protocol Briefing",
    category: "Lecture",
    date: "Oct 2024",
    location: "Shanghai General Hospital"
  },
  {
    id: 103,
    activityId: 1,
    url: "https://picsum.photos/seed/hosp3/800/600",
    title: "Medical Waste Container Setup",
    category: "Workshop",
    date: "Oct 2024",
    location: "Shanghai General Hospital"
  },
  {
    id: 104,
    activityId: 1,
    url: "https://picsum.photos/seed/hosp4/800/600",
    title: "Staff Training Session",
    category: "Lecture",
    date: "Oct 2024",
    location: "Shanghai General Hospital"
  },
  {
    id: 105,
    activityId: 1,
    url: "https://picsum.photos/seed/hosp5/800/600",
    title: "Workshop Conclusion",
    category: "Workshop",
    date: "Oct 2024",
    location: "Shanghai General Hospital"
  },
  
  // Activity 2: Industry Perspective
  {
    id: 2,
    activityId: 2,
    url: "https://picui.ogmua.cn/s1/2026/03/01/69a44bcc1e834.webp",
    title: "Industry Expert Talk",
    category: "Seminar",
    date: "Nov 2024",
    location: "Tech Park Auditorium"
  },
  {
    id: 201,
    activityId: 2,
    url: "https://picsum.photos/seed/ind1/800/600",
    title: "Environmental Impact Panel",
    category: "Seminar",
    date: "Nov 2024",
    location: "Tech Park Auditorium"
  },
  {
    id: 202,
    activityId: 2,
    url: "https://picsum.photos/seed/ind2/800/600",
    title: "Corporate Responsibility Workshop",
    category: "Workshop",
    date: "Nov 2024",
    location: "Tech Park Auditorium"
  },
  {
    id: 203,
    activityId: 2,
    url: "https://picsum.photos/seed/ind3/800/600",
    title: "Supply Chain Safety Discussion",
    category: "Seminar",
    date: "Nov-2024",
    location: "Tech Park Auditorium"
  },
  {
    id: 204,
    activityId: 2,
    url: "https://picsum.photos/seed/ind4/800/600",
    title: "Pharma Lifecycle Presentation",
    category: "Lecture",
    date: "Nov 2024",
    location: "Tech Park Auditorium"
  },
  {
    id: 205,
    activityId: 2,
    url: "https://picsum.photos/seed/ind5/800/600",
    title: "Industry Networking",
    category: "Seminar",
    date: "Nov 2024",
    location: "Tech Park Auditorium"
  },

  // Activity 3: Interactive Experiment
  {
    id: 3,
    activityId: 3,
    url: "https://picui.ogmua.cn/s1/2026/03/01/69a4532343928.webp",
    title: "Chemical Stability Experiment",
    category: "Interactive",
    date: "Dec 2024",
    location: "Community Center Lab"
  },
  {
    id: 301,
    activityId: 3,
    url: "https://picsum.photos/seed/exp1/800/600",
    title: "Medication Degradation Test",
    category: "Experiment",
    date: "Dec 2024",
    location: "Community Center Lab"
  },
  {
    id: 302,
    activityId: 3,
    url: "https://picsum.photos/seed/exp2/800/600",
    title: "Audience Participation Lab",
    category: "Interactive",
    date: "Dec 2024",
    location: "Community Center Lab"
  },
  {
    id: 303,
    activityId: 3,
    url: "https://picsum.photos/seed/exp3/800/600",
    title: "Chemical Reaction Demo",
    category: "Interactive",
    date: "Dec 2024",
    location: "Community Center Lab"
  },
  {
    id: 304,
    activityId: 3,
    url: "https://picsum.photos/seed/exp4/800/600",
    title: "Safety Gear Demonstration",
    category: "Interactive",
    date: "Dec 2024",
    location: "Community Center Lab"
  },
  {
    id: 305,
    activityId: 3,
    url: "https://picsum.photos/seed/exp5/800/600",
    title: "Experiment Results Analysis",
    category: "Experiment",
    date: "Dec 2024",
    location: "Community Center Lab"
  },

  // Activity 4: Engagement
  {
    id: 4,
    activityId: 4,
    url: "https://picui.ogmua.cn/s1/2026/03/01/69a44f9ac539f.webp",
    title: "Community Q&A Session",
    category: "Engagement",
    date: "Jan 2025",
    location: "Xuhui District Hall"
  },
  {
    id: 401,
    activityId: 4,
    url: "https://picsum.photos/seed/qa1/800/600",
    title: "Facilitator Discussion",
    category: "Engagement",
    date: "Jan 2025",
    location: "Xuhui District Hall"
  },
  {
    id: 402,
    activityId: 4,
    url: "https://picsum.photos/seed/qa2/800/600",
    title: "Community Feedback Loop",
    category: "Q&A",
    date: "Jan 2025",
    location: "Xuhui District Hall"
  },
  {
    id: 403,
    activityId: 4,
    url: "https://picsum.photos/seed/qa3/800/600",
    title: "Expert Panel Discussion",
    category: "Engagement",
    date: "Jan 2025",
    location: "Xuhui District Hall"
  },
  {
    id: 404,
    activityId: 4,
    url: "https://picsum.photos/seed/qa4/800/600",
    title: "Public Health Q&A",
    category: "Q&A",
    date: "Jan 2025",
    location: "Xuhui District Hall"
  },
  {
    id: 405,
    activityId: 4,
    url: "https://picsum.photos/seed/qa5/800/600",
    title: "Community Engagement Wrap-up",
    category: "Engagement",
    date: "Jan 2025",
    location: "Xuhui District Hall"
  },

  // Activity 5: Action
  {
    id: 5,
    activityId: 5,
    url: "https://picui.ogmua.cn/s1/2026/03/01/69a4506047556.webp",
    title: "Collection Day Logistics",
    category: "Action",
    date: "Feb 2025",
    location: "MedSafe Collection Point"
  },
  {
    id: 501,
    activityId: 5,
    url: "https://picsum.photos/seed/act1/800/600",
    title: "Volunteer Sorting Team",
    category: "Action",
    date: "Feb 2025",
    location: "MedSafe Collection Point"
  },
  {
    id: 502,
    activityId: 5,
    url: "https://picsum.photos/seed/act2/800/600",
    title: "Transport to Disposal Facility",
    category: "Logistics",
    date: "Feb 2025",
    location: "MedSafe Collection Point"
  },
  {
    id: 503,
    activityId: 5,
    url: "https://picsum.photos/seed/act3/800/600",
    title: "Safe Disposal Bin Loading",
    category: "Action",
    date: "Feb 2025",
    location: "MedSafe Collection Point"
  },
  {
    id: 504,
    activityId: 5,
    url: "https://picsum.photos/seed/act4/800/600",
    title: "Community Collection Point",
    category: "Action",
    date: "Feb 2025",
    location: "MedSafe Collection Point"
  },
  {
    id: 505,
    activityId: 5,
    url: "https://picsum.photos/seed/act5/800/600",
    title: "Final Sorting Check",
    category: "Action",
    date: "Feb 2025",
    location: "MedSafe Collection Point"
  }
];

interface ActivityPhotosProps {
  activityId: number | null;
  onBack: () => void;
}

export default function ActivityPhotos({ activityId, onBack }: ActivityPhotosProps) {
  const filteredPhotos = activityId 
    ? PHOTOS.filter(p => p.activityId === activityId)
    : PHOTOS;

  const activityTitle = activityId 
    ? filteredPhotos[0]?.title || "Activity Photos"
    : "All Campaign Photos";

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-brand-primary transition-colors font-bold"
          >
            <ArrowLeft className="h-5 w-5" /> Back to Insights
          </button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary">
              <ImageIcon className="h-4 w-4" />
            </div>
            <span className="font-bold text-slate-900">Activity Gallery</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">{activityTitle}</h1>
          <p className="text-slate-500 max-w-2xl">
            {activityId 
              ? `Visual highlights specifically from the "${activityTitle}" session.`
              : "A visual journey through our onsite campaigns, workshops, and community recycling efforts across Shanghai."
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <img 
                  src={photo.url} 
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-brand-primary text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {photo.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats / Footer of the gallery */}
        <div className="mt-20 p-12 bg-brand-primary rounded-[3rem] text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <Users className="h-12 w-12 mx-auto mb-6 opacity-50" />
            <h2 className="text-3xl font-bold mb-4 italic font-serif">Join Our Next Activity</h2>
            <p className="text-emerald-50 max-w-xl mx-auto mb-8">
              We are constantly organizing new workshops and collection days. Follow our updates to participate in the next MedSafe event.
            </p>
            <button 
              onClick={onBack}
              className="px-8 py-4 bg-white text-brand-primary font-bold rounded-full hover:bg-emerald-50 transition-all shadow-xl"
            >
              Return to Main Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
