import { motion } from 'framer-motion';
import PropTypes from 'prop-types';


const IdentificationResult = ({ result }) => {
  if (!result) return null;

  const isVenomous = result.venomous === true || result.venomous === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className={`mt-12 p-6 rounded-2xl border shadow-xl backdrop-blur-sm ${
        isVenomous ? 'border-red-500 bg-red-900/10' : 'border-green-500 bg-green-900/10'
      }`}
    >
      <div className="bg-[#0f172a] border border-green-500 p-6 rounded-xl mt-10 text-white">
        <h2 className="text-xl font-bold text-green-400 mb-4">🧬 Identification Result</h2>
        <p><strong>Species Name:</strong> <span className="text-green-300">{result.species_name}</span></p>
        <p><strong>Confidence:</strong> <span className="text-green-300">{result.confidence.toFixed(2)}%</span></p>
        <p><strong>Venomous:</strong> {result.venomous ? "Yes ⚠️" : "No 🐍"}</p>
        <p><strong>Venom Potency:</strong> <span className="text-red-400">{result.venom_potency}</span></p>

        {/* Symptoms */}
        {result.symptoms?.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mt-4 text-yellow-400">🩸 Possible Symptoms</h3>
            <ul className="list-disc list-inside text-gray-300">
              {result.symptoms.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </>
        )}

        {/* Actions */}
        {result.actions?.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mt-4 text-blue-400">🚑 Immediate Actions</h3>
            <ul className="list-disc list-inside text-gray-300">
              {result.actions.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </>
        )}

        <div className="mt-6 flex gap-4">
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-semibold">
            View Species Info
          </button>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold">
            Emergency Protocol
          </button>
        </div>
      </div>
    </motion.div>
  );
};

IdentificationResult.propTypes = {
  result: PropTypes.shape({
    species_name: PropTypes.string,
    confidence: PropTypes.number,
    venomous: PropTypes.bool,
    venom_potency: PropTypes.string,
    symptoms: PropTypes.arrayOf(PropTypes.string),
    actions: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};


export default IdentificationResult;
