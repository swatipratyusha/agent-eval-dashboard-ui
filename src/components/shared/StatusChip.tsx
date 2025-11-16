import type { AgentStatus } from '../../types'
import { cn } from '../../lib/utils'

interface StatusChipProps {
  status: AgentStatus
  className?: string
}

export function StatusChip({ status, className }: StatusChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        status === 'passing'
          ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-800',
        className
      )}
    >
      {status === 'passing' ? 'Passing' : 'Needs Attention'}
    </span>
  )
}

