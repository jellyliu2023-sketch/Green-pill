import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Search, MapPin, Navigation, Locate } from 'lucide-react';

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

// Component to handle map centering and zooming
function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const LOCATIONS = [
  // 浦东新区
  { district: "浦东新区", address: "浦东新区杨高中路2900号", lat: 31.2369, lng: 121.5583, type: "clinic" },
  // 黄浦区
  { district: "黄浦区", address: "江滨路258号丙", lat: 31.2224, lng: 121.4926, type: "clinic" },
  // 静安区
  { district: "静安区", address: "宝山路519号", lat: 31.2466, lng: 121.4621, type: "clinic" },
  { district: "静安区", address: "大统路185号", lat: 31.2492, lng: 121.4579, type: "clinic" },
  { district: "静安区", address: "余姚路742号", lat: 31.2364, lng: 121.4488, type: "clinic" },
  { district: "静安区", address: "万荣路73号", lat: 31.2806, lng: 121.4512, type: "clinic" },
  { district: "静安区", address: "共和新路1405号6幢一层", lat: 31.2567, lng: 121.4574, type: "clinic" },
  { district: "静安区", address: "康定路720-728号", lat: 31.2337, lng: 121.4469, type: "clinic" },
  { district: "静安区", address: "华山路2号", lat: 31.2238, lng: 121.4554, type: "clinic" },
  { district: "静安区", address: "汾西路414号", lat: 31.2801, lng: 121.4446, type: "clinic" },
  { district: "静安区", address: "大沽路501、503号", lat: 31.2316, lng: 121.4708, type: "clinic" },
  { district: "静安区", address: "平顺路115号底楼", lat: 31.2664, lng: 121.4691, type: "clinic" },
  { district: "静安区", address: "广中西路988号", lat: 31.2707, lng: 121.4425, type: "clinic" },
  { district: "静安区", address: "江宁路332号1层", lat: 31.2382, lng: 121.4559, type: "clinic" },
  { district: "静安区", address: "梅园路360号", lat: 31.2468, lng: 121.4612, type: "clinic" },
  { district: "静安区", address: "中山北路588号第2幢105室", lat: 31.2529, lng: 121.4496, type: "clinic" },
  // 徐汇区
  { district: "徐汇区", address: "永川路50号4楼风机房", lat: 31.1726, lng: 121.4387, type: "clinic" },
  // 长宁区
  { district: "长宁区", address: "天山支路201-209号（科技大厦）416室", lat: 31.2184, lng: 121.3978, type: "clinic" },
  // 普陀区
  { district: "普陀区", address: "常和路666号", lat: 31.2559, lng: 121.3897, type: "clinic" },
  // 虹口区
  { district: "虹口区", address: "辉河路62号", lat: 31.2841, lng: 121.4846, type: "clinic" },
  // 杨浦区
  { district: "杨浦区", address: "长阳路294号", lat: 31.2725, lng: 121.5356, type: "clinic" },
  { district: "杨浦区", address: "黄兴路217号B座", lat: 31.2833, lng: 121.5298, type: "clinic" },
  { district: "杨浦区", address: "兰州路681号", lat: 31.2614, lng: 121.5443, type: "clinic" },
  { district: "杨浦区", address: "江浦路1095号", lat: 31.2681, lng: 121.5234, type: "clinic" },
  { district: "杨浦区", address: "周家嘴路2809号", lat: 31.2794, lng: 121.5361, type: "clinic" },
  { district: "杨浦区", address: "抚顺路371号", lat: 31.2967, lng: 121.5212, type: "clinic" },
  { district: "杨浦区", address: "舒兰路90号", lat: 31.3006, lng: 121.5248, type: "clinic" },
  { district: "杨浦区", address: "靖宇东路38、46号", lat: 31.2932, lng: 121.5401, type: "clinic" },
  { district: "杨浦区", address: "国和路1360号", lat: 31.3118, lng: 121.5207, type: "clinic" },
  { district: "杨浦区", address: "国定路335号北楼4楼", lat: 31.3004, lng: 121.5079, type: "clinic" },
  { district: "杨浦区", address: "国帆路33号", lat: 31.3207, lng: 121.5304, type: "clinic" },
  { district: "杨浦区", address: "国和路451号", lat: 31.3042, lng: 121.5153, type: "clinic" },
  { district: "杨浦区", address: "双阳路297号一层（集中点）", lat: 31.2896, lng: 121.5256, type: "clinic" },
  // 宝山区
  { district: "宝山区", address: "漠河路600号A幢一层仓库", lat: 31.4042, lng: 121.4894, type: "clinic" },
  // 闵行区
  { district: "闵行区", address: "莘松路303号1号楼308室", lat: 31.1107, lng: 121.3812, type: "clinic" },
  // 嘉定区
  { district: "嘉定区", address: "塔城路496号", lat: 31.3836, lng: 121.2451, type: "clinic" },
  { district: "嘉定区", address: "德园路769号", lat: 31.3679, lng: 121.2608, type: "clinic" },
  // 金山区
  { district: "金山区", address: "杭州湾大道2525号", lat: 30.7472, lng: 121.3246, type: "clinic" },
  { district: "金山区", address: "漕廊公路18号", lat: 30.7784, lng: 121.3217, type: "clinic" },
  { district: "金山区", address: "朱枫公路9135号211室", lat: 30.8935, lng: 121.0954, type: "clinic" },
  { district: "金山区", address: "金廊公路149号", lat: 30.8216, lng: 121.3129, type: "clinic" },
  { district: "金山区", address: "板桥西路1380号", lat: 30.7428, lng: 121.3371, type: "clinic" },
  { district: "金山区", address: "十二村125号", lat: 30.7411, lng: 121.3553, type: "clinic" },
  { district: "金山区", address: "夏宁路818弄52号", lat: 30.7594, lng: 121.2792, type: "clinic" },
  { district: "金山区", address: "人民路305号", lat: 30.8942, lng: 121.1667, type: "clinic" },
  { district: "金山区", address: "建新大街136号", lat: 30.8129, lng: 121.3556, type: "clinic" },
  { district: "金山区", address: "龙皓路128号", lat: 30.7314, lng: 121.3495, type: "clinic" },
  { district: "金山区", address: "亭升路168号", lat: 30.8861, lng: 121.1376, type: "clinic" },
  { district: "金山区", address: "金张公路42号", lat: 30.8075, lng: 121.1972, type: "clinic" },
  // 松江区
  { district: "松江区", address: "乐都西路1508号1楼", lat: 31.0024, lng: 121.2157, type: "clinic" },
  // 青浦区
  { district: "青浦区", address: "青松路175号", lat: 31.1528, lng: 121.1246, type: "clinic" },
  // 奉贤区
  { district: "奉贤区", address: "解放东路58号", lat: 30.9197, lng: 121.4741, type: "clinic" },
  // 崇明区
  { district: "崇明区", address: "城桥镇东河沿30号", lat: 31.6221, lng: 121.3973, type: "clinic" },
  // 新建的区域
  { district: "闵行区", address: "上海好药师庆云中医诊所", lat: 31.1456, lng: 121.4312, type: "recycle" },
  { district: "闵行区", address: "上海上虹大药房鲁汇中医坐堂诊所", lat: 31.0889, lng: 121.4375, type: "recycle" },
  { district: "徐汇区", address: "上海宝杏堂中医诊所", lat: 31.2354, lng: 121.4762, type: "recycle" },
  { district: "闵行区", address: "蒋家桥社区家庭医生神作社区药房", lat: 31.1978, lng: 121.3589, type: "recycle" },
  { district: "闵行区", address: "汇丰大药房（梅陇店）", lat: 31.1204, lng: 121.4137, type: "recycle" },
  { district: "闵行区", address: "上农家庭医生诊所社区药房", lat: 31.1683, lng: 121.3901, type: "recycle" }
];

// 蓝色图标（默认）
const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// 红色图标
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function PharmacyMap() {
  const [mapCenter, setMapCenter] = useState<[number, number]>([31.2304, 121.4737]); // Shanghai Center
  const [zoom, setZoom] = useState(12);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter([latitude, longitude]);
        setUserLocation([latitude, longitude]);
        setZoom(15);
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Please check your permissions.");
        setIsLocating(false);
      }
    );
  };

  const handleGetDirections = (lat: number, lng: number, address: string) => {
    // Amap (高德地图) URI format
    const url = `https://uri.amap.com/marker?position=${lng},${lat}&name=${encodeURIComponent(address)}&src=medsafe&coordinate=wgs84&callnative=1`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Pharmacy Locator</h2>
          <p className="text-slate-500">Find authorized drug recycling points in Shanghai.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleLocateMe}
            disabled={isLocating}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-brand-primary transition-all shadow-sm disabled:opacity-50"
          >
            <Locate className={`h-4 w-4 ${isLocating ? 'animate-spin' : ''}`} />
            {isLocating ? 'Locating...' : 'Find Near Me'}
          </button>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search district or address..." 
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="relative h-[600px] w-full border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-slate-100 z-0">
        {/* @ts-ignore */}
        <MapContainer 
          center={mapCenter} 
          zoom={zoom} 
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <MapController center={mapCenter} zoom={zoom} />
          {/* Amap Tiles */}
          {/* @ts-ignore */}
          <TileLayer
            attribution='&copy; <a href="https://www.amap.com/">Amap</a>'
            url="https://wprd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}"
            subdomains="1234"
          />
          
          {userLocation && (
            <Marker position={userLocation} icon={new L.Icon({
              iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
              shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })}>
              <Popup>You are here</Popup>
            </Marker>
          )}

          {LOCATIONS.map((location, idx) => (
            <Marker 
              key={idx} 
              position={[location.lat, location.lng]}
              icon={location.type === "clinic" ? redIcon : blueIcon}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-brand-secondary">{location.address}</h3>
                  <p className="text-xs text-slate-600 mt-1">{location.district}</p>
                  <p className="text-[10px] uppercase tracking-wider font-bold mt-2 text-brand-primary">
                    {location.type === "clinic" ? "Clinic" : "Recycle Pharmacy"}
                  </p>
                  <button 
                    onClick={() => handleGetDirections(location.lat, location.lng, location.address)}
                    className="mt-2 w-full text-xs bg-brand-primary text-white px-2 py-1.5 rounded hover:bg-brand-secondary transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation className="h-3 w-3" />
                    Get Directions
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-200 shadow-xl max-w-[200px]">
          <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-slate-800">
            <MapPin className="h-4 w-4 text-brand-primary" />
            Map Legend
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#ff4b4b] shadow-[0_0_8px_rgba(255,75,75,0.5)]" />
              <span className="text-xs font-medium text-slate-600">Clinic</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#2b82cb] shadow-[0_0_8px_rgba(43,130,203,0.5)]" />
              <span className="text-xs font-medium text-slate-600">Recycle Pharmacy</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 leading-tight italic">
              Authorized drug recycling points across Shanghai.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
