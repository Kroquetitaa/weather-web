import { useTranslation } from 'react-i18next';
import { weatherIcons } from '@helpers/weatherIcons';
import { IWeatherDetailsProps } from '@interfaces/weather/weather.types';

export const WeatherDetails: React.FC<IWeatherDetailsProps> = ({ data }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'page.HomePage' });
  
  const weatherCondition = data?.weather[0].main.toLowerCase();
  const icon = weatherCondition ? weatherIcons[weatherCondition] : '🌈';

  return (
    <div className="weather-info">
      <div className="weather-icon">{icon}</div>
      <p className="weather-description">{data.weather[0].description}</p>

      <div className="temp-container">
        <div className="temp-value">{data.main.temp}°C</div>
        <div className="temp-max">{t('tempMax')}: {data.main.temp_max}°C</div>
        <div className="temp-min">{t('tempMin')}: {data.main.temp_min}°C</div>
      </div>

      <div className="humidity">{t('humidity')}: {data.main.humidity}%</div>
      <div className="wind">{t('wind')}: {data.wind.speed} m/s</div>
      <div className="feels-like">{t('feelsLike')}: {data.main.feels_like}°C</div>
    </div>
  );
};
