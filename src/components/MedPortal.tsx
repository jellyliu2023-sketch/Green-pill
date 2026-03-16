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
    confidence: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    setLoading(true);
    setError(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const base64Data = imageSrc.split(',')[1];
      
      const prompt = `Analyze this medicine box image. Extract the following information in JSON format:
      {
        "name": "Name of the medicine",
        "expiryDate": "Expiration date found (YYYY-MM-DD or similar)",
        "isExpired": boolean (compare with current date: ${new Date().toISOString().split('T')[0]})
      }
      If you cannot find the info, return an error message in the JSON.`;

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
        setScanResult({
          ...data,
          confidence: 0.95
        });
        setIsScanning(false);
      } else {
        throw new Error("Could not parse scan results. Please try again with a clearer image.");
      }
    } catch (err) {
      console.error("Scan error:", err);
      setError("Failed to analyze image. Please ensure the expiry date is clearly visible.");
    } finally {
      setLoading(false);
    }
  }, [webcamRef]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">MedSafe Smart Portal</h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Scan your medicine box to check for expiration and learn how to dispose of it safely.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Scanner Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Camera className="h-5 w-5 text-brand-primary" />
              Drug Scanner
            </h3>
            {scanResult && (
              <button 
                onClick={() => { setScanResult(null); setIsScanning(true); }}
                className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" /> Rescan
              </button>
            )}
          </div>

          <div className="aspect-square bg-slate-900 relative">
            {isScanning ? (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                  videoConstraints={{ facingMode: "environment" }}
                />
                <div className="absolute inset-0 border-2 border-brand-primary/50 m-12 rounded-2xl pointer-events-none animate-pulse">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-brand-primary -mt-1 -ml-1" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-brand-primary -mt-1 -mr-1" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-brand-primary -mb-1 -ml-1" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-brand-primary -mb-1 -mr-1" />
                </div>
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <button 
                    onClick={capture}
                    disabled={loading}
                    className="bg-brand-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-emerald-400 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
                    {loading ? "Analyzing..." : "Capture & Check"}
                  </button>
                </div>
              </>
            ) : scanResult ? (
              <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-50">
                <div className={`h-20 w-20 rounded-full flex items-center justify-center mb-6 ${scanResult.isExpired ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  {scanResult.isExpired ? <AlertTriangle className="h-10 w-10" /> : <CheckCircle2 className="h-10 w-10" />}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">{scanResult.name}</h4>
                <p className="text-slate-500 mb-6">Expires: <span className="font-bold text-slate-700">{scanResult.expiryDate}</span></p>
                
                <div className={`w-full p-4 rounded-2xl mb-8 text-center ${scanResult.isExpired ? 'bg-red-50 border border-red-100' : 'bg-emerald-50 border border-emerald-100'}`}>
                  <p className={`font-bold ${scanResult.isExpired ? 'text-red-700' : 'text-emerald-700'}`}>
                    {scanResult.isExpired ? "This medication is EXPIRED." : "This medication is still SAFE to use."}
                  </p>
                </div>

                {scanResult.isExpired && (
                  <button 
                    onClick={onNavigateToMap}
                    className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                  >
                    <MapPin className="h-5 w-5" />
                    Find Nearest Recycling Point
                  </button>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="h-20 w-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                  <Camera className="h-10 w-10 text-slate-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Ready to Scan</h4>
                <p className="text-slate-400 mb-8">Position the medicine box so the name and expiry date are clearly visible.</p>
                <button 
                  onClick={() => setIsScanning(true)}
                  className="bg-brand-primary text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-emerald-400 transition-all"
                >
                  Start Scanning
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

        {/* Info Section */}
        <div className="space-y-4">
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
                  <p className="text-sm text-slate-600 mb-3 leading-relaxed">
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

          <div className="bg-brand-secondary p-6 rounded-3xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-brand-primary" />
                Safety First
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Never flush medications down the toilet or pour them into the sink. This is the primary cause of pharmaceutical contamination in our water systems.
              </p>
            </div>
            <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-brand-primary/10 rounded-full blur-2xl" />
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
