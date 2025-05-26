import { UserFormData, WeatherData } from '../types';
import { getAQIDescription } from './weatherService';

/**
 * Sends a confirmation email with weather summary
 * @param userData User data from the form
 * @param weatherData Weather data from the API
 * @returns A promise that resolves when the email is sent
 */
export const sendConfirmationEmail = async (
  userData: UserFormData, 
  weatherData: WeatherData
): Promise<{ success: boolean; message?: string }> => {
  try {
    // In a real application, this would call a backend API or service
    // For demo purposes, we'll just log the email content
    console.log('Sending email to:', userData.email);
    console.log('Email content:');
    console.log(`
      Hi ${userData.name},

      Thanks for submitting your details.

      Here's the current weather for ${userData.city}:

      - Temperature: ${weatherData.temperature}°C  
      - Condition: ${weatherData.condition}  
      - AQI: ${weatherData.aqi} (${getAQIDescription(weatherData.aqi)})

      ${getWeatherAdvice(weatherData)}

      Stay safe and take care!

      Thanks,  
      Weather Automation System
    `);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      message: 'Failed to send confirmation email. Please try again.' 
    };
  }
};

/**
 * Generates weather advice based on current conditions
 * @param weatherData The current weather data
 * @returns Personalized advice text
 */
const getWeatherAdvice = (weatherData: WeatherData): string => {
  const { temperature, condition, aqi } = weatherData;
  let advice = '';

  // Temperature advice
  if (temperature < 5) {
    advice += 'It\'s quite cold today. Remember to dress warmly if you\'re going outside. ';
  } else if (temperature > 30) {
    advice += 'It\'s very hot today. Stay hydrated and try to avoid prolonged sun exposure. ';
  }

  // Condition advice
  if (condition.toLowerCase().includes('rain')) {
    advice += 'Don\'t forget your umbrella! ';
  } else if (condition.toLowerCase().includes('snow')) {
    advice += 'Roads might be slippery, take care if you\'re driving. ';
  } else if (condition.toLowerCase().includes('sunny')) {
    advice += 'It\'s a great day for outdoor activities. Don\'t forget sunscreen! ';
  }

  // AQI advice
  const aqiDescription = getAQIDescription(aqi);
  if (aqiDescription === 'Good') {
    advice += 'Air quality is good - perfect for outdoor activities.';
  } else if (aqiDescription === 'Moderate') {
    advice += 'Air quality is moderate. If you have respiratory sensitivities, consider limiting prolonged outdoor activities.';
  } else {
    advice += 'Air quality is poor. Consider limiting time outdoors, especially if you have respiratory conditions.';
  }

  return advice;
};