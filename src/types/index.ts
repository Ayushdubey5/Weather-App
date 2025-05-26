export interface UserFormData {
  name: string;
  email: string;
  city: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  city?: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  conditionIcon: string;
  aqi: number;
}

export interface SubmissionData extends UserFormData, WeatherData {
  emailValid: boolean;
  timestamp: string;
}