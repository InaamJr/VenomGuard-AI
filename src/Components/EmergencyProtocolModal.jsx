import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

export default function EmergencyProtocolModal({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-[#0f172a] rounded-xl p-8 w-full max-w-3xl text-white border border-red-500 shadow-xl relative"
          initial={{ scale: 0.95, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 30 }}
          transition={{ duration: 0.3 }}
        >
          {/* ❌ Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-400 hover:text-white text-xl"
          >
            ✖
          </button>

          {/* 🔴 Header */}
          <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
            🚨 Emergency Protocol
          </h2>

          {/* 🧪 Assessment Section */}
          <div className="mb-6 space-y-2 text-sm text-gray-300">
            <p className="font-semibold text-white">Step 1: Assess the Situation</p>
            <ul className="list-disc pl-6">
              <li>Was the person bitten?</li>
              <li>Are they showing symptoms like swelling, dizziness, or trouble breathing?</li>
              <li>Stay calm and do not panic.</li>
            </ul>
          </div>

          {/* 🚑 First-Aid Section */}
          <div className="mb-6 space-y-2 text-sm text-gray-300">
            <p className="font-semibold text-white">Step 2: First-Aid Actions</p>
            <ul className="list-disc pl-6">
              <li>Call local emergency services immediately.</li>
              <li>Keep the person still and calm to slow the spread of venom.</li>
              <li>Do not suck out venom or apply ice to the wound.</li>
              <li>Keep the affected limb at or slightly below heart level.</li>
              <li>Remove tight clothing/jewelry near the bite site.</li>
              <li>Get the person to the nearest hospital with anti-venom access.</li>
            </ul>
          </div>

          {/* 📞 Emergency Contact Placeholder */}
          <div className="text-sm text-gray-300">
            <p className="font-semibold text-white mb-1">Emergency Numbers (Sri Lanka):</p>
            <p>🚑 Ambulance: 1990</p>
            <p>📞 National Emergency: 118 / 119</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

EmergencyProtocolModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
