import React from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import iconRetinaUrl from '../assets/images/marker-icon-2x.png'
import iconUrl from '../assets/images/marker-icon.png'
import shadowUrl from '../assets/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl
});

const Map = ({ center }) => {
  const mapCenter = center || [51, -0.09];
  const zoomLevel = center ? 4 : 2;

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoomLevel}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {center && <Marker position={mapCenter} />}
    </MapContainer>
  );
};

export default Map;

// import React from 'react';
// import L from 'leaflet';
// import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// // Saya asumsikan Anda sudah memiliki ikon di lokasi yang tepat
// import iconRetinaUrl from '../assets/images/marker-icon-2x.png';
// import iconUrl from '../assets/images/marker-icon.png';
// import shadowUrl from '../assets/images/marker-shadow.png';

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: iconRetinaUrl,
//   iconUrl: iconUrl,
//   shadowUrl: shadowUrl
// });

// const Map = ({ center }) => {
//   const mapCenter = center || [-2.5489, 118.0149]; // Pusat peta di Indonesia
//   const zoomLevel = center ? 4 : 5;

//   // Daftar 20 kota di Indonesia dengan koordinatnya
//   const cities = [
//     { name: 'Jakarta', lat: -6.2088, lng: 106.8456 },
//     { name: 'Bandung', lat: -6.9175, lng: 107.6191 },
//     { name: 'Surabaya', lat: -7.2575, lng: 112.7521 },
//     { name: 'Medan', lat: 3.5897, lng: 98.6738 },
//     { name: 'Bekasi', lat: -6.2349, lng: 106.9896 },
//     { name: 'Semarang', lat: -7.0051, lng: 110.4381 },
//     { name: 'Tangerang', lat: -6.1785, lng: 106.6304 },
//     { name: 'Depok', lat: -6.4025, lng: 106.7942 },
//     { name: 'Palembang', lat: -2.9761, lng: 104.7754 },
//     { name: 'South Tangerang', lat: -6.2886, lng: 106.7209 },
//     { name: 'Makassar', lat: -5.1477, lng: 119.4327 },
//     { name: 'Batam', lat: 1.1301, lng: 104.0529 },
//     { name: 'Pekanbaru', lat: 0.5333, lng: 101.4470 },
//     { name: 'Bogor', lat: -6.5950, lng: 106.8162 },
//     { name: 'Padang', lat: -0.9471, lng: 100.4172 },
//     { name: 'Malang', lat: -7.9666, lng: 112.6326 },
//     { name: 'Denpasar', lat: -8.6705, lng: 115.2132 },
//     { name: 'Bandar Lampung', lat: -5.4461, lng: 105.2644 },
//     { name: 'Yogyakarta', lat: -7.7975, lng: 110.3708 },
//     { name: 'Cimahi', lat: -6.8844, lng: 107.5413 }
//   ];

//   return (
//     <MapContainer
//       center={mapCenter}
//       zoom={zoomLevel}
//       scrollWheelZoom={false}
//       className="h-[35vh] rounded-lg"
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {cities.map((city, index) => (
//         <Marker key={index} position={[city.lat, city.lng]}>
//           <Popup>
//             {city.name} <br /> Lat: {city.lat}, Lng: {city.lng}
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default Map;

