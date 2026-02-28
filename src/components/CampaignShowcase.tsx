import React from 'react';
import { motion } from 'motion/react';
import { Play, Image as ImageIcon, Video } from 'lucide-react';

const CAMPAIGN_ASSETS = [
  {
    id: 1,
    type: 'image',
    title: 'Community Collection Day',
    description: 'Our flagship expired medicine take-back activity. Residents bringing their expired medications to local collection points.',
    url: 'https://picsum.photos/seed/collection-day-1/800/600',
    category: 'Action'
  },
  {
    id: 2,
    type: 'video',
    title: 'Experimental Comparison',
    description: 'A close-up of our interactive activity comparing expired and unexpired medications to show degradation.',
    url: 'https://picsum.photos/seed/experiment-vid/800/600',
    category: 'Education'
  },
  {
    id: 3,
    type: 'image',
    title: 'Doctor\'s Lecture Onsite',
    description: 'Invited doctor introducing the proper disposal of expired medication in hospitals to a focused audience.',
    url: 'https://picsum.photos/seed/doctor-lecture/800/600',
    category: 'Expert'
  },
  {
    id: 4,
    type: 'image',
    title: 'Hands-on Workshop',
    description: 'Participants experiencing hospital pharmaceutical waste disposal procedures under professional guidance.',
    url: 'https://picsum.photos/seed/hands-on/800/600',
    category: 'Workshop'
  },
  {
    id: 5,
    type: 'video',
    title: 'Pharma Manager Insights',
    description: 'Highlights from the lecture on hazards of improper disposal and best practices for household safety.',
    url: 'https://picsum.photos/seed/manager-talk/800/600',
    category: 'Expert'
  },
  {
    id: 6,
    type: 'image',
    title: 'Q&A Interactive Session',
    description: 'Our target audience engaging in a self-designed Q&A section to clarify disposal myths.',
    url: 'https://picsum.photos/seed/qa-session-img/800/600',
    category: 'Engagement'
  }
];

export default function CampaignShowcase() {
  return (
    <div className="py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Campaign in Action</h2>
          <p className="text-slate-500 text-lg">
            Witness the impact of GreenPill across communities. From local collection events to educational workshops, we're making a difference.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium border border-brand-primary/20">
            All Assets
          </span>
          <span className="px-4 py-2 rounded-full bg-white text-slate-500 text-sm font-medium border border-slate-200 hover:border-brand-primary/30 cursor-pointer transition-all">
            Videos
          </span>
          <span className="px-4 py-2 rounded-full bg-white text-slate-500 text-sm font-medium border border-slate-200 hover:border-brand-primary/30 cursor-pointer transition-all">
            Photos
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CAMPAIGN_ASSETS.map((asset, index) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={asset.url} 
                alt={asset.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-slate-900">
                  {asset.category}
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {asset.type === 'video' ? (
                  <div className="h-16 w-16 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="h-8 w-8 fill-current ml-1" />
                  </div>
                ) : (
                  <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white border border-white/30">
                    <ImageIcon className="h-8 w-8" />
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                {asset.type === 'video' ? (
                  <Video className="h-4 w-4 text-brand-primary" />
                ) : (
                  <ImageIcon className="h-4 w-4 text-brand-primary" />
                )}
                <h3 className="font-bold text-slate-900">{asset.title}</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                {asset.description}
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
