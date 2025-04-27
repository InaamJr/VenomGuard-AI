import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function LocationInput({ onLocationSelect }) {
  const [location, setLocation] = useState('');
  const [useCurrent, setUseCurrent] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(null);

  useEffect(() => {
    if (useCurrent && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
  
          // Prevent redundant updates
          if (
            !currentCoords ||
            currentCoords.lat !== latitude ||
            currentCoords.lng !== longitude
          ) {
            const newCoords = { lat: latitude, lng: longitude };
            setCurrentCoords(newCoords);
            onLocationSelect(newCoords);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Location access denied. Please enter manually.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }
  }, [useCurrent, currentCoords, onLocationSelect]);  

  // Add prop validation
  LocationInput.propTypes = {
    onLocationSelect: PropTypes.func.isRequired
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setUseCurrent(!useCurrent)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            useCurrent ? 'bg-green-500' : 'bg-gray-800'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {useCurrent ? 'Using Current Location' : 'Use Current Location'}
        </button>
        <span className="text-gray-400">or</span>
      </div>

      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location manually"
        className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-green-400 outline-none"
      />
    </div>
  );
}
