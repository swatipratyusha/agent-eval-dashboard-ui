import { useState, useMemo } from 'react'
import type { AgentSummary, AgentCategory, AgentStatus } from '../../types'
import { getAllAgents } from '../../data/mockData'
import { FiltersBar } from './FiltersBar'
import { AgentsTable } from './AgentsTable'

export function AgentsOverview() {
  const [agentTypeFilter, setAgentTypeFilter] = useState<string>('All')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const allAgents: AgentSummary[] = getAllAgents()

  const filteredAgents = useMemo(() => {
    return allAgents.filter((agent) => {
      const matchesType =
        agentTypeFilter === 'All' || agent.category === (agentTypeFilter as AgentCategory)
      const matchesStatus =
        statusFilter === 'All' || agent.lastEvalResult.status === (statusFilter as AgentStatus)
      const matchesSearch =
        searchQuery === '' ||
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.objective.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesType && matchesStatus && matchesSearch
    })
  }, [agentTypeFilter, statusFilter, searchQuery])

  return (
    <div className="min-h-screen bg-app">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#006F72] mb-6 text-right uppercase">
          Agent Evaluations Dashboard
        </h1>
        <div className="bg-white rounded-lg shadow-[0_4px_16px_0px_rgba(0,111,114,0.4)]">
          <FiltersBar
            agentTypeFilter={agentTypeFilter}
            statusFilter={statusFilter}
            searchQuery={searchQuery}
            onAgentTypeChange={setAgentTypeFilter}
            onStatusChange={setStatusFilter}
            onSearchChange={setSearchQuery}
          />
          <AgentsTable agents={filteredAgents} />
        </div>
      </div>
    </div>
  )
}

