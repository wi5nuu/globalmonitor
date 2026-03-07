import { useState, useCallback } from 'react';
import type { MapViewport } from '@/types/aircraft';

const DEFAULT_VIEWPORT: MapViewport = {
  longitude: 0,
  latitude: 20,
  zoom: 2,
};

export function useMapControls() {
  const [viewport, setViewport] = useState<MapViewport>(DEFAULT_VIEWPORT);
  const [selectedAircraft, setSelectedAircraft] = useState<string | null>(null);

  const handleViewportChange = useCallback((newViewport: Partial<MapViewport>) => {
    setViewport((prev) => ({ ...prev, ...newViewport }));
  }, []);

  const flyToLocation = useCallback((longitude: number, latitude: number, zoom: number = 8) => {
    setViewport({ longitude, latitude, zoom });
  }, []);

  const selectAircraft = useCallback((icao24: string | null) => {
    setSelectedAircraft(icao24);
  }, []);

  const resetViewport = useCallback(() => {
    setViewport(DEFAULT_VIEWPORT);
    setSelectedAircraft(null);
  }, []);

  return {
    viewport,
    selectedAircraft,
    handleViewportChange,
    flyToLocation,
    selectAircraft,
    resetViewport,
  };
}
