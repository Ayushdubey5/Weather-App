import React from 'react';
import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';

const WeatherResult = ({ userData, weatherData }) => {
  const getAQIStatus = (aqi) => {
    if (aqi <= 50) return { text: 'Good', color: 'text-green-600' };
    if (aqi <= 100) return { text: 'Moderate', color: 'text-yellow-600' };
    if (aqi <= 150) return { text: 'Unhealthy', color: 'text-red-600' };
    return { text: 'Hazardous', color: 'text-purple-600' };
  };

  const getWeatherIcon = () => {
    switch (weatherData.condition.toLowerCase()) {
      case 'sunny': return <Sun className="w-12 h-12 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-12 h-12 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-12 h-12 text-blue-600" />;
      case 'windy': return <Wind className="w-12 h-12 text-blue-400" />;
      default: return <Sun className="w-12 h-12 text-yellow-500" />;
    }
  };

  const aqiStatus = getAQIStatus(weatherData.aqi);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{userData.city}</h3>
          <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-4">
          {getWeatherIcon()}
          <span className="text-3xl font-bold">{weatherData.temperature}°C</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Condition</span>
            <span className="font-medium">{weatherData.condition}</span>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Air Quality</span>
            <span className={`font-medium ${aqiStatus.color}`}>
              {weatherData.aqi} ({aqiStatus.text})
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h4 className="font-medium text-blue-900 mb-2">Email Confirmation</h4>
        <p className="text-blue-800">
          Weather summary has been sent to <strong>{userData.email}</strong>
        </p>
      </div>
    </div>
  );
};

export default WeatherResult;