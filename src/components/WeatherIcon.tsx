import React from 'react';
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Wind } from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  className?: string;
  size?: number;
}

/**
 * Component that displays an icon based on weather condition
 */
const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className = '', size = 24 }) => {
  const getIconByCondition = () => {
    const lowercaseCondition = condition.toLowerCase();
    
    if (lowercaseCondition.includes('sunny') || lowercaseCondition.includes('clear')) {
      return <Sun size={size} className={className} />;
    } else if (lowercaseCondition.includes('rain')) {
      return <CloudRain size={size} className={className} />;
    } else if (lowercaseCondition.includes('drizzle')) {
      return <CloudDrizzle size={size} className={className} />;
    } else if (lowercaseCondition.includes('snow')) {
      return <CloudSnow size={size} className={className} />;
    } else if (lowercaseCondition.includes('fog') || lowercaseCondition.includes('mist')) {
      return <CloudFog size={size} className={className} />;
    } else if (lowercaseCondition.includes('thunder') || lowercaseCondition.includes('lightning')) {
      return <CloudLightning size={size} className={className} />;
    } else if (lowercaseCondition.includes('wind')) {
      return <Wind size={size} className={className} />;
    } else {
      return <Cloud size={size} className={className} />;
    }
  };

  return getIconByCondition();
};

export default WeatherIcon;