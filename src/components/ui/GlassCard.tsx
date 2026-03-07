import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function GlassCard({ children, className, padding = 'md' }: GlassCardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={cn(
        'bg-[#0A1628]/80 backdrop-blur-xl',
        'border border-[#0EA5E9]/20',
        'rounded-lg',
        'shadow-lg shadow-black/40',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
