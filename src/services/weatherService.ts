import { WeatherData } from '../types';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo-key';
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

/**
 * Fetches weather data for a given city
 * @param city The city to fetch weather data for
 * @returns Weather data including temperature, condition, and air quality
 */
export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
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

/**
 * Gets a description of air quality based on PM2.5 value
 * @param aqi The PM2.5 value
 * @returns A description of the air quality
 */
export const getAQIDescription = (aqi: number): string => {
  if (aqi <= 12) return 'Good';
  if (aqi <= 35.4) return 'Moderate';
  if (aqi <= 55.4) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 150.4) return 'Unhealthy';
  if (aqi <= 250.4) return 'Very Unhealthy';
  return 'Hazardous';
};