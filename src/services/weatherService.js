import { createClient } from '@supabase/supabase-js';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

export const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`);
    
    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      conditionIcon: data.current.condition.icon,
      aqi: data.current.air_quality?.pm2_5 || 0,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data. Please try again.');
  }
};

export const getAQIDescription = (aqi) => {
  if (aqi <= 12) return 'Good';
  if (aqi <= 35.4) return 'Moderate';
  if (aqi <= 55.4) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 150.4) return 'Unhealthy';
  if (aqi <= 250.4) return 'Very Unhealthy';
  return 'Hazardous';
};