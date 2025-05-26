import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { CloudSun } from 'lucide-react';
import UserForm from './components/UserForm';
import WeatherResult from './components/WeatherResult';
import ProcessSteps, { useProcessSteps } from './components/ProcessSteps';
import { validateEmail } from './utils/validation';
import { fetchWeatherData } from './services/weatherService';
import { storeSubmissionData } from './services/supabaseService';
import { sendConfirmationEmail } from './services/emailService';
import { UserFormData, WeatherData, SubmissionData } from './types';

function App() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserFormData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [steps, updateStepStatus] = useProcessSteps();
  
  const handleSubmit = async (formData: UserFormData) => {
    setLoading(true);
    setUserData(formData);
    
    try {
      // Step 1: Validate email
      updateStepStatus('validate', 'processing');
      const isEmailValid = validateEmail(formData.email);
      
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate processing
      
      if (!isEmailValid) {
        updateStepStatus('validate', 'error');
        toast.error('Invalid email format');
        setLoading(false);
        return;
      }
      
      updateStepStatus('validate', 'completed');
      
      // Step 2: Fetch weather data
      updateStepStatus('weather', 'processing');
      
      const weather = await fetchWeatherData(formData.city);
      setWeatherData(weather);
      
      updateStepStatus('weather', 'completed');
      
      // Step 3: Store data in Supabase
      updateStepStatus('database', 'processing');
      
      const submissionData: SubmissionData = {
        ...formData,
        ...weather,
        emailValid: isEmailValid,
        timestamp: new Date().toISOString(),
      };
      
      const dbResult = await storeSubmissionData(submissionData);
      
      if (!dbResult.success) {
        updateStepStatus('database', 'error');
        toast.error(dbResult.error || 'Failed to store data');
        // Continue to next step anyway
      } else {
        updateStepStatus('database', 'completed');
      }
      
      // Step 4: Send confirmation email
      updateStepStatus('email', 'processing');
      
      const emailResult = await sendConfirmationEmail(formData, weather);
      
      if (!emailResult.success) {
        updateStepStatus('email', 'error');
        toast.error(emailResult.message || 'Failed to send email');
      } else {
        updateStepStatus('email', 'completed');
        toast.success('Process completed successfully!');
      }
    } catch (error) {
      console.error('Error in submission process:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <CloudSun className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Weather Automation System</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your information to receive personalized weather updates and insights for your location.
          </p>
        </header>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Your Information</h2>
            
            {weatherData ? (
              <WeatherResult userData={userData!} weatherData={weatherData} />
            ) : (
              <UserForm onSubmit={handleSubmit} isLoading={loading} />
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Process Status</h2>
            <ProcessSteps steps={steps} />
            
            {weatherData && (
              <div className="mt-6">
                <button
                  onClick={() => {
                    setWeatherData(null);
                    setUserData(null);
                    updateStepStatus('validate', 'waiting');
                    updateStepStatus('weather', 'waiting');
                    updateStepStatus('database', 'waiting');
                    updateStepStatus('email', 'waiting');
                  }}
                  className="w-full py-2 px-4 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;