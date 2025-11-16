import type { AgentDetail } from '../../types'

interface EvalSummaryProps {
  agent: AgentDetail
}

export function EvalSummary({ agent }: EvalSummaryProps) {
  const { evalSummary } = agent

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Eval Summary
      </h2>
      <div className="space-y-3">
        <div>
          <span className="text-sm text-gray-600">E2E pass rate: </span>
          <span className="text-lg font-semibold text-gray-900">
            {evalSummary.passRate.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 ml-1">(target ≥ 0.90)</span>
        </div>
        <div>
          <span className="text-sm text-gray-600">#tests: </span>
          <span className="text-gray-900">{evalSummary.testCount}</span>
        </div>
        <div>
          <span className="text-sm text-gray-600">#failures: </span>
          <span className="text-gray-900">{evalSummary.failureCount}</span>
        </div>
        <div className="pt-2">
          <p className="text-sm text-gray-600">
            Primary failure modes: {evalSummary.failureModes.join(', ')}
          </p>
        </div>
      </div>
    </div>
  )
}

