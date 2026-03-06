import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Video, ChevronRight, Info, Volume2, Maximize2, Download, ExternalLink } from 'lucide-react';

const FEATURED_VIDEO = {
  id: 1,
  title: 'MedSafe Initiative Overview',
  description: 'A comprehensive look at our mission to establish a sustainable pharmaceutical waste management network in Shanghai. This featured video highlights our core values and the impact of community-driven recycling.',
  thumbnail: 'https://picui.ogmua.cn/s1/2026/03/01/69a44a02b4cae.webp',
  videoUrl: 'https://drive.google.com/file/d/11PBSOYomvQTkzzkhavKQdBYgsb0x649-/view?usp=drive_link',
  category: 'Mission',
  duration: '2:45'
};

const OTHER_VIDEOS = [
  {
    id: 3,
    title: 'Expert Lecture: Dr. Shengli Wang',
    description: 'Dr. Wang discusses the critical importance of safe medication disposal for public health.',
    thumbnail: 'https://picui.ogmua.cn/s1/2026/03/04/69a7966fb9a4f.webp',
    videoUrl: 'https://drive.google.com/file/d/1EofJhQdT6i4l15rI7AdEaRkSQmtHKgKq/view?usp=drive_link',
    category: 'Expert',
    duration: '4:12'
  },
  {
    id: 4,
    title: 'Interactive Lab Demonstration',
    description: 'Our research team demonstrates the chemical degradation of expired medications in a controlled environment.',
    thumbnail: 'https://picui.ogmua.cn/s1/2026/03/03/69a62c60b25f3.webp',
    videoUrl: 'https://drive.google.com/file/d/1i4wWShpSOufM-UpGLgIFBiU6fjDu8mWc/view?usp=sharing',
    category: 'Education',
    duration: '3:20'
  }
];

export default function CampaignShowcase() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                <Video className="h-6 w-6" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Campaign Cinema</h2>
            </div>
            <p className="text-slate-500 text-lg">
              Explore our mission through visual storytelling. Click below to watch our featured campaign video.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-20">
          {/* Main Content Area */}
          <div className="w-full">
            <div className="relative aspect-video bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl group border-8 border-white">
              <img 
                src={FEATURED_VIDEO.thumbnail} 
                alt={FEATURED_VIDEO.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                <a 
                  href={FEATURED_VIDEO.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-24 w-24 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform group/btn"
                >
                  <Play className="h-10 w-10 fill-current ml-1 group-hover/btn:scale-110 transition-transform" />
                </a>
              </div>
              
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="text-white">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">
                    {FEATURED_VIDEO.category}
                  </span>
                  <h3 className="text-2xl font-bold">{FEATURED_VIDEO.title}</h3>
                </div>
                <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-bold">
                  {FEATURED_VIDEO.duration}
                </div>
              </div>
            </div>

            <div className="mt-10 p-10 bg-white rounded-[3rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-grow">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">About this Video</h3>
                <p className="text-slate-600 text-xl leading-relaxed font-light">
                  {FEATURED_VIDEO.description}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm mt-6">
                  <span className="flex items-center gap-2"><Info className="h-5 w-5" /> Official Mission Statement</span>
                  <span className="flex items-center gap-2"><Volume2 className="h-5 w-5" /> High Fidelity Audio</span>
                </div>
              </div>
              
              <div className="w-full md:w-auto flex-shrink-0">
                <a 
                  href={FEATURED_VIDEO.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-brand-primary text-white font-bold rounded-full hover:bg-emerald-400 transition-all shadow-xl group"
                >
                  <Play className="h-5 w-5 fill-current" />
                  Watch Full Video
                  <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>

          {/* Other Videos Section */}
          <div>
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-3xl font-bold text-slate-900">More from the Campaign</h3>
              <div className="h-px flex-grow mx-8 bg-slate-100" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {OTHER_VIDEOS.map((video) => (
                <motion.div 
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                      <a 
                        href={video.videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="h-14 w-14 rounded-full bg-white text-brand-primary flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                      >
                        <Play className="h-6 w-6 fill-current ml-1" />
                      </a>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-2 block">
                      {video.category}
                    </span>
                    <h4 className="text-xl font-bold text-slate-900 mb-3 line-clamp-1">{video.title}</h4>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                      {video.description}
                    </p>
                    <a 
                      href={video.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-brand-primary transition-colors group/link"
                    >
                      Watch Video
                      <ExternalLink className="h-4 w-4 opacity-50 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FooterPlaceholder = () => (
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
);
