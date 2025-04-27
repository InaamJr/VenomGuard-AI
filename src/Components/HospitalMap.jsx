import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for missing default marker icons in React/Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function HospitalMap({ location }) {
  const [userPosition, setUserPosition] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    if (location?.lat && location?.lng) {
      setUserPosition([location.lat, location.lng]);

      // Overpass API query to fetch hospitals near the given location (5km radius)
      const overpassUrl = "https://overpass-api.de/api/interpreter";
      const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:5000,${location.lat},${location.lng});
          way["amenity"="hospital"](around:5000,${location.lat},${location.lng});
          relation["amenity"="hospital"](around:5000,${location.lat},${location.lng});
        );
        out center;
      `;

      fetch(overpassUrl, {
        method: 'POST',
        body: query,
      })
        .then((res) => res.json())
        .then((data) => {
          const results = data.elements.map((el) => ({
            id: el.id,
            name: el.tags.name || "Unnamed Hospital",
            lat: el.lat || el.center?.lat,
            lng: el.lon || el.center?.lon,
          }));
          setHospitals(results);
        })
        .catch((err) => {
          console.error("Error fetching hospitals from Overpass:", err);
        });
    }
  }, [location]);

  return (
    <div className="w-full h-[500px]">
      {userPosition && (
        <MapContainer center={[location.lat, location.lng]} zoom={14} className="w-full h-[500px] rounded-lg z-10">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      
        {/* 🔵 User marker */}
        <Marker position={[location.lat, location.lng]}>
          <Popup>
            You are here
          </Popup>
        </Marker>
      
        {/* 🏥 Hospital markers */}
        {hospitals.map((h, idx) => (
          <Marker
            key={idx}
            position={[h.lat, h.lng]}
          >
            <Popup>
              <strong>{h.name}</strong><br />
              {h.address || 'Address not available'}
            </Popup>
          </Marker>
        ))}
      </MapContainer>      
      )}
    </div>
  );
}

HospitalMap.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};
