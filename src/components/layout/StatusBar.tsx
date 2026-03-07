import { cn } from '@/lib/utils';
import { formatLastContact } from '@/lib/utils';

interface StatusBarProps {
  lastUpdated: Date | null;
  viewportCenter?: { lng: number; lat: number };
}

export function StatusBar({ lastUpdated, viewportCenter }: StatusBarProps) {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40',
        'h-7 md:h-8',
        'bg-black/80 backdrop-blur-sm',
        'border-t border-[#0EA5E9]/10'
      )}
    >
      <div className="h-full px-3 md:px-6 flex items-center justify-between text-xs">
        {/* Last Updated */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 hidden sm:inline">Last updated:</span>
          <span className="font-mono text-slate-200">
            {lastUpdated ? formatLastContact(Math.floor(lastUpdated.getTime() / 1000)) : '—'}
          </span>
        </div>

        {/* Coordinates */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-slate-400">Center:</span>
          <span className="font-mono text-teal-400">
            {viewportCenter 
              ? `${viewportCenter.lat.toFixed(4)}°, ${viewportCenter.lng.toFixed(4)}°`
              : '—'
            }
          </span>
        </div>

        {/* Data Source */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 hidden sm:inline">Data:</span>
          <span className="font-mono text-[#0EA5E9] tracking-wider">
            OPENSKY NETWORK
          </span>
          <span className="text-slate-400">·</span>
          <span className="font-mono text-green-400 text-[10px]">LIVE</span>
        </div>
      </div>
    </div>
  );
}
