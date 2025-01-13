import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { IWeatherResponse } from '@interfaces/weather/weather.types';

const api_key = {
    key: import.meta.env.VITE_API_KEY
  };

const fetchWeather = async (lat: number, lon: number, lang: string): Promise<IWeatherResponse> => {
  const apiKey = api_key.key;
  const { data } = await axiosInstance.get<IWeatherResponse>('weather', {
    params: {
      lat,
      lon,
      appid: apiKey,
      units: 'metric',
      lang
    }
  });
  return data;
};

export const useWeather = (lat: number | null, lon: number | null, lang: string) => {
  return useQuery<IWeatherResponse, Error>({
    queryKey: ['public-league-user-ranking', lat, lon],
    queryFn: () => {
      if (lat && lon) {
        return fetchWeather(lat, lon, lang);
      }
      return Promise.reject('Latitud y Longitud son requeridas');
    },
    enabled: lat !== null && lon !== null
  });
};
