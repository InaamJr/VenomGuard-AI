import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import SpeciesInfoModal from './SpeciesInfoModal';
import EmergencyProtocolModal from './EmergencyProtocolModal';
import HospitalMap from './HospitalMap';


export default function IdentificationModal({ result, onClose }) {
  const [showSpeciesInfo, setShowSpeciesInfo] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showHospitals, setShowHospitals] = useState(false);
  
  if (!result) return null;

  const isVenomous = result.venomous === true || result.venomous === 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`relative w-full max-w-2xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-xl p-8 border-2 shadow-[0_10px_60px_-15px_rgba(0,0,0,0.3)] ${
            isVenomous ? 'border-red-500/40' : 'border-green-500/40'
          }`}
          style={{
            boxShadow: isVenomous 
              ? '0 0 40px -10px rgba(239,68,68,0.3)' 
              : '0 0 40px -10px rgba(52,211,153,0.3)'
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors duration-200 p-1.5 hover:bg-white/10 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
            <div className={`p-3 rounded-lg ${isVenomous ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
              {isVenomous ? (
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Identification Result
            </h2>
          </div>

          {/* Main Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-400">Species Name</p>
              <p className="text-lg font-semibold text-green-300">{result.species_name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-400">Confidence Level</p>
              <p className="text-lg font-semibold text-green-300">
                {parseFloat(result.confidence).toFixed(2)}%
                <span className="ml-2 text-sm text-green-500">({isVenomous ? 'Caution' : 'Safe'})</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-400">Venomous</p>
              <p className={`text-lg font-semibold ${isVenomous ? 'text-red-400' : 'text-green-400'}`}>
                {isVenomous ? 'Yes ⚠️' : 'No ✅'}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-400">Venom Potency</p>
              <div className="flex items-center gap-2">
                <div className="h-2 bg-white/10 rounded-full flex-1">
                  <div 
                    className="h-2 bg-red-400 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(parseInt(result.venom_potency), 100)}%` }}
                  />
                </div>
                <span className="text-red-400 text-sm font-medium">{result.venom_potency}</span>
              </div>
            </div>
          </div>

          {/* Symptoms & Actions */}
          <div className="space-y-6">
            {result.symptoms?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  Possible Symptoms
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {result.symptoms.map((s, i) => (
                    <div key={i} className="p-3 bg-white/5 rounded-lg flex items-center gap-2">
                      <div className="h-2 w-2 bg-red-400 rounded-full" />
                      <span className="text-gray-300 ml-2">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.actions?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Immediate Actions
                </h3>
                <div className="space-y-2">
                  {result.actions.map((a, i) => (
                    <div key={i} className="p-3 bg-white/5 rounded-lg flex items-center gap-3">
                      <div className="text-blue-400 font-bold">{i + 1}.</div>
                      <p className="text-gray-300">{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setShowSpeciesInfo(true)} 
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 transform hover:scale-[1.02]">
                View Species Info
            </button>
            <button 
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 transform hover:scale-[1.02]"
              onClick={() => setShowEmergencyModal(true)}
            >
              Emergency Protocol
            </button>
            <button
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 transform hover:scale-[1.02]"
              onClick={() => setShowHospitals(true)}
            >
              Find Nearby Hospitals
            </button>
          </div>
        </motion.div>

        {showSpeciesInfo && (
          <SpeciesInfoModal 
            data={result} 
            onClose={() => setShowSpeciesInfo(false)} 		
          />
        )}

        {showEmergencyModal && (
          <EmergencyProtocolModal 
            onClose={() => setShowEmergencyModal(false)} 
          />
        )}

        {showHospitals && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-[#0f172a] rounded-xl border border-green-500 shadow-xl p-6 max-w-4xl w-full relative">
              <button
                onClick={() => setShowHospitals(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                ✖
              </button>
              <h2 className="text-xl font-bold text-green-400 mb-4">Nearest Hospitals</h2>
              <HospitalMap location={{ lat: result.latitude, lng: result.longitude }} />
            </div>
          </div>
        )}

      </motion.div>
    </AnimatePresence>
  );
}

IdentificationModal.propTypes = {
  result: PropTypes.shape({
    species_name: PropTypes.string,
    confidence: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    venomous: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    venom_potency: PropTypes.string,
    symptoms: PropTypes.arrayOf(PropTypes.string),
    actions: PropTypes.arrayOf(PropTypes.string),
    result: PropTypes.object.isRequired,
    latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onClose: PropTypes.func.isRequired,
};
