export interface AircraftState {
  icao24: string;
  callsign: string | null;
  originCountry: string;
  longitude: number | null;
  latitude: number | null;
  baroAltitude: number | null;
  onGround: boolean;
  velocity: number | null;
  trueTrack: number | null;
  verticalRate: number | null;
  squawk: string | null;
  lastContact: number;
}

export interface AircraftResponse {
  time: number;
  states: AircraftState[];
}

export interface MapViewport {
  longitude: number;
  latitude: number;
  zoom: number;
}

export interface UseAircraftDataReturn {
  aircraft: AircraftState[];
  isLoading: boolean;
  isError: boolean;
  lastUpdated: Date | null;
  count: number;
}
