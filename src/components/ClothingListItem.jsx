'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ClothingListItem({
  item,
  selectable = false,
  selected = false,
  onSelect = () => {},
  onClick = () => {},
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
  
  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    onSelect(item.id);
  };
  
  const handleItemClick = () => {
    onClick(item);
  };

  if (!item) return null;

  const imageUrl = getImageUrl();
  
  return (
    <div 
      className={`bg-white p-3 rounded-md shadow-sm border ${selected ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'} flex items-center cursor-pointer hover:bg-gray-50 transition-all duration-200 ${className}`}
      onClick={handleItemClick}
    >
      {selectable && (
        <input 
          type="checkbox" 
          checked={selected}
          onChange={handleCheckboxChange}
          className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 mr-3"
        />
      )}
      
      <div 
        className="w-12 h-12 rounded relative flex items-center justify-center mr-3 overflow-hidden"
        style={!imageUrl || imageError ? { backgroundColor: getFallbackColor() } : {}}
      >
        {imageUrl && !imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-gray-400 text-xs">...</div>
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
          <span className="text-white text-xs font-bold">
            {item.name?.charAt(0)?.toUpperCase() || '?'}
          </span>
        )}
      </div>
      
      <div className="min-w-0 flex-1">
        <h3 className="font-medium truncate" title={item.name}>
          {item.name}
        </h3>
        <div className="flex items-center text-sm text-gray-500 space-x-2">
          {item.color && item.color !== 'unknown' && (
            <>
              <span className="capitalize truncate">{item.color}</span>
              <span className="text-gray-400">|</span>
            </>
          )}
          <span className="capitalize truncate">{item.category}</span>
          {item.brand && (
            <>
              <span className="text-gray-400">|</span>
              <span className="truncate">{item.brand}</span>
            </>
          )}
        </div>
      </div>
      
      <div className="ml-4 flex-shrink-0 hidden md:flex items-center space-x-2">
        {item.size && (
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
            {item.size}
          </span>
        )}
        
        {item.createdAt && (
          <span className="text-xs text-gray-400">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}