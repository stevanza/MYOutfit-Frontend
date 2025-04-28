'use client';

import { useState, useEffect } from 'react';
import { getAllClothes, getClothesByCategory } from '@/lib/api';
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import Image from 'next/image';
import Link from 'next/link';
import ClothingGrid from '@/components/ClothingGrid';

export default function MixMatchPage() {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeId, setActiveId] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [outfitItems, setOutfitItems] = useState([]);
  
  // Configure DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        setLoading(true);
        let data;
        
        if (activeCategory === 'all') {
          data = await getAllClothes();
        } else {
          data = await getClothesByCategory(activeCategory);
        }
        
        setClothes(data || []);
      } catch (err) {
        setError('Failed to load clothes. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClothes();
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Handler for drag start
  const handleDragStart = (event) => {
    const { active } = event;
    const draggedItem = clothes.find(item => item.id === active.id);
    
    setActiveId(active.id);
    setActiveItem(draggedItem);
  };

  // Handler for drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    // If dragged over the canvas, add to outfit
    if (over && over.id === 'canvas' && active.id && activeItem) {
      // Generate position for the item
      const position = {
        x: event.delta.x,
        y: event.delta.y
      };
      
      // Check if item already exists in outfit
      const itemExists = outfitItems.some(item => item.id === activeItem.id);
      
      if (!itemExists) {
        setOutfitItems([...outfitItems, {
          ...activeItem,
          position
        }]);
      }
    }
    
    setActiveId(null);
    setActiveItem(null);
  };

  // Remove item from outfit
  const removeFromOutfit = (itemId) => {
    setOutfitItems(outfitItems.filter(item => item.id !== itemId));
  };

  // Clear all items from outfit
  const clearOutfit = () => {
    setOutfitItems([]);
  };

  // Save outfit (just a placeholder function)
  const saveOutfit = () => {
    alert('Outfit saved! (This is just a placeholder - actual saving would be implemented in a real app)');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="border-b border-gray-200 pb-5 mb-6">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
          Mix & Match
        </h2>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Drag and drop items to create your perfect outfit
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side: Clothing selection */}
        <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Your Wardrobe</h3>
          
          {/* Category filters */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {['all', 'tops', 'bottoms', 'shoes', 'accessories'].map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`${
                    activeCategory === category
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-white text-gray-500 hover:bg-gray-100'
                  } px-3 py-1 rounded-full text-sm font-medium border border-gray-200`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {/* Loading state */}
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
              <p className="mt-2 text-sm text-gray-500">Loading items...</p>
            </div>
          ) : clothes.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg">
              <p className="text-gray-500">No items found in this category</p>
              
              <Link
                href="/upload"
                className="mt-3 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Add Clothing
              </Link>
            </div>
          ) : (
            <div className="overflow-y-auto max-h-[500px] pr-2">
              <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToWindowEdges]}
              >
                <div className="grid grid-cols-2 gap-3">
                  {clothes.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-white rounded-md shadow-sm overflow-hidden cursor-move"
                      draggable
                      id={item.id}
                    >
                      <div className="relative w-full h-32">
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
                      <div className="p-2">
                        <h4 className="text-sm font-medium text-gray-800 truncate">{item.name}</h4>
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-800 capitalize mt-1">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <DragOverlay>
                  {activeItem ? (
                    <div className="bg-white rounded-md shadow-lg overflow-hidden opacity-80">
                      <div className="relative w-32 h-32">
                        {activeItem.imageUrl ? (
                          <Image
                            src={`http://localhost:5000${activeItem.imageUrl}`}
                            alt={activeItem.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <span className="text-gray-400">No Image</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
            </div>
          )}
        </div>
        
        {/* Right side: Canvas for outfit creation */}
        <div className="lg:col-span-2">
          <DndContext
            sensors={sensors}
            modifiers={[restrictToWindowEdges]}
          >
            <div 
              id="canvas"
              className="bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 min-h-[600px] relative"
            >
              {outfitItems.length === 0 ? (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-400">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="mt-2">Drag items here to create your outfit</p>
                </div>
              ) : (
                outfitItems.map((item) => (
                  <div
                    key={item.id}
                    className="absolute bg-white rounded-md shadow-lg overflow-hidden cursor-move"
                    style={{
                      left: `${item.position.x + 200}px`,
                      top: `${item.position.y + 100}px`,
                      zIndex: 10
                    }}
                  >
                    <div className="relative w-32 h-32">
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
                      <button
                        onClick={() => removeFromOutfit(item.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </DndContext>
          
          {/* Outfit controls */}
          <div className="mt-4 flex justify-between">
            <button
              onClick={clearOutfit}
              disabled={outfitItems.length === 0}
              className={`px-4 py-2 border rounded-md ${
                outfitItems.length === 0
                  ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                  : 'border-red-300 text-red-600 hover:bg-red-50'
              }`}
            >
              Clear All
            </button>
            
            <button
              onClick={saveOutfit}
              disabled={outfitItems.length === 0}
              className={`px-4 py-2 rounded-md ${
                outfitItems.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              Save Outfit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}