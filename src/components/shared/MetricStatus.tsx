import type { MetricStatus as MetricStatusType } from '../../types'
import { cn } from '../../lib/utils'

interface MetricStatusProps {
  status: MetricStatusType
  className?: string
}

export function MetricStatus({ status, className }: MetricStatusProps) {
  const config = {
    ok: { label: 'OK', color: 'text-green-600' },
    slightly_low: { label: 'Slightly Low', color: 'text-yellow-600' },
    needs_work: { label: 'Needs Work', color: 'text-red-600' }
  }

  const { label, color } = config[status]

  return <span className={cn('text-sm font-medium', color, className)}>{label}</span>
}

