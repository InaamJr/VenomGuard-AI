import PropTypes from 'prop-types';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ImageUpload({ onImageUpload }) {
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImage(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleImage(file);
  };

  const handleImage = (file) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Unsupported file format. Use JPEG/PNG.');
    }
  };

  // Add prop validation at the bottom
  ImageUpload.propTypes = {
    onImageUpload: PropTypes.func.isRequired
  };

  return (
    <motion.div
      className={`border-2 border-dashed p-8 rounded-xl text-center transition-colors ${
        isDragging ? 'border-green-400 bg-gray-800' : 'border-gray-700'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="space-y-4">
        <div className="text-gray-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-2">Drag & drop image here</p>
          <p className="text-sm text-gray-500">or</p>
        </div>
        
        <label className="inline-block px-6 py-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
          <span className="text-green-400">Browse Files</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
        
        {image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6"
          >
            <h3 className="text-gray-300 mb-2">Selected Image</h3>
            <img
              src={image}
              alt="Upload preview"
              className="mx-auto max-h-64 object-contain rounded-lg"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}