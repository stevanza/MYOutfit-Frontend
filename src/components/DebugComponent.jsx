'use client';

import { useState } from 'react';

export default function DebugComponent() {
  const [testResult, setTestResult] = useState('');
  const [testing, setTesting] = useState(false);

  const testBackend = async () => {
    setTesting(true);
    setTestResult('Starting comprehensive backend test...\n');

    try {
      // Test environment variables
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const fallbackUrl = 'http://localhost:5001/api';
      const finalUrl = apiUrl || fallbackUrl;

      setTestResult(prev => prev + `📋 Environment Check:
• NEXT_PUBLIC_API_URL: ${apiUrl || 'NOT SET'}
• Fallback URL: ${fallbackUrl}
• Final URL: ${finalUrl}
• Window location: ${typeof window !== 'undefined' ? window.location.origin : 'N/A'}\n`);

      // Test 1: Basic backend connection
      setTestResult(prev => prev + '\n🔄 Test 1: Basic backend connection...\n');
      
      try {
        const response = await fetch(`${finalUrl}/test`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setTestResult(prev => prev + `✅ Backend connection SUCCESS!
• Status: ${response.status}
• Response: ${JSON.stringify(data, null, 2)}\n`);
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        setTestResult(prev => prev + `❌ Backend connection FAILED: ${error.message}\n`);
        throw error;
      }

      // Test 2: Upload endpoint existence
      setTestResult(prev => prev + '\n🔄 Test 2: Testing upload endpoint...\n');
      
      try {
        const response = await fetch(`${finalUrl}/upload`, {
          method: 'OPTIONS',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        setTestResult(prev => prev + `✅ Upload endpoint accessible!
• Status: ${response.status}
• CORS headers: ${JSON.stringify(Object.fromEntries(
  [...response.headers.entries()].filter(([key]) => 
    key.toLowerCase().includes('access-control')
  )
), null, 2)}\n`);
      } catch (error) {
        setTestResult(prev => prev + `❌ Upload endpoint test FAILED: ${error.message}\n`);
      }

      // Test 3: Mock multipart upload
      setTestResult(prev => prev + '\n🔄 Test 3: Testing multipart upload format...\n');
      
      try {
        const formData = new FormData();
        formData.append('name', 'Test Item');
        formData.append('category', 'accessories');
        
        // Create a tiny test image blob
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        formData.append('image', blob, 'test.png');

        const response = await fetch(`${finalUrl}/upload`, {
          method: 'POST',
          mode: 'cors',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          setTestResult(prev => prev + `✅ Mock upload SUCCESS!
• Status: ${response.status}
• Response: ${JSON.stringify(result, null, 2)}\n`);
        } else {
          const errorText = await response.text();
          setTestResult(prev => prev + `⚠️ Mock upload failed but endpoint responding:
• Status: ${response.status}
• Error: ${errorText}\n`);
        }
      } catch (error) {
        setTestResult(prev => prev + `❌ Mock upload FAILED: ${error.message}\n`);
      }

      setTestResult(prev => prev + '\n🎉 All tests completed! Check results above.\n');

    } catch (error) {
      setTestResult(prev => prev + `\n💥 CRITICAL ERROR: ${error.message}
      
🔧 Troubleshooting Steps:
1. ✅ Check if backend is running: npm run dev in backend folder
2. ✅ Verify backend URL: http://localhost:5001/api/test (open in browser)
3. ✅ Check .env file exists in frontend root with: NEXT_PUBLIC_API_URL=http://localhost:5001/api
4. ✅ Restart both servers after env changes
5. ✅ Check backend logs for errors\n`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">🔧 Backend Connection Debug</h3>
      
      <button
        onClick={testBackend}
        disabled={testing}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 mb-3"
      >
        {testing ? 'Testing...' : 'Test Backend Connection'}
      </button>

      {testResult && (
        <div className="bg-white p-3 rounded border">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap">{testResult}</pre>
        </div>
      )}
    </div>
  );
}