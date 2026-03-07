import { cn } from '@/lib/utils';
import { Radar } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
  className?: string;
}

export function LoadingOverlay({ message = 'Initializing Radar...', className }: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 z-50',
        'flex flex-col items-center justify-center',
        'bg-[#050D1A]/90 backdrop-blur-sm',
        className
      )}
    >
      <div className="relative">
        <div className="absolute inset-0 animate-pulse">
          <div className="w-24 h-24 rounded-full border-2 border-[#0EA5E9]/20 border-t-[#0EA5E9] animate-spin" />
        </div>
        <div className="w-24 h-24 flex items-center justify-center">
          <Radar className="w-10 h-10 text-[#0EA5E9] animate-pulse" />
        </div>
      </div>
      <p className="mt-6 font-mono text-sm text-slate-400 tracking-wider">
        {message}
      </p>
    </div>
  );
}
