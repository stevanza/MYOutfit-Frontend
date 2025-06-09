'use client';

import { useState, useEffect } from 'react';

export default function DebugComponent() {
  const [debugInfo, setDebugInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:3001/api';

  const fetchDebugInfo = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Fetching debug info from:', `${API_BASE_URL}/debug/full`);
      
      const response = await fetch(`${API_BASE_URL}/debug/full`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📥 Debug data received:', data);
      setDebugInfo(data);
    } catch (err) {
      console.error('❌ Error fetching debug info:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/test`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Connection test successful:', data);
      alert(`✅ Connection successful!\n${data.message}`);
    } catch (err) {
      console.error('❌ Connection test failed:', err);
      setError(err.message);
      alert(`❌ Connection failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addTestData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/debug/add-test-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Test data added:', data);
      alert(`✅ Test data added: ${data.message}`);
      fetchDebugInfo(); // Refresh debug info
    } catch (err) {
      console.error('❌ Error adding test data:', err);
      setError(err.message);
      alert(`❌ Failed to add test data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDebugInfo();
  }, []);

  return (
    <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">🔧 Debug Information</h3>
        <div className="flex space-x-2">
          <button
            onClick={testConnection}
            disabled={loading}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            Test Connection
          </button>
          <button
            onClick={addTestData}
            disabled={loading}
            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:opacity-50 transition-colors"
          >
            Add Test Data
          </button>
          <button
            onClick={fetchDebugInfo}
            disabled={loading}
            className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 disabled:opacity-50 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-sm text-gray-600">Loading...</span>
        </div>
      )}

      {debugInfo && (
        <div className="space-y-4">
          {/* Server Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border">
              <h4 className="font-medium text-gray-800 mb-2">🌐 Server Status</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Port:</span> {debugInfo.server?.port}</p>
                <p><span className="font-medium">Uptime:</span> {debugInfo.server?.uptime}</p>
                <p><span className="font-medium">Timestamp:</span> {new Date(debugInfo.timestamp).toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded border">
              <h4 className="font-medium text-gray-800 mb-2">💾 Database Status</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Type:</span> {debugInfo.database?.type}</p>
                <p><span className="font-medium">Connected:</span> 
                  <span className={`ml-1 ${debugInfo.database?.connected ? 'text-green-600' : 'text-red-600'}`}>
                    {debugInfo.database?.connected ? '✅ Yes' : '❌ No'}
                  </span>
                </p>
                <p><span className="font-medium">Total Items:</span> {debugInfo.database?.totalItems}</p>
                <p><span className="font-medium">Empty:</span> 
                  <span className={`ml-1 ${debugInfo.database?.isEmpty ? 'text-yellow-600' : 'text-green-600'}`}>
                    {debugInfo.database?.isEmpty ? '⚠️ Yes' : '✅ No'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium text-gray-800 mb-2">📦 Categories</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div className="bg-blue-50 p-2 rounded text-center">
                <div className="font-medium text-blue-800">Tops</div>
                <div className="text-blue-600">{debugInfo.categories?.tops || 0}</div>
              </div>
              <div className="bg-green-50 p-2 rounded text-center">
                <div className="font-medium text-green-800">Bottoms</div>
                <div className="text-green-600">{debugInfo.categories?.bottoms || 0}</div>
              </div>
              <div className="bg-purple-50 p-2 rounded text-center">
                <div className="font-medium text-purple-800">Shoes</div>
                <div className="text-purple-600">{debugInfo.categories?.shoes || 0}</div>
              </div>
              <div className="bg-yellow-50 p-2 rounded text-center">
                <div className="font-medium text-yellow-800">Accessories</div>
                <div className="text-yellow-600">{debugInfo.categories?.accessories || 0}</div>
              </div>
            </div>
          </div>

          {/* Recent Uploads */}
          {debugInfo.recentUploads && debugInfo.recentUploads.length > 0 && (
            <div className="bg-white p-4 rounded border">
              <h4 className="font-medium text-gray-800 mb-2">📸 Recent Uploads</h4>
              <div className="space-y-2">
                {debugInfo.recentUploads.map((item, index) => (
                  <div key={index} className="text-sm border-l-2 border-gray-200 pl-3">
                    <div className="font-medium">{item.name || 'Unnamed'}</div>
                    <div className="text-gray-600">
                      Category: {item.category} | Color: {item.color || 'unknown'}
                      {item.imageUrl && (
                        <span className="ml-2">
                          | Image: <span className="text-blue-600">{item.imageUrl}</span>
                        </span>
                      )}
                    </div>
                    {item.createdAt && (
                      <div className="text-gray-500 text-xs">
                        Created: {new Date(item.createdAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
        <div className="font-medium text-blue-800 mb-1">📋 API Endpoints:</div>
        <div className="text-blue-700 space-y-1">
          <div>• GET {API_BASE_URL}/test</div>
          <div>• POST {API_BASE_URL}/upload</div>
          <div>• GET {API_BASE_URL}/clothes</div>
          <div>• GET {API_BASE_URL}/debug/full</div>
        </div>
      </div>
    </div>
  );
}