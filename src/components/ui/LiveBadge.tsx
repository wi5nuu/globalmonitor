import { cn } from '@/lib/utils';

interface LiveBadgeProps {
  status?: 'fresh' | 'stale' | 'error';
  className?: string;
}

export function LiveBadge({ status = 'fresh', className }: LiveBadgeProps) {
  const statusConfig = {
    fresh: {
      dotColor: 'bg-green-500',
      textColor: 'text-green-400',
      pingColor: 'bg-green-500',
    },
    stale: {
      dotColor: 'bg-amber-500',
      textColor: 'text-amber-400',
      pingColor: 'bg-amber-500',
    },
    error: {
      dotColor: 'bg-red-500',
      textColor: 'text-red-400',
      pingColor: 'bg-red-500',
    },
  };

  const config = statusConfig[status];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="relative flex h-2.5 w-2.5">
        <span
          className={cn(
            'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
            config.pingColor
          )}
        />
        <span
          className={cn(
            'relative inline-flex rounded-full h-2.5 w-2.5',
            config.dotColor
          )}
        />
      </span>
      <span className={cn('font-mono text-xs font-semibold tracking-wider', config.textColor)}>
        LIVE
      </span>
    </div>
  );
}
