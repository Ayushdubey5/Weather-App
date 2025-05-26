import React from 'react';
import { Check, CloudRain, Database, Mail, User, X } from 'lucide-react';

type StepStatus = 'waiting' | 'processing' | 'completed' | 'error';

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: StepStatus;
}

interface ProcessStepsProps {
  steps: Step[];
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  const getStatusIcon = (status: StepStatus) => {
    switch (status) {
      case 'completed':
        return <Check className="w-5 h-5 text-white" />;
      case 'error':
        return <X className="w-5 h-5 text-white" />;
      case 'processing':
        return (
          <div className="w-4 h-4 border-2 border-t-white border-white/30 rounded-full animate-spin"></div>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status: StepStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'processing':
        return 'bg-blue-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div
                className={`${getStatusColor(
                  step.status
                )} w-8 h-8 rounded-full flex items-center justify-center`}
              >
                {getStatusIcon(step.status) || (
                  <span className="w-3 h-3 bg-white rounded-full"></span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className="h-12 w-0.5 bg-gray-200 ml-4 my-1"></div>
              )}
            </div>
            <div className="pt-1 pb-8">
              <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const useProcessSteps = (): [Step[], (id: string, status: StepStatus) => void] => {
  const [steps, setSteps] = React.useState<Step[]>([
    {
      id: 'validate',
      title: 'Validate Information',
      description: 'Checking email format and validating inputs',
      icon: <User className="w-5 h-5" />,
      status: 'waiting',
    },
    {
      id: 'weather',
      title: 'Fetch Weather Data',
      description: 'Getting current weather and air quality for your city',
      icon: <CloudRain className="w-5 h-5" />,
      status: 'waiting',
    },
    {
      id: 'database',
      title: 'Store Data',
      description: 'Saving your information and weather data',
      icon: <Database className="w-5 h-5" />,
      status: 'waiting',
    },
    {
      id: 'email',
      title: 'Send Confirmation',
      description: 'Sending weather summary to your email',
      icon: <Mail className="w-5 h-5" />,
      status: 'waiting',
    },
  ]);

  const updateStepStatus = (id: string, status: StepStatus) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === id ? { ...step, status } : step
      )
    );
  };

  return [steps, updateStepStatus];
};

export default ProcessSteps;