import React, { useState, useRef } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';

const ImageUpload = ({ onImageUpload, currentImage }) => {
  const [previewUrl, setPreviewUrl] = useState(currentImage);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && isValidFile(file)) {
      processFile(file);
    }
  };

  // Check if file is valid
  const isValidFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      alert('Please upload only JPEG, PNG, or WebP images');
      return false;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      return false;
    }

    return true;
  };

  // Process the selected file
  const processFile = (file) => {
    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);

    // Pass the file data to parent component
    onImageUpload(file);
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handle drag & drop events
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
    if (file && isValidFile(file)) {
      processFile(file);
    }
  };

  // Remove the currently selected image
  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageUpload(null);
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2">
        Product Image
      </label>
      
      {previewUrl ? (
        <div className="relative w-full h-60 border border-gray-300 rounded-lg overflow-hidden">
          <img 
            src={previewUrl} 
            alt="Product preview" 
            className="w-full h-full object-contain"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
            aria-label="Remove image"
          >
            <FiX className="text-gray-700 text-xl" />
          </button>
        </div>
      ) : (
        <div
          className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={handleButtonClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FiUpload className="text-gray-400 text-3xl mb-2" />
          <p className="text-gray-500 mb-1">Drag & drop your image here</p>
          <p className="text-gray-400 text-sm">or</p>
          <button
            type="button"
            className="mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Browse Files
          </button>
          <p className="mt-2 text-gray-400 text-xs">
            JPEG, PNG, or WebP (max 5MB)
          </p>
        </div>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload; 