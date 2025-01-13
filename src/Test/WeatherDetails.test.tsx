import { describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { WeatherDetails } from '@components/WeatherDetails/WeatherDetails';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}));

describe('WeatherDetails', () => {
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

  it('renders weather details correctly', () => {
    render(<WeatherDetails data={sampleData as any} />);

    expect(screen.getByText('overcast clouds')).toBeInTheDocument();

    expect(screen.getByText('22°C')).toBeInTheDocument();
    expect(screen.getByText('tempMax: 24°C')).toBeInTheDocument();
    expect(screen.getByText('tempMin: 18°C')).toBeInTheDocument();

    expect(screen.getByText('humidity: 60%')).toBeInTheDocument();
    expect(screen.getByText('wind: 5 m/s')).toBeInTheDocument();
    expect(screen.getByText('feelsLike: 21°C')).toBeInTheDocument();
  });
});
