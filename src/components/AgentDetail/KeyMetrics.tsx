import type { AgentDetail } from '../../types'
import { MetricStatus } from '../shared/MetricStatus'

interface KeyMetricsProps {
  agent: AgentDetail
}

export function KeyMetrics({ agent }: KeyMetricsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Key Metrics
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-3 text-sm font-medium text-gray-500">
                Metric
              </th>
              <th className="text-right py-2 px-3 text-sm font-medium text-gray-500">
                Value
              </th>
              <th className="text-right py-2 px-3 text-sm font-medium text-gray-500">
                Target
              </th>
              <th className="text-right py-2 px-3 text-sm font-medium text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {agent.keyMetrics.map((metric, idx) => (
              <tr key={idx} className="border-b border-gray-100">
                <td className="py-2 px-3 text-sm text-gray-900">
                  {metric.metric}
                </td>
                <td className="py-2 px-3 text-sm text-right text-gray-900">
                  {typeof metric.value === 'number' && metric.value < 10
                    ? metric.value.toFixed(2)
                    : metric.value}
                </td>
                <td className="py-2 px-3 text-sm text-right text-gray-500">
                  ≥ {metric.target}
                </td>
                <td className="py-2 px-3 text-right">
                  <MetricStatus status={metric.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

