import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
  params: {
    appid:'585561fce25ac9d418247484cfa4b7d1',
    q: 'Cairo',
  }
});
