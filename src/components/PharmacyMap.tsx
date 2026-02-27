import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, MapPin } from 'lucide-react';

// Fix for default marker icons in Leaflet with React
// @ts-ignore
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// @ts-ignore
import markerIcon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const PHARMACIES = [
  { id: 1, name: "Beijing Tong Ren Tang", position: [39.9042, 116.4074], address: "No. 1 Dongdan North Street, Beijing" },
  { id: 2, name: "Guoda Drugstore", position: [31.2304, 121.4737], address: "No. 100 Nanjing Road, Shanghai" },
  { id: 3, name: "LBX Pharmacy", position: [28.2282, 112.9388], address: "No. 58 Furong Road, Changsha" },
  { id: 4, name: "Dashenlin Pharmaceutical", position: [23.1291, 113.2644], address: "No. 233 Dongfeng Road, Guangzhou" },
  { id: 5, name: "Yifeng Pharmacy", position: [30.5728, 104.0668], address: "No. 15 Renmin South Road, Chengdu" },
];

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 12);
  return null;
}

export default function PharmacyMap() {
  const [mapCenter, setMapCenter] = useState<[number, number]>([35.8617, 104.1954]); // Center of China
  const [zoom, setZoom] = useState(4);

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Pharmacy Locator</h2>
          <p className="text-slate-500">Find authorized drug recycling points near you.</p>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search city or pharmacy..." 
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all w-64"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
        </div>
      </div>

      <div className="relative flex-1 min-h-[500px] border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {/* @ts-ignore */}
        <MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom={true}>
          {/* @ts-ignore */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {PHARMACIES.map((pharmacy) => (
            <Marker key={pharmacy.id} position={pharmacy.position as [number, number]}>
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-brand-secondary">{pharmacy.name}</h3>
                  <p className="text-xs text-slate-600 mt-1">{pharmacy.address}</p>
                  <button className="mt-2 text-xs bg-brand-primary text-white px-2 py-1 rounded hover:bg-brand-secondary transition-colors">
                    Get Directions
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur p-4 rounded-xl border border-slate-200 shadow-lg max-w-xs">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-brand-primary" />
            Recycling Network
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            We have partnered with over 5,000 pharmacies across China to provide safe disposal bins for your outdated medications.
          </p>
        </div>
      </div>
    </div>
  );
}
