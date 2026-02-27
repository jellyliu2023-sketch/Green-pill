import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, User } from 'lucide-react';

const EXPERT_SLIDES = [
  {
    id: 1,
    expert: "Dr. Zhang Wei",
    title: "Chief Pharmacist, Peking University Hospital",
    quote: "Improper disposal of medications leads to environmental contamination and antibiotic resistance. Recycling is not just a choice, it's a responsibility.",
    points: [
      "Water source contamination risks",
      "Soil degradation from chemical leaching",
      "Accidental ingestion by wildlife"
    ],
    image: "https://picsum.photos/seed/expert1/400/400"
  },
  {
    id: 2,
    expert: "Prof. Li Ming",
    title: "Environmental Scientist, Tsinghua University",
    quote: "Our studies show that trace amounts of pharmaceuticals are appearing in urban water cycles. We need a closed-loop system for drug management.",
    points: [
      "The 'Silent Pollution' phenomenon",
      "Long-term ecological impacts",
      "Public health implications"
    ],
    image: "https://picsum.photos/seed/expert2/400/400"
  },
  {
    id: 3,
    expert: "Sarah Chen",
    title: "Public Health Advocate",
    quote: "Awareness is the first step. When people understand the 'why', the 'how' becomes a habit. Let's make drug recycling a household norm.",
    points: [
      "Community education programs",
      "Simplified recycling logistics",
      "Youth engagement in sustainability"
    ],
    image: "https://picsum.photos/seed/expert3/400/400"
  }
];

export default function ExpertInsights() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % EXPERT_SLIDES.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + EXPERT_SLIDES.length) % EXPERT_SLIDES.length);

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4 italic">Expert Perspectives</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Leading voices in medicine and environmental science discuss the critical importance of proper medication disposal.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid md:grid-cols-2 gap-8 items-center bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100"
          >
            <div className="space-y-6">
              <Quote className="h-12 w-12 text-brand-primary/20" />
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-slate-800 italic">
                "{EXPERT_SLIDES[currentIndex].quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <img 
                  src={EXPERT_SLIDES[currentIndex].image} 
                  alt={EXPERT_SLIDES[currentIndex].expert}
                  className="h-16 w-16 rounded-full object-cover border-2 border-brand-primary"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{EXPERT_SLIDES[currentIndex].expert}</h4>
                  <p className="text-sm text-slate-500">{EXPERT_SLIDES[currentIndex].title}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h5 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Key Discussion Points</h5>
                <ul className="grid grid-cols-1 gap-2">
                  {EXPERT_SLIDES[currentIndex].points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="hidden md:block relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={EXPERT_SLIDES[currentIndex].image} 
                alt="Expert presentation"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                  <p className="text-white text-sm font-medium">Presentation Slide #{currentIndex + 1}</p>
                  <p className="text-white/70 text-xs">Sustainability in Healthcare 2024</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={prev}
            className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-brand-primary transition-all shadow-sm"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={next}
            className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-brand-primary transition-all shadow-sm"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
