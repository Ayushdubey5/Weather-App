import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { CloudSun, Sun, Cloud, CloudRain, Wind } from 'lucide-react';
import UserForm from './components/UserForm';
import WeatherResult from './components/WeatherResult';
import ProcessSteps from './components/ProcessSteps';

function App() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    setUserData(formData);
    
    try {
      // Step 1: Validate email
      setCurrentStep(1);
      const isEmailValid = validateEmail(formData.email);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!isEmailValid) {
        toast.error('Invalid email format');
        setLoading(false);
        return;
      }
      
      // Step 2: Fetch weather data
      setCurrentStep(2);
      const weather = await fetchWeatherData(formData.city);
      setWeatherData(weather);
      
      // Step 3: Store in database
      setCurrentStep(3);
      await storeData({ ...formData, ...weather });
      
      // Step 4: Send email
      setCurrentStep(4);
      await sendEmail(formData, weather);
      
      toast.success('Process completed successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Simulated API calls
  const fetchWeatherData = async (city) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      temperature: Math.floor(Math.random() * 30),
      condition: ['Sunny', 'Cloudy', 'Rainy', 'Windy'][Math.floor(Math.random() * 4)],
      aqi: Math.floor(Math.random() * 150)
    };
  };

  const storeData = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Storing data:', data);
  };

  const sendEmail = async (userData, weatherData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Sending email to:', userData.email);
  };

  const getWeatherIcon = () => {
    if (!weatherData) return <CloudSun className="w-32 h-32 text-blue-500" />;
    switch (weatherData.condition.toLowerCase()) {
      case 'sunny': return <Sun className="w-32 h-32 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-32 h-32 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-32 h-32 text-blue-600" />;
      case 'windy': return <Wind className="w-32 h-32 text-blue-400" />;
      default: return <CloudSun className="w-32 h-32 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            {getWeatherIcon()}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Weather Automation System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get real-time weather updates and insights for your location, 
            delivered straight to your inbox.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              {weatherData ? 'Weather Summary' : 'Enter Your Details'}
            </h2>
            
            {weatherData ? (
              <WeatherResult userData={userData} weatherData={weatherData} />
            ) : (
              <UserForm onSubmit={handleSubmit} isLoading={loading} />
            )}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Process Status</h2>
            <ProcessSteps currentStep={currentStep} />
            
            {weatherData && (
              <button
                onClick={() => {
                  setWeatherData(null);
                  setUserData(null);
                  setCurrentStep(0);
                }}
                className="mt-6 w-full py-3 px-4 bg-blue-100 text-blue-700 rounded-lg 
                          hover:bg-blue-200 transition-colors font-medium"
              >
                Start Over
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;