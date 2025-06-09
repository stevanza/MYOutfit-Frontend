'use client';

import { useState, useEffect } from 'react';
import ClothingCard from '@/components/ClothingCard';
import ClothingListItem from '@/components/ClothingListItem';

export default function WardrobePage() {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // API Base URL
  const API_BASE_URL = 'http://localhost:3001/api';
  
  // Categories untuk filter
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'tops', name: 'Tops' },
    { id: 'bottoms', name: 'Bottoms' },
    { id: 'shoes', name: 'Shoes' },
    { id: 'accessories', name: 'Accessories' }
  ];

  // Fetch clothes from API
  const fetchClothes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Fetching clothes from:', `${API_BASE_URL}/clothes`);
      
      const response = await fetch(`${API_BASE_URL}/clothes`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📥 Clothes data received:', data);
      
      if (data.success && data.data) {
        setClothes(data.data);
      } else {
        setClothes([]);
      }
    } catch (err) {
      console.error('❌ Error fetching clothes:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch clothes on component mount
  useEffect(() => {
    fetchClothes();
  }, []);

  // Filter clothes berdasarkan kategori dan search
  const filteredClothes = clothes.filter(item => {
    // Category filter
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
    
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const searchMatch = 
      searchQuery === '' || 
      item.name.toLowerCase().includes(searchLower) ||
      (item.color && item.color.toLowerCase().includes(searchLower)) ||
      (item.brand && item.brand.toLowerCase().includes(searchLower)) ||
      item.category.toLowerCase().includes(searchLower);
    
    return categoryMatch && searchMatch;
  });
  
  // Toggle item selection
  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };
  
  // Handle bulk actions
  const handleBulkAction = async (action) => {
    console.log(`${action} items:`, selectedItems);
    
    if (action === 'delete') {
      // Confirm delete
      if (!confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) {
        return;
      }

      // Delete selected items
      for (const itemId of selectedItems) {
        try {
          const response = await fetch(`${API_BASE_URL}/clothes/${itemId}`, {
            method: 'DELETE'
          });
          
          if (response.ok) {
            console.log(`✅ Deleted item ${itemId}`);
          } else {
            console.error(`❌ Failed to delete item ${itemId}`);
          }
        } catch (error) {
          console.error(`❌ Error deleting item ${itemId}:`, error);
        }
      }
      
      // Refresh clothes list
      await fetchClothes();
      setSelectedItems([]);
    }
    
    if (action === 'outfit') {
      // Navigate to mix-match page with selected items
      const selectedClothes = clothes.filter(item => selectedItems.includes(item.id));
      console.log('Creating outfit with:', selectedClothes);
      // You can implement navigation to mix-match page here
      alert(`Creating outfit with ${selectedItems.length} items!`);
    }
  };

  // Handle item click
  const handleItemClick = (item) => {
    console.log('Item clicked:', item);
    // You can implement item detail view here
  };

  // Retry fetch on error
  const handleRetry = () => {
    fetchClothes();
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="border-b border-gray-200 pb-5 mb-6">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
                My Wardrobe
              </h2>
              <p className="mt-2 max-w-4xl text-sm text-gray-500">
                Loading your clothing items...
              </p>
            </div>
            
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <p className="mt-2 text-sm text-gray-600">Loading wardrobe...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="border-b border-gray-200 pb-5 mb-6">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
                My Wardrobe
              </h2>
            </div>
            
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-red-800">Failed to load wardrobe</h3>
                <p className="mt-1 text-sm text-red-600">
                  Error: {error}
                </p>
                <div className="mt-4 space-x-2">
                  <button
                    onClick={handleRetry}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Try Again
                  </button>
                  <a
                    href="/upload"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Upload Items
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="border-b border-gray-200 pb-5 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
                  My Wardrobe
                </h2>
                <p className="mt-2 max-w-4xl text-sm text-gray-500">
                  Browse and manage all your clothing items. You have {clothes.length} items in your wardrobe.
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={fetchClothes}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
                <a
                  href="/upload"
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Items
                </a>
              </div>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Filters and search */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* Category tabs */}
              <div className="flex space-x-1 overflow-x-auto pb-1 md:pb-0">
                {categories.map(category => {
                  const count = category.id === 'all' 
                    ? clothes.length 
                    : clothes.filter(item => item.category === category.id).length;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap ${
                        activeCategory === category.id 
                          ? 'bg-indigo-100 text-indigo-700' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category.name} ({count})
                    </button>
                  );
                })}
              </div>
              
              {/* Search and view options */}
              <div className="flex space-x-3">
                <div className="relative flex-1 min-w-[200px]">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="search"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                {/* View toggle */}
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                    title="Grid View"
                  >
                    <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                    title="List View"
                  >
                    <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Selected items actions */}
            {selectedItems.length > 0 && (
              <div className="mb-4 px-4 py-3 bg-gray-50 rounded-md flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">{selectedItems.length} items selected</span>
                  <button 
                    onClick={() => setSelectedItems([])}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleBulkAction('outfit')}
                    className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Create Outfit
                  </button>
                  <button 
                    onClick={() => handleBulkAction('delete')}
                    className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
            
            {/* Clothing items display */}
            {filteredClothes.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredClothes.map(item => (
                    <ClothingCard 
                      key={item.id} 
                      item={item} 
                      selectable={true}
                      selected={selectedItems.includes(item.id)}
                      onSelect={toggleItemSelection}
                      onClick={handleItemClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredClothes.map(item => (
                    <ClothingListItem
                      key={item.id}
                      item={item}
                      selectable={true}
                      selected={selectedItems.includes(item.id)}
                      onSelect={toggleItemSelection}
                      onClick={handleItemClick}
                    />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No items found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery ? "Try a different search term or filter." : "Add some clothes to your wardrobe."}
                </p>
                <div className="mt-6">
                  <a
                    href="/upload"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Upload New Item
                  </a>
                </div>
              </div>
            )}
            
            {/* Summary info */}
            {filteredClothes.length > 0 && (
              <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <span>
                    Showing <span className="font-medium">{filteredClothes.length}</span> of <span className="font-medium">{clothes.length}</span> items
                    {searchQuery && ` matching "${searchQuery}"`}
                    {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.name}`}
                  </span>
                </div>
                
                <div className="text-sm text-gray-500">
                  <span>Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}