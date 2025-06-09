'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function MixMatchPage() {
  // State untuk pakaian dari API
  const [clothes, setClothes] = useState({
    tops: [],
    bottoms: [],
    shoes: [],
    accessories: []
  });
  
  // State untuk loading dan error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State untuk pakaian yang dipilih
  const [selectedOutfit, setSelectedOutfit] = useState({
    top: null,
    bottom: null,
    shoes: null,
    accessory: null
  });
  
  // State untuk kategori wardrobe yang aktif
  const [activeWardrobeCategory, setActiveWardrobeCategory] = useState('tops');
  
  // State untuk outfit yang disimpan
  const [savedOutfits, setSavedOutfits] = useState([]);

  // API Base URL
  const API_BASE_URL = 'http://localhost:3001/api';

  // Fetch clothes from API
  const fetchClothes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Fetching clothes for mix & match from:', `${API_BASE_URL}/clothes`);
      
      const response = await fetch(`${API_BASE_URL}/clothes`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📥 Clothes data received for mix & match:', data);
      
      if (data.success && data.data) {
        // Group clothes by category
        const groupedClothes = {
          tops: data.data.filter(item => item.category === 'tops'),
          bottoms: data.data.filter(item => item.category === 'bottoms'),
          shoes: data.data.filter(item => item.category === 'shoes'),
          accessories: data.data.filter(item => item.category === 'accessories')
        };
        
        setClothes(groupedClothes);
        
        // Set initial outfit if items are available
        setSelectedOutfit({
          top: groupedClothes.tops.length > 0 ? groupedClothes.tops[0] : null,
          bottom: groupedClothes.bottoms.length > 0 ? groupedClothes.bottoms[0] : null,
          shoes: groupedClothes.shoes.length > 0 ? groupedClothes.shoes[0] : null,
          accessory: groupedClothes.accessories.length > 0 ? groupedClothes.accessories[0] : null
        });
      } else {
        setClothes({ tops: [], bottoms: [], shoes: [], accessories: [] });
      }
    } catch (err) {
      console.error('❌ Error fetching clothes for mix & match:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch clothes on component mount
  useEffect(() => {
    fetchClothes();
  }, []);

  // Get image URL with proper handling
  const getImageUrl = (item) => {
    if (!item || !item.imageUrl) return null;
    
    if (item.imageUrl.startsWith('http')) {
      return item.imageUrl;
    }
    
    return `http://localhost:3001${item.imageUrl}`;
  };

  // Get fallback color
  const getFallbackColor = (item) => {
    if (!item) return '#6b7280';
    
    if (item.color && item.color !== 'unknown') {
      const colorMap = {
        'white': '#f9fafb',
        'black': '#1f2937',
        'red': '#ef4444',
        'blue': '#3b82f6',
        'green': '#10b981',
        'yellow': '#f59e0b',
        'purple': '#8b5cf6',
        'pink': '#ec4899',
        'gray': '#6b7280',
        'brown': '#92400e'
      };
      
      return colorMap[item.color.toLowerCase()] || item.color;
    }
    return '#6b7280';
  };

  // Handler untuk mengganti pakaian dari wardrobe
  const selectClothingFromWardrobe = (item) => {
    const outfitMap = {
      'tops': 'top',
      'bottoms': 'bottom',
      'shoes': 'shoes',
      'accessories': 'accessory'
    };

    const outfitKey = outfitMap[item.category];
    if (outfitKey) {
      setSelectedOutfit(prev => ({
        ...prev,
        [outfitKey]: item
      }));
    }
  };

  // Menyimpan outfit
  const saveOutfit = () => {
    const newOutfit = {
      id: Date.now(),
      name: `Outfit #${savedOutfits.length + 1}`,
      mood: 'casual',
      weather: 'normal',
      top: selectedOutfit.top,
      bottom: selectedOutfit.bottom,
      shoes: selectedOutfit.shoes,
      accessory: selectedOutfit.accessory,
      createdAt: new Date().toISOString()
    };
    
    setSavedOutfits(prev => [newOutfit, ...prev]);
    
    // Show success message
    alert(`✅ Outfit "${newOutfit.name}" saved successfully!`);
  };
  
  // Mengacak outfit
  const randomizeOutfit = () => {
    setSelectedOutfit({
      top: clothes.tops.length > 0 ? clothes.tops[Math.floor(Math.random() * clothes.tops.length)] : null,
      bottom: clothes.bottoms.length > 0 ? clothes.bottoms[Math.floor(Math.random() * clothes.bottoms.length)] : null,
      shoes: clothes.shoes.length > 0 ? clothes.shoes[Math.floor(Math.random() * clothes.shoes.length)] : null,
      accessory: clothes.accessories.length > 0 ? clothes.accessories[Math.floor(Math.random() * clothes.accessories.length)] : null
    });
  };

  // Retry fetch on error
  const handleRetry = () => {
    fetchClothes();
  };

  // Render clothing section with improved sizing
  const renderClothingSection = (sectionType, item, width, height, position = '') => {
    const imageUrl = getImageUrl(item);
    const fallbackColor = getFallbackColor(item);
    
    return (
      <div 
        className={`${position} cursor-pointer z-10`}
        style={{ width, height }}
      >
        {item ? (
          <div className="w-full h-full flex items-center justify-center relative">
            {imageUrl ? (
              <Image 
                src={imageUrl}
                alt={item.name}
                width={width}
                height={height}
                style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.style.backgroundColor = fallbackColor;
                }}
                unoptimized={process.env.NODE_ENV === 'development'}
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center text-white font-bold text-2xl rounded-lg"
                style={{ backgroundColor: fallbackColor }}
              >
                {item.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full border border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
            <span className="text-xs text-gray-500 capitalize">Add {sectionType}</span>
          </div>
        )}
      </div>
    );
  };

  // Render wardrobe item
  const renderWardrobeItem = (item) => {
    const imageUrl = getImageUrl(item);
    const fallbackColor = getFallbackColor(item);
    const isSelected = 
      (item.category === 'tops' && selectedOutfit.top?.id === item.id) ||
      (item.category === 'bottoms' && selectedOutfit.bottom?.id === item.id) ||
      (item.category === 'shoes' && selectedOutfit.shoes?.id === item.id) ||
      (item.category === 'accessories' && selectedOutfit.accessory?.id === item.id);

    return (
      <div 
        key={item.id}
        className={`relative cursor-pointer rounded-lg border-2 transition-all ${
          isSelected 
            ? 'border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50' 
            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
        }`}
        onClick={() => selectClothingFromWardrobe(item)}
      >
        <div className="aspect-square p-2">
          {imageUrl ? (
            <Image 
              src={imageUrl}
              alt={item.name}
              width={80}
              height={80}
              className="w-full h-full object-cover rounded-md"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.style.backgroundColor = fallbackColor;
              }}
              unoptimized={process.env.NODE_ENV === 'development'}
            />
          ) : (
            <div 
              className="w-full h-full flex items-center justify-center text-white font-bold text-lg rounded-md"
              style={{ backgroundColor: fallbackColor }}
            >
              {item.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="p-2 pt-0">
          <p className="text-xs font-medium truncate" title={item.name}>
            {item.name}
          </p>
          {item.color && item.color !== 'unknown' && (
            <p className="text-xs text-gray-500 capitalize">
              {item.color}
            </p>
          )}
        </div>
        {isSelected && (
          <div className="absolute top-1 right-1 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="border-b border-gray-200 pb-5 mb-6">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
                Mix & Match
              </h2>
              <p className="mt-2 max-w-4xl text-sm text-gray-500">
                Loading your clothing items...
              </p>
            </div>
            
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <p className="mt-2 text-sm text-gray-600">Loading wardrobe for mix & match...</p>
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
                Mix & Match
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

  // Check if we have enough clothes
  const totalItems = clothes.tops.length + clothes.bottoms.length + clothes.shoes.length + clothes.accessories.length;
  
  if (totalItems === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="border-b border-gray-200 pb-5 mb-6">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
                Mix & Match
              </h2>
              <p className="mt-2 max-w-4xl text-sm text-gray-500">
                Create outfit combinations from your wardrobe.
              </p>
            </div>
            
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Your wardrobe is empty</h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload some clothing items first to start creating outfits.
              </p>
              <div className="mt-6">
                <a
                  href="/upload"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Upload Clothing Items
                </a>
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
                  Mix & Match
                </h2>
                <p className="mt-2 max-w-4xl text-sm text-gray-500">
                  Click any item from your wardrobe to create your perfect outfit combination.
                </p>
              </div>
              <button
                onClick={fetchClothes}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
          
          {/* Main Layout with Outfit Canvas and Wardrobe Sidebar */}
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Side - Outfit Canvas */}
            <div className="flex-1">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Your Outfit</h3>
                
                {/* Enhanced Canvas with Better Sizing */}
                <div className="relative mx-auto w-[450px] h-[650px] mb-8 bg-white rounded-2xl shadow-lg flex flex-col items-center border border-gray-200">

                  {/* Top Section - Made Larger */}
                  {renderClothingSection('top', selectedOutfit.top, 320, 220, 'absolute w-[320px] h-[220px] left-1/2 -translate-x-1/2 top-[50px]')}

                  {/* Bottom Section - Adjusted positioning */}
                  {renderClothingSection('bottom', selectedOutfit.bottom, 340, 300, 'absolute w-[340px] h-[300px] left-1/2 -translate-x-1/2 top-[240px]')}

                  {/* Shoes Section - Better positioning */}
                  {renderClothingSection('shoes', selectedOutfit.shoes, 220, 130, 'absolute w-[220px] h-[130px] left-1/2 -translate-x-1/2 top-[500px]')}

                  {/* Accessory Section - Repositioned */}
                  {renderClothingSection('accessory', selectedOutfit.accessory, 110, 110, 'absolute w-[110px] h-[110px] right-8 top-[180px]')}
                  
                </div>
                
                {/* Current Outfit Info */}
                <div className="text-center mb-6">
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {selectedOutfit.top && (
                      <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        👕 {selectedOutfit.top.name}
                      </span>
                    )}
                    {selectedOutfit.bottom && (
                      <span className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                        👖 {selectedOutfit.bottom.name}
                      </span>
                    )}
                    {selectedOutfit.shoes && (
                      <span className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                        👟 {selectedOutfit.shoes.name}
                      </span>
                    )}
                    {selectedOutfit.accessory && (
                      <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                        💎 {selectedOutfit.accessory.name}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    Available: {clothes.tops.length} tops, {clothes.bottoms.length} bottoms, {clothes.shoes.length} shoes, {clothes.accessories.length} accessories
                  </div>
                </div>
                
                {/* Outfit Controls */}
                <div className="flex justify-center space-x-6">
                  <button
                    onClick={randomizeOutfit}
                    className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 shadow-sm text-lg font-medium transition-colors"
                  >
                    🎲 Randomize
                  </button>
                  <button
                    onClick={saveOutfit}
                    className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm text-lg"
                    disabled={!selectedOutfit.top && !selectedOutfit.bottom}
                  >
                    💾 Save Outfit
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Wardrobe Sidebar */}
            <div className="w-full lg:w-80">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Wardrobe</h3>
                  
                  {/* Category Tabs */}
                  <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                    {[
                      { key: 'tops', label: 'Tops', icon: '👕', count: clothes.tops.length },
                      { key: 'bottoms', label: 'Bottoms', icon: '👖', count: clothes.bottoms.length },
                      { key: 'shoes', label: 'Shoes', icon: '👟', count: clothes.shoes.length },
                      { key: 'accessories', label: 'Access.', icon: '💎', count: clothes.accessories.length }
                    ].map(category => (
                      <button
                        key={category.key}
                        onClick={() => setActiveWardrobeCategory(category.key)}
                        className={`flex-1 text-xs font-medium py-2 px-2 rounded-md transition-colors ${
                          activeWardrobeCategory === category.key
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <div>{category.icon}</div>
                        <div className="mt-1">{category.label}</div>
                        <div className="text-xs opacity-75">({category.count})</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Wardrobe Items */}
                <div className="p-4 max-h-96 overflow-y-auto">
                  {clothes[activeWardrobeCategory].length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">
                        {activeWardrobeCategory === 'tops' ? '👕' :
                         activeWardrobeCategory === 'bottoms' ? '👖' :
                         activeWardrobeCategory === 'shoes' ? '👟' : '💎'}
                      </div>
                      <p className="text-sm text-gray-500">
                        No {activeWardrobeCategory} available
                      </p>
                      <a
                        href="/upload"
                        className="inline-flex items-center mt-2 text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        Upload some items
                      </a>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {clothes[activeWardrobeCategory].map(item => renderWardrobeItem(item))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Saved Outfits Section */}
          {savedOutfits.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Saved Outfits ({savedOutfits.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {savedOutfits.map(outfit => (
                  <div key={outfit.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 className="font-medium mb-2 text-lg">{outfit.name}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {/* Top */}
                      {outfit.top && (
                        <div className="bg-gray-50 p-2 rounded">
                          <div className="w-full h-16 rounded overflow-hidden relative">
                            {getImageUrl(outfit.top) ? (
                              <Image 
                                src={getImageUrl(outfit.top)}
                                alt={outfit.top.name}
                                fill
                                sizes="64px"
                                style={{ objectFit: 'contain' }}
                                unoptimized={process.env.NODE_ENV === 'development'}
                              />
                            ) : (
                              <div 
                                className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                                style={{ backgroundColor: getFallbackColor(outfit.top) }}
                              >
                                {outfit.top.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-center truncate mt-1">{outfit.top.name}</p>
                        </div>
                      )}
                      
                      {/* Bottom */}
                      {outfit.bottom && (
                        <div className="bg-gray-50 p-2 rounded">
                          <div className="w-full h-16 rounded overflow-hidden relative">
                            {getImageUrl(outfit.bottom) ? (
                              <Image 
                                src={getImageUrl(outfit.bottom)}
                                alt={outfit.bottom.name}
                                fill
                                sizes="64px"
                                style={{ objectFit: 'contain' }}
                                unoptimized={process.env.NODE_ENV === 'development'}
                              />
                            ) : (
                              <div 
                                className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                                style={{ backgroundColor: getFallbackColor(outfit.bottom) }}
                              >
                                {outfit.bottom.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-center truncate mt-1">{outfit.bottom.name}</p>
                        </div>
                      )}
                      
                      {/* Shoes */}
                      {outfit.shoes && (
                        <div className="bg-gray-50 p-2 rounded">
                          <div className="w-full h-16 rounded overflow-hidden relative">
                            {getImageUrl(outfit.shoes) ? (
                              <Image 
                                src={getImageUrl(outfit.shoes)}
                                alt={outfit.shoes.name}
                                fill
                                sizes="64px"
                                style={{ objectFit: 'contain' }}
                                unoptimized={process.env.NODE_ENV === 'development'}
                              />
                            ) : (
                              <div 
                                className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                                style={{ backgroundColor: getFallbackColor(outfit.shoes) }}
                              >
                                {outfit.shoes.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-center truncate mt-1">{outfit.shoes.name}</p>
                        </div>
                      )}
                      
                      {/* Accessory */}
                      {outfit.accessory && (
                        <div className="bg-gray-50 p-2 rounded">
                          <div className="w-full h-16 rounded overflow-hidden relative">
                            {getImageUrl(outfit.accessory) ? (
                              <Image 
                                src={getImageUrl(outfit.accessory)}
                                alt={outfit.accessory.name}
                                fill
                                sizes="64px"
                                style={{ objectFit: 'contain' }}
                                unoptimized={process.env.NODE_ENV === 'development'}
                              />
                            ) : (
                              <div 
                                className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                                style={{ backgroundColor: getFallbackColor(outfit.accessory) }}
                              >
                                {outfit.accessory.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-center truncate mt-1">{outfit.accessory.name}</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Item count and date */}
                    <div className="mt-2 text-xs text-gray-500 text-center">
                      {Object.values(outfit).filter(item => item && typeof item === 'object' && item.name).length} items
                      {outfit.createdAt && (
                        <span className="ml-2">• {new Date(outfit.createdAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}