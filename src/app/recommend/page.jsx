'use client';

import { useState } from 'react';

export default function RecommendPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [mood, setMood] = useState('casual');
  const [recommendations, setRecommendations] = useState([]);
  
  // Dummy data untuk mood options
  const moods = [
    { id: 'casual', label: 'Casual', icon: '👕', description: 'Everyday comfortable outfits' },
    { id: 'formal', label: 'Formal', icon: '👔', description: 'Professional and elegant ensembles' },
    { id: 'sporty', label: 'Sporty', icon: '🏃', description: 'Active and athletic looks' },
    { id: 'party', label: 'Party', icon: '🎉', description: 'Fun and stylish evening outfits' }
  ];
  
  // Weather data dummy untuk 11 Juni 2025
  const weatherData = {
    date: 'Tuesday, June 11, 2025',
    temperature: 26,
    condition: 'rainy',
    humidity: 75,
    description: 'Light Rain',
    icon: '🌧️',
    feelsLike: 28,
    windSpeed: 15
  };
  
  // Dummy data untuk rekomendasi outfit dengan gambar dari wardrobe lokal
  const outfitRecommendations = {
    casual: [
      {
        id: 1,
        name: "Rainy Day Casual",
        description: "Comfortable and practical for light rain",
        mood: "casual",
        weather: "rainy",
        items: {
          top: { name: "Casual Top", image: "/images/wardrobe/tops/baju.png" },
          bottom: { name: "Casual Bottom", image: "/images/wardrobe/bottoms/celana_sport.png" },
          shoes: { name: "Comfortable Shoes", image: "/images/wardrobe/shoes/sepatu_skena.png" },
          accessory: { name: "Casual Accessory", image: "/images/wardrobe/accessories/kacamata.png"}
        },
        rating: 4.8
      },
      {
        id: 2,
        name: "Urban Explorer",
        description: "Perfect for city walks in light rain",
        mood: "casual",
        weather: "rainy",
        items: {
          top: { name: "Relaxed Top", image: "/images/wardrobe/tops/hoodie_hitam.png" },
          bottom: { name: "Urban Bottom", image: "/images/wardrobe/bottoms/celana_skena.png" },
          shoes: { name: "Walking Shoes", image: "/images/wardrobe/shoes/sepatu_skena.png" },
          accessory: { name: "Urban Accessory", image: "/images/wardrobe/accessories/topi.png" }
        },
        rating: 4.6
      }
    ],
    formal: [
      {
        id: 3,
        name: "Professional Rainy Day",
        description: "Stay professional even in the rain",
        mood: "formal",
        weather: "rainy",
        items: {
          top: { name: "Formal Top", image: "/images/wardrobe/tops/baju.png" },
          bottom: { name: "Formal Bottom", image: "/images/wardrobe/bottoms/celana_cino.png" },
          shoes: { name: "Formal Shoes", image: "/images/wardrobe/shoes/sepatu_hitam.png" },
          accessory: { name: "Professional Accessory", image: "/images/wardrobe/accessories/kalung_emas.png" }
        },
        rating: 4.9
      },
      {
        id: 4,
        name: "Business Elegant",
        description: "Sophisticated look for business meetings",
        mood: "formal",
        weather: "rainy",
        items: {
          top: { name: "Business Top", image: "/images/wardrobe/tops/Kemeja.png" },
          bottom: { name: "Business Bottom", image: "/images/wardrobe/bottoms/celana_cino.png" },
          shoes: { name: "Business Shoes", image: "/images/wardrobe/shoes/flat_shoes.png" },
          accessory: { name: "Elegant Accessory", image: "/images/wardrobe/accessories/kalung_emas.png" }
        },
        rating: 4.7
      }
    ],
    sporty: [
      {
        id: 5,
        name: "Rainy Day Workout",
        description: "Stay active even when it's raining",
        mood: "sporty",
        weather: "rainy",
        items: {
          top: { name: "Sport Top", image: "/images/wardrobe/tops/hoodie_hitam.png" },
          bottom: { name: "Sport Bottom", image: "/images/wardrobe/bottoms/celana_sport.png" },
          shoes: { name: "Athletic Shoes", image: "/images/wardrobe/shoes/sepatu_skena.png" },
          accessory: { name: "Sport Accessory", image: "/images/wardrobe/accessories/topi.png" }
        },
        rating: 4.7
      },
      {
        id: 6,
        name: "Active Lifestyle",
        description: "Perfect for outdoor activities in any weather",
        mood: "sporty",
        weather: "rainy",
        items: {
          top: { name: "Active Top", image: "/images/wardrobe/tops/baju.png" },
          bottom: { name: "Active Bottom", image: "/images/wardrobe/bottoms/celana_sport.png" },
          shoes: { name: "Running Shoes", image: "/images/wardrobe/shoes/sepatu_skena.png" },
          accessory: { name: "Active Accessory", image: "/images/wardrobe/accessories/.png" }
        },
        rating: 4.5
      }
    ],
    party: [
      {
        id: 7,
        name: "Stylish Evening",
        description: "Look great for indoor events during rainy weather",
        mood: "party",
        weather: "rainy",
        items: {
          top: { name: "Party Top", image: "/images/wardrobe/tops/baju.png" },
          bottom: { name: "Party Bottom", image: "/images/wardrobe/bottoms/celana_skena.png" },
          shoes: { name: "Party Shoes", image: "/images/wardrobe/shoes/sepatu_skena.png" },
          accessory: { name: "Statement Accessory", image: "/images/wardrobe/kacamata.png" }
        },
        rating: 4.8
      },
      {
        id: 8,
        name: "Night Out Chic",
        description: "Trendy and fashionable for evening events",
        mood: "party",
        weather: "rainy",
        items: {
          top: { name: "Chic Top", image: "/images/wardrobe/tops/baju.png" },
          bottom: { name: "Stylish Bottom", image: "/images/wardrobe/bottoms/celana_sport.png" },
          shoes: { name: "Fashion Shoes", image: "/images/wardrobe/shoes/sepatu_hitam.png" },
          accessory: { name: "Trendy Accessory", image: "/images/wardrobe/accessories/kalung_emas.png" }
        },
        rating: 4.6
      }
    ]
  };
  
  // Get recommendations berdasarkan mood
  const getRecommendations = () => {
    setIsLoading(true);
    
    // Simulasi loading
    setTimeout(() => {
      const selectedRecommendations = outfitRecommendations[mood] || [];
      setRecommendations(selectedRecommendations);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Header Section - Sederhana seperti yang diminta */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Get Outfit Recommendations
            </h1>
            <p className="text-gray-600">
              Find the perfect outfit based on your mood and current weather conditions. Our AI considers the weather to suggest the best combinations.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 border border-blue-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Mood Selector */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">😊</span>
                    What's Your Mood Today?
                  </h3>
                  
                  <div className="space-y-3">
                    {moods.map((moodOption) => (
                      <div
                        key={moodOption.id}
                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                          mood === moodOption.id
                            ? 'bg-indigo-100 border-2 border-indigo-500 transform scale-105'
                            : 'bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setMood(moodOption.id)}
                      >
                        <div className="text-3xl mr-4">{moodOption.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{moodOption.label}</h4>
                          <p className="text-sm text-gray-600">{moodOption.description}</p>
                        </div>
                        <div className="ml-auto">
                          {mood === moodOption.id && (
                            <div className="bg-indigo-500 rounded-full p-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Weather Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">🌤️</span>
                    Current Weather
                  </h3>
                  
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-6 shadow-sm">
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-2">{weatherData.icon}</div>
                      <h4 className="text-xl font-semibold text-gray-900">{weatherData.description}</h4>
                      <p className="text-sm text-gray-600 mb-3">{weatherData.date}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-600">{weatherData.temperature}°C</div>
                        <div className="text-xs text-gray-600">Temperature</div>
                      </div>
                      <div className="bg-cyan-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-cyan-600">{weatherData.humidity}%</div>
                        <div className="text-xs text-gray-600">Humidity</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-gray-600">{weatherData.feelsLike}°C</div>
                        <div className="text-xs text-gray-600">Feels like</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-600">{weatherData.windSpeed} km/h</div>
                        <div className="text-xs text-gray-600">Wind speed</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-yellow-600 mr-2">💡</span>
                        <p className="text-sm text-yellow-800">
                          Light rain expected today. Consider waterproof options and layers!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button
                  onClick={getRecommendations}
                  disabled={isLoading}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-105"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Finding Perfect Outfits...
                    </div>
                  ) : (
                    '✨ Get Smart Recommendations'
                  )}
                </button>
              </div>
            </div>
            
            {/* Recommendations Results */}
            {recommendations.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Recommended Outfits for {mood.charAt(0).toUpperCase() + mood.slice(1)} Mood
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-1">🌧️</span>
                    Perfect for today's weather
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {recommendations.map((outfit) => (
                    <div key={outfit.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      
                      {/* Outfit Header */}
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{outfit.name}</h4>
                            <p className="text-sm text-gray-600">{outfit.description}</p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">⭐</span>
                            <span className="text-sm font-medium">{outfit.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Outfit Items Grid */}
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {Object.entries(outfit.items).map(([type, item]) => (
                            <div key={type} className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:bg-gray-100 transition-colors">
                              <div className="aspect-square bg-white rounded-md mb-2 overflow-hidden border border-gray-200">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.src = `data:image/svg+xml;base64,${btoa(`
                                      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="200" height="200" fill="#f3f4f6"/>
                                        <text x="100" y="100" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial" font-size="14">
                                          ${type.charAt(0).toUpperCase() + type.slice(1)}
                                        </text>
                                      </svg>
                                    `)}`;
                                  }}
                                />
                              </div>
                              <div className="text-center">
                                <p className="text-xs font-medium text-gray-900 truncate">{item.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{type}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Outfit Tags & Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                              outfit.mood === 'casual' ? 'bg-green-100 text-green-800' :
                              outfit.mood === 'formal' ? 'bg-blue-100 text-blue-800' :
                              outfit.mood === 'sporty' ? 'bg-orange-100 text-orange-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {outfit.mood}
                            </span>
                            
                            <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800">
                              🌧️ rainy day
                            </span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-red-500 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            <button className="text-gray-400 hover:text-indigo-500 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Weather Match Info */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-blue-600 text-xl mr-3">🎯</span>
                    <div>
                      <h4 className="font-medium text-blue-900">Perfect Weather Match!</h4>
                      <p className="text-sm text-blue-700">
                        These outfits are specifically chosen for today's rainy weather at 26°C. 
                        Stay comfortable and stylish!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-flex items-center px-6 py-3 bg-indigo-50 rounded-lg">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-indigo-600 font-medium">Analyzing weather patterns and your wardrobe...</span>
                </div>
              </div>
            )}
            
            {/* Empty State */}
            {!isLoading && recommendations.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-6xl mb-4">👗</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready for Outfit Suggestions?</h3>
                <p className="text-gray-600 mb-4">
                  Select your mood and get personalized outfit recommendations based on today's weather
                </p>
                <div className="text-sm text-gray-500">
                  Weather: {weatherData.description} • {weatherData.temperature}°C • {weatherData.humidity}% humidity
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}