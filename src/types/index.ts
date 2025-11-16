export type AgentStatus = 'passing' | 'needs_attention'
export type AgentCategory = 'Orchestrator' | 'Social' | 'SEO' | 'GEO' | 'Tools' | 'Content'
export type MetricStatus = 'ok' | 'slightly_low' | 'needs_work'
export type RecommendationTag = 'prompt_change' | 'test_data' | 'agent_logic'

export interface AgentSummary {
  agentType: string
  name: string
  objective: string
  category: AgentCategory
  lastEvalResult: {
    passRate: number
    status: AgentStatus
    lastRun: string
    testCount: number
    topIssue?: string
  }
}

export interface KeyMetric {
  metric: string
  value: number
  target: number
  status: MetricStatus
}

export interface Recommendation {
  title: string
  description: string
  tag: RecommendationTag
}

export interface AgentDetail extends AgentSummary {
  evalSummary: {
    passRate: number
    testCount: number
    failureCount: number
    failureModes: string[]
  }
  keyMetrics: KeyMetric[]
  recommendations: Recommendation[]
  prompts: {
    current: string
    proposed: string
    version: string
    inUseSince: string
  }
}

