import { memo, useState, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import type { AircraftState } from '@/types/aircraft';
import { getCountryFlag, metersToFeet, msToKnots } from '@/lib/utils';
import { Search, Plane, ChevronRight } from 'lucide-react';

interface AircraftListProps {
  aircraft: AircraftState[];
  selectedAircraft: string | null;
  onSelectAircraft: (icao24: string) => void;
  onFlyToAircraft: (longitude: number, latitude: number) => void;
}

const MAX_DISPLAY_ITEMS = 50;

export const AircraftList = memo(function AircraftList({
  aircraft,
  selectedAircraft,
  onSelectAircraft,
  onFlyToAircraft,
}: AircraftListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAircraft = useMemo(() => {
    if (!searchQuery.trim()) return aircraft.slice(0, MAX_DISPLAY_ITEMS);
    
    const query = searchQuery.toLowerCase();
    return aircraft
      .filter((ac) =>
        (ac.callsign?.toLowerCase().includes(query) ?? false) ||
        ac.icao24.toLowerCase().includes(query) ||
        ac.originCountry.toLowerCase().includes(query)
      )
      .slice(0, MAX_DISPLAY_ITEMS);
  }, [aircraft, searchQuery]);

  const handleAircraftClick = useCallback((ac: AircraftState) => {
    onSelectAircraft(ac.icao24);
    if (ac.longitude && ac.latitude) {
      onFlyToAircraft(ac.longitude, ac.latitude);
    }
  }, [onSelectAircraft, onFlyToAircraft]);

  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Plane className="w-5 h-5 text-[#0EA5E9]" />
        <h2 className="font-display text-lg font-semibold text-slate-200">
          Aircraft List
        </h2>
        <span className="ml-auto font-mono text-xs text-slate-400">
          {filteredAircraft.length} / {aircraft.length}
        </span>
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search callsign, ICAO, country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn(
            'w-full pl-9 pr-3 py-2',
            'bg-[#0F1E35]/50 border border-[#0EA5E9]/20 rounded-lg',
            'text-sm text-slate-200 placeholder:text-slate-500',
            'focus:outline-none focus:border-[#0EA5E9]/50',
            'transition-colors'
          )}
        />
      </div>

      {/* Aircraft List */}
      <div className="flex-1 overflow-y-auto -mx-2 px-2 space-y-1 scrollbar-thin">
        {filteredAircraft.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400 text-sm">No aircraft found</p>
          </div>
        ) : (
          filteredAircraft.map((ac) => (
            <button
              key={ac.icao24}
              onClick={() => handleAircraftClick(ac)}
              className={cn(
                'w-full text-left p-2 rounded-lg',
                'flex items-center gap-3',
                'transition-all duration-150',
                'hover:bg-[#0F1E35]/50',
                selectedAircraft === ac.icao24
                  ? 'bg-[#0EA5E9]/10 border border-[#0EA5E9]/30'
                  : 'border border-transparent'
              )}
            >
              {/* Callsign */}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  'font-mono text-sm font-semibold truncate',
                  selectedAircraft === ac.icao24 ? 'text-[#0EA5E9]' : 'text-slate-200'
                )}>
                  {ac.callsign || 'N/A'}
                </p>
                <p className="text-slate-400 text-xs truncate flex items-center gap-1">
                  <span>{getCountryFlag(ac.originCountry)}</span>
                  <span className="truncate">{ac.originCountry}</span>
                </p>
              </div>

              {/* Altitude & Speed */}
              <div className="text-right">
                <p className="font-mono text-xs text-teal-400">
                  {ac.baroAltitude !== null ? `${metersToFeet(ac.baroAltitude)} ft` : 'N/A'}
                </p>
                <p className="font-mono text-xs text-slate-400">
                  {ac.velocity !== null ? `${msToKnots(ac.velocity)} kts` : 'N/A'}
                </p>
              </div>

              {/* Arrow */}
              <ChevronRight className={cn(
                'w-4 h-4 flex-shrink-0',
                selectedAircraft === ac.icao24 ? 'text-[#0EA5E9]' : 'text-slate-600'
              )} />
            </button>
          ))
        )}
      </div>
    </GlassCard>
  );
});
