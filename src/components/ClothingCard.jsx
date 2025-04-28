'use client';

import Image from 'next/image';

const ClothingCard = ({ item, onClick, draggable = false }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${draggable ? 'cursor-move' : ''}`}
      onClick={() => onClick && onClick(item)}
    >
      <div className="relative w-full h-48">
        {item.imageUrl ? (
          <Image
            src={`http://localhost:5000${item.imageUrl}`}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <div className="mt-2 flex items-center">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800 capitalize">
            {item.category}
          </span>
          {item.color && (
            <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
              {item.color}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClothingCard;