'use client';

import { useState } from 'react';
import UploadForm from '@/components/UploadForm';

export default function UploadPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="border-b border-gray-200 pb-5 mb-6">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
          Upload Clothing
        </h2>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Add new items to your digital wardrobe. Upload images of your clothes to organize and create outfits.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <UploadForm />
      </div>
    </div>
  );
}