'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function MixMatchCanvasPage() {
  // State untuk pakaian yang dipilih - ditambah accessories
  const [selectedOutfit, setSelectedOutfit] = useState({
    top: null,
    bottom: null,
    shoes: null,
    headwear: null,
    necklace: null,
    bag: null,
    glasses: null,
    watch: null
  });
  
  // State untuk index item yang dipilih di tiap kategori
  const [selectedIndexes, setSelectedIndexes] = useState({
    tops: 0,
    bottoms: 0,
    shoes: 0,
    headwear: 0,
    necklaces: 0,
    bags: 0,
    glasses: 0,
    watches: 0
  });
  
  // State untuk kategori yang sedang aktif (saat user mengklik bagian tertentu)
  const [activeSection, setActiveSection] = useState(null);
  
  // State untuk outfit yang disimpan
  const [savedOutfits, setSavedOutfits] = useState([]);
  
  // Data pakaian dengan path gambar lokal - ditambah accessories
  const clothes = {
    tops: [
      { id: 101, name: "Black T-Shirt", color: "black", category: "tops", imagePath: "/images/wardrobe/tops/WhatsApp_Image_2025-04-28_at_09.34.42_3eb1c4c9-removebg-preview.png" },
      { id: 102, name: "White Shirt", color: "white", category: "tops", imagePath: "/images/wardrobe/tops/WhatsApp_Image_2025-04-28_at_09.34.42_9debb3a0-removebg-preview.png" },
      { id: 103, name: "Black Polo", color: "black", category: "tops", imagePath: "/images/wardrobe/tops/WhatsApp_Image_2025-04-28_at_09.34.42_cc3a3b36-removebg-preview.png" }
    ],
    bottoms: [
      { id: 201, name: "Gray Cargo Pants", color: "gray", category: "bottoms", imagePath: "/images/wardrobe/bottoms/WhatsApp_Image_2025-04-28_at_09.30.39_fd4b41de-removebg-preview.png" }
    ],
    shoes: [
      { id: 301, name: "Gray Sneakers", color: "gray", category: "shoes", imagePath: "/images/wardrobe/shoes/WhatsApp_Image_2025-04-28_at_09.39.31_2ee66dc1-removebg-preview.png" },
      { id: 302, name: "Silver Trainers", color: "silver", category: "shoes", imagePath: "/images/wardrobe/shoes/WhatsApp_Image_2025-04-28_at_09.39.48_c893a5ff-removebg-preview.png" }
    ],
    headwear: [
      { id: 401, name: "Black Baseball Cap", color: "black", category: "headwear", imagePath: "/images/placeholders/hat1.png" },
      { id: 402, name: "White Beanie", color: "white", category: "headwear", imagePath: "/images/placeholders/hat2.png" }
    ],
    necklaces: [
      { id: 501, name: "Gold Chain", color: "gold", category: "necklaces", imagePath: "/images/placeholders/necklace1.png" },
      { id: 502, name: "Silver Pendant", color: "silver", category: "necklaces", imagePath: "/images/placeholders/necklace2.png" }
    ],
    bags: [
      { id: 601, name: "Black Backpack", color: "black", category: "bags", imagePath: "/images/placeholders/bag1.png" },
      { id: 602, name: "Brown Sling Bag", color: "brown", category: "bags", imagePath: "/images/placeholders/bag2.png" },
      { id: 603, name: "Navy Tote Bag", color: "navy", category: "bags", imagePath: "/images/placeholders/bag3.png" }
    ],
    glasses: [
      { id: 701, name: "Black Sunglasses", color: "black", category: "glasses", imagePath: "/images/placeholders/glasses1.png" },
      { id: 702, name: "Clear Frame Glasses", color: "clear", category: "glasses", imagePath: "/images/placeholders/glasses2.png" }
    ],
    watches: [
      { id: 801, name: "Black Sports Watch", color: "black", category: "watches", imagePath: "/images/placeholders/watch1.png" },
      { id: 802, name: "Silver Classic Watch", color: "silver", category: "watches", imagePath: "/images/placeholders/watch2.png" }
    ]
  };
  
  // Map kategori ke key dalam state
  const categoryMapping = {
    tops: 'top',
    bottoms: 'bottom',
    shoes: 'shoes',
    headwear: 'headwear',
    necklaces: 'necklace',
    bags: 'bag',
    glasses: 'glasses',
    watches: 'watch'
  };
  
  // Update selected outfit when index changes
  useEffect(() => {
    setSelectedOutfit({
      top: clothes.tops.length > 0 ? clothes.tops[selectedIndexes.tops % clothes.tops.length] : null,
      bottom: clothes.bottoms.length > 0 ? clothes.bottoms[selectedIndexes.bottoms % clothes.bottoms.length] : null,
      shoes: clothes.shoes.length > 0 ? clothes.shoes[selectedIndexes.shoes % clothes.shoes.length] : null,
      headwear: clothes.headwear.length > 0 ? clothes.headwear[selectedIndexes.headwear % clothes.headwear.length] : null,
      necklace: clothes.necklaces.length > 0 ? clothes.necklaces[selectedIndexes.necklaces % clothes.necklaces.length] : null,
      bag: clothes.bags.length > 0 ? clothes.bags[selectedIndexes.bags % clothes.bags.length] : null,
      glasses: clothes.glasses.length > 0 ? clothes.glasses[selectedIndexes.glasses % clothes.glasses.length] : null,
      watch: clothes.watches.length > 0 ? clothes.watches[selectedIndexes.watches % clothes.watches.length] : null
    });
  }, [selectedIndexes]);
  
  // Handler saat mengubah pakaian dengan menggeser/tap pada canvas
  const changeClothing = (section, direction) => {
    const sectionMapping = {
      'top': 'tops',
      'bottom': 'bottoms',
      'shoes': 'shoes',
      'headwear': 'headwear',
      'necklace': 'necklaces',
      'bag': 'bags',
      'glasses': 'glasses',
      'watch': 'watches'
    };
    
    const category = sectionMapping[section];
    const currentIndex = selectedIndexes[category];
    const itemsCount = clothes[category].length;
    
    if (itemsCount === 0) return; // Jika tidak ada item dalam kategori ini
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + itemsCount) % itemsCount;
    } else {
      newIndex = (currentIndex + 1) % itemsCount;
    }
    
    setSelectedIndexes(prev => ({
      ...prev,
      [category]: newIndex
    }));
  };
  
  // Aktivasi bagian saat diklik
  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  
  // Menyimpan outfit
  const saveOutfit = () => {
    const newOutfit = {
      id: Date.now(),
      name: `Outfit #${savedOutfits.length + 1}`,
      items: { ...selectedOutfit }
    };
    
    setSavedOutfits(prev => [newOutfit, ...prev]);
  };
  
  // Mengacak outfit
  const randomizeOutfit = () => {
    setSelectedIndexes({
      tops: clothes.tops.length > 0 ? Math.floor(Math.random() * clothes.tops.length) : 0,
      bottoms: clothes.bottoms.length > 0 ? Math.floor(Math.random() * clothes.bottoms.length) : 0,
      shoes: clothes.shoes.length > 0 ? Math.floor(Math.random() * clothes.shoes.length) : 0,
      headwear: clothes.headwear.length > 0 ? Math.floor(Math.random() * clothes.headwear.length) : 0,
      necklaces: clothes.necklaces.length > 0 ? Math.floor(Math.random() * clothes.necklaces.length) : 0,
      bags: clothes.bags.length > 0 ? Math.floor(Math.random() * clothes.bags.length) : 0,
      glasses: clothes.glasses.length > 0 ? Math.floor(Math.random() * clothes.glasses.length) : 0,
      watches: clothes.watches.length > 0 ? Math.floor(Math.random() * clothes.watches.length) : 0
    });
  };

  // Render accessory component
  const renderAccessory = (type, position, size = { width: 80, height: 80 }) => {
    const item = selectedOutfit[type];
    const positionClass = `absolute ${position}`;
    
    return (
      <div 
        className={`${positionClass} cursor-pointer ${activeSection === type ? 'z-30' : 'z-10'}`}
        style={{ width: size.width, height: size.height }}
        onClick={() => handleSectionClick(type)}
      >
        {item ? (
          <div className="w-full h-full relative">
            <Image 
              src={item.imagePath}
              alt={item.name}
              fill
              sizes={`${size.width}px`}
              style={{ objectFit: 'contain' }}
            />
            
            {activeSection === type && (
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 right-0 w-full flex justify-between">
                <button 
                  className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center"
                  onClick={(e) => {e.stopPropagation(); changeClothing(type, 'prev')}}
                >
                  <svg className="h-3 w-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center"
                  onClick={(e) => {e.stopPropagation(); changeClothing(type, 'next')}}
                >
                  <svg className="h-3 w-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full border border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
            <span className="text-xs text-gray-500 text-center capitalize">{type}</span>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="border-b border-gray-200 pb-5 mb-6">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
          Mix & Match
        </h2>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Click on any clothing item or accessory and use the left/right arrows to change it. Create your perfect outfit combination with accessories.
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        {/* Interactive Canvas - DIPERLEBAR UNTUK ACCESSORIES */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">Your Complete Outfit</h3>
          
          {/* Canvas with Interactive Sections - DIPERLEBAR DARI 340px MENJADI 600px */}
          <div className="relative mx-auto w-[600px] h-[600px] mb-8 bg-white rounded-xl shadow-sm flex flex-col items-center">
            
            {/* LEFT SIDE ACCESSORIES */}
            {/* Bag - Posisi kiri atas */}
            {renderAccessory('bag', 'left-8 top-[120px]', { width: 100, height: 120 })}
            
            {/* Watch - Posisi kiri bawah */}
            {renderAccessory('watch', 'left-12 top-[280px]', { width: 80, height: 80 })}
            
            {/* RIGHT SIDE ACCESSORIES */}
            {/* Glasses - Posisi kanan atas */}
            {renderAccessory('glasses', 'right-8 top-[80px]', { width: 90, height: 60 })}
            
            {/* Necklace - Posisi kanan tengah */}
            {renderAccessory('necklace', 'right-12 top-[180px]', { width: 80, height: 100 })}

            {/* CENTER - MAIN OUTFIT */}
            {/* Headwear Section */}
            <div 
              className={`w-[160px] h-[40px] mt-4 cursor-pointer ${activeSection === 'headwear' ? 'z-30' : 'z-10'}`}
              onClick={() => handleSectionClick('headwear')}
            >
              {selectedOutfit.headwear ? (
                <div className="w-full h-full rounded-t-full overflow-hidden relative">
                  <Image 
                    src={selectedOutfit.headwear.imagePath}
                    alt={selectedOutfit.headwear.name}
                    fill
                    sizes="160px"
                    style={{ objectFit: 'contain' }}
                  />
                  
                  {activeSection === 'headwear' && (
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 right-0 w-full flex justify-between">
                      <button 
                        className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                        onClick={(e) => {e.stopPropagation(); changeClothing('headwear', 'prev')}}
                      >
                        <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button 
                        className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                        onClick={(e) => {e.stopPropagation(); changeClothing('headwear', 'next')}}
                      >
                        <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full border border-dashed border-gray-300 rounded-t-full flex items-center justify-center bg-gray-50">
                  <span className="text-xs text-gray-500">Headwear</span>
                </div>
              )}
            </div>
            
            {/* Top Section */}
            <div 
              className="absolute w-[250px] h-[180px] left-1/2 -translate-x-1/2 top-[40px] cursor-pointer"
              onClick={() => handleSectionClick('top')}
            >
              {selectedOutfit.top ? (
                <div className="w-full h-full flex items-center justify-center relative">
                  <Image 
                    src={selectedOutfit.top.imagePath}
                    alt={selectedOutfit.top.name}
                    width={200}
                    height={160}
                    style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                    priority
                  />
                  
                  {activeSection === 'top' && (
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 right-0 w-full flex justify-between">
                      <button 
                        className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                        onClick={(e) => {e.stopPropagation(); changeClothing('top', 'prev')}}
                      >
                        <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button 
                        className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                        onClick={(e) => {e.stopPropagation(); changeClothing('top', 'next')}}
                      >
                        <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full border border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
                  <span className="text-xs text-gray-500">Add top</span>
                </div>
              )}
            </div>
            
            {/* Bottom Section */}
            <div 
              className="absolute w-[340px] h-[320px] left-1/2 -translate-x-1/2 top-[185px] cursor-pointer"
              onClick={() => handleSectionClick('bottom')}
            >
              {selectedOutfit.bottom ? (
                <div className="w-full h-full flex items-center justify-center relative">
                  <Image 
                    src={selectedOutfit.bottom.imagePath}
                    alt={selectedOutfit.bottom.name}
                    width={200}
                    height={220}
                    style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                    priority
                  />
                  
                  {activeSection === 'bottom' && (
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 right-0 w-full flex justify-between">
                      <button 
                        className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                        onClick={(e) => {e.stopPropagation(); changeClothing('bottom', 'prev')}}
                      >
                        <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button 
                        className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                        onClick={(e) => {e.stopPropagation(); changeClothing('bottom', 'next')}}
                      >
                        <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full border border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
                  <span className="text-xs text-gray-500">Add bottom</span>
                </div>
              )}
            </div>
            
            {/* Shoes Section */}
            <div 
              className="absolute w-[210px] h-[140px] left-1/2 -translate-x-1/2 top-[450px] cursor-pointer"
              onClick={() => handleSectionClick('shoes')}
            >
              {selectedOutfit.shoes ? (
                <div className="w-full h-full flex items-center justify-center relative">
                  <Image 
                    src={selectedOutfit.shoes.imagePath}
                    alt={selectedOutfit.shoes.name}
                    width={140}
                    height={70}
                    style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                    priority
                  />
                  
                  {activeSection === 'shoes' && (
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 right-0 w-full flex justify-between">
                      <button 
                        className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                        onClick={(e) => {e.stopPropagation(); changeClothing('shoes', 'prev')}}
                      >
                        <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button 
                        className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                        onClick={(e) => {e.stopPropagation(); changeClothing('shoes', 'next')}}
                      >
                        <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full border border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
                  <span className="text-xs text-gray-500">Add shoes</span>
                </div>
              )}
            </div>

            {/* Accessories Labels */}
            <div className="absolute left-4 top-4 text-xs font-medium text-gray-700">
              Left: Bag & Watch
            </div>
            <div className="absolute right-4 top-4 text-xs font-medium text-gray-700">
              Right: Glasses & Necklace
            </div>
          </div>
          
          {/* Current Outfit Info */}
          <div className="text-center mb-4">
            {activeSection && selectedOutfit[activeSection] && (
              <div className="bg-indigo-50 p-3 rounded-md mb-4 mx-auto max-w-sm">
                <p className="text-indigo-700 font-medium text-lg">{selectedOutfit[activeSection].name}</p>
                <p className="text-sm text-indigo-500 capitalize">
                  {selectedOutfit[activeSection].color} • 
                  {` Click to change`}
                </p>
              </div>
            )}
            
            {!activeSection && (
              <p className="text-sm text-gray-500 mb-4">Click on any part of the outfit or accessory to change it</p>
            )}
            
            {/* ALL SELECTED ITEMS TAGS */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {selectedOutfit.headwear && (
                <span className="text-sm bg-pink-100 text-pink-800 px-3 py-1 rounded-full">
                  👒 {selectedOutfit.headwear.name}
                </span>
              )}
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
              {selectedOutfit.necklace && (
                <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                  📿 {selectedOutfit.necklace.name}
                </span>
              )}
              {selectedOutfit.bag && (
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  🎒 {selectedOutfit.bag.name}
                </span>
              )}
              {selectedOutfit.glasses && (
                <span className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full">
                  🕶️ {selectedOutfit.glasses.name}
                </span>
              )}
              {selectedOutfit.watch && (
                <span className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                  ⌚ {selectedOutfit.watch.name}
                </span>
              )}
            </div>
          </div>
          
          {/* Outfit Controls */}
          <div className="flex justify-center space-x-6">
            <button
              onClick={randomizeOutfit}
              className="px-6 py-3 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 shadow-sm text-lg font-medium"
            >
              🎲 Randomize All
            </button>
            <button
              onClick={saveOutfit}
              className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-lg"
            >
              💾 Save Complete Outfit
            </button>
          </div>
        </div>
        
        {/* Saved Outfits */}
        {savedOutfits.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Saved Complete Outfits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {savedOutfits.map(outfit => (
                <div key={outfit.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h4 className="font-medium mb-2 text-lg">{outfit.name}</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(outfit.items).map(([key, item]) => {
                      if (!item) return null;
                      return (
                        <div key={key} className="bg-gray-50 p-2 rounded">
                          <div className="w-full h-16 rounded overflow-hidden relative">
                            <Image 
                              src={item.imagePath}
                              alt={item.name}
                              fill
                              sizes="64px"
                              style={{ objectFit: 'contain' }}
                            />
                          </div>
                          <p className="text-xs text-center truncate mt-1">{item.name}</p>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Item count summary */}
                  <div className="mt-2 text-xs text-gray-500 text-center">
                    {Object.values(outfit.items).filter(Boolean).length} items total
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}