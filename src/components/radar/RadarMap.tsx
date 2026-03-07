'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { AircraftState } from '@/types/aircraft';
import { cn } from '@/lib/utils';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';

interface RadarMapProps {
  aircraft: AircraftState[];
  selectedAircraft: string | null;
  onSelectAircraft: (icao24: string | null) => void;
  onViewportChange?: (center: { lng: number; lat: number }) => void;
  className?: string;
}

// Simple airplane icon SVG for Leaflet
const createAirplaneIcon = (heading: number, isSelected: boolean) => {
  const color = isSelected ? '#34d399' : '#0EA5E9'; // Emerald if selected, else Sky Blue
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style="transform: rotate(${heading}deg);">
    <path d="M12 2L12.5 4H11.5L12 2Z" fill="${color}"/>
    <path d="M12 4L15 12H20L21 14H15.5L16 22H14L13.5 14H10.5L10 22H8L8.5 14H3L4 12H9L12 4Z" fill="${color}"/>
  </svg>`;

  return L.divIcon({
    html: svg,
    className: 'aircraft-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

// Component to handle flying to selected aircraft
function MapUpdater({ selectedAircraftData, onViewportChange }: {
  selectedAircraftData: AircraftState | null,
  onViewportChange?: (center: { lng: number; lat: number }) => void
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedAircraftData && selectedAircraftData.latitude && selectedAircraftData.longitude) {
      map.flyTo([selectedAircraftData.latitude, selectedAircraftData.longitude], 10, {
        duration: 1.5
      });
    }
  }, [selectedAircraftData, map]);

  useEffect(() => {
    map.on('move', () => {
      const center = map.getCenter();
      onViewportChange?.({ lng: center.lng, lat: center.lat });
    });
  }, [map, onViewportChange]);

  return null;
}

export function RadarMap({
  aircraft,
  selectedAircraft,
  onSelectAircraft,
  onViewportChange,
  className,
}: RadarMapProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize map state
  useEffect(() => {
    // Leaflet map is ready immediately after mount
    setIsLoading(false);
  }, []);

  const selectedData = aircraft.find(ac => ac.icao24 === selectedAircraft) || null;

  return (
    <div className={cn('relative w-full h-full bg-[#050D1A]', className)}>
      {isLoading && <LoadingOverlay message="Initializing Radar..." />}

      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="w-full h-full z-0"
        zoomControl={false}
        attributionControl={false}
      >
        {/* Standard OpenStreetMap Tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <MapUpdater
          selectedAircraftData={selectedData}
          onViewportChange={onViewportChange}
        />

        {aircraft.map((ac) => {
          if (!ac.latitude || !ac.longitude) return null;

          const isSelected = selectedAircraft === ac.icao24;

          return (
            <Marker
              key={ac.icao24}
              position={[ac.latitude, ac.longitude]}
              icon={createAirplaneIcon(ac.trueTrack || 0, isSelected)}
              eventHandlers={{
                click: () => onSelectAircraft(ac.icao24),
              }}
              zIndexOffset={isSelected ? 1000 : 0}
            >
              <Popup className="custom-popup" closeButton={true}>
                <div style={{
                  background: 'rgba(10, 22, 40, 0.95)',
                  border: '1px solid rgba(14, 165, 233, 0.3)',
                  borderRadius: '6px',
                  padding: '12px',
                  minWidth: '180px',
                  color: '#E2E8F0',
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#0EA5E9',
                    marginBottom: '8px'
                  }}>
                    {ac.callsign || 'N/A'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>
                    {ac.originCountry}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px', fontSize: '11px' }}>
                    <div>
                      <span style={{ color: '#94A3B8' }}>ALT:</span><br />
                      <span style={{ color: '#E2E8F0' }}>
                        {ac.baroAltitude !== null ? Math.round(ac.baroAltitude * 3.28084).toLocaleString() : 'N/A'} ft
                      </span>
                    </div>
                    <div>
                      <span style={{ color: '#94A3B8' }}>SPD:</span><br />
                      <span style={{ color: '#E2E8F0' }}>
                        {ac.velocity !== null ? Math.round(ac.velocity * 1.94384).toLocaleString() : 'N/A'} kts
                      </span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* CSS for custom popup styling */}
      <style>{`
        .leaflet-popup-content-wrapper {
          background: transparent;
          box-shadow: none;
          padding: 0;
        }
        .leaflet-popup-tip-container {
          display: none;
        }
        .leaflet-popup-content {
          margin: 0;
        }
        .leaflet-container a.leaflet-popup-close-button {
          color: #94A3B8;
          top: 10px;
          right: 10px;
        }
        .leaflet-container a.leaflet-popup-close-button:hover {
          color: #E2E8F0;
        }
      `}</style>
    </div>
  );
}
