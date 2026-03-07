import useSWR from 'swr';
import { useState, useEffect } from 'react';
import type { UseAircraftDataReturn } from '@/types/aircraft';
import { fetchAircraftData } from '@/lib/opensky';

export function useAircraftData(): UseAircraftDataReturn {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const { data, error, isLoading } = useSWR(
    'aircraft-data',
    fetchAircraftData,
    {
      refreshInterval: 10000,
      revalidateOnFocus: false,
      dedupingInterval: 8000,
    }
  );
  
  useEffect(() => {
    if (data && !error) {
      setLastUpdated(new Date());
    }
  }, [data, error]);
  
  return {
    aircraft: data?.states || [],
    isLoading,
    isError: !!error,
    lastUpdated,
    count: data?.count || 0,
  };
}

export type { UseAircraftDataReturn };
