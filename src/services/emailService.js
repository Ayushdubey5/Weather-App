import { getAQIDescription } from './weatherService';

export const sendConfirmationEmail = async (userData, weatherData) => {
  try {
    // In a real application, this would call a backend API
    console.log('Sending email to:', userData.email);
    console.log('Email content:', `
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

const getWeatherAdvice = (weatherData) => {
  const { temperature, condition, aqi } = weatherData;
  let advice = '';

  if (temperature < 5) {
    advice += 'It\'s quite cold today. Remember to dress warmly if you\'re going outside. ';
  } else if (temperature > 30) {
    advice += 'It\'s very hot today. Stay hydrated and try to avoid prolonged sun exposure. ';
  }

  if (condition.toLowerCase().includes('rain')) {
    advice += 'Don\'t forget your umbrella! ';
  } else if (condition.toLowerCase().includes('snow')) {
    advice += 'Roads might be slippery, take care if you\'re driving. ';
  } else if (condition.toLowerCase().includes('sunny')) {
    advice += 'It\'s a great day for outdoor activities. Don\'t forget sunscreen! ';
  }

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