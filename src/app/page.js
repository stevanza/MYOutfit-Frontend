import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      title: "Organize Your Wardrobe",
      description: "Keep track of all your clothing items in one place, categorized and searchable."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "Mix & Match",
      description: "Create and save outfits by combining your favorite pieces."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: "Weather-based Recommendations",
      description: "Get outfit suggestions based on current weather conditions."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Mood-based Styling",
      description: "Find the perfect outfit for any occasion or mood."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:pb-28 lg:w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center pt-10 lg:pt-20">
              {/* Hero Content */}
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Your Smart</span>
                  <span className="block text-indigo-600 mt-1">Digital Wardrobe</span>
                </h1>
                <p className="mt-6 text-lg text-gray-500 max-w-lg">
                  Upload your clothing items, organize them in categories, and get personalized outfit recommendations based on weather, occasion, and your style preferences.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/upload"
                    className="px-6 py-3 rounded-lg shadow-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/wardrobe"
                    className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    View Wardrobe
                  </Link>
                </div>
              </div>
              
              {/* Hero Image */}
              <div className="relative h-64 sm:h-72 md:h-96 lg:h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-2 p-4 w-full h-full">
                      <div className="bg-white rounded-lg shadow-sm"></div>
                      <div className="bg-indigo-50 rounded-lg shadow-sm"></div>
                      <div className="bg-white rounded-lg shadow-sm"></div>
                      <div className="bg-white rounded-lg shadow-sm"></div>
                      <div className="bg-white rounded-lg shadow-sm"></div>
                      <div className="bg-indigo-50 rounded-lg shadow-sm"></div>
                      <div className="bg-indigo-50 rounded-lg shadow-sm"></div>
                      <div className="bg-white rounded-lg shadow-sm"></div>
                      <div className="bg-white rounded-lg shadow-sm"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-indigo-600 font-bold text-2xl">
                      My Wardrobe
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simplify Your Style Decisions
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our digital wardrobe app helps you organize, mix & match, and get recommendations for your outfits.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              How It Works
            </h2>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="text-center px-4">
              <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Your Clothes</h3>
              <p className="text-gray-500">Take photos of your clothing items and upload them to your digital wardrobe.</p>
            </div>
            
            <div className="text-center px-4">
              <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Organize Your Wardrobe</h3>
              <p className="text-gray-500">Categorize and tag your items to keep everything organized and easily searchable.</p>
            </div>
            
            <div className="text-center px-4">
              <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Get Outfit Recommendations</h3>
              <p className="text-gray-500">Receive personalized outfit suggestions based on weather and occasion.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:py-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-white">
                Ready to organize your wardrobe?
              </h2>
              <p className="mt-4 text-lg text-indigo-100">
                Start uploading your clothes today and experience the convenience of a digital wardrobe.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:flex lg:justify-end">
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/upload"
                  className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
                >
                  Get Started Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}