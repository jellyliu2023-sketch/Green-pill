import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Image as ImageIcon, Video, X } from 'lucide-react';

const CAMPAIGN_VIDEOS = [
  {
    id: 1,
    title: 'MedSafe Initiative Overview',
    description: 'A comprehensive look at our mission to establish a sustainable pharmaceutical waste management network in Shanghai.',
    thumbnail: 'https://picsum.photos/seed/medsafe-vid/800/600',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Mission'
  },
  {
    id: 2,
    title: 'Community Collection Highlights',
    description: 'Witness the energy and participation at our recent community take-back event in Xuhui District.',
    thumbnail: 'https://picsum.photos/seed/collection-vid/800/600',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    category: 'Action'
  },
  {
    id: 3,
    title: 'Expert Interview: Dr. Shengli Wang',
    description: 'Dr. Wang discusses the critical importance of safe medication disposal for public health.',
    thumbnail: 'https://picsum.photos/seed/expert-vid/800/600',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Expert'
  },
  {
    id: 4,
    title: 'Interactive Lab Demonstration',
    description: 'Our research team demonstrates the chemical degradation of expired medications in a controlled environment.',
    thumbnail: 'https://picsum.photos/seed/lab-vid/800/600',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    category: 'Education'
  },
  {
    id: 5,
    title: 'Volunteer Training Session',
    description: 'Behind the scenes of our volunteer training program, ensuring safe handling and documentation.',
    thumbnail: 'https://picsum.photos/seed/training-vid/800/600',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Workshop'
  },
  {
    id: 6,
    title: 'Public Awareness Campaign',
    description: 'Highlights from our street-level awareness campaign across major Shanghai transit hubs.',
    thumbnail: 'https://picsum.photos/seed/awareness-vid/800/600',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    category: 'Engagement'
  }
];

export default function CampaignShowcase() {
  const [activeVideo, setActiveVideo] = React.useState<string | null>(null);

  return (
    <div className="py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Campaign in Action</h2>
          <p className="text-slate-500 text-lg">
            Watch MedSafe's impact across Shanghai. Our video gallery documents collection events, expert talks, and community engagement.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-bold border border-brand-primary/20 flex items-center gap-2">
            <Video className="h-4 w-4" /> Video Gallery
          </span>
        </div>
      </div>

      {/* Video Player Modal Overlay */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <video 
                src={activeVideo} 
                controls 
                autoPlay 
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CAMPAIGN_VIDEOS.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 cursor-pointer"
            onClick={() => setActiveVideo(video.videoUrl)}
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-sm">
                  {video.category}
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-2xl transform scale-90 group-hover:scale-100 transition-all duration-300">
                  <Play className="h-8 w-8 fill-current ml-1" />
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Video className="h-4 w-4 text-brand-primary" />
                <h3 className="font-bold text-slate-900 leading-tight">{video.title}</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                {video.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 bg-brand-secondary rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/10 rounded-full -ml-32 -mb-32 blur-3xl" />
        
        <h3 className="text-3xl font-bold mb-4 relative z-10">Join the Movement</h3>
        <p className="text-brand-primary/80 max-w-2xl mx-auto mb-8 relative z-10">
          Your participation helps keep our water clean and our communities safe. Start your recycling journey today.
        </p>
        <button className="px-8 py-4 bg-brand-primary hover:bg-emerald-400 text-white font-bold rounded-full transition-all shadow-lg relative z-10">
          Find a Collection Point
        </button>
      </div>
    </div>
  );
}
