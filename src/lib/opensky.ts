import type { AircraftState } from '@/types/aircraft';

export async function fetchAircraftData(): Promise<{ time: number; states: AircraftState[]; count: number }> {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };

    const response = await fetch('/api/opensky/states/all', {
      headers,
    });

    if (!response.ok) {
      throw new Error(`OpenSky API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.states || !Array.isArray(data.states)) {
      return { time: data.time || Math.floor(Date.now() / 1000), states: [], count: 0 };
    }

    const states: AircraftState[] = data.states
      .map((state: (string | number | boolean | null)[]): AircraftState => ({
        icao24: String(state[0] || ''),
        callsign: state[1] ? String(state[1]).trim() : null,
        originCountry: String(state[2] || 'Unknown'),
        longitude: state[5] !== null ? Number(state[5]) : null,
        latitude: state[6] !== null ? Number(state[6]) : null,
        baroAltitude: state[7] !== null ? Number(state[7]) : null,
        onGround: Boolean(state[8]),
        velocity: state[9] !== null ? Number(state[9]) : null,
        trueTrack: state[10] !== null ? Number(state[10]) : null,
        verticalRate: state[11] !== null ? Number(state[11]) : null,
        squawk: state[14] !== null ? String(state[14]) : null,
        lastContact: Number(state[4] || 0),
      }))
      .filter((aircraft: AircraftState) =>
        aircraft.latitude !== null &&
        aircraft.longitude !== null &&
        !aircraft.onGround
      );

    return {
      time: data.time,
      states,
      count: states.length,
    };
  } catch (error) {
    console.error('Error fetching aircraft data:', error);
    return { time: Math.floor(Date.now() / 1000), states: [], count: 0 };
  }
}
