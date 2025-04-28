'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * ClothingListItem Component
 * List view item for clothing items
 * 
 * @param {Object} props
 * @param {Object} props.item - Clothing item data
 * @param {boolean} props.selectable - Whether the item is selectable
 * @param {boolean} props.selected - Whether the item is selected
 * @param {Function} props.onSelect - Callback for selection change
 * @param {Function} props.onClick - Callback for item click
 * @param {string} props.className - Additional CSS classes
 */
export default function ClothingListItem({
  item,
  selectable = false,
  selected = false,
  onSelect = () => {},
  onClick = () => {},
  className = ''
}) {
  const [imageError, setImageError] = useState(false);
  
  // Handle image loading error
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Handle selection checkbox change
  const handleCheckboxChange = (e) => {
    e.stopPropagation(); // Prevent triggering item click
    onSelect(item.id);
  };
  
  // Handle item click
  const handleItemClick = () => {
    onClick(item);
  };
  
  return (
    <div 
      className={`bg-white p-3 rounded-md shadow-sm border ${selected ? 'border-indigo-500' : 'border-gray-200'} flex items-center cursor-pointer hover:bg-gray-50 transition-colors ${className}`}
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
        style={imageError ? { backgroundColor: item.color === 'white' ? '#f9fafb' : item.color } : {}}
      >
        {!imageError ? (
          <Image 
            src={item.imagePath} 
            alt={item.name}
            fill
            style={{ objectFit: 'cover' }}
            onError={handleImageError}
            sizes="48px"
          />
        ) : (
          <span className="text-white text-xs">{item.name.charAt(0)}</span>
        )}
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
}