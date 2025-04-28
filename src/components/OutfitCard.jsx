import Image from 'next/image';
import { useState } from 'react';

export default function OutfitCard({ outfit, onSave }) {
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(outfit, !isSaved);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{outfit.name || 'Perfect Combo'}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {outfit.description || `Perfect for ${outfit.occasion || 'any occasion'}`}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {/* Top */}
          {outfit.top && (
            <div className="bg-gray-50 rounded p-2">
              <div className="relative h-40 mb-2">
                <Image 
                  src={outfit.top.imageUrl} 
                  alt={outfit.top.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-center">{outfit.top.name}</p>
            </div>
          )}
          
          {/* Bottom */}
          {outfit.bottom && (
            <div className="bg-gray-50 rounded p-2">
              <div className="relative h-40 mb-2">
                <Image 
                  src={outfit.bottom.imageUrl} 
                  alt={outfit.bottom.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-center">{outfit.bottom.name}</p>
            </div>
          )}
          
          {/* Shoes */}
          {outfit.shoes && (
            <div className="bg-gray-50 rounded p-2">
              <div className="relative h-40 mb-2">
                <Image 
                  src={outfit.shoes.imageUrl} 
                  alt={outfit.shoes.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-center">{outfit.shoes.name}</p>
            </div>
          )}
          
          {/* Accessories (if any) */}
          {outfit.accessory && (
            <div className="bg-gray-50 rounded p-2">
              <div className="relative h-40 mb-2">
                <Image 
                  src={outfit.accessory.imageUrl} 
                  alt={outfit.accessory.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-center">{outfit.accessory.name}</p>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mr-2 ${
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
          
          <button 
            onClick={handleSave}
            className="text-indigo-600 hover:text-indigo-800"
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
      </div>
    </div>
  );
}