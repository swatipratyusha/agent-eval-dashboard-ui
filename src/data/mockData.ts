import type { AgentDetail } from '../types'

export const mockAgents: AgentDetail[] = [
  {
    agentType: 'searchAgent',
    name: 'Search Agent',
    objective: 'Search web and knowledge bases for comprehensive information',
    category: 'Tools',
    lastEvalResult: {
      passRate: 0.87,
      status: 'needs_attention',
      lastRun: '2025-11-16T14:05:00Z',
      testCount: 120,
      topIssue: 'The agent frequently returns placeholder URLs instead of actual links, which significantly impacts user experience and trust. This issue manifests in multiple scenarios: when search results are incomplete, when the agent encounters rate limiting from search APIs, or when it attempts to summarize content from multiple sources without properly extracting the source URLs. In approximately 18% of test cases, users receive responses containing generic placeholders like "source_url_1" or "check the link for more details" instead of actual clickable URLs. This problem is compounded by the agent\'s tendency to provide incomplete information in the response body, forcing users to rely on external links that may not even be valid. Additionally, the agent sometimes generates URLs that appear valid but lead to 404 errors or redirect to unrelated pages, further eroding user confidence. The root cause appears to be insufficient validation of URL extraction from search results and a lack of fallback mechanisms when primary sources fail.'
    },
    evalSummary: {
      passRate: 0.87,
      testCount: 120,
      failureCount: 16,
      failureModes: ['url_quality', 'completeness', 'source_credibility']
    },
    keyMetrics: [
      { metric: 'E2E pass rate', value: 0.87, target: 0.90, status: 'needs_work' },
      { metric: 'URL accuracy', value: 0.82, target: 0.95, status: 'needs_work' },
      { metric: 'Content completeness', value: 0.91, target: 0.95, status: 'slightly_low' },
      { metric: 'Source diversity', value: 0.94, target: 0.90, status: 'ok' }
    ],
    recommendations: [
      {
        title: 'Enforce actual URL extraction',
        description: 'The agent returns placeholder URLs in 18% of responses. Add explicit validation to ensure all URLs are real, clickable links from search results.',
        tag: 'prompt_change'
      },
      {
        title: 'Strengthen completeness requirements',
        description: '9% of responses tell users to "check the link" instead of providing complete information. Emphasize that responses must be self-contained.',
        tag: 'prompt_change'
      }
    ],
    prompts: {
      current: 'You are a comprehensive search assistant. Search the web and knowledge bases. Always provide complete information in your response. Include actual URLs from sources.',
      proposed: 'You are a comprehensive search assistant. Search the web and knowledge bases. CRITICAL: You MUST include actual, clickable URLs (not placeholders) for every source. Provide complete information so users do not need to click links. Never say "check the link" or similar phrases.',
      version: 'v7',
      inUseSince: '2025-11-10'
    }
  },
  {
    agentType: 'xAgent',
    name: 'X Platform Agent',
    objective: 'Search, fetch, and analyze X (Twitter) posts and accounts',
    category: 'Social',
    lastEvalResult: {
      passRate: 0.92,
      status: 'passing',
      lastRun: '2025-11-16T13:45:00Z',
      testCount: 95,
      topIssue: 'Occasionally summarizes post content instead of showing full text'
    },
    evalSummary: {
      passRate: 0.92,
      testCount: 95,
      failureCount: 8,
      failureModes: ['completeness', 'url_accuracy']
    },
    keyMetrics: [
      { metric: 'E2E pass rate', value: 0.92, target: 0.90, status: 'ok' },
      { metric: 'Post content completeness', value: 0.94, target: 0.95, status: 'slightly_low' },
      { metric: 'URL format accuracy', value: 0.97, target: 0.95, status: 'ok' },
      { metric: 'Thread handling', value: 0.98, target: 0.95, status: 'ok' }
    ],
    recommendations: [
      {
        title: 'Enforce full post text display',
        description: '6% of responses summarize posts instead of showing complete text. Add explicit instruction to always display full post content without summarization.',
        tag: 'prompt_change'
      }
    ],
    prompts: {
      current: 'You are an X platform specialist. Fetch tweets and analyze accounts. Show post content clearly.',
      proposed: 'You are an X platform specialist. Fetch tweets and analyze accounts. CRITICAL: Always display the FULL TEXT of each post without summarization. Never say "This post discusses..." - show the actual content.',
      version: 'v5',
      inUseSince: '2025-11-08'
    }
  },
  {
    agentType: 'articleOrchestrator',
    name: 'Article Orchestrator',
    objective: 'Coordinate multi-step article creation workflows',
    category: 'Orchestrator',
    lastEvalResult: {
      passRate: 0.75,
      status: 'needs_attention',
      lastRun: '2025-11-16T12:30:00Z',
      testCount: 80,
      topIssue: 'Frequently skips required tool calls in workflow'
    },
    evalSummary: {
      passRate: 0.75,
      testCount: 80,
      failureCount: 20,
      failureModes: ['tool_selection', 'workflow_completeness', 'latency']
    },
    keyMetrics: [
      { metric: 'E2E pass rate', value: 0.75, target: 0.90, status: 'needs_work' },
      { metric: 'Workflow completeness', value: 0.78, target: 0.95, status: 'needs_work' },
      { metric: 'Tool call success', value: 0.96, target: 0.95, status: 'ok' },
      { metric: 'Average latency', value: 12.5, target: 10.0, status: 'needs_work' }
    ],
    recommendations: [
      {
        title: 'Clarify tool-selection criteria and enforce mandatory workflow steps with comprehensive validation mechanisms',
        description: 'The agent skips required tools in 22% of workflows, which significantly impacts the quality and completeness of article generation. This issue manifests across multiple workflow types including research-intensive articles, opinion pieces, and data-driven content. Analysis of failure patterns reveals that the agent tends to skip tools when: (1) it encounters errors from a previous tool call and assumes the workflow can proceed without that step, (2) it receives partial data that seems sufficient but is actually incomplete, (3) it attempts to optimize for speed by skipping what it perceives as "optional" steps, or (4) it encounters rate limiting or API errors and fails to implement proper retry logic. The root cause appears to be insufficient validation of workflow completeness before final output generation. To address this, we need to add explicit checklists of mandatory tools for each workflow type, implement pre-output validation that verifies all required tool calls have been executed successfully, add retry mechanisms with exponential backoff for failed tool calls, and create explicit error handling that prevents workflow completion when mandatory steps are missing. Additionally, the prompt should emphasize that workflow completeness takes precedence over speed optimization, and that partial data is never acceptable for final outputs.',
        tag: 'prompt_change'
      },
      {
        title: 'Optimize tool call sequencing and implement parallel execution strategies to reduce latency while maintaining data consistency',
        description: 'Average latency is 25% above target at 12.5 seconds, which creates a poor user experience especially for time-sensitive content requests. Current sequential tool execution means that each tool call waits for the previous one to complete, even when dependencies don\'t exist. Analysis shows that approximately 40% of tool calls could be executed in parallel, including: independent search queries, metadata retrieval operations, and validation checks that don\'t depend on previous results. However, parallel execution must be implemented carefully to maintain data consistency and avoid race conditions. The solution requires: (1) dependency analysis to identify which tool calls can run in parallel, (2) implementation of a task queue system that supports parallel execution with proper error handling, (3) timeout mechanisms to prevent individual tool calls from blocking the entire workflow, (4) caching strategies for frequently accessed data to reduce redundant API calls, and (5) monitoring and logging to track latency metrics and identify bottlenecks. Additionally, the agent logic should be updated to support async/await patterns and proper promise handling to ensure that parallel executions complete successfully before proceeding to dependent steps.',
        tag: 'agent_logic'
      },
      {
        title: 'Implement comprehensive error recovery and fallback mechanisms for tool call failures',
        description: 'When tool calls fail, the agent currently abandons the workflow or produces incomplete outputs. This occurs in approximately 8% of test cases and significantly impacts reliability. The system needs robust error recovery that includes: automatic retry with exponential backoff for transient failures, fallback to alternative data sources when primary tools are unavailable, graceful degradation that provides partial results with clear indicators of what data is missing, and comprehensive error logging that helps identify systemic issues. Additionally, the agent should be able to detect when a tool call failure is critical versus non-critical, and adjust workflow execution accordingly.',
        tag: 'agent_logic'
      }
    ],
    prompts: {
      current: 'Coordinate article creation. Use available tools to gather context, research, and generate content. Ensure all steps are completed before finalizing the article. Validate that required information is present and accurate. Handle errors gracefully and retry failed operations when appropriate. Maintain consistency across all workflow steps and ensure the final output meets quality standards.',
      proposed: 'Coordinate article creation workflows with strict adherence to mandatory tool sequences. CRITICAL WORKFLOW REQUIREMENTS: (1) MANDATORY TOOLS CHECKLIST - You MUST call all required tools in the correct sequence: Search for context → Analyze past articles → Validate data completeness → Generate article structure → Generate article content → Final validation. Do not skip any step, even if you believe you have sufficient information. (2) PARALLEL EXECUTION - When tool calls are independent (e.g., multiple search queries), execute them in parallel to reduce latency. Use Promise.all() for independent operations. (3) ERROR HANDLING - If any tool call fails, implement retry logic with exponential backoff (wait 1s, then 2s, then 4s before retrying, max 3 attempts). If a tool call fails after retries, use fallback mechanisms: for search failures, try alternative search queries; for data retrieval failures, use cached data if available; for validation failures, flag the issue but continue with warnings. Never abandon the workflow due to a single tool failure. (4) VALIDATION CHECKPOINTS - Before proceeding to the next workflow step, validate that the current step produced complete and accurate results. If validation fails, retry the step or use fallback data. (5) COMPLETENESS VERIFICATION - Before generating final output, verify that all mandatory tool calls completed successfully and that all required data is present. If any mandatory data is missing, do not generate the final output - instead, retry the missing steps or return an error indicating what data is unavailable. (6) LATENCY OPTIMIZATION - While maintaining completeness, optimize for speed by: executing independent tool calls in parallel, using cached data when appropriate, and avoiding redundant API calls. However, never sacrifice completeness for speed. (7) QUALITY STANDARDS - The final article must be comprehensive, accurate, well-structured, and meet all specified requirements. If quality standards cannot be met due to missing data, do not produce a substandard output - instead, clearly indicate what information is missing and why the article cannot be completed.',
      version: 'v12',
      inUseSince: '2025-11-05'
    }
  },
  {
    agentType: 'semrushAgent',
    name: 'SEMrush SEO Agent',
    objective: 'Retrieve and analyze SEO data from SEMrush',
    category: 'SEO',
    lastEvalResult: {
      passRate: 0.89,
      status: 'needs_attention',
      lastRun: '2025-11-16T11:15:00Z',
      testCount: 65,
      topIssue: 'Sometimes returns incomplete keyword data'
    },
    evalSummary: {
      passRate: 0.89,
      testCount: 65,
      failureCount: 7,
      failureModes: ['completeness', 'data_accuracy']
    },
    keyMetrics: [
      { metric: 'E2E pass rate', value: 0.89, target: 0.90, status: 'slightly_low' },
      { metric: 'Data completeness', value: 0.91, target: 0.95, status: 'slightly_low' },
      { metric: 'Insight quality', value: 0.93, target: 0.90, status: 'ok' }
    ],
    recommendations: [
      {
        title: 'Enforce complete data retrieval',
        description: '9% of responses return partial keyword data. Add validation to ensure all requested metrics are included before responding.',
        tag: 'agent_logic'
      }
    ],
    prompts: {
      current: 'Retrieve SEO data from SEMrush. Analyze and explain the results clearly.',
      proposed: 'Retrieve SEO data from SEMrush. CRITICAL: Verify all requested data fields are present before responding. If any field is missing, retry the API call.',
      version: 'v4',
      inUseSince: '2025-11-12'
    }
  },
  {
    agentType: 'wordpressAgent',
    name: 'WordPress Agent',
    objective: 'Perform WordPress operations (create, update, delete posts)',
    category: 'Tools',
    lastEvalResult: {
      passRate: 0.96,
      status: 'passing',
      lastRun: '2025-11-16T10:00:00Z',
      testCount: 50,
      topIssue: undefined
    },
    evalSummary: {
      passRate: 0.96,
      testCount: 50,
      failureCount: 2,
      failureModes: ['error_handling']
    },
    keyMetrics: [
      { metric: 'E2E pass rate', value: 0.96, target: 0.90, status: 'ok' },
      { metric: 'Operation success rate', value: 0.98, target: 0.95, status: 'ok' },
      { metric: 'Error clarity', value: 0.94, target: 0.90, status: 'ok' }
    ],
    recommendations: [],
    prompts: {
      current: 'Perform WordPress operations. Handle errors gracefully and provide clear feedback.',
      proposed: 'Perform WordPress operations. Handle errors gracefully and provide clear feedback.',
      version: 'v3',
      inUseSince: '2025-11-01'
    }
  },
  {
    agentType: 'youtubeAgent',
    name: 'YouTube Agent',
    objective: 'Search videos, fetch transcripts, and analyze YouTube content',
    category: 'Social',
    lastEvalResult: {
      passRate: 0.91,
      status: 'passing',
      lastRun: '2025-11-16T09:30:00Z',
      testCount: 70,
      topIssue: 'Occasional transcript parsing errors'
    },
    evalSummary: {
      passRate: 0.91,
      testCount: 70,
      failureCount: 6,
      failureModes: ['transcript_quality']
    },
    keyMetrics: [
      { metric: 'E2E pass rate', value: 0.91, target: 0.90, status: 'ok' },
      { metric: 'Transcript accuracy', value: 0.93, target: 0.95, status: 'slightly_low' },
      { metric: 'Video metadata quality', value: 0.97, target: 0.95, status: 'ok' }
    ],
    recommendations: [
      {
        title: 'Improve transcript error handling',
        description: '8% of transcript fetches fail silently. Add retry logic and clear error messages when transcripts are unavailable.',
        tag: 'agent_logic'
      }
    ],
    prompts: {
      current: 'Search YouTube videos and fetch transcripts. Provide comprehensive video analysis.',
      proposed: 'Search YouTube videos and fetch transcripts. If transcript fetch fails, retry once and clearly indicate if transcript is unavailable.',
      version: 'v6',
      inUseSince: '2025-11-07'
    }
  },
  {
    agentType: 'articleAnalyzeAgent',
    name: 'Article Analysis Agent',
    objective: 'Analyze past articles to extract writing patterns and insights',
    category: 'Content',
    lastEvalResult: {
      passRate: 0.83,
      status: 'needs_attention',
      lastRun: '2025-11-16T08:15:00Z',
      testCount: 45,
      topIssue: 'Analysis depth inconsistent across articles'
    },
    evalSummary: {
      passRate: 0.83,
      testCount: 45,
      failureCount: 8,
      failureModes: ['analysis_depth', 'insight_quality']
    },
    keyMetrics: [
      { metric: 'E2E pass rate', value: 0.83, target: 0.90, status: 'needs_work' },
      { metric: 'Analysis depth', value: 0.85, target: 0.95, status: 'needs_work' },
      { metric: 'Insight actionability', value: 0.88, target: 0.90, status: 'slightly_low' }
    ],
    recommendations: [
      {
        title: 'Standardize analysis framework',
        description: 'Analysis quality varies significantly. Implement a consistent analysis template covering structure, tone, SEO, and engagement patterns.',
        tag: 'prompt_change'
      }
    ],
    prompts: {
      current: 'Analyze articles to extract patterns. Identify key insights about writing style and effectiveness.',
      proposed: 'Analyze articles using this framework: 1) Structure analysis 2) Tone and voice 3) SEO elements 4) Engagement patterns 5) Actionable recommendations. Complete all sections for every article.',
      version: 'v8',
      inUseSince: '2025-11-03'
    }
  },
  {
    agentType: 'promptAnalyzeAgent',
    name: 'GEO Prompt Analyzer',
    objective: 'Analyze prompts for geographic and localization requirements',
    category: 'GEO',
    lastEvalResult: {
      passRate: 0.88,
      status: 'needs_attention',
      lastRun: '2025-11-15T16:00:00Z',
      testCount: 55,
      topIssue: 'The agent frequently fails to identify regional context requirements when they are expressed implicitly rather than through explicit location keywords. This occurs in approximately 13% of test cases where prompts contain cultural references, regional business practices, or location-specific regulations that are not immediately obvious. For instance, when a prompt mentions "holiday shopping patterns" without specifying a country, the agent should infer regional context from other cues like currency mentions, seasonal references, or cultural indicators. Additionally, the agent struggles with multi-region scenarios where a single prompt requires analysis across multiple geographic contexts, often defaulting to a generic response rather than providing region-specific insights. This limitation significantly impacts the quality of localization recommendations and can lead to inappropriate content suggestions for specific markets.'
    },
    evalSummary: {
      passRate: 0.88,
      testCount: 55,
      failureCount: 7,
      failureModes: ['analysis_accuracy', 'completeness']
    },
    keyMetrics: [
      { metric: 'E2E pass rate', value: 0.88, target: 0.90, status: 'slightly_low' },
      { metric: 'Analysis accuracy', value: 0.90, target: 0.95, status: 'slightly_low' },
      { metric: 'Regional context detection', value: 0.87, target: 0.95, status: 'needs_work' }
    ],
    recommendations: [
      {
        title: 'Enhance regional context detection',
        description: '13% of prompts with regional requirements are not properly identified. Add explicit checks for location keywords, cultural references, and language indicators.',
        tag: 'prompt_change'
      }
    ],
    prompts: {
      current: 'Analyze prompts for geographic and localization needs. Identify regional requirements.',
      proposed: 'Analyze prompts for geographic and localization needs. MANDATORY CHECKS: 1) Location keywords 2) Cultural references 3) Language indicators 4) Regional regulations. Flag all detected requirements.',
      version: 'v5',
      inUseSince: '2025-11-09'
    }
  },
  {
    agentType: 'metaThreadsAgent',
    name: 'Meta Threads Agent',
    objective: 'Search and analyze Threads posts from connected accounts',
    category: 'Social',
    lastEvalResult: {
      passRate: 0.90,
      status: 'passing',
      lastRun: '2025-11-15T15:20:00Z',
      testCount: 40,
      topIssue: undefined
    },
    evalSummary: {
      passRate: 0.90,
      testCount: 40,
      failureCount: 4,
      failureModes: ['relevance']
    },
    keyMetrics: [
      { metric: 'E2E pass rate', value: 0.90, target: 0.90, status: 'ok' },
      { metric: 'Search relevance', value: 0.92, target: 0.90, status: 'ok' },
      { metric: 'Post content quality', value: 0.95, target: 0.95, status: 'ok' }
    ],
    recommendations: [],
    prompts: {
      current: 'Search Threads posts from connected accounts. Present results clearly with full post content.',
      proposed: 'Search Threads posts from connected accounts. Present results clearly with full post content.',
      version: 'v2',
      inUseSince: '2025-11-14'
    }
  },
  {
    agentType: 'fbPostAnalyzeAgent',
    name: 'Facebook Post Analyzer',
    objective: 'Analyze Facebook posts for engagement and performance',
    category: 'Social',
    lastEvalResult: {
      passRate: 0.86,
      status: 'needs_attention',
      lastRun: '2025-11-15T14:10:00Z',
      testCount: 60,
      topIssue: 'Engagement metrics sometimes incomplete'
    },
    evalSummary: {
      passRate: 0.86,
      testCount: 60,
      failureCount: 8,
      failureModes: ['completeness', 'analysis_depth']
    },
    keyMetrics: [
      { metric: 'E2E pass rate', value: 0.86, target: 0.90, status: 'needs_work' },
      { metric: 'Metric completeness', value: 0.88, target: 0.95, status: 'needs_work' },
      { metric: 'Analysis depth', value: 0.91, target: 0.90, status: 'ok' }
    ],
    recommendations: [
      {
        title: 'Standardize engagement metrics',
        description: '12% of analyses miss key engagement metrics. Create a required metrics checklist: likes, comments, shares, reach, engagement rate.',
        tag: 'prompt_change'
      }
    ],
    prompts: {
      current: 'Analyze Facebook posts. Extract engagement metrics and performance insights.',
      proposed: 'Analyze Facebook posts. REQUIRED METRICS: likes, comments, shares, reach, engagement rate. If any metric is unavailable, explicitly state "N/A" with reason.',
      version: 'v4',
      inUseSince: '2025-11-06'
    }
  },
  {
    agentType: 'igPostAnalyzeAgent',
    name: 'Instagram Post Analyzer',
    objective: 'Analyze Instagram posts for performance and engagement',
    category: 'Social',
    lastEvalResult: {
      passRate: 0.89,
      status: 'needs_attention',
      lastRun: '2025-11-15T13:00:00Z',
      testCount: 55,
      topIssue: 'Hashtag analysis sometimes missing'
    },
    evalSummary: {
      passRate: 0.89,
      testCount: 55,
      failureCount: 6,
      failureModes: ['completeness']
    },
    keyMetrics: [
      { metric: 'E2E pass rate', value: 0.89, target: 0.90, status: 'slightly_low' },
      { metric: 'Hashtag analysis', value: 0.91, target: 0.95, status: 'slightly_low' },
      { metric: 'Visual content assessment', value: 0.93, target: 0.90, status: 'ok' }
    ],
    recommendations: [
      {
        title: 'Include hashtag performance analysis',
        description: '11% of analyses omit hashtag performance data. Add explicit instruction to analyze hashtag reach and engagement for each post.',
        tag: 'prompt_change'
      }
    ],
    prompts: {
      current: 'Analyze Instagram posts. Assess performance metrics and visual content quality.',
      proposed: 'Analyze Instagram posts. MANDATORY SECTIONS: 1) Engagement metrics 2) Hashtag performance 3) Visual content assessment 4) Best posting time insights.',
      version: 'v3',
      inUseSince: '2025-11-11'
    }
  },
  {
    agentType: 'generateNoteArticleAgent',
    name: 'Note Article Generator',
    objective: 'Generate articles from user notes and research',
    category: 'Content',
    lastEvalResult: {
      passRate: 0.82,
      status: 'needs_attention',
      lastRun: '2025-11-15T12:00:00Z',
      testCount: 35,
      topIssue: 'Generated articles sometimes miss key points from notes'
    },
    evalSummary: {
      passRate: 0.82,
      testCount: 35,
      failureCount: 6,
      failureModes: ['completeness', 'relevance']
    },
    keyMetrics: [
      { metric: 'E2E pass rate', value: 0.82, target: 0.90, status: 'needs_work' },
      { metric: 'Content completeness', value: 0.85, target: 0.95, status: 'needs_work' },
      { metric: 'Note coverage', value: 0.88, target: 0.95, status: 'needs_work' }
    ],
    recommendations: [
      {
        title: 'Enforce note point coverage',
        description: '18% of generated articles miss important points from source notes. Add validation to ensure all key points are addressed before finalizing article.',
        tag: 'agent_logic'
      },
      {
        title: 'Improve note-to-article mapping',
        description: 'Add explicit step to create mapping between note points and article sections to ensure nothing is missed.',
        tag: 'prompt_change'
      }
    ],
    prompts: {
      current: 'Generate articles from notes. Ensure all key points are included and well-structured.',
      proposed: 'Generate articles from notes. STEP 1: Create mapping of note points to article sections. STEP 2: Verify all note points are covered. STEP 3: Generate article. Do not proceed to step 3 until step 2 validation passes.',
      version: 'v7',
      inUseSince: '2025-11-04'
    }
  }
]

export function getAgentByType(agentType: string): AgentDetail | undefined {
  return mockAgents.find(agent => agent.agentType === agentType)
}

export function getAllAgents(): AgentDetail[] {
  return mockAgents
}

