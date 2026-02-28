import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, FileText, Users, FlaskConical, HelpCircle, Truck, ExternalLink, Presentation } from 'lucide-react';

const CAMPAIGN_ACTIVITIES = [
  {
    id: 1,
    type: "Featured Presentation",
    title: "Campaign Strategy & Overview",
    speaker: "GreenPill Project Lead",
    description: "A comprehensive overview of our national drug recycling strategy, mission objectives, and long-term impact goals.",
    details: [
      "Strategic roadmap for 2024-2025",
      "Key performance indicators and metrics",
      "Partnership expansion plans"
    ],
    pptLink: "https://drive.google.com/file/d/1n4A5e-e80XijDDj1wtRt67vFA1RnVW4b/view?usp=drive_link",
    icon: Presentation,
    image: "https://picsum.photos/seed/strategy/800/600"
  },
  {
    id: 2,
    type: "Lecture & Workshop",
    title: "Hospital Disposal Protocols",
    speaker: "Invited Medical Doctor",
    description: "An in-depth introduction to how hospitals manage expired medications and hazardous pharmaceutical waste.",
    details: [
      "Proper disposal procedures in clinical settings",
      "Hands-on guidance for waste categorization",
      "Safety protocols for handling medical chemicals"
    ],
    pptLink: "https://s5.aconvert.com/convert/p3r68-cdx67/6h05t-felco.pdf",
    icon: Users,
    image: "https://picsum.photos/seed/hospital-disposal/800/600"
  },
  {
    id: 3,
    type: "Industry Perspective",
    title: "Hazards & Household Best Practices",
    speaker: "Pharmaceutical Company Manager",
    description: "Understanding the environmental hazards of improper disposal and learning the best practices for safe household drug management.",
    details: [
      "Environmental impact of pharmaceutical leaching",
      "Safe storage and disposal at home",
      "Corporate responsibility in drug lifecycle"
    ],
    pptLink: "https://s2.aconvert.com/convert/p3r68-cdx67/alsux-qaqdm.pdf",
    icon: FileText,
    image: "https://picsum.photos/seed/pharma-manager/800/600"
  },
  {
    id: 4,
    type: "Interactive Experiment",
    title: "Experimental Comparison",
    speaker: "GreenPill Research Team",
    description: "A self-designed interactive activity comparing expired and unexpired medications to demonstrate chemical degradation.",
    details: [
      "Visual and chemical stability tests",
      "Interactive audience participation",
      "Real-time data observation"
    ],
    pptLink: null,
    icon: FlaskConical,
    image: "https://picsum.photos/seed/experiment-lab/800/600"
  },
  {
    id: 5,
    type: "Engagement",
    title: "Interactive Q&A Session",
    speaker: "Campaign Facilitators",
    description: "A dynamic Q&A session designed to address common myths and provide direct answers to audience concerns.",
    details: [
      "Addressing disposal misconceptions",
      "Community-driven health discussions",
      "Direct expert feedback loop"
    ],
    pptLink: "https://s25.aconvert.com/convert/p3r68-cdx67/ccw7a-i2iyy.pdf",
    icon: HelpCircle,
    image: "https://picsum.photos/seed/qa-session/800/600"
  },
  {
    id: 6,
    type: "Action",
    title: "Community Collection Day",
    speaker: "Local Volunteers",
    description: "Our flagship expired medicine take-back activity, bringing the community together for collective environmental action.",
    details: [
      "Safe collection of household medications",
      "On-site sorting and documentation",
      "Direct transport to disposal facilities"
    ],
    pptLink: null,
    icon: Truck,
    image: "https://picsum.photos/seed/collection-day/800/600"
  }
];

export default function ExpertInsights() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % CAMPAIGN_ACTIVITIES.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + CAMPAIGN_ACTIVITIES.length) % CAMPAIGN_ACTIVITIES.length);

  const current = CAMPAIGN_ACTIVITIES[currentIndex];

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4 italic">Campaign Activities & Expert Lectures</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Explore our onsite campaign journey, featuring expert lectures, interactive experiments, and community action.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="grid lg:grid-cols-5 gap-0 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
          >
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1 bg-slate-50 border-r border-slate-100 p-6 hidden lg:block">
              <div className="space-y-2">
                {CAMPAIGN_ACTIVITIES.map((activity, idx) => (
                  <button
                    key={activity.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 ${
                      currentIndex === idx 
                        ? "bg-brand-primary text-white shadow-md" 
                        : "text-slate-500 hover:bg-white hover:text-brand-primary"
                    }`}
                  >
                    <activity.icon className={`h-4 w-4 ${currentIndex === idx ? "text-white" : "text-brand-primary"}`} />
                    <span className="text-xs font-bold uppercase tracking-tight truncate">{activity.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-4 grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-widest">
                      {current.type}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-400 text-xs font-medium">Activity {currentIndex + 1} of {CAMPAIGN_ACTIVITIES.length}</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">{current.title}</h3>
                  <p className="text-brand-primary font-medium mb-6 flex items-center gap-2">
                    <Users className="h-4 w-4" /> {current.speaker}
                  </p>
                  
                  <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                    {current.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Key Highlights</h4>
                    <ul className="grid grid-cols-1 gap-3">
                      {current.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-700">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0" />
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-100">
                  {current.pptLink && (
                    <a 
                      href={current.pptLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-brand-secondary text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                    >
                      <FileText className="h-5 w-5" /> View PPT Presentation <ExternalLink className="h-4 w-4 opacity-50" />
                    </a>
                  )}
                  <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:border-brand-primary transition-all">
                    Activity Photos
                  </button>
                </div>
              </div>

              <div className="relative h-64 md:h-auto overflow-hidden">
                <img 
                  src={current.image} 
                  alt={current.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-brand-primary flex items-center justify-center">
                      <current.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Onsite Campaign</p>
                      <p className="text-sm font-bold">Live Workshop 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile Controls */}
        <div className="flex justify-center gap-4 mt-8 lg:hidden">
          <button 
            onClick={prev}
            className="p-4 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={next}
            className="p-4 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
