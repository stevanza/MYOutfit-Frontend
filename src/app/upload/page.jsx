'use client';

import { useState } from 'react';
import UploadForm from '@/components/UploadForm';
import DebugComponent from '@/components/DebugComponent';

export default function UploadPage() {
  const [showDebug, setShowDebug] = useState(true);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="border-b border-gray-200 pb-5 mb-6">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
              Upload Clothing
            </h2>
            <p className="mt-2 max-w-4xl text-sm text-gray-600">
              Add new items to your digital wardrobe. Upload images of your clothes to organize and create outfits.
            </p>
            
            <button
              onClick={() => setShowDebug(!showDebug)}
              className="mt-3 text-sm text-blue-600 hover:text-blue-800"
            >
              {showDebug ? 'Hide Debug Info' : 'Show Debug Info'}
            </button>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {/* Debug Component */}
            {showDebug && <DebugComponent />}
            
            {/* Container dengan styling untuk form yang lebih kontras */}
            <div className="space-y-6">
              <UploadForm />
            </div>
          </div>
        </div>
      </div>
      
      {/* Global CSS untuk memastikan form elements memiliki kontras yang baik */}
      <style jsx global>{`
        /* Form input styling untuk kontras yang lebih baik */
        .upload-form input[type="text"],
        .upload-form input[type="file"],
        .upload-form select,
        .upload-form textarea {
          color: #374151 !important; /* text-gray-700 */
          background-color: #ffffff !important;
          border: 2px solid #d1d5db !important; /* border-gray-300 */
        }
        
        .upload-form input[type="text"]:focus,
        .upload-form input[type="file"]:focus,
        .upload-form select:focus,
        .upload-form textarea:focus {
          border-color: #3b82f6 !important; /* border-blue-500 */
          outline: none !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        }
        
        /* Label styling */
        .upload-form label {
          color: #374151 !important; /* text-gray-700 */
          font-weight: 500 !important;
        }
        
        /* Placeholder text */
        .upload-form input::placeholder,
        .upload-form textarea::placeholder {
          color: #9ca3af !important; /* text-gray-400 */
        }
        
        /* Button styling untuk konsistensi */
        .upload-form button {
          font-weight: 500 !important;
        }
        
        /* File input khusus */
        .upload-form input[type="file"] {
          padding: 8px 12px !important;
        }
      `}</style>
    </div>
  );
}