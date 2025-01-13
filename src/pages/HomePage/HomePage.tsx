import { useEffect, useState } from 'react';
import { useWeather } from '@hooks';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {WeatherDetails} from '@components/WeatherDetails/WeatherDetails';
import './HomePage.scss';

export const HomePage = () => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'page.HomePage' });
  const { city } = useParams<{ city: string }>();
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);

  useEffect(() => {
    if (!city || city === ':city') return;

    const cityCoordinates: { [key: string]: { lat: number; lon: number } } = {
      Madrid: { lat: 40.4168, lon: -3.7038 },
      Mexico: { lat: 19.4326, lon: -99.1332 },
      Tokyo: { lat: 35.6762, lon: 139.6503 }
    };

    if (cityCoordinates[city]) {
      setLat(cityCoordinates[city].lat);
      setLon(cityCoordinates[city].lon);
    }
  }, [city]);

  const { data, isLoading, error, refetch } = useWeather(lat, lon, i18n.language);
  
  useEffect(() => {
    if (lat && lon) {
      refetch();
    }
  }, [i18n.language, lat, lon]);

  if (!city || city === ':city') {
    return (
      <div className="weather-container">
        <h1 className="weather-title">{t('selectCity')}</h1>
      </div>
    );
  }

  if (isLoading) return <div>{t('loading')}</div>;
  if (error instanceof Error) return <div>{t('error', { message: error.message })}</div>;

  return (
    <div className="weather-container">
      <h1 className="weather-title">{t('weatherIn', { city })}</h1>
      {data && <WeatherDetails data={data} />}
    </div>
  );
};
