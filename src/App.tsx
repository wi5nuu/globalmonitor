import { useState, useCallback, useMemo } from 'react';
import { useAircraftData } from '@/hooks/useAircraftData';
import { useMapControls } from '@/hooks/useMapControls';
import { Navbar } from '@/components/layout/Navbar';
import { StatusBar } from '@/components/layout/StatusBar';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { CTASection } from '@/components/landing/CTASection';
import { RadarMap } from '@/components/radar/RadarMap';
import { AircraftPanel } from '@/components/radar/AircraftPanel';
import { AircraftList } from '@/components/radar/AircraftList';
import { RadarControls } from '@/components/radar/RadarControls';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { cn } from '@/lib/utils';
import './App.css';

type View = 'home' | 'radar';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const { aircraft, isLoading, isError, lastUpdated, count } = useAircraftData();
  const {
    selectedAircraft,
    flyToLocation,
    selectAircraft,
    resetViewport,
  } = useMapControls();

  const [viewportCenter, setViewportCenter] = useState({ lng: 0, lat: 20 });

  const handleViewportChangeCallback = useCallback((center: { lng: number; lat: number }) => {
    setViewportCenter(center);
  }, []);

  const selectedAircraftData = useMemo(() => {
    if (!selectedAircraft) return null;
    return aircraft.find((ac) => ac.icao24 === selectedAircraft) || null;
  }, [aircraft, selectedAircraft]);

  // Determine live status based on last update time
  const liveStatus = useMemo(() => {
    if (isError) return 'error';
    if (!lastUpdated) return 'fresh';
    const secondsSinceUpdate = (Date.now() - lastUpdated.getTime()) / 1000;
    if (secondsSinceUpdate > 30) return 'error';
    if (secondsSinceUpdate > 15) return 'stale';
    return 'fresh';
  }, [lastUpdated, isError]);

  const handleOpenRadar = () => setCurrentView('radar');

  // Landing Page View
  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-[#050D1A]">
        <Navbar 
          aircraftCount={count} 
          liveStatus={liveStatus}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        <main className="pt-14 md:pt-[60px]">
          <HeroSection onOpenRadar={handleOpenRadar} />
          <FeaturesSection />
          <CTASection onLaunchRadar={handleOpenRadar} />
        </main>
        
        {/* Footer */}
        <footer className="bg-[#0A1628] border-t border-[#0EA5E9]/10 py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-slate-200">
                  GLOBAL<span className="text-[#0EA5E9]">MONITOR</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm text-center">
                Real-time aircraft tracking powered by OpenSky Network and Mapbox
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://opensky-network.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-[#0EA5E9] text-sm transition-colors"
                >
                  OpenSky
                </a>
                <a
                  href="https://www.mapbox.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-[#0EA5E9] text-sm transition-colors"
                >
                  Mapbox
                </a>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-[#0EA5E9]/5 text-center">
              <p className="text-slate-500 text-xs">
                © {new Date().getFullYear()} Global Monitoring Dashboard. Built with React, Mapbox GL JS, and Tailwind CSS.
              </p>
            </div>
          </div>
        </footer>
        
        <StatusBar lastUpdated={lastUpdated} viewportCenter={viewportCenter} />
      </div>
    );
  }

  // Radar View
  return (
    <div className="min-h-screen bg-[#050D1A] flex flex-col">
      <Navbar 
        aircraftCount={count} 
        liveStatus={liveStatus}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <main className="flex-1 pt-14 md:pt-[60px] pb-7 md:pb-8">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_320px] h-[calc(100vh-60px-32px)]">
          {/* Map Container */}
          <div className="relative">
            <RadarMap
              aircraft={aircraft}
              selectedAircraft={selectedAircraft}
              onSelectAircraft={selectAircraft}
              onViewportChange={handleViewportChangeCallback}
            />
            <RadarControls
              onZoomIn={() => {}}
              onZoomOut={() => {}}
              onReset={resetViewport}
            />
            {isLoading && aircraft.length === 0 && (
              <LoadingOverlay message="Fetching Aircraft Data..." />
            )}
          </div>

          {/* Right Panel */}
          <div className="bg-[#0A1628]/50 border-l border-[#0EA5E9]/10 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AircraftPanel
                aircraft={selectedAircraftData}
                totalCount={count}
                lastUpdated={lastUpdated}
              />
              <div className="flex-1 min-h-[300px]">
                <AircraftList
                  aircraft={aircraft}
                  selectedAircraft={selectedAircraft}
                  onSelectAircraft={selectAircraft}
                  onFlyToAircraft={flyToLocation}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden flex flex-col h-[calc(100vh-56px-28px)]">
          {/* Map - 55vh on mobile */}
          <div className="relative h-[55vh]">
            <RadarMap
              aircraft={aircraft}
              selectedAircraft={selectedAircraft}
              onSelectAircraft={selectAircraft}
              onViewportChange={handleViewportChangeCallback}
            />
            <RadarControls
              onZoomIn={() => {}}
              onZoomOut={() => {}}
              onReset={resetViewport}
            />
            {isLoading && aircraft.length === 0 && (
              <LoadingOverlay message="Fetching Aircraft Data..." />
            )}
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto bg-[#0A1628]/50">
            <div className="p-2 space-y-2">
              {/* Compact Aircraft Panel */}
              <div className="bg-[#0A1628]/80 backdrop-blur-xl border border-[#0EA5E9]/20 rounded-lg p-3">
                {selectedAircraftData ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-bold text-[#0EA5E9]">
                        {selectedAircraftData.callsign || 'N/A'}
                      </span>
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-mono rounded">
                        IN FLIGHT
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400">ALT:</span>{' '}
                        <span className="font-mono text-slate-200">
                          {selectedAircraftData.baroAltitude !== null
                            ? `${Math.round(selectedAircraftData.baroAltitude * 3.28084).toLocaleString()} ft`
                            : 'N/A'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">SPD:</span>{' '}
                        <span className="font-mono text-slate-200">
                          {selectedAircraftData.velocity !== null
                            ? `${Math.round(selectedAircraftData.velocity * 1.94384).toLocaleString()} kts`
                            : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <p className="text-slate-400 text-xs">
                      Select an aircraft on the map
                    </p>
                    <p className="text-[#0EA5E9] font-mono text-sm mt-1">
                      {count.toLocaleString()} aircraft tracked
                    </p>
                  </div>
                )}
              </div>

              {/* Compact Aircraft List */}
              <div className="bg-[#0A1628]/80 backdrop-blur-xl border border-[#0EA5E9]/20 rounded-lg p-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-200 text-sm font-semibold">Aircraft</span>
                  <span className="text-slate-400 text-xs font-mono">
                    {Math.min(aircraft.length, 20)} shown
                  </span>
                </div>
                <div className="space-y-1 max-h-[200px] overflow-y-auto">
                  {aircraft.slice(0, 20).map((ac) => (
                    <button
                      key={ac.icao24}
                      onClick={() => {
                        selectAircraft(ac.icao24);
                        if (ac.longitude && ac.latitude) {
                          flyToLocation(ac.longitude, ac.latitude);
                        }
                      }}
                      className={cn(
                        'w-full text-left p-2 rounded',
                        'flex items-center justify-between',
                        'text-xs',
                        selectedAircraft === ac.icao24
                          ? 'bg-[#0EA5E9]/20 border border-[#0EA5E9]/30'
                          : 'hover:bg-[#0F1E35]/50'
                      )}
                    >
                      <div>
                        <span className="font-mono font-semibold text-slate-200">
                          {ac.callsign || 'N/A'}
                        </span>
                        <span className="text-slate-400 ml-2">
                          {ac.originCountry.slice(0, 15)}
                        </span>
                      </div>
                      <span className="font-mono text-teal-400">
                        {ac.baroAltitude !== null
                          ? `${Math.round(ac.baroAltitude * 3.28084 / 1000)}k`
                          : '-'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <StatusBar lastUpdated={lastUpdated} viewportCenter={viewportCenter} />
    </div>
  );
}

export default App;
