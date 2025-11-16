import type { AgentDetail } from '../../types'

interface RecommendationsPanelProps {
  agent: AgentDetail
}

const tagColors = {
  prompt_change: 'bg-[#006F72] bg-opacity-20 text-[#006F72]',
  test_data: 'bg-purple-100 text-purple-800',
  agent_logic: 'bg-orange-100 text-orange-800'
}

export function RecommendationsPanel({ agent }: RecommendationsPanelProps) {
  if (agent.recommendations.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recommendations
        </h2>
        <p className="text-sm text-gray-500">No recommendations at this time.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Recommendations (from latest eval run)
      </h2>
      <div className="space-y-4">
        {agent.recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="p-4 border border-gray-200 rounded-lg bg-white"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-gray-900">{rec.title}</h3>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${tagColors[rec.tag]}`}
              >
                {rec.tag.replace('_', ' ')}
              </span>
            </div>
            <p className="text-sm text-gray-600">{rec.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

