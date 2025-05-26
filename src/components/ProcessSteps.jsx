import React, { useState } from 'react';
import { CheckCircle2, Circle, XCircle } from 'lucide-react';

export const useProcessSteps = () => {
  const [steps, setSteps] = useState({
    validate: 'waiting',
    weather: 'waiting',
    database: 'waiting',
    email: 'waiting'
  });

  const updateStepStatus = (step, status) => {
    setSteps(prev => ({
      ...prev,
      [step]: status
    }));
  };

  return [steps, updateStepStatus];
};

const ProcessSteps = ({ steps }) => {
  const stepsList = [
    { id: 'validate', title: 'Validate Information', description: 'Checking email format' },
    { id: 'weather', title: 'Fetch Weather', description: 'Getting weather data for your city' },
    { id: 'database', title: 'Store Data', description: 'Saving your information securely' },
    { id: 'email', title: 'Send Email', description: 'Sending weather summary to your inbox' }
  ];

  const getStepIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-8 h-8 text-green-500" />;
      case 'processing':
        return (
          <div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
        );
      case 'error':
        return <XCircle className="w-8 h-8 text-red-500" />;
      default:
        return <Circle className="w-8 h-8 text-gray-300" />;
    }
  };

  return (
    <div className="space-y-6">
      {stepsList.map((step) => (
        <div key={step.id} className="flex items-start gap-4">
          <div className="flex-shrink-0">{getStepIcon(steps[step.id])}</div>
          <div>
            <h3 className={`font-medium ${
              steps[step.id] === 'processing' ? 'text-blue-600' : 
              steps[step.id] === 'completed' ? 'text-green-600' : 
              steps[step.id] === 'error' ? 'text-red-600' : 
              'text-gray-500'
            }`}>
              {step.title}
            </h3>
            <p className="text-sm text-gray-500">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessSteps;