import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Image as ImageIcon, Calendar, MapPin, Users, X, Info } from 'lucide-react';

interface Photo {
  id: number;
  activityId: number;
  url: string;
  title: string;
  category: string;
  date: string;
  location: string;
  caption: string;
}

const PHOTOS: Photo[] = [
  // Activity 1: Hospital Disposal Workshop
  {
    id: 1,
    activityId: 1,
    url: "https://picui.ogmua.cn/s1/2026/03/02/69a4ee5c50e1a.webp",
    title: "Hospital Disposal Workshop",
    category: "Lecture",
    date: "Jan 2026",
    location: "Shanghai General Hospital",
    caption: "Expert session detailing the safe handling of medical waste in hospital environments."
  },
  {
    id: 101,
    activityId: 1,
    url: "https://picui.ogmua.cn/s1/2026/03/03/69a63b46f1b79.webp",
    title: "Clinical Waste Sorting",
    category: "Workshop",
    date: "Jan 2026",
    location: "Shanghai General Hospital",
    caption: "Hands-on workshop where participants learn to categorize different types of clinical waste."
  },
  {
    id: 102,
    activityId: 1,
    url: "https://picui.ogmua.cn/s1/2026/03/04/69a7966fb9a4f.webp",
    title: "Safety Protocol Briefing",
    category: "Lecture",
    date: "Jan 2026",
    location: "Shanghai General Hospital",
    caption: "Dr. Wang explaining the critical safety protocols for pharmaceutical waste management."
  },
  {
    id: 103,
    activityId: 1,
    url: "https://picui.ogmua.cn/s1/2026/03/04/69a797265ee51.webp",
    title: "Medical Waste Container Setup",
    category: "Workshop",
    date: "Jan 2026",
    location: "Shanghai General Hospital",
    caption: "Demonstrating the correct setup of specialized containers for hazardous medical waste."
  },
  {
    id: 104,
    activityId: 1,
    url: "https://picui.ogmua.cn/s1/2026/03/04/69a798074b4a4.webp",
    title: "Staff Training Session",
    category: "Lecture",
    date: "Jan 2026",
    location: "Shanghai General Hospital",
    caption: "Comprehensive training for medical staff on new disposal regulations and best practices."
  },
  {
    id: 105,
    activityId: 1,
    url: "https://picui.ogmua.cn/s1/2026/03/01/69a44a02b4cae.webp",
    title: "Workshop Conclusion",
    category: "Workshop",
    date: "Jan 2026",
    location: "Shanghai General Hospital",
    caption: "Participants discussing key takeaways and future implementation plans."
  },
  
  // Activity 2: Industry Perspective
  {
    id: 2,
    activityId: 2,
    url: "https://picui.ogmua.cn/s1/2026/03/03/69a62bbeea64a.webp",
    title: "Industry Expert Talk",
    category: "Seminar",
    date: "Jan 2026",
    location: "Tech Park Auditorium",
    caption: "A pharmaceutical industry manager sharing insights on corporate responsibility and household drug safety."
  },

  // Activity 3: Interactive Experiment
  {
    id: 3,
    activityId: 3,
    url: "https://picui.ogmua.cn/s1/2026/03/01/69a4532343928.webp",
    title: "Chemical Stability Experiment",
    category: "Interactive",
    date: "Jan 2026",
    location: "Community Center Lab",
    caption: "Visual demonstration of how medications degrade and change chemically over time."
  },
  {
    id: 301,
    activityId: 3,
    url: "https://picui.ogmua.cn/s1/2026/03/03/69a62c60b25f3.webp",
    title: "Medication Degradation Test",
    category: "Experiment",
    date: "Jan 2026",
    location: "Community Center Lab",
    caption: "Comparing expired and unexpired drugs to show physical and chemical changes."
  },
  {
    id: 302,
    activityId: 3,
    url: "https://picui.ogmua.cn/s1/2026/03/03/69a62d77e0b64.webp",
    title: "Audience Participation Lab",
    category: "Interactive",
    date: "Jan 2026",
    location: "Community Center Lab",
    caption: "Community members participating in simple tests to understand drug stability."
  },
  {
    id: 303,
    activityId: 3,
    url: "https://picui.ogmua.cn/s1/2026/03/03/69a62d89729eb.webp",
    title: "Chemical Reaction Demo",
    category: "Interactive",
    date: "Jan 2026",
    location: "Community Center Lab",
    caption: "Controlled demonstration of chemical reactions in improperly stored medications."
  },
  {
    id: 304,
    activityId: 3,
    url: "https://picui.ogmua.cn/s1/2026/03/03/69a62dd8876f4.webp",
    title: "Safety Gear Demonstration",
    category: "Interactive",
    date: "Jan 2026",
    location: "Community Center Lab",
    caption: "Teaching the importance of protective gear when handling unknown or degraded chemicals."
  },
  {
    id: 305,
    activityId: 3,
    url: "https://picui.ogmua.cn/s1/2026/03/03/69a62e55837e5.webp",
    title: "Experiment Results Analysis",
    category: "Experiment",
    date: "Jan 2026",
    location: "Community Center Lab",
    caption: "Reviewing the data collected during the interactive lab session."
  },

  // Activity 4: Engagement
  {
    id: 4,
    activityId: 4,
    url: "https://picui.ogmua.cn/s1/2026/03/01/69a44f9ac539f.webp",
    title: "Community Q&A Session",
    category: "Engagement",
    date: "Jan 2026",
    location: "Xuhui District Hall",
    caption: "An open forum for residents to ask questions about safe medication disposal."
  },
  {
    id: 401,
    activityId: 4,
    url: "https://picui.ogmua.cn/s1/2026/03/03/69a62fde21485.webp",
    title: "Facilitator Discussion",
    category: "Engagement",
    date: "Jan 2026",
    location: "Xuhui District Hall",
    caption: "MedSafe facilitators addressing common myths about pharmaceutical waste."
  },
  {
    id: 402,
    activityId: 4,
    url: "https://picui.ogmua.cn/s1/2026/03/04/69a79ce8df958.webp",
    title: "Community Feedback Loop",
    category: "Q&A",
    date: "Jan 2026",
    location: "Xuhui District Hall",
    caption: "Gathering valuable input from the community to improve our recycling network."
  },
  {
    id: 403,
    activityId: 4,
    url: "https://picui.ogmua.cn/s1/2026/03/04/69a79cec4e449.webp",
    title: "Expert Panel Discussion",
    category: "Engagement",
    date: "Jan 2026",
    location: "Xuhui District Hall",
    caption: "A panel of experts providing direct answers to audience health and safety concerns."
  },

  // Activity 5: Action
  {
    id: 5,
    activityId: 5,
    url: "https://picui.ogmua.cn/s1/2026/03/01/69a4506047556.webp",
    title: "Collection Day Logistics",
    category: "Action",
    date: "Jan 2026",
    location: "MedSafe Collection Point",
    caption: "The MedSafe team coordinating the logistics for a successful community take-back event."
  },
  {
    id: 501,
    activityId: 5,
    url: "https://picui.ogmua.cn/s1/2026/03/01/69a44bcc1e834.webp",
    title: "Volunteer Sorting Team",
    category: "Action",
    date: "Jan 2026",
    location: "MedSafe Collection Point",
    caption: "Dedicated volunteers meticulously sorting collected medications for safe disposal."
  },
  {
    id: 502,
    activityId: 5,
    url: "https://picui.ogmua.cn/s1/2026/03/03/69a63e5646571.webp",
    title: "Transport to Disposal Facility",
    category: "Logistics",
    date: "Jan 2026",
    location: "MedSafe Collection Point",
    caption: "Securely loading collected waste for transport to a professional disposal facility."
  },
  {
    id: 503,
    activityId: 5,
    url: "https://picui.ogmua.cn/s1/2026/03/04/69a79bdfad24f.webp",
    title: "Safe Disposal Bin Loading",
    category: "Action",
    date: "Jan 2026",
    location: "MedSafe Collection Point",
    caption: "Ensuring all hazardous waste is placed in appropriate, leak-proof bins."
  },
  {
    id: 504,
    activityId: 5,
    url: "https://picui.ogmua.cn/s1/2026/03/04/69a79be2470fd.webp",
    title: "Community Collection Point",
    category: "Action",
    date: "Jan 2026",
    location: "MedSafe Collection Point",
    caption: "A busy collection point where residents bring their expired medications."
  },
  {
    id: 505,
    activityId: 5,
    url: "https://picui.ogmua.cn/s1/2026/03/04/69a79c31e3825.webp",
    title: "Final Sorting Check",
    category: "Action",
    date: "Jan 2026",
    location: "MedSafe Collection Point",
    caption: "A final verification step to ensure all medications are correctly categorized before transport."
  }
];

interface ActivityPhotosProps {
  activityId: number | null;
  onBack: () => void;
}

export default function ActivityPhotos({ activityId, onBack }: ActivityPhotosProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos = activityId 
    ? PHOTOS.filter(p => p.activityId === activityId)
    : PHOTOS;

  const activityTitle = activityId 
    ? filteredPhotos[0]?.title || "Activity Photos"
    : "All Campaign Photos";

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-slate-900/10 hover:bg-slate-900/20 rounded-full text-slate-900 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="md:w-2/3 aspect-[4/3] md:aspect-auto bg-slate-100 relative">
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 rounded-full bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    {selectedPhoto.category}
                  </span>
                </div>
              </div>

              <div className="md:w-1/3 p-8 md:p-10 flex flex-col justify-center">
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-brand-primary mb-4">
                    <Info className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Photo Details</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">{selectedPhoto.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg italic font-serif">
                    "{selectedPhoto.caption}"
                  </p>
                </div>

                <div className="space-y-4 pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-slate-500">
                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{selectedPhoto.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{selectedPhoto.location}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="mt-10 w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <img 
                  src={photo.url} 
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:blur-none blur-[2px] transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Clarity Gradient Overlay - Blurred top that clears on hover */}
                <div className="absolute inset-0 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black,transparent_60%)] group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span className="px-6 py-2 bg-white rounded-full text-slate-900 font-bold text-sm shadow-xl">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-brand-primary text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {photo.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-brand-primary transition-colors">{photo.title}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {photo.location}
                </p>
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
