import type { AgentDetail } from '../../types'
import { StatusChip } from '../shared/StatusChip'

interface AgentHeaderProps {
  agent: AgentDetail
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata'
  }).format(date)
}

export function AgentHeader({ agent }: AgentHeaderProps) {
  return (
    <header className="flex justify-between items-start pb-6 border-b border-gray-200">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {agent.name}
        </h1>
        <p className="text-gray-600 mb-4">{agent.objective}</p>
        <StatusChip status={agent.lastEvalResult.status} />
      </div>
      <div className="flex-shrink-0 ml-6 text-right text-sm text-gray-500">
        <div>Last eval run: {formatDate(agent.lastEvalResult.lastRun)}</div>
      </div>
    </header>
  )
}

