import { memo } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import type { AircraftState } from '@/types/aircraft';
import {
  formatAltitude,
  formatSpeed,
  headingToCompass,
  formatLastContact,
  getCountryFlag,
  getVerticalRateLabel,
} from '@/lib/utils';
import { Plane, Navigation, Activity, Radio, Clock, MapPin } from 'lucide-react';

interface AircraftPanelProps {
  aircraft: AircraftState | null;
  totalCount: number;
  lastUpdated: Date | null;
}

export const AircraftPanel = memo(function AircraftPanel({
  aircraft,
  totalCount,
  lastUpdated,
}: AircraftPanelProps) {
  if (!aircraft) {
    return (
      <GlassCard className="h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Plane className="w-5 h-5 text-[#0EA5E9]" />
          <h2 className="font-display text-lg font-semibold text-slate-200">
            Aircraft Details
          </h2>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <div className="w-16 h-16 rounded-full bg-[#0F1E35] flex items-center justify-center mb-4">
            <Plane className="w-8 h-8 text-slate-500/50" />
          </div>
          <p className="text-slate-400 text-sm mb-2">
            Select an aircraft on the map to view details
          </p>
          <div className="mt-4 pt-4 border-t border-[#0EA5E9]/10 w-full">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-xs">Total Tracked</span>
              <span className="font-mono text-[#0EA5E9] font-bold">{totalCount.toLocaleString()}</span>
            </div>
            {lastUpdated && (
              <div className="flex justify-between items-center mt-2">
                <span className="text-slate-400 text-xs">Last Update</span>
                <span className="font-mono text-slate-400 text-xs">
                  {lastUpdated.toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    );
  }

  const verticalRate = getVerticalRateLabel(aircraft.verticalRate);

  const DetailRow = ({
    icon: Icon,
    label,
    value,
    unit,
    color = 'text-slate-200',
  }: {
    icon: React.ElementType;
    label: string;
    value: string;
    unit?: string;
    color?: string;
  }) => (
    <div className="flex items-center justify-between py-2 border-b border-[#0EA5E9]/5 last:border-0">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-slate-400" />
        <span className="text-slate-400 text-xs uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={cn('font-mono text-sm font-semibold', color)}>{value}</span>
        {unit && <span className="text-slate-400 text-xs">{unit}</span>}
      </div>
    </div>
  );

  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Plane className="w-5 h-5 text-[#0EA5E9]" />
        <h2 className="font-display text-lg font-semibold text-slate-200">
          Aircraft Details
        </h2>
      </div>

      <div className="space-y-4">
        {/* Callsign Header */}
        <div className="bg-[#0F1E35]/50 rounded-lg p-4 border border-[#0EA5E9]/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Callsign</p>
              <p className="font-display text-2xl font-bold text-[#0EA5E9]">
                {aircraft.callsign || 'N/A'}
              </p>
            </div>
            <div className="text-right">
              <span className={cn(
                'px-2 py-1 rounded text-xs font-mono font-semibold',
                aircraft.onGround
                  ? 'bg-gray-500/20 text-gray-400'
                  : 'bg-green-500/20 text-green-400'
              )}>
                {aircraft.onGround ? 'ON GROUND' : 'IN FLIGHT'}
              </span>
            </div>
          </div>
        </div>

        {/* ICAO and Country */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#0F1E35]/30 rounded-lg p-3">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">ICAO24</p>
            <p className="font-mono text-sm text-slate-200">{aircraft.icao24.toUpperCase()}</p>
          </div>
          <div className="bg-[#0F1E35]/30 rounded-lg p-3">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Origin</p>
            <p className="font-mono text-sm text-slate-200 flex items-center gap-1">
              <span>{getCountryFlag(aircraft.originCountry)}</span>
              <span className="truncate">{aircraft.originCountry}</span>
            </p>
          </div>
        </div>

        {/* Flight Data */}
        <div className="bg-[#0F1E35]/30 rounded-lg p-3 space-y-1">
          <DetailRow
            icon={Navigation}
            label="Altitude"
            value={formatAltitude(aircraft.baroAltitude, aircraft.onGround)}
          />
          <DetailRow
            icon={Activity}
            label="Speed"
            value={formatSpeed(aircraft.velocity)}
          />
          <DetailRow
            icon={MapPin}
            label="Heading"
            value={headingToCompass(aircraft.trueTrack)}
          />
          <DetailRow
            icon={Activity}
            label="Vertical Rate"
            value={verticalRate.label}
            color={verticalRate.color}
          />
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#0F1E35]/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Radio className="w-3 h-3 text-slate-400" />
              <p className="text-slate-400 text-xs uppercase tracking-wider">Squawk</p>
            </div>
            <p className="font-mono text-sm text-slate-200">{aircraft.squawk || 'N/A'}</p>
          </div>
          <div className="bg-[#0F1E35]/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <p className="text-slate-400 text-xs uppercase tracking-wider">Last Contact</p>
            </div>
            <p className="font-mono text-sm text-slate-200">
              {formatLastContact(aircraft.lastContact)}
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
});
