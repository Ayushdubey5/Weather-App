import React from 'react';
import { UserFormData, WeatherData } from '../types';
import WeatherIcon from './WeatherIcon';
import { getAQIDescription } from '../services/weatherService';

interface WeatherResultProps {
  userData: UserFormData;
  weatherData: WeatherData;
}

const WeatherResult: React.FC<WeatherResultProps> = ({ userData, weatherData }) => {
  // Get air quality description
  const aqiDescription = getAQIDescription(weatherData.aqi);
  
  // Determine AQI color based on value
  const getAqiColor = () => {
    if (weatherData.aqi <= 12) return 'text-green-600';
    if (weatherData.aqi <= 35.4) return 'text-yellow-500';
    if (weatherData.aqi <= 55.4) return 'text-orange-500';
    if (weatherData.aqi <= 150.4) return 'text-red-500';
    if (weatherData.aqi <= 250.4) return 'text-purple-700';
    return 'text-rose-900';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">Weather Summary</h3>
        <p className="opacity-90">Current weather in {userData.name}'s location</p>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{userData.city}</h2>
            <p className="text-gray-500 text-sm">{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
          <div className="flex items-center">
            <WeatherIcon condition={weatherData.condition} size={36} className="text-blue-500 mr-2" />
            <span className="text-3xl font-bold text-gray-800">{weatherData.temperature}°C</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <span className="text-gray-600">Condition</span>
            <span className="font-medium text-gray-800">{weatherData.condition}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <span className="text-gray-600">Air Quality Index</span>
            <div className="flex flex-col items-end">
              <span className="font-medium text-gray-800">
                {weatherData.aqi.toFixed(1)} <span className={getAqiColor()}>({aqiDescription})</span>
              </span>
              <span className="text-xs text-gray-500">PM2.5</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
          <h4 className="font-medium text-blue-800 mb-2">Email Confirmation Sent</h4>
          <p className="text-sm text-blue-700">
            A confirmation email with this weather summary has been sent to <strong>{userData.email}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherResult;