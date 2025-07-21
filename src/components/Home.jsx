import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { format } from 'date-fns';

function Home({ weather }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg bg-yellow-200 backdrop-blur-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-3">
            
            {/* المدينة والتاريخ */}
            <div className="flex justify-between items-center w-full">
              <h2 className="text-3xl font-extrabold text-indigo-800">{weather.name}</h2>
              {weather.dt && (
                <p className="text-2xl text-gray-600 font-semibold">
                  {format(new Date(weather.dt * 1000), 'dd MMM yyyy')}
                </p>
              )}
            </div>

            {/* درجة الحرارة والوصف والأيقونة */}
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-2">
                <span className="text-6xl font-bold text-gray-800">{weather.temp}°</span>
                <span className="text-[25px] text-green-800 font-bold">{weather.description}</span>
              </div>
              <div className="w-30 h-30">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt="weather icon"
                  className="w-full h-full animate-bounce"
                  loading="lazy"
                />
              </div>
            </div>

            {/* درجات الحرارة */}
            <div className="flex justify-between w-full text-sm text-gray-700 font-semibold border-t gap-3 pt-4">
              <p className='font-bold text-[20px]'>temp_max: <span className='text-red-500'>{weather.temp_max}°</span></p>
              <p className='font-bold text-[20px]'>temp_min: <span className='text-red-500'>{weather.temp_min}°</span> </p>
            </div>
              <div className="flex justify-between w-full text-sm text-gray-700 font-semibold gap-1 pt-4">
              <p className='font-bold text-[20px]'>sunset: <span className='text-red-500'>{weather.sunset}</span></p>
              <p className='font-bold text-[20px]'>sunrise: <span className='text-red-500'>{weather.sunrise}</span> </p>
            </div>
             <div className="flex justify-between w-full text-sm text-gray-700 font-semibold gap-1 pt-4">
              <p className='font-bold text-[20px]'>pressure: <span className='text-red-500'>{weather.pressure} hPa </span></p>
              <p className='font-bold text-[20px]'>humidity: <span className='text-red-500'>{weather.humidity} %</span> </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
