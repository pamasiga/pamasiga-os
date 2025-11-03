import { useState } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

/**
 * API Playground Component
 * Embeds Swagger UI for interactive API documentation
 */
export function APIPlayground({ specUrl }) {
  return (
    <div className="api-playground my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <SwaggerUI url={specUrl} />
    </div>
  )
}

/**
 * Simple API Try-It Component
 * For quick API endpoint testing without full Swagger
 */
export function APITryIt({ endpoint, method = 'GET', defaultBody = '{}' }) {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [body, setBody] = useState(defaultBody)
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json"\n}')

  const executeRequest = async () => {
    setLoading(true)
    try {
      const parsedHeaders = JSON.parse(headers)
      const options = {
        method,
        headers: parsedHeaders
      }

      if (method !== 'GET') {
        options.body = body
      }

      const res = await fetch(endpoint, options)
      const data = await res.json()
      setResponse({
        status: res.status,
        statusText: res.statusText,
        body: JSON.stringify(data, null, 2)
      })
    } catch (error) {
      setResponse({
        status: 'Error',
        statusText: error.message,
        body: error.toString()
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="api-try-it my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Request */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded font-mono text-sm font-semibold ${
            method === 'GET' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
            method === 'POST' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
            method === 'PUT' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
            'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
          }`}>
            {method}
          </span>
          <code className="flex-1 font-mono text-sm bg-white dark:bg-gray-900 px-3 py-1 rounded">
            {endpoint}
          </code>
        </div>

        {/* Headers */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Headers</label>
          <textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            className="w-full font-mono text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-2"
            rows={3}
          />
        </div>

        {/* Body (for non-GET requests) */}
        {method !== 'GET' && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Request Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full font-mono text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-2"
              rows={6}
            />
          </div>
        )}

        <button
          onClick={executeRequest}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Sending...' : 'Send Request'}
        </button>
      </div>

      {/* Response */}
      {response && (
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold">Status:</span>
            <span className={`font-mono text-sm ${
              response.status >= 200 && response.status < 300
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {response.status} {response.statusText}
            </span>
          </div>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
            <code>{response.body}</code>
          </pre>
        </div>
      )}
    </div>
  )
}

export default APIPlayground
