'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ClothingCard({ 
  item, 
  selectable = false,
  selected = false,
  onSelect = () => {},
  onClick = () => {}, 
  draggable = false,
  className = ''
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };
  
  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    onSelect(item.id);
  };
  
  const handleItemClick = () => {
    onClick(item);
  };

  const getImageUrl = () => {
    try {
      if (!item?.imageUrl || typeof item.imageUrl !== 'string') return null;
      
      const url = item.imageUrl.trim();
      if (!url || url === 'undefined' || url === 'null') return null;
      
      if (url.startsWith('http')) {
        return url;
      }
      
      const fullUrl = url.startsWith('/') ? `http://localhost:3001${url}` : `http://localhost:3001/${url}`;
      
      // Test if it's a valid URL
      new URL(fullUrl);
      return fullUrl;
    } catch {
      return null;
    }
  };

  const getFallbackColor = () => {
    const colors = {
      'white': '#f9fafb', 'black': '#1f2937', 'red': '#ef4444', 
      'blue': '#3b82f6', 'green': '#10b981', 'yellow': '#f59e0b'
    };
    return colors[item?.color?.toLowerCase()] || '#6b7280';
  };

  if (!item) return null;

  const imageUrl = getImageUrl();

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border ${selected ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'} overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer ${className}`}
      onClick={handleItemClick}
    >
      <div className="relative">
        <div 
          className="h-48 w-full flex items-center justify-center relative overflow-hidden"
          style={!imageUrl || imageError ? { backgroundColor: getFallbackColor() } : {}}
        >
          {imageUrl && !imageError ? (
            <>
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="text-gray-400 text-sm">Loading...</div>
                </div>
              )}
              <Image 
                src={imageUrl} 
                alt={item.name}
                fill
                style={{ objectFit: 'cover' }}
                onError={handleImageError}
                onLoad={handleImageLoad}
                unoptimized
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-white">
              <div className="text-3xl font-bold mb-2">
                {item.name?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <div className="text-xs opacity-75">
                {imageError ? 'Image unavailable' : 'No image'}
              </div>
            </div>
          )}
        </div>
        
        {selectable && (
          <div className="absolute top-2 right-2 z-10">
            <input 
              type="checkbox" 
              checked={selected}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 bg-white shadow-sm"
            />
          </div>
        )}

        {selected && (
          <div className="absolute inset-0 bg-indigo-600 bg-opacity-10 pointer-events-none"></div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 truncate" title={item.name}>
          {item.name}
        </h3>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 capitalize">
              {item.category}
            </span>
            
            {item.color && item.color !== 'unknown' && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 capitalize">
                {item.color}
              </span>
            )}
          </div>
        </div>

        <div className="mt-3 space-y-1">
          {item.brand && (
            <p className="text-xs text-gray-500">
              <span className="font-medium">Brand:</span> {item.brand}
            </p>
          )}
          
          {item.size && (
            <p className="text-xs text-gray-500">
              <span className="font-medium">Size:</span> {item.size}
            </p>
          )}
        </div>

        {item.createdAt && (
          <div className="mt-3 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Added {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}