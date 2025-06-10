'use client';

import { useState } from 'react';

export default function UserAvatar({ user, showFollowButton = false, timestamp = null, size = 'md' }) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  // Generate consistent gradient based on user name
  const getAvatarGradient = (name) => {
    const gradients = [
      'from-purple-400 to-pink-400',
      'from-blue-400 to-indigo-500',
      'from-green-400 to-blue-500',
      'from-purple-500 to-indigo-600',
      'from-pink-500 to-rose-500',
      'from-indigo-500 to-purple-600',
      'from-blue-500 to-teal-500',
      'from-emerald-400 to-cyan-400',
      'from-orange-400 to-pink-400',
      'from-red-400 to-pink-500'
    ];
    
    // Use name to generate consistent index
    const hash = name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return gradients[Math.abs(hash) % gradients.length];
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return time.toLocaleDateString();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gradient-to-br ${getAvatarGradient(user.name)} flex items-center justify-center shadow-md ring-2 ring-white`}>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <span className={`${textSizeClasses[size]} font-bold text-white drop-shadow-sm`}>
                {user.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2)}
              </span>
            </div>
          )}
        </div>

        {/* User Info */}
        <div>
          <div className="flex items-center space-x-2">
            <h4 className={`${textSizeClasses[size]} font-semibold text-gray-900`}>
              {user.name}
            </h4>
            
            {/* Verified Badge */}
            {user.isVerified && (
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Username */}
            <p className="text-xs text-gray-500">@{user.username}</p>
            
            {/* Follower Count */}
            {user.followers && (
              <>
                <span className="text-xs text-gray-300">•</span>
                <p className="text-xs text-gray-500">{user.followers} followers</p>
              </>
            )}
            
            {/* Timestamp */}
            {timestamp && (
              <>
                <span className="text-xs text-gray-300">•</span>
                <p className="text-xs text-gray-500">{formatTimestamp(timestamp)}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Follow Button */}
      {showFollowButton && (
        <button
          onClick={handleFollow}
          className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
            isFollowing
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      )}
    </div>
  );
}