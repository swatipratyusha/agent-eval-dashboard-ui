import type { AgentCategory, AgentStatus } from '../../types'

interface FiltersBarProps {
  agentTypeFilter: string
  statusFilter: string
  searchQuery: string
  onAgentTypeChange: (value: string) => void
  onStatusChange: (value: string) => void
  onSearchChange: (value: string) => void
}

const categories: AgentCategory[] = ['Orchestrator', 'Social', 'SEO', 'GEO', 'Tools', 'Content']
const statuses: (AgentStatus | 'All')[] = ['All', 'passing', 'needs_attention']

export function FiltersBar({
  agentTypeFilter,
  statusFilter,
  searchQuery,
  onAgentTypeChange,
  onStatusChange,
  onSearchChange
}: FiltersBarProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center p-4 bg-filter border-b border-gray-200">
      <div className="flex-1 min-w-[200px]">
        <input
          type="text"
          placeholder="Search agents..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 border border-[#006F72] border-opacity-30 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cta"
        />
      </div>
      <div className="flex-shrink-0">
        <select
          value={agentTypeFilter}
          onChange={(e) => onAgentTypeChange(e.target.value)}
          className="w-full min-w-[140px] pl-4 pr-8 py-2 border border-[#006F72] border-opacity-30 rounded-md bg-white text-[#006F72] focus:outline-none focus:ring-2 focus:ring-cta appearance-none"
        >
          <option value="All">All Types</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-shrink-0">
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full min-w-[140px] pl-4 pr-8 py-2 border border-[#006F72] border-opacity-30 rounded-md bg-white text-[#006F72] focus:outline-none focus:ring-2 focus:ring-cta appearance-none"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status === 'All' ? 'All Status' : status === 'passing' ? 'Passing' : 'Needs Attention'}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

