interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface IMainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface IWind {
  speed: number;
  deg: number;
  gust: number;
}

interface IRain {
  [key: string]: number;
}

interface IClouds {
  all: number;
}

interface ISys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface ICoordinates {
  lon: number;
  lat: number;
}

export interface IWeatherResponse {
  coord: ICoordinates;
  weather: IWeather[];
  base: string;
  main: IMainWeather;
  visibility: number;
  wind: IWind;
  rain: IRain;
  clouds: IClouds;
  dt: number;
  sys: ISys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface IWeatherDetailsProps {
  data: IWeatherResponse;
}
