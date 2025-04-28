'use client';

import ClothingCard from './ClothingCard';

const ClothingGrid = ({ items, onItemClick, draggable = false }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">No items found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <ClothingCard 
          key={item.id} 
          item={item} 
          onClick={onItemClick}
          draggable={draggable}
        />
      ))}
    </div>
  );
};

export default ClothingGrid;