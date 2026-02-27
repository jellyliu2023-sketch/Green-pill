import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
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
  ArrowRight
} from 'lucide-react';
import PharmacyMap from './components/PharmacyMap';
import ExpertInsights from './components/ExpertInsights';
import CampaignShowcase from './components/CampaignShowcase';
import { cn } from './lib/utils';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = [
    { id: 'map', label: 'Pharmacy Map', icon: MapIcon },
    { id: 'experts', label: 'Expert Insights', icon: Presentation },
    { id: 'campaign', label: 'Campaign Gallery', icon: ImageIcon },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[2000] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-[1000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="h-10 w-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                <Leaf className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">GreenPill</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-brand-primary",
                    activeSection === item.id ? "text-brand-primary" : "text-slate-600"
                  )}
                >
                  {item.label}
                </button>
              ))}
              <button className="bg-brand-secondary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-md">
                Get Involved
              </button>
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
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-slate-100 p-4 space-y-4"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-50 text-slate-600"
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </nav>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-secondary rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
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
                  onClick={() => scrollToSection('map')}
                  className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-white font-bold rounded-full hover:bg-emerald-400 transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  Locate Recycling Point <ArrowRight className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => scrollToSection('experts')}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-full border border-slate-200 hover:border-brand-primary transition-all shadow-sm"
                >
                  Learn from Experts
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <section id="map" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <PharmacyMap />
          </div>
        </section>

        {/* Expert Section */}
        <section id="experts" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ExpertInsights />
          </div>
        </section>

        {/* Campaign Section */}
        <section id="campaign" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CampaignShowcase />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20">
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
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-500">Quick Links</h4>
              <ul className="space-y-4">
                <li><button onClick={() => scrollToSection('map')} className="text-slate-400 hover:text-brand-primary transition-colors">Pharmacy Locator</button></li>
                <li><button onClick={() => scrollToSection('experts')} className="text-slate-400 hover:text-brand-primary transition-colors">Expert Insights</button></li>
                <li><button onClick={() => scrollToSection('campaign')} className="text-slate-400 hover:text-brand-primary transition-colors">Campaign Gallery</button></li>
                <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">Volunteer Program</a></li>
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
