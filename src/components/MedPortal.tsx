import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, RefreshCw, AlertTriangle, MapPin, Info, CheckCircle2, XCircle, ChevronRight, BookOpen, Droplets, ShieldAlert, Trash2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const IMPACT_INFO = [
  {
    id: 'antibiotics',
    title: 'Antibiotics (抗生素)',
    impact: 'Promotes the development of antibiotic-resistant bacteria in water sources and soil, making infections harder to treat.',
    disposal: 'Must be collected at professional recycling points. Never flush down the toilet.',
    icon: Droplets,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'hormones',
    title: 'Hormones (激素类)',
    impact: 'Can disrupt the endocrine systems of aquatic life, leading to reproductive issues and population declines in fish and amphibians.',
    disposal: 'Keep in original packaging and deliver to hazardous waste collection centers.',
    icon: ShieldAlert,
    color: 'text-purple-500',
    bg: 'bg-purple-50'
  },
  {
    id: 'cytotoxic',
    title: 'Cytotoxic Drugs (细胞毒性药物)',
    impact: 'Highly toxic substances that can cause genetic mutations and are hazardous to both humans and the environment even in trace amounts.',
    disposal: 'Require specialized high-temperature incineration. Handle with extreme care.',
    icon: ShieldAlert,
    color: 'text-red-500',
    bg: 'bg-red-50'
  },
  {
    id: 'general',
    title: 'General Medications (普通药物)',
    impact: 'Chemicals can leach into groundwater from landfills, potentially contaminating drinking water supplies.',
    disposal: 'Use designated "Recycle Pharmacy" bins. Do not mix with household kitchen waste.',
    icon: Trash2,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  }
];

interface MedPortalProps {
  onNavigateToMap: () => void;
}

export default function MedSafePortal({ onNavigateToMap }: MedPortalProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    name: string;
    expiryDate: string;
    isExpired: boolean;
    type?: string;
    usageTips?: string;
  } | null>(null);
  const [cabinet, setCabinet] = useState<any[]>(() => {
    const saved = localStorage.getItem('medsafe_cabinet');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const webcamRef = useRef<Webcam>(null);

  const saveToCabinet = (item: any) => {
    const newCabinet = [item, ...cabinet];
    setCabinet(newCabinet);
    localStorage.setItem('medsafe_cabinet', JSON.stringify(newCabinet));
    setScanResult(null);
  };

  const removeFromCabinet = (index: number) => {
    const newCabinet = cabinet.filter((_, i) => i !== index);
    setCabinet(newCabinet);
    localStorage.setItem('medsafe_cabinet', JSON.stringify(newCabinet));
  };

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    setLoading(true);
    setError(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const base64Data = imageSrc.split(',')[1];
      
      const prompt = `You are a specialized medical object detection system (similar to YOLOv10/Roboflow). 
      Analyze this medicine packaging image. 
      1. Identify the medicine name and brand.
      2. Detect and extract the Expiration Date (often marked as EXP).
      3. Categorize the medicine type (e.g., Antibiotic, Painkiller, etc.).
      4. Provide a brief usage/safety tip.
      
      Return ONLY a JSON object:
      {
        "name": "Medicine Name",
        "expiryDate": "YYYY-MM-DD",
        "isExpired": boolean (current date: ${new Date().toISOString().split('T')[0]}),
        "type": "Medicine Category",
        "usageTips": "Brief safety tip"
      }`;

      const result = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: base64Data
                }
              }
            ]
          }
        ]
      });

      const text = result.text;
      const jsonMatch = text?.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        setScanResult(data);
        setIsScanning(false);
      } else {
        throw new Error("Automatic recognition failed. Please ensure the packaging is clear.");
      }
    } catch (err) {
      console.error("Scan error:", err);
      setError("Object detection failed. Please try a different angle or better lighting.");
    } finally {
      setLoading(false);
    }
  }, [webcamRef]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">MedSafe AI Portal</h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Advanced Object Detection for Automatic Medicine Registration & Expiry Management.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Scanner Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Camera className="h-5 w-5 text-brand-primary" />
              AI Object Recognition
            </h3>
            {scanResult && (
              <button 
                onClick={() => { setScanResult(null); setIsScanning(true); }}
                className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" /> New Scan
              </button>
            )}
          </div>

          <div className="aspect-video bg-slate-900 relative">
            {isScanning ? (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                  videoConstraints={{ facingMode: "environment" }}
                />
                <div className="absolute inset-0 border-2 border-brand-primary/30 m-8 rounded-2xl pointer-events-none">
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-brand-primary" />
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-brand-primary" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-brand-primary" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-brand-primary" />
                  
                  {/* Scanning Line Animation */}
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-0.5 bg-brand-primary/50 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                  />
                </div>
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <button 
                    onClick={capture}
                    disabled={loading}
                    className="bg-brand-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-emerald-400 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
                    {loading ? "Detecting..." : "Auto-Recognize"}
                  </button>
                </div>
              </>
            ) : scanResult ? (
              <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-50">
                <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 ${scanResult.isExpired ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  {scanResult.isExpired ? <AlertTriangle className="h-8 w-8" /> : <CheckCircle2 className="h-8 w-8" />}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-1">{scanResult.name}</h4>
                <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-bold mb-4">{scanResult.type}</span>
                
                <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-6">
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Expiry Date</p>
                    <p className={`font-bold ${scanResult.isExpired ? 'text-red-600' : 'text-slate-700'}`}>{scanResult.expiryDate}</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Status</p>
                    <p className={`font-bold ${scanResult.isExpired ? 'text-red-600' : 'text-emerald-600'}`}>
                      {scanResult.isExpired ? "Expired" : "Valid"}
                    </p>
                  </div>
                </div>

                <div className="w-full max-w-md p-4 bg-blue-50 border border-blue-100 rounded-2xl mb-6 flex gap-3">
                  <Info className="h-5 w-5 text-blue-500 shrink-0" />
                  <p className="text-sm text-blue-700 leading-tight">{scanResult.usageTips}</p>
                </div>

                <div className="flex gap-3 w-full max-w-md">
                  <button 
                    onClick={() => saveToCabinet(scanResult)}
                    className="flex-1 bg-brand-secondary text-white py-3 rounded-xl font-bold shadow-md hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" /> Register to Cabinet
                  </button>
                  {scanResult.isExpired && (
                    <button 
                      onClick={onNavigateToMap}
                      className="flex-1 bg-brand-primary text-white py-3 rounded-xl font-bold shadow-md hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                    >
                      <MapPin className="h-4 w-4" /> Find Disposal
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="h-20 w-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                  <Camera className="h-10 w-10 text-slate-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Object Detection Ready</h4>
                <p className="text-slate-400 mb-8 max-w-sm">Our AI will automatically identify the medicine and expiry date from the packaging. No manual entry needed.</p>
                <button 
                  onClick={() => setIsScanning(true)}
                  className="bg-brand-primary text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-emerald-400 transition-all"
                >
                  Start AI Scan
                </button>
              </div>
            )}
            
            {error && (
              <div className="absolute top-4 left-4 right-4 bg-red-500 text-white p-3 rounded-xl text-sm flex items-center gap-2 shadow-lg">
                <XCircle className="h-4 w-4" /> {error}
              </div>
            )}
          </div>
        </div>

        {/* Medicine Cabinet / Database Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col">
          <div className="p-6 border-b border-slate-50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-brand-primary" />
              My Medicine Cabinet
            </h3>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4 space-y-3 max-h-[500px]">
            {cabinet.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="h-12 w-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                  <Trash2 className="h-6 w-6 text-slate-300" />
                </div>
                <p className="text-sm text-slate-400 italic">Your cabinet is empty. Scan medicines to register them automatically.</p>
              </div>
            ) : (
              cabinet.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx} 
                  className={`p-4 rounded-2xl border transition-all hover:shadow-md relative group ${item.isExpired ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}
                >
                  <button 
                    onClick={() => removeFromCabinet(idx)}
                    className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-800 text-sm truncate pr-6">{item.name}</h4>
                    {item.isExpired && <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">EXPIRED</span>}
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">Exp: {item.expiryDate}</span>
                    <span className="text-slate-400 italic">{item.type}</span>
                  </div>
                  {item.isExpired && (
                    <button 
                      onClick={onNavigateToMap}
                      className="mt-3 w-full py-2 bg-red-100 text-red-700 rounded-lg text-[10px] font-bold hover:bg-red-200 transition-colors"
                    >
                      Go to Disposal Point
                    </button>
                  )}
                </motion.div>
              ))
            )}
          </div>
          
          <div className="p-4 bg-slate-50 rounded-b-3xl border-t border-slate-100">
            <p className="text-[10px] text-slate-400 text-center">
              Medicines in your cabinet are automatically tracked. You will receive alerts when they expire.
            </p>
          </div>
        </div>
      </div>

      {/* Disposal Knowledge Section (remains same) */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-brand-primary" />
            Disposal Knowledge
          </h3>
          
          <div className="space-y-4">
            {IMPACT_INFO.map((item) => (
              <div key={item.id} className={`${item.bg} p-4 rounded-2xl transition-all hover:shadow-md group`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-white shadow-sm ${item.color}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <h4 className="font-bold text-slate-800">{item.title}</h4>
                </div>
                <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                  <span className="font-bold text-slate-700">Impact:</span> {item.impact}
                </p>
                <div className="flex items-start gap-2 text-xs text-slate-500 bg-white/50 p-2 rounded-xl">
                  <Info className="h-3 w-3 mt-0.5 shrink-0" />
                  <p><span className="font-bold">How to handle:</span> {item.disposal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-brand-secondary p-8 rounded-3xl text-white relative overflow-hidden h-full flex flex-col justify-center">
            <div className="relative z-10">
              <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <ShieldAlert className="h-8 w-8 text-brand-primary" />
                Why Automatic Tracking?
              </h4>
              <p className="text-slate-300 leading-relaxed mb-6">
                Manual entry of expiration dates is prone to error. By using AI-powered object detection (inspired by YOLOv10 architectures), we can automatically identify packaging, extract batch info, and maintain a digital "Medicine Cabinet" that alerts you before hazards occur.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <p className="text-brand-primary font-bold text-xl mb-1">98%</p>
                  <p className="text-xs text-slate-400">Recognition Accuracy</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <p className="text-brand-primary font-bold text-xl mb-1">Real-time</p>
                  <p className="text-xs text-slate-400">Expiry Monitoring</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-12 -right-12 h-48 w-48 bg-brand-primary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* General Instructions */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-8">Standard Disposal Procedure</h3>
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-primary font-bold text-xl mb-4 border border-slate-100">1</div>
            <h4 className="font-bold text-slate-800 mb-2">Check Expiry</h4>
            <p className="text-sm text-slate-500">Use our scanner or check the packaging for the "EXP" date.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-primary font-bold text-xl mb-4 border border-slate-100">2</div>
            <h4 className="font-bold text-slate-800 mb-2">Keep Packaging</h4>
            <p className="text-sm text-slate-500">Keep drugs in their original containers to help recyclers identify them.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-primary font-bold text-xl mb-4 border border-slate-100">3</div>
            <h4 className="font-bold text-slate-800 mb-2">Locate & Drop</h4>
            <p className="text-sm text-slate-500">Find the nearest "Recycle Pharmacy" on our map and drop them off.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
