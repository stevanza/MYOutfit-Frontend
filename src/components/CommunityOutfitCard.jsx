'use client';

import Image from 'next/image';
import { useState } from 'react';
import UserAvatar from './UserAvatar';

export default function CommunityOutfitCard({ outfit }) {
  const [isLiked, setIsLiked] = useState(outfit.isLiked || false);
  const [isSaved, setIsSaved] = useState(outfit.isSaved || false);
  const [likesCount, setLikesCount] = useState(outfit.likes);
  const [imageError, setImageError] = useState({});

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  // Get image URL with proper handling
  const getImageUrl = (item) => {
    if (!item || !item.image) return null;
    
    if (item.image.startsWith('http')) {
      return item.image;
    }
    
    // For local images, use direct path
    return item.image;
  };

  // Get fallback color - always use white background for no image
  const getFallbackColor = (item) => {
    return '#ffffff'; // Always use white background for consistency
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
          className="relative h-32 mb-2 flex items-center justify-center overflow-hidden rounded border border-gray-200"
          style={hasError || !imageUrl ? { backgroundColor: getFallbackColor(item) } : {}}
        >
          {imageUrl && !hasError ? (
            <Image 
              src={imageUrl}
              alt={item.name}
              fill
              style={{ objectFit: 'contain' }}
              onError={() => handleImageError(itemType)}
              sizes="(max-width: 768px) 50vw, 150px"
              unoptimized={process.env.NODE_ENV === 'development'}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              {/* Icon based on item type */}
              {itemType === 'top' && (
                <svg className="w-8 h-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
              {itemType === 'bottom' && (
                <svg className="w-8 h-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
              {itemType === 'shoes' && (
                <svg className="w-8 h-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {itemType === 'accessory' && (
                <svg className="w-8 h-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              )}
              <div className="text-xs opacity-60 capitalize">
                {label}
              </div>
            </div>
          )}
        </div>
        <p className="text-xs text-center font-medium truncate" title={item.name}>
          {item.name}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      {/* User Info */}
      <div className="p-4 border-b border-gray-100">
        <UserAvatar 
          user={outfit.user} 
          showFollowButton={true}
          timestamp={outfit.createdAt}
        />
      </div>

      {/* Outfit Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium truncate">
            {outfit.title || 'Perfect Combo'}
          </h3>
          <button 
            onClick={handleSave}
            className={`transition-colors ${
              isSaved
                ? 'text-indigo-600 hover:text-indigo-800'
                : 'text-gray-500 hover:text-indigo-600'
            }`}
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
        
        {outfit.description && (
          <p className="text-sm text-gray-600 mb-4">
            {outfit.description}
          </p>
        )}
        
        {/* Outfit Items Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {/* Top */}
          {renderClothingItem(outfit.items?.top, 'top', 'Top')}
          
          {/* Bottom */}
          {renderClothingItem(outfit.items?.bottom, 'bottom', 'Bottom')}
          
          {/* Shoes */}
          {renderClothingItem(outfit.items?.shoes, 'shoes', 'Shoes')}
          
          {/* Accessories */}
          {renderClothingItem(outfit.items?.accessory, 'accessory', 'Accessory')}
        </div>
        
        {/* Tags */}
        {outfit.tags && outfit.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {outfit.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
            {outfit.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{outfit.tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        {/* Mood and Weather Badges */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center flex-wrap gap-2">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              outfit.occasion === 'Casual' ? 'bg-green-100 text-green-800' :
              outfit.occasion === 'Business' ? 'bg-blue-100 text-blue-800' :
              outfit.occasion === 'Sports' ? 'bg-orange-100 text-orange-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {outfit.occasion || 'versatile'}
            </span>
            
            {outfit.weather && (
              <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-800">
                🌤️ {outfit.weather}°C
              </span>
            )}
          </div>

          {/* Item count */}
          <div className="text-xs text-gray-500">
            {Object.values(outfit.items || {}).filter(Boolean).length} items
          </div>
        </div>

        {/* Rating */}
        {outfit.rating && (
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(outfit.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-gray-600">{outfit.rating}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <svg
                className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
                fill={isLiked ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-sm font-medium">{likesCount}</span>
            </button>

            {/* Comment Button */}
            <button className="flex items-center space-x-1 text-gray-500 hover:text-indigo-500 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-sm font-medium">{outfit.comments || 0}</span>
            </button>
          </div>

          {/* Creation date if available */}
          {outfit.createdAt && (
            <div className="text-xs text-gray-400">
              {new Date(outfit.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}