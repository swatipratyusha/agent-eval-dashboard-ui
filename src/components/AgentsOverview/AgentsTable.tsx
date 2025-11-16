import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { AgentSummary } from '../../types'
import { StatusChip } from '../shared/StatusChip'

interface AgentsTableProps {
  agents: AgentSummary[]
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

export function AgentsTable({ agents }: AgentsTableProps) {
  const navigate = useNavigate()
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const toggleRow = (agentType: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(agentType)) {
        newSet.delete(agentType)
      } else {
        newSet.add(agentType)
      }
      return newSet
    })
  }

  const isExpanded = (agentType: string) => expandedRows.has(agentType)

  return (
    <div className="overflow-x-auto p-6">
      <table className="w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-[24%] px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Agent
            </th>
            <th className="w-[19%] px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Eval Result
            </th>
            <th className="w-[17%] px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Run Info
            </th>
            <th className="w-[26%] px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Top Issue
            </th>
            <th className="w-[14%] px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-table divide-y divide-gray-200">
          {agents.map((agent) => {
            const expanded = isExpanded(agent.agentType)

            return (
              <tr
                key={agent.agentType}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => toggleRow(agent.agentType)}
              >
                <td className="px-6 py-5">
                  <div>
                    <div className={`text-sm font-medium text-gray-900 ${expanded ? '' : 'truncate'}`}>
                      {agent.name}
                    </div>
                    <div className={`text-sm text-gray-500 mt-1 ${expanded ? '' : 'line-clamp-2'}`}>
                      {agent.objective}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-900 whitespace-nowrap">
                      {agent.lastEvalResult.passRate.toFixed(2)}
                    </span>
                    <StatusChip status={agent.lastEvalResult.status} />
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-gray-500">
                  <div className={expanded ? '' : 'truncate'}>{formatDate(agent.lastEvalResult.lastRun)}</div>
                  <div className="mt-1">Tests: {agent.lastEvalResult.testCount}</div>
                </td>
                <td className="px-6 py-5 text-sm text-gray-500">
                  <div className={expanded ? '' : 'line-clamp-2'}>
                    {agent.lastEvalResult.topIssue || '-'}
                  </div>
                </td>
                <td className="px-6 py-5 text-sm overflow-hidden">
                  <div
                    className="inline-block p-1 -m-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/agent/${agent.agentType}`)
                    }}
                  >
                    <button
                      className="text-[#006F72] hover:opacity-80 font-bold transition-opacity break-words"
                    >
                      View details
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}