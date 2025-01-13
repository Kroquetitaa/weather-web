import axios from 'axios';

const weather_api = {
  url: import.meta.env.VITE_URL_OPENWEATHERMAP
};

const axiosInstance = axios.create({
  baseURL: weather_api.url
});

export default axiosInstance;
