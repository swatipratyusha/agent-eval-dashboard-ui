import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getAgentByType } from '../../data/mockData'
import { AgentHeader } from './AgentHeader'
import { EvalSummary } from './EvalSummary'
import { KeyMetrics } from './KeyMetrics'
import { RecommendationsPanel } from './RecommendationsPanel'
import { PromptWorkspace } from './PromptWorkspace'

export function AgentDetail() {
  const { agentType } = useParams<{ agentType: string }>()
  const navigate = useNavigate()

  if (!agentType) {
    navigate('/')
    return null
  }

  const agent = getAgentByType(agentType)

  if (!agent) {
    return (
      <div className="min-h-screen bg-app flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Agent not found
          </h1>
          <button
            onClick={() => navigate('/')}
            className="text-[#006F72] hover:opacity-80 font-bold"
          >
            Back to agents
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-app">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-[#006F72] hover:opacity-80 font-bold flex items-center gap-1"
        >
          <ArrowLeft className="w-7 h-3 object-none stroke-[3]" />
          Back to overview
        </button>
        <AgentHeader agent={agent} />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EvalSummary agent={agent} />
          <KeyMetrics agent={agent} />
        </div>
        <div className="mt-8">
          <RecommendationsPanel agent={agent} />
        </div>
        <div className="mt-8">
          <PromptWorkspace agent={agent} />
        </div>
      </div>
    </div>
  )
}

