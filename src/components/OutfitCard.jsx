'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function OutfitCard({ outfit, onSave }) {
  const [isSaved, setIsSaved] = useState(false);
  const [imageError, setImageError] = useState({});
  
  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(outfit, !isSaved);
  };

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

  // Handle image error
  const handleImageError = (itemType) => {
    setImageError(prev => ({ ...prev, [itemType]: true }));
  };

  // Render clothing item with robust image handling
  const renderClothingItem = (item, itemType, label) => {
    if (!item) return null;

    const imageUrl = getImageUrl(item);
    const hasError = imageError[itemType];
    
    return (
      <div className="bg-gray-50 rounded p-2">
        <div 
          className="relative h-40 mb-2 flex items-center justify-center overflow-hidden rounded"
          style={hasError || !imageUrl ? { backgroundColor: getFallbackColor(item) } : {}}
        >
          {imageUrl && !hasError ? (
            <Image 
              src={imageUrl}
              alt={item.name}
              fill
              style={{ objectFit: 'contain' }}
              onError={() => handleImageError(itemType)}
              sizes="(max-width: 768px) 50vw, 200px"
              unoptimized={process.env.NODE_ENV === 'development'}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-white">
              <div className="text-2xl font-bold mb-1">
                {item.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-xs opacity-75">
                {hasError ? 'No image' : label}
              </div>
            </div>
          )}
        </div>
        <p className="text-xs text-center font-medium truncate" title={item.name}>
          {item.name}
        </p>
        {item.brand && (
          <p className="text-xs text-center text-gray-500 truncate">
            {item.brand}
          </p>
        )}
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium truncate">
            {outfit.name || 'Perfect Combo'}
          </h3>
          <button 
            onClick={handleSave}
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
            title={isSaved ? 'Remove from saved' : 'Save outfit'}
          >
            {isSaved ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 4a2 2 0 00-2 2v14l7-3 7 3V6a2 2 0 00-2-2H5z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            )}
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          {outfit.description || `Perfect for ${outfit.occasion || outfit.mood || 'any occasion'}`}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {/* Top */}
          {renderClothingItem(outfit.top, 'top', 'Top')}
          
          {/* Bottom */}
          {renderClothingItem(outfit.bottom, 'bottom', 'Bottom')}
          
          {/* Shoes */}
          {renderClothingItem(outfit.shoes, 'shoes', 'Shoes')}
          
          {/* Accessories */}
          {renderClothingItem(outfit.accessory, 'accessory', 'Accessory')}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-wrap gap-2">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              outfit.mood === 'casual' ? 'bg-green-100 text-green-800' :
              outfit.mood === 'formal' ? 'bg-blue-100 text-blue-800' :
              outfit.mood === 'sporty' ? 'bg-orange-100 text-orange-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {outfit.mood || 'versatile'}
            </span>
            
            {outfit.weather && (
              <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-800">
                {outfit.weather === 'rainy' ? '🌧️' :
                 outfit.weather === 'sunny' ? '☀️' :
                 outfit.weather === 'cold' ? '❄️' : '🌤️'} {outfit.weather}
              </span>
            )}
          </div>

          {/* Item count */}
          <div className="text-xs text-gray-500">
            {[outfit.top, outfit.bottom, outfit.shoes, outfit.accessory].filter(Boolean).length} items
          </div>
        </div>

        {/* Creation date if available */}
        {outfit.createdAt && (
          <div className="mt-3 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Created {new Date(outfit.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}