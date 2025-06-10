'use client';

import { useState } from 'react';
import CommunityOutfitCard from '@/components/CommunityOutfitCard';
import FilterTabs from '@/components/FilterTabs';
import { communityOutfits } from '@/lib/mockData';

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOutfits = communityOutfits.filter(outfit => {
    const matchesSearch = outfit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         outfit.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'popular') {
      return matchesSearch && outfit.likes >= 10;
    } else if (activeFilter === 'recent') {
      return matchesSearch;
    } else if (activeFilter === 'following') {
      return matchesSearch && outfit.user.isFollowing;
    }
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Style Community
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing outfit combinations from our community and get inspired for your next look!
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search outfits or users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">1,234</div>
            <div className="text-gray-500">Active Users</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">5,678</div>
            <div className="text-gray-500">Shared Outfits</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">890</div>
            <div className="text-gray-500">New This Week</div>
          </div>
        </div>

        {/* Outfit Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOutfits.map((outfit, index) => (
            <CommunityOutfitCard key={index} outfit={outfit} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            Load More Outfits
          </button>
        </div>
      </div>
    </div>
  );
}