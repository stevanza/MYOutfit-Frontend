'use client';

import { useState, useEffect } from 'react';
import { getAllClothes, getClothesByCategory } from '@/lib/api';
import ClothingGrid from '@/components/ClothingGrid';

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'tops', name: 'Tops' },
  { id: 'bottoms', name: 'Bottoms' },
  { id: 'shoes', name: 'Shoes' },
  { id: 'accessories', name: 'Accessories' }
];

export default function WardrobePage() {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        setLoading(true);
        let data;
        
        if (activeCategory === 'all') {
          data = await getAllClothes();
        } else {
          data = await getClothesByCategory(activeCategory);
        }
        
        setClothes(data || []);
      } catch (err) {
        setError('Failed to load wardrobe. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClothes();
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="border-b border-gray-200 pb-5 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
              Your Wardrobe
            </h2>
            <p className="mt-2 max-w-4xl text-sm text-gray-500">
              Browse and manage your clothing collection
            </p>
          </div>
          <a 
            href="/upload" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Item
          </a>
        </div>
      </div>

      {/* Category filters - improved styling */}
      <div className="mb-8">
        <div className="sm:hidden">
          <label htmlFor="category-select" className="sr-only">
            Select a category
          </label>
          <select
            id="category-select"
            value={activeCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`${
                    activeCategory === category.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {category.name}
                  {activeCategory === category.id && clothes.length > 0 && (
                    <span className="ml-2 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                      {clothes.length}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      ) : clothes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No clothes found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding some items to your wardrobe.</p>
          <div className="mt-6">
            <a
              href="/upload"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Clothing
            </a>
          </div>
        </div>
      ) : (
        <ClothingGrid items={clothes} />
      )}
    </div>
  );
}