import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpeciesInfoModal({ data, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-[#0f172a] rounded-xl p-8 w-full max-w-3xl text-white border border-cyan-500 shadow-lg relative"
          initial={{ scale: 0.95, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 30 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            ✖
          </button>

          <h2 className="text-2xl font-bold text-cyan-400 mb-4">Species Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
                <p><strong>Scientific Name:</strong> {data.species_name}</p>
                <p><strong>Genus:</strong> {data.genus || 'Unknown'}</p>
                <p><strong>Family:</strong> {data.family || 'Unknown'}</p>
                <p><strong>Sub-Family:</strong> {data.sub_family?.toLowerCase() === 'unknown' ? 'Not available' : data.sub_family}</p>
            </div>
            <div>
                <p><strong>Country:</strong> {data.country?.toLowerCase() === 'unknown' ? 'Not available' : data.country}</p>
                <p><strong>Continent:</strong> {data.continent?.toLowerCase() === 'unknown' ? 'Not available' : data.continent}</p>
                <p><strong>Venomous:</strong> {data.venomous ? 'Yes ⚠️' : 'No ✅'}</p>
                <p><strong>Venom Potency:</strong> {data.venom_potency?.toLowerCase() === 'unknown' ? 'Not available' : data.venom_potency}</p>
            </div>
          </div>

          {data.symptoms?.length > 0 && (
            <>
              <h3 className="text-yellow-400 mt-6 mb-2">Symptoms</h3>
              <ul className="list-disc pl-5 text-gray-300">
                {data.symptoms.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </>
          )}

          {data.actions?.length > 0 && (
            <>
              <h3 className="text-red-400 mt-6 mb-2">Immediate Actions</h3>
              <ol className="list-decimal pl-5 text-gray-300">
                {data.actions.map((a, i) => <li key={i}>{a}</li>)}
              </ol>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

SpeciesInfoModal.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
