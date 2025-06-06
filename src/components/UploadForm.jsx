'use client';

import { useState } from 'react';

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

  const categories = [
    { value: '', label: 'Pilih Kategori' },
    { value: 'tops', label: 'Atasan' },
    { value: 'bottoms', label: 'Bawahan' },
    { value: 'shoes', label: 'Sepatu' },
    { value: 'accessories', label: 'Aksesori' }
  ];

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
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Silakan pilih file gambar terlebih dahulu');
      return;
    }

    // Debug environment variables
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log('Raw API URL:', apiUrl);
    console.log('API URL type:', typeof apiUrl);
    console.log('API URL undefined?', apiUrl === undefined);
    
    // Fallback jika env variable tidak terbaca
    const finalApiUrl = apiUrl || 'http://localhost:5001/api';
    console.log('Final API URL:', finalApiUrl);
    console.log('Full upload URL:', `${finalApiUrl}/upload`);

    // Test backend connection first
    try {
      console.log('Testing backend connection...');
      const testResponse = await fetch(`${finalApiUrl}/test`);
      console.log('Backend test status:', testResponse.status);
      if (!testResponse.ok) {
        throw new Error(`Backend not responding. Status: ${testResponse.status}`);
      }
      const testData = await testResponse.json();
      console.log('Backend test response:', testData);
    } catch (testError) {
      console.error('Backend connection test failed:', testError);
      alert(`Backend tidak dapat diakses: ${testError.message}. Pastikan backend berjalan di http://localhost:5001`);
      return;
    }

    setIsUploading(true);
    
    const submitFormData = new FormData();
    submitFormData.append('image', selectedFile);
    Object.keys(formData).forEach(key => {
      submitFormData.append(key, formData[key]);
    });

    try {
      console.log('Sending upload request to:', `${finalApiUrl}/upload`);
      
      const response = await fetch(`${finalApiUrl}/upload`, {
        method: 'POST',
        body: submitFormData,
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('Upload result:', result);
        
        if (result.success) {
          alert('Pakaian berhasil diupload!');
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
        } else {
          throw new Error(result.message || 'Upload gagal');
        }
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Upload failed with status:', response.status, errorData);
        throw new Error(errorData.error || `Upload gagal dengan status ${response.status}`);
      }
    } catch (error) {
      console.error('Error uploading:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        alert('Tidak dapat terhubung ke server. Pastikan backend berjalan di http://localhost:5001');
      } else {
        alert(`Terjadi kesalahan saat upload: ${error.message}`);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-form">
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
                    className="mx-auto h-32 w-32 object-cover rounded-lg"
                  />
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
            disabled={isUploading}
            className="px-6 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isUploading ? 'Mengupload...' : 'Upload Pakaian'}
          </button>
        </div>
      </form>
    </div>
  );
}