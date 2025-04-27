import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import LocationInput from './LocationInput';
import IdentificationModal from './IdentificationModal';



const IdentificationPage = () => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null); 
  const [formKey, setFormKey] = useState(Date.now()); // for forcing re-render
  

  const navigate = useNavigate(); // Add navigation hook


  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!image || !location) {
      alert("Please upload an image and select location.");
      return;
    }

    if (!image || !location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
      alert("Location is not properly selected.");
      return;
    }       
  
    const userId = 1; // Using default guest user for emergency access
    
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image); // from ImageUpload
      formData.append("user_id", userId);
      formData.append("latitude", location.lat);
      formData.append("longitude", location.lng);

  
      const response = await fetch("http://localhost:5000/api/identify", {
        method: "POST",
        body: formData,
      });      
  
      const data = await response.json();
  
      if (response.ok) {
        setResult(data);
      }
    } catch (err) {
      console.error("❌ API Error:", err);
      const errorMsg = err?.response?.data?.message || err.message || "Something went wrong.";
      alert(`❌ Error: ${errorMsg}`);
    }
  };

  useEffect(() => {
    if (location) {
      console.log("📍 Location object before sending:", location);
    }
  }, [location]);  

  const handleCloseResult = () => {
    setResult(null);        // close modal
    setImage(null);         // reset uploaded image
    setLocation(null);      // reset selected location
    setIsLoading(false);    // Stop the "Analyzing..." spinner
    setFormKey(Date.now()); // triggers re-render of inputs
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 pt-8"
      >
        <button
          onClick={() => navigate(-1)} // Go back to previous page
          className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </button>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          {/* Page Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-4"
            >
              Species Identification
            </motion.h1>
            <p className="text-gray-400 text-lg">
              Upload an image of the species and provide location details for accurate identification
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Identifying as <strong>Guest</strong> — no login required.
            </p>
          </div>

          {/* Identification Form */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image Upload Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Step 1: Upload Image
                </h3>
                <ImageUpload key={formKey} onImageUpload={(file) => setImage(file)} />
              </div>

              {/* Location Input Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Step 2: Provide Location
                </h3>
                <LocationInput key={formKey} onLocationSelect={(loc) => setLocation(loc)} />
              </div>
            </div>

            {/* Submit Button */}
            <motion.div
              className="mt-12 text-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={handleSubmit}
                disabled={!image || !location || isLoading}
                className={`px-12 py-4 rounded-xl font-semibold transition-all ${
                  (!image || !location) ? 'bg-gray-800 cursor-not-allowed' : 
                  'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </div>
                ) : (
                  'Identify Species'
                )}
              </button>
            </motion.div>

            {/* Result Section */}
            {result && (
              <IdentificationModal
                result={result}
                onClose={handleCloseResult}
              />
            )}
          </div>

          {/* Safety Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-4 bg-red-900/20 border border-red-800/50 rounded-xl text-center"
          >
            <p className="text-sm text-red-400">
              ⚠️ If you&apos;ve been bitten, seek immediate medical attention even while using this system
            </p>
            <Link 
              to="/emergency" 
              className="inline-block mt-3 text-red-300 hover:text-red-200 text-sm underline"
            >
              View Emergency Protocol →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default IdentificationPage;