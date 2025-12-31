'use client'

import { useState } from 'react'
import { Code, Send, Key, CheckCircle, XCircle, Globe } from 'lucide-react'

export default function APIIntegration() {
  const [apiKey, setApiKey] = useState('')
  const [endpoint, setEndpoint] = useState('')
  const [method, setMethod] = useState('GET')
  const [requestBody, setRequestBody] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiCalls, setApiCalls] = useState<any[]>([])

  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']

  const predefinedAPIs = [
    { name: 'Weather API', url: 'https://api.openweathermap.org/data/2.5/weather' },
    { name: 'News API', url: 'https://newsapi.org/v2/top-headlines' },
    { name: 'GitHub API', url: 'https://api.github.com/users/' },
    { name: 'JSONPlaceholder', url: 'https://jsonplaceholder.typicode.com/posts' },
  ]

  const makeAPICall = async () => {
    if (!endpoint) {
      setResponse('Error: Please enter an API endpoint')
      return
    }

    setIsLoading(true)
    const startTime = Date.now()

    try {
      const options: any = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      }

      if (apiKey) {
        options.headers['Authorization'] = `Bearer ${apiKey}`
      }

      if (method !== 'GET' && requestBody) {
        options.body = requestBody
      }

      const res = await fetch(endpoint, options)
      const data = await res.json()
      const duration = Date.now() - startTime

      setResponse(JSON.stringify(data, null, 2))

      setApiCalls(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString(),
        method,
        endpoint,
        status: res.status,
        duration: `${duration}ms`,
        success: res.ok,
      }].slice(-10))

    } catch (error: any) {
      setResponse(`Error: ${error.message}`)
      setApiCalls(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString(),
        method,
        endpoint,
        status: 'Error',
        duration: 'N/A',
        success: false,
      }].slice(-10))
    }

    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">API Integration</h2>

      {/* Quick API Selection */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Globe className="w-6 h-6" />
          Quick API Selection
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {predefinedAPIs.map((api, idx) => (
            <button
              key={idx}
              onClick={() => setEndpoint(api.url)}
              className="px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-blue-300 text-sm transition-all"
            >
              {api.name}
            </button>
          ))}
        </div>
      </div>

      {/* API Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Key className="w-6 h-6" />
            API Configuration
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">API Key (Optional)</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">HTTP Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                {methods.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">API Endpoint</label>
              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="https://api.example.com/endpoint"
                className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {method !== 'GET' && (
              <div>
                <label className="block text-sm text-gray-400 mb-2">Request Body (JSON)</label>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  placeholder='{"key": "value"}'
                  rows={4}
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-mono text-sm"
                />
              </div>
            )}

            <button
              onClick={makeAPICall}
              disabled={isLoading}
              className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {isLoading ? 'Sending...' : 'Send Request'}
            </button>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Code className="w-6 h-6" />
            API Response
          </h3>
          <div className="bg-black/50 rounded-lg p-4 h-96 overflow-auto">
            <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
              {response || 'No response yet. Make an API call to see results.'}
            </pre>
          </div>
        </div>
      </div>

      {/* API Call History */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">API Call History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Time</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Method</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Endpoint</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Duration</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Result</th>
              </tr>
            </thead>
            <tbody>
              {apiCalls.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    No API calls made yet
                  </td>
                </tr>
              ) : (
                apiCalls.map((call, idx) => (
                  <tr key={idx} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-3 px-4 text-white text-sm">{call.timestamp}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-medium">
                        {call.method}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300 text-sm truncate max-w-xs">
                      {call.endpoint}
                    </td>
                    <td className="py-3 px-4 text-white text-sm">{call.status}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{call.duration}</td>
                    <td className="py-3 px-4">
                      {call.success ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
