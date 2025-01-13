import React from 'react';

import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';

import type { IWeatherResponse } from '@interfaces/weather/weather.types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';

import { useWeather } from '@hooks/index';

import axiosInstance from '../api/axiosInstance';

vi.mock('../api/axiosInstance', () => ({
  default: {
    get: vi.fn()
  }
}));

const TestComponent = ({ lat, lon, lang }: { lat: number | null; lon: number | null; lang: string }) => {
  const { data, error, status } = useWeather(lat, lon, lang);

  return (
    <div>
      <div data-testid="status">{status}</div>
      {data && <div data-testid="weather-data">{JSON.stringify(data)}</div>}
      {error && <div data-testid="error">{(error as Error).message}</div>}
    </div>
  );
};

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('useWeather hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not attempt to fetch data when lat and lon are null', async () => {
    renderWithClient(<TestComponent lat={null} lon={null} lang="en" />);

    expect(screen.getByTestId('status').textContent).toBe('pending');
    expect(screen.queryByTestId('weather-data')).toBeNull();
    expect(screen.queryByTestId('error')).toBeNull();
  });

  it('should fetch data correctly when lat and lon are provided', async () => {
    const fakeResponse = {
      weather: [],
      main: { temp: 25, humidity: 50, pressure: 1013 },
      wind: { speed: 5, deg: 200 },
      sys: { country: 'Country', sunrise: 0, sunset: 0 },
      name: 'City'
    } as unknown as IWeatherResponse;

    (axiosInstance.get as Mock).mockResolvedValueOnce({ data: fakeResponse });

    renderWithClient(<TestComponent lat={12} lon={34} lang="en" />);

    await waitFor(() => expect(screen.getByTestId('weather-data')).toBeInTheDocument());

    expect(screen.getByTestId('weather-data').textContent).toEqual(JSON.stringify(fakeResponse));
    expect(screen.queryByTestId('error')).toBeNull();
  });

  it('should handle errors when the request fails', async () => {
    const errorMessage = 'Network error';

    (axiosInstance.get as Mock).mockRejectedValueOnce(new Error(errorMessage));

    renderWithClient(<TestComponent lat={12} lon={34} lang="en" />);

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('error');
    });

    const errorDiv = screen.getByTestId('error');
    expect(errorDiv).toHaveTextContent(errorMessage);
    expect(screen.queryByTestId('weather-data')).toBeNull();
  });
});
