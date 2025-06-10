export default function FilterTabs({ activeFilter, onFilterChange }) {
  const filters = [
    {
      id: 'popular',
      label: 'Popular',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: 'Most liked outfits'
    },
    {
      id: 'recent',
      label: 'Recent',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'Latest uploads'
    },
    {
      id: 'following',
      label: 'Following',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: 'From people you follow'
    }
  ];

  return (
    <div className="mb-8">
      {/* Mobile Dropdown */}
      <div className="sm:hidden">
        <select
          value={activeFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
        >
          {filters.map((filter) => (
            <option key={filter.id} value={filter.id}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 justify-center">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`group inline-flex items-center py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
                  activeFilter === filter.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className={`mr-2 ${
                  activeFilter === filter.id ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                }`}>
                  {filter.icon}
                </span>
                <span>{filter.label}</span>
                
                {/* Tooltip on hover */}
                <div className="absolute invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 mt-12 whitespace-nowrap z-10">
                  {filter.description}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Filter Results Count */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Showing outfits from {' '}
          <span className="font-medium text-gray-900">
            {filters.find(f => f.id === activeFilter)?.label.toLowerCase()}
          </span>
        </p>
      </div>
    </div>
  );
}