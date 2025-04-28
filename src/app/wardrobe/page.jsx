'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function WardrobePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // Data dummy pakaian dengan path gambar lokal yang BENAR
  // Path harus relatif terhadap folder public, bukan path absolut di sistem file
  // PERHATIKAN: Menggunakan forward slash (/) bukan backslash (\)
  const dummyClothes = [
    { 
      id: 101, 
      name: "Blue T-Shirt", 
      color: "blue", 
      category: "tops", 
      tags: ["casual", "summer"],
      imagePath: "/images/wardrobe/tops/WhatsApp_Image_2025-04-28_at_09.34.42_3eb1c4c9-removebg-preview.png" 
    },
    { 
      id: 102, 
      name: "White Dress Shirt", 
      color: "white", 
      category: "tops", 
      tags: ["formal", "work"],
      imagePath: "/images/wardrobe/tops/WhatsApp_Image_2025-04-28_at_09.34.42_9debb3a0-removebg-preview.png" 
    },
    { 
      id: 103, 
      name: "Black Polo", 
      color: "black", 
      category: "tops", 
      tags: ["casual", "versatile"],
      imagePath: "/images/wardrobe/tops/WhatsApp_Image_2025-04-28_at_09.34.42_cc3a3b36-removebg-preview.png" 
    },
    { 
      id: 201, 
      name: "Blue Jeans", 
      color: "blue", 
      category: "bottoms", 
      tags: ["casual", "versatile"],
      imagePath: "/images/wardrobe/bottoms/WhatsApp_Image_2025-04-28_at_09.30.39_fd4b41de-removebg-preview.png" 
    },
    { 
      id: 301, 
      name: "White Sneakers", 
      color: "white", 
      category: "shoes", 
      tags: ["casual", "sport"],
      imagePath: "/images/wardrobe/shoes/WhatsApp_Image_2025-04-28_at_09.39.31_2ee66dc1-removebg-preview.png" 
    },
    { 
      id: 302, 
      name: "Brown Loafers", 
      color: "brown", 
      category: "shoes", 
      tags: ["casual", "formal"],
      imagePath: "/images/wardrobe/shoes/WhatsApp_Image_2025-04-28_at_09.39.48_c893a5ff-removebg-preview.png" 
    },
  ];
  
  // Categories untuk filter
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'tops', name: 'Tops' },
    { id: 'bottoms', name: 'Bottoms' },
    { id: 'shoes', name: 'Shoes' },
    { id: 'accessories', name: 'Accessories' }
  ];
  
  // Filter clothes berdasarkan kategori dan search
  const filteredClothes = dummyClothes.filter(item => {
    // Category filter
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
    
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const searchMatch = 
      searchQuery === '' || 
      item.name.toLowerCase().includes(searchLower) ||
      item.color.toLowerCase().includes(searchLower) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchLower));
    
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
  const handleBulkAction = (action) => {
    console.log(`${action} items:`, selectedItems);
    
    // Clear selection after action
    if (action === 'delete' || action === 'archive') {
      setSelectedItems([]);
    }
  };
  
  // Render clothing item
  const renderClothingItem = (item) => {
    const isSelected = selectedItems.includes(item.id);
    
    // Handle image error (fallback to color block)
    const handleImageError = (e) => {
      // Hide the image and show background color instead
      e.target.style.display = 'none';
      e.target.parentNode.style.backgroundColor = item.color === 'white' ? '#f9fafb' : item.color;
      
      // Add a letter in the center
      const letterSpan = document.createElement('span');
      letterSpan.className = 'text-white text-xl font-bold';
      letterSpan.innerText = item.name.charAt(0);
      e.target.parentNode.appendChild(letterSpan);
    };
    
    // Grid view
    if (viewMode === 'grid') {
      return (
        <div 
          key={item.id} 
          className={`bg-white rounded-lg shadow-sm border ${isSelected ? 'border-indigo-500' : 'border-gray-200'} overflow-hidden`}
        >
          <div className="relative">
            <div className="h-48 w-full flex items-center justify-center relative">
              <Image 
                src={item.imagePath} 
                alt={item.name}
                fill
                style={{ objectFit: 'cover' }}
                onError={handleImageError}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            
            {/* Checkbox for selection */}
            <div className="absolute top-2 right-2 z-10">
              <input 
                type="checkbox" 
                checked={isSelected}
                onChange={() => toggleItemSelection(item.id)}
                className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{item.color}</p>
            
            <div className="mt-3 flex flex-wrap gap-1">
              {item.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    // List view
    return (
      <div 
        key={item.id} 
        className={`bg-white p-3 rounded-md shadow-sm border ${isSelected ? 'border-indigo-500' : 'border-gray-200'} flex items-center`}
      >
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={() => toggleItemSelection(item.id)}
          className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 mr-3"
        />
        
        <div className="w-12 h-12 rounded relative flex items-center justify-center mr-3 overflow-hidden">
          <Image 
            src={item.imagePath} 
            alt={item.name}
            fill
            style={{ objectFit: 'cover' }}
            onError={handleImageError}
            sizes="48px"
          />
        </div>
        
        <div className="min-w-0 flex-1">
          <h3 className="font-medium truncate">{item.name}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <span className="capitalize truncate mr-2">{item.color}</span>
            <span className="text-gray-400">|</span>
            <span className="ml-2 capitalize truncate">{item.category}</span>
          </div>
        </div>
        
        <div className="ml-4 flex-shrink-0 hidden md:flex flex-wrap gap-1">
          {item.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="border-b border-gray-200 pb-5 mb-6">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
          My Wardrobe
        </h2>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Browse and manage all your clothing items. Filter by category, search, and select items to create outfits.
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        {/* Filters and search */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Category tabs */}
          <div className="flex space-x-1 overflow-x-auto pb-1 md:pb-0">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap ${
                  activeCategory === category.id 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
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
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5" 
            : "space-y-3"
          }>
            {filteredClothes.map(item => renderClothingItem(item))}
          </div>
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
        
        {/* Pagination (for demo purposes) */}
        {filteredClothes.length > 0 && (
          <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="flex items-center text-sm text-gray-500">
              <span>Showing <span className="font-medium">{filteredClothes.length}</span> of <span className="font-medium">{dummyClothes.length}</span> items</span>
            </div>
            
            <div className="flex space-x-1">
              <button 
                className="px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Previous
              </button>
              <button 
                className="px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}