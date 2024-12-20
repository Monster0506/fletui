import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const CodeBlock = ({ code = '' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className="relative bg-gray-900 rounded-lg h-full shadow-lg">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors z-10"
        title="Copy code"
      >
        {copied ? (
          <Check size={16} className="text-green-400" />
        ) : (
          <Copy size={16} />
        )}
      </button>
      <div className="h-full overflow-auto bg-gray-800/50">
        <pre className="p-4 text-gray-300 font-mono text-sm">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

export default CodeBlock
