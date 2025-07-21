import React, { useState,useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './components/Home';
import axios from 'axios';
import { FiSearch } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import { format } from 'date-fns';

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: '"IBM Plex Sans Arabic", sans-serif',
    },
  },
});
export default function App() {
  const [city, setCity] = useState('Cairo');
    const [loading, setLoading] = useState(true);
    
  useEffect(() => {
  async function fetchWeather() {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      const data = res.data;
      setWeather({
        temp: Math.round(Number(data.main.temp) - 273.15),
        description: data.weather[0].description,
        temp_min: Math.round(Number(data.main.temp_min) - 273.15),
        temp_max: Math.round(Number(data.main.temp_max) - 273.15),
        name: data.name,
        dt:data.dt,
        icon:data.weather[0].icon,
        sunrise: format(new Date(data.sys.sunrise * 1000), 'hh:mm a'),
        sunset: format(new Date(data.sys.sunset * 1000), 'hh:mm a'),
        pressure:Math.round(Number(data.main.pressure)),
        humidity:Math.round(Number(data.main.humidity))
      });
    } catch (error) {
      console.error('خطأ في تحميل الطقس:', error);
    }finally {
        setLoading(false);
      }
  }
  fetchWeather();
}, []); 


  const [weather, setWeather] = useState({
    temp: '',
    description: '',
    temp_min: '',
    temp_max: '',
    name: '',
    dt:'',
    icon:'',
    sunrise:'',
    sunset:'',
    pressure:'',
    humidity:''
  });

  
    async function handleClickSearch() {
    if (!city) {
      alert('الرجاء إدخال اسم المدينة');
      return;
    }
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      const data = res.data;

      setWeather({
        temp: Math.round(Number(data.main.temp) - 273.15),
        description: data.weather[0].description,
        temp_min: Math.round(Number(data.main.temp_min) - 273.15),
        temp_max: Math.round(Number(data.main.temp_max) - 273.15),
        name: data.name,
        dt:data.dt,
         icon:data.weather[0].icon,
         sunrise: format(new Date(data.sys.sunrise * 1000), 'hh:mm a'),
         sunset: format(new Date(data.sys.sunset * 1000), 'hh:mm a'),
         pressure:Math.round(Number(data.main.pressure)),
         humidity:Math.round(Number(data.main.humidity))
      });
    
  }
      
  

  return (
    <ThemeProvider theme={theme}>
      <div className='w-full h-max-screen bg-center bg-no-repeat'  style={{ backgroundImage: "url('./public/images/bg_weather.jpg')" }}>
         <div className="flex items-center justify-center flex-row  gap-1">
        <label htmlFor="reda" className="text-[20px] mt-4 font-bold text-white">City name:</label>
        <input
          name="reda"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          placeholder="Enter the city name..."
          className="rounded mt-4 w-[200px] h-[35px] text-center bg-amber-100 border-b border-gray-300 focus:!border-b-pink-800 focus:outline-none"
          type="text"
        />
        <button
          onClick={handleClickSearch}
          className="bg-amber-500 font-bold h-[35px] text-white rounded px-3 py-2 mt-4 hover:bg-amber-400"
        >
          <FiSearch className="text-[20px] text-gray-600" />
        </button>
      </div>
     {loading ? 
        <div className="fixed max-w-screen inset-0 z-50 flex items-center justify-center bg-black">
      <ImSpinner8 className="text-5xl text-white animate-spin" />
    </div>: <Home weather={weather} />}
      </div>
      
    </ThemeProvider>
  );
}
