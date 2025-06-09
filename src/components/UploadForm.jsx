'use client';

import { useState, useEffect } from 'react';

export default function UploadForm() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    color: '',
    brand: '',
    size: '',
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [mounted, setMounted] = useState(false);

  // API URL
  const API_BASE_URL = 'http://localhost:3001/api';

  const categories = [
    { value: '', label: 'Pilih Kategori' },
    { value: 'tops', label: 'Atasan' },
    { value: 'bottoms', label: 'Bawahan' },
    { value: 'shoes', label: 'Sepatu' },
    { value: 'accessories', label: 'Aksesori' }
  ];

  // Fix hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadStatus({ type: 'error', message: 'Hanya file gambar yang diperbolehkan' });
        return;
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setUploadStatus({ type: 'error', message: 'Ukuran file maksimal 10MB' });
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setUploadStatus(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setUploadStatus({ type: 'error', message: 'Silakan pilih file gambar terlebih dahulu' });
      return;
    }

    if (!formData.name.trim() || !formData.category) {
      setUploadStatus({ type: 'error', message: 'Nama pakaian dan kategori harus diisi' });
      return;
    }

    setIsUploading(true);
    setUploadStatus({ type: 'info', message: 'Mengupload...' });
    
    const submitFormData = new FormData();
    submitFormData.append('image', selectedFile);
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        submitFormData.append(key, formData[key]);
      }
    });

    try {
      console.log('📤 Sending upload request to:', `${API_BASE_URL}/upload`);
      
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: submitFormData,
      });

      console.log('📡 Upload response status:', response.status);
      
      const result = await response.json();
      console.log('📥 Upload result:', result);

      if (response.ok && result.success) {
        setUploadStatus({ 
          type: 'success', 
          message: `✅ ${result.message || 'Pakaian berhasil diupload ke database!'}`
        });
        
        // Reset form
        setFormData({
          name: '',
          category: '',
          color: '',
          brand: '',
          size: '',
          description: ''
        });
        setSelectedFile(null);
        setPreviewUrl(null);
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setUploadStatus(null);
        }, 5000);
        
      } else {
        throw new Error(result.error || result.message || `Upload gagal dengan status ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Error uploading:', error);
      
      let errorMessage = 'Terjadi kesalahan saat upload';
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'Tidak dapat terhubung ke server. Pastikan backend berjalan di http://localhost:3001';
      } else {
        errorMessage = `Upload gagal: ${error.message}`;
      }
      
      setUploadStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsUploading(false);
    }
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="upload-form">
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="upload-form">
      {/* Status Message */}
      {uploadStatus && (
        <div className={`mb-4 p-4 rounded-md ${
          uploadStatus.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' :
          uploadStatus.type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' :
          'bg-blue-100 border border-blue-400 text-blue-700'
        }`}>
          {uploadStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Gambar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Gambar Pakaian *
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
            <div className="space-y-1 text-center">
              {previewUrl ? (
                <div className="mb-4">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="mx-auto h-32 w-32 object-cover rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    {selectedFile?.name} ({(selectedFile?.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              ) : (
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </label>
                <p className="pl-1 text-gray-500">atau drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF sampai 10MB</p>
            </div>
          </div>
        </div>

        {/* Grid untuk form fields */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Nama Pakaian */}
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Pakaian *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contoh: Kemeja Putih Formal"
              required
            />
          </div>

          {/* Kategori */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Kategori *
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value} className="text-gray-900">
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Warna */}
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
              Warna
            </label>
            <input
              type="text"
              name="color"
              id="color"
              value={formData.color}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contoh: Putih, Biru Navy"
            />
          </div>

          {/* Brand */}
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
              Brand/Merek
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contoh: Uniqlo, Zara"
            />
          </div>

          {/* Ukuran */}
          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
              Ukuran
            </label>
            <input
              type="text"
              name="size"
              id="size"
              value={formData.size}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contoh: S, M, L, XL"
            />
          </div>
        </div>

        {/* Deskripsi */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi (Opsional)
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tambahkan catatan tentang pakaian ini..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isUploading || !selectedFile}
            className="px-6 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isUploading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mengupload...
              </span>
            ) : (
              'Upload Pakaian'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}