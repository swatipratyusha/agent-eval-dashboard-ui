import { useState } from 'react'
import type { AgentDetail } from '../../types'
import { Copy, Check } from 'lucide-react'

interface PromptWorkspaceProps {
  agent: AgentDetail
}

export function PromptWorkspace({ agent }: PromptWorkspaceProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(agent.prompts.proposed)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Prompt Workspace
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2 min-h-[32px]">
            <h3 className="text-sm font-medium text-gray-700">
              Current Prompt
            </h3>
            <div className="text-xs text-gray-500 text-right">
              v{agent.prompts.version} • In use since{' '}
              {new Date(agent.prompts.inUseSince).toLocaleDateString()}
            </div>
          </div>
          <textarea
            readOnly
            value={agent.prompts.current}
            className="w-full h-64 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 font-mono text-sm resize-none focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2 min-h-[32px]">
            <h3 className="text-sm font-medium text-gray-700">
              Proposed Prompt
            </h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-[#006F72] text-gray-200 hover:opacity-90 font-medium flex-shrink-0 rounded"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>
          <textarea
            readOnly
            value={agent.prompts.proposed}
            className="w-full h-64 p-3 border border-gray-300 rounded-md bg-[#006F72] bg-opacity-5 text-gray-900 font-mono text-sm resize-none focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}

