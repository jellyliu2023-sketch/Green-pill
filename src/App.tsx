import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Map as MapIcon, 
  Presentation, 
  Image as ImageIcon, 
  Menu, 
  X,
  Github,
  Twitter,
  Mail,
  ArrowRight,
  Home as HomeIcon
} from 'lucide-react';
import PharmacyMap from './components/PharmacyMap';
import ExpertInsights from './components/ExpertInsights';
import CampaignShowcase from './components/CampaignShowcase';
import { cn } from './lib/utils';

type View = 'home' | 'map' | 'experts' | 'campaign';

export default function App() {
  const [activeView, setActiveView] = useState<View>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as View, label: 'Home', icon: HomeIcon },
    { id: 'map' as View, label: 'Pharmacy Map', icon: MapIcon },
    { id: 'experts' as View, label: 'Expert Insights', icon: Presentation },
    { id: 'campaign' as View, label: 'Campaign Gallery', icon: ImageIcon },
  ];

  const handleNavigate = (id: View) => {
    setActiveView(id);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-[1000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleNavigate('home')}
            >
              <div className="h-10 w-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                <Leaf className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">GreenPill</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={cn(
                    "text-sm font-medium transition-all px-4 py-2 rounded-lg flex items-center gap-2",
                    activeView === item.id 
                      ? "bg-brand-primary/10 text-brand-primary" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-brand-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={cn(
                      "flex items-center gap-3 w-full p-4 rounded-xl transition-all",
                      activeView === item.id 
                        ? "bg-brand-primary text-white" 
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {activeView === 'home' && (
              <section className="relative py-24 md:py-32 overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
                  <div className="absolute top-20 left-20 w-96 h-96 bg-brand-primary rounded-full blur-3xl" />
                  <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-secondary rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
                    National Drug Recycling Campaign
                  </span>
                  <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight">
                    Protect Our Planet, <br />
                    <span className="text-brand-primary font-serif italic">One Pill at a Time.</span>
                  </h1>
                  <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Expired medications are hazardous waste. Join thousands of citizens across China in our mission to safely recycle outdated drugs and prevent environmental pollution.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                      onClick={() => handleNavigate('map')}
                      className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-white font-bold rounded-full hover:bg-emerald-400 transition-all shadow-xl flex items-center justify-center gap-2"
                    >
                      Locate Recycling Point <ArrowRight className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleNavigate('experts')}
                      className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-full border border-slate-200 hover:border-brand-primary transition-all shadow-sm"
                    >
                      Learn from Experts
                    </button>
                  </div>
                </div>
              </section>
            )}

            {activeView === 'map' && (
              <section className="py-12 md:py-20 bg-white min-h-[calc(100vh-80px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                  <PharmacyMap />
                </div>
              </section>
            )}

            {activeView === 'experts' && (
              <section className="py-12 md:py-20 bg-slate-50 min-h-[calc(100vh-80px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <ExpertInsights />
                </div>
              </section>
            )}

            {activeView === 'campaign' && (
              <section className="py-12 md:py-20 bg-white min-h-[calc(100vh-80px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <CampaignShowcase />
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Leaf className="h-8 w-8 text-brand-primary" />
                <span className="text-2xl font-bold tracking-tight">GreenPill</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
                GreenPill is a non-profit initiative dedicated to establishing a sustainable, national network for pharmaceutical waste management in China.
              </p>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-primary transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-primary transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-500">Navigation</h4>
              <ul className="space-y-4">
                <li><button onClick={() => handleNavigate('map')} className="text-slate-400 hover:text-brand-primary transition-colors">Pharmacy Locator</button></li>
                <li><button onClick={() => handleNavigate('experts')} className="text-slate-400 hover:text-brand-primary transition-colors">Expert Insights</button></li>
                <li><button onClick={() => handleNavigate('campaign')} className="text-slate-400 hover:text-brand-primary transition-colors">Campaign Gallery</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-500">Contact</h4>
              <ul className="space-y-4 text-slate-400">
                <li>Beijing, Chaoyang District</li>
                <li>contact@greenpill.org.cn</li>
                <li>+86 10 8888 9999</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>&copy; 2024 GreenPill Initiative. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
