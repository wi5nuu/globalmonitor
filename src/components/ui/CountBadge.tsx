import { cn } from '@/lib/utils';

interface CountBadgeProps {
  count: number;
  label?: string;
  className?: string;
}

export function CountBadge({ count, label = 'AIRCRAFT', className }: CountBadgeProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5',
        'bg-[#0F1E35]/60 rounded-md',
        'border border-[#0EA5E9]/10',
        className
      )}
    >
      <span className="font-mono text-sm font-bold text-[#0EA5E9]">
        {count.toLocaleString()}
      </span>
      <span className="font-mono text-xs text-slate-400 tracking-wider">
        {label}
      </span>
    </div>
  );
}
