import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

/**
 * SDK Language Tabs Component
 *
 * Usage:
 * <Tabs items={['JavaScript', 'Python', 'Go']}>
 *   <Tabs.Tab>
 *     ```js
 *     console.log('Hello')
 *     ```
 *   </Tabs.Tab>
 *   <Tabs.Tab>
 *     ```python
 *     print('Hello')
 *     ```
 *   </Tabs.Tab>
 *   <Tabs.Tab>
 *     ```go
 *     fmt.Println("Hello")
 *     ```
 *   </Tabs.Tab>
 * </Tabs>
 */
export function Tabs({ items, children, defaultIndex = 0 }) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)

  return (
    <div className="tabs-container my-6">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`
              px-4 py-2 font-medium text-sm transition-colors
              ${selectedIndex === index
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }
            `}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {Array.isArray(children) ? children[selectedIndex] : children}
      </div>
    </div>
  )
}

// Sub-component for individual tab panels
Tabs.Tab = function Tab({ children }) {
  return <div className="tab-panel">{children}</div>
}

/**
 * Code Block with Copy Button
 */
export function CodeBlock({ code, language = 'javascript', filename }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block-wrapper my-4">
      {filename && (
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-mono border-b border-gray-200 dark:border-gray-700">
          {filename}
        </div>
      )}
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 rounded bg-gray-700 hover:bg-gray-600 text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  )
}

export default Tabs
