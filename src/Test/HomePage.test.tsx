import { beforeEach, describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { HomePage } from '@pages/HomePage/HomePage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      if (key === 'error' && options && options.message) {
        return `error ${options.message}`;
      }
      if (key === 'loading') return 'loading';
      if (key === 'selectCity') return 'selectCity';
      if (key === 'weatherIn' && options && options.city) return `weatherIn ${options.city}`;
      return key;
    },
    i18n: { language: 'en' }
  })
}));

const useParamsMock = vi.fn();
vi.mock('react-router-dom', () => {
  const actual = require('react-router-dom');
  return {
    ...actual,
    useParams: () => useParamsMock()
  };
});

const mockUseWeather = vi.fn();
vi.mock('@hooks', () => ({
  useWeather: (...args: any[]) => mockUseWeather(...args)
}));

vi.mock('@components/WeatherDetails/WeatherDetails', () => ({
  WeatherDetails: ({ data }: any) => (
    <div data-testid="weather-details">Mocked WeatherDetails: {JSON.stringify(data)}</div>
  )
}));

describe('HomePage', () => {
  beforeEach(() => {
    useParamsMock.mockReset();
    mockUseWeather.mockReset();
    mockUseWeather.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      refetch: vi.fn()
    });
  });

  it('shows "selectCity" if there is no city', () => {
    useParamsMock.mockReturnValue({ city: undefined });
    render(<HomePage />);
    expect(screen.getByText('selectCity')).toBeInTheDocument();
  });

  it('shows "loading" when isLoading is true', () => {
    useParamsMock.mockReturnValue({ city: 'Madrid' });
    mockUseWeather.mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
      refetch: vi.fn()
    });
    render(<HomePage />);
    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('shows an error message when an error occurs', () => {
    useParamsMock.mockReturnValue({ city: 'Madrid' });
    const error = new Error('Test error');
    mockUseWeather.mockReturnValue({
      isLoading: false,
      error,
      data: null,
      refetch: vi.fn()
    });
    render(<HomePage />);
    expect(screen.getByText(`error Test error`)).toBeInTheDocument();
  });

  it('shows WeatherDetails when data is received', () => {
    useParamsMock.mockReturnValue({ city: 'Madrid' });
    const sampleData = {
      weather: [{ main: 'Clouds', description: 'overcast clouds' }],
      main: {
        temp: 22,
        temp_max: 24,
        temp_min: 18,
        humidity: 60,
        feels_like: 21
      },
      wind: { speed: 5 },
      coord: { lon: 0, lat: 0 },
      base: '',
      visibility: 0,
      clouds: { all: 0 },
      dt: 0,
      sys: { type: 0, id: 0, country: '', sunrise: 0, sunset: 0 },
      timezone: 0,
      id: 0,
      name: '',
      cod: 200
    };
    mockUseWeather.mockReturnValue({
      isLoading: false,
      error: null,
      data: sampleData,
      refetch: vi.fn()
    });
    render(<HomePage />);

    expect(screen.getByText('weatherIn Madrid')).toBeInTheDocument();
    expect(screen.getByTestId('weather-details')).toBeInTheDocument();
  });
});
