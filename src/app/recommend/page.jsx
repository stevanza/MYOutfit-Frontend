'use client';

import { useState } from 'react';

export default function RecommendPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [mood, setMood] = useState('casual');
  const [recommendations, setRecommendations] = useState([]);
  const [weatherType, setWeatherType] = useState('');
  
  // Dummy data untuk mood options
  const moods = [
    { id: 'casual', label: 'Casual', icon: '👕', description: 'Everyday comfortable outfits' },
    { id: 'formal', label: 'Formal', icon: '👔', description: 'Professional and elegant ensembles' },
    { id: 'sporty', label: 'Sporty', icon: '🏃', description: 'Active and athletic looks' },
    { id: 'party', label: 'Party', icon: '🎉', description: 'Fun and stylish evening outfits' }
  ];
  
  // Dummy data untuk weather options
  const weatherOptions = [
    { id: 'sunny', label: 'Sunny', icon: '☀️' },
    { id: 'rainy', label: 'Rainy', icon: '🌧️' },
    { id: 'cloudy', label: 'Cloudy', icon: '☁️' },
    { id: 'cold', label: 'Cold', icon: '❄️' },
  ];
  
  // Dummy data untuk rekomendasi outfit
  const dummyRecommendations = [
    {
      id: 1,
      name: "Casual Day Out",
      description: "Perfect for a relaxed day around town",
      mood: "casual",
      weather: "sunny"
    },
    {
      id: 2,
      name: "Office Ready",
      description: "Professional look for work meetings",
      mood: "formal",
      weather: "normal"
    },
    {
      id: 3,
      name: "Weekend Brunch",
      description: "Stylish and comfortable for weekend outings",
      mood: "casual",
      weather: "sunny"
    },
    {
      id: 4,
      name: "Rainy Day Style",
      description: "Stay dry and stylish when it rains",
      mood: "casual",
      weather: "rainy"
    }
  ];
  
  // Get recommendations (untuk demo frontend saja)
  const getRecommendations = () => {
    setIsLoading(true);
    
    // Simulasi loading
    setTimeout(() => {
      setRecommendations(dummyRecommendations);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="border-b border-gray-200 pb-5 mb-6">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
          Get Outfit Recommendations
        </h2>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Find the perfect outfit based on your mood and the current weather. Mix and match items from your wardrobe.
        </p>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">What's Your Mood Today?</h3>
              
              {/* Mood Selector */}
              <div className="space-y-3">
                {moods.map((moodOption) => (
                  <div
                    key={moodOption.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                      mood === moodOption.id
                        ? 'bg-indigo-100 border border-indigo-500'
                        : 'bg-white hover:bg-gray-100 border border-gray-200'
                    }`}
                    onClick={() => setMood(moodOption.id)}
                  >
                    <div className="text-2xl mr-4">{moodOption.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-900">{moodOption.label}</h3>
                      <p className="text-sm text-gray-600">{moodOption.description}</p>
                    </div>
                    <div className="ml-auto">
                      {mood === moodOption.id && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-indigo-600"
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
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Weather Information</h3>
              
              {/* Weather Selector */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Select current weather:</p>
                  <div className="flex flex-wrap gap-2">
                    {weatherOptions.map(option => (
                      <button 
                        key={option.id}
                        onClick={() => setWeatherType(option.id)}
                        className={`px-3 py-2 text-sm rounded-md transition-colors ${
                          weatherType === option.id 
                            ? 'bg-indigo-500 text-white' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {option.icon} {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {weatherType && (
                  <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <div className="text-4xl mr-4">
                      {weatherOptions.find(o => o.id === weatherType)?.icon || '🌤️'}
                    </div>
                    <div>
                      <h3 className="font-medium">Current Weather</h3>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold">
                          {weatherType === 'cold' ? '18°C' : 
                           weatherType === 'rainy' ? '24°C' : 
                           weatherType === 'cloudy' ? '26°C' : '32°C'}
                        </span>
                        <span className="ml-2 text-gray-600">
                          {weatherOptions.find(o => o.id === weatherType)?.label || 'Unknown'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {!weatherType && (
                  <div className="text-center py-4 text-gray-500">
                    <p>Please select current weather condition</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={getRecommendations}
              disabled={isLoading || !weatherType}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 shadow-sm"
            >
              {isLoading ? 'Finding Perfect Outfits...' : 'Get Recommendations'}
            </button>
          </div>
        </div>
        
        {recommendations.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Outfits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {recommendations.map((outfit) => (
                <div key={outfit.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2">{outfit.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{outfit.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {/* Placeholder untuk gambar pakaian */}
                      <div className="bg-gray-50 rounded p-2 border border-gray-200">
                        <div className="h-32 mb-2 bg-gray-100 flex items-center justify-center rounded">Top</div>
                        <p className="text-xs text-center text-gray-700">Atasan</p>
                      </div>
                      <div className="bg-gray-50 rounded p-2 border border-gray-200">
                        <div className="h-32 mb-2 bg-gray-100 flex items-center justify-center rounded">Bottom</div>
                        <p className="text-xs text-center text-gray-700">Bawahan</p>
                      </div>
                      <div className="bg-gray-50 rounded p-2 border border-gray-200">
                        <div className="h-32 mb-2 bg-gray-100 flex items-center justify-center rounded">Shoes</div>
                        <p className="text-xs text-center text-gray-700">Sepatu</p>
                      </div>
                      <div className="bg-gray-50 rounded p-2 border border-gray-200">
                        <div className="h-32 mb-2 bg-gray-100 flex items-center justify-center rounded">Acc</div>
                        <p className="text-xs text-center text-gray-700">Aksesoris</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mr-2 ${
                          outfit.mood === 'casual' ? 'bg-green-100 text-green-800' :
                          outfit.mood === 'formal' ? 'bg-blue-100 text-blue-800' :
                          outfit.mood === 'sporty' ? 'bg-orange-100 text-orange-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {outfit.mood}
                        </span>
                        
                        {outfit.weather && (
                          <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-800">
                            {outfit.weather === 'rainy' ? '🌧️' :
                             outfit.weather === 'sunny' ? '☀️' :
                             outfit.weather === 'cold' ? '❄️' : '🌤️'} {outfit.weather}
                          </span>
                        )}
                      </div>
                      
                      <button className="text-indigo-600 hover:text-indigo-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {!isLoading && recommendations.length === 0 && (
          <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-lg mb-2">No recommendations yet</p>
            <p>Select your mood and weather information, then click "Get Recommendations"</p>
          </div>
        )}
      </div>
    </div>
  );
}