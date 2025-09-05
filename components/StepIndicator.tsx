
import React from 'react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <nav aria-label="Progress" className="overflow-x-auto scrollbar-hide">
      <ol role="list" className="flex items-center min-w-max px-2 w-full justify-between sm:justify-start">
        {steps.map((step, stepIdx) => (
          <li key={step} className={`relative flex-shrink-0 ${stepIdx !== steps.length - 1 ? 'pr-2 sm:pr-4 md:pr-8 lg:pr-20' : ''}`}>
            {stepIdx < currentStep - 1 ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-sic-green" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center bg-sic-green rounded-full">
                   <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                   </svg>
                </div>
                <span className="absolute -bottom-6 sm:-bottom-7 w-max text-center text-xs text-sic-green font-semibold whitespace-nowrap">{step}</span>
              </>
            ) : stepIdx === currentStep - 1 ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center bg-white border-2 border-sic-green rounded-full">
                  <span className="h-2.5 w-2.5 bg-sic-green rounded-full" aria-hidden="true" />
                </div>
                <span className="absolute -bottom-6 sm:-bottom-7 w-max text-center text-xs text-sic-green font-bold whitespace-nowrap">{step}</span>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="group relative flex h-8 w-8 items-center justify-center bg-white border-2 border-gray-300 rounded-full">
                  <span className="h-2.5 w-2.5 bg-transparent rounded-full" aria-hidden="true" />
                </div>
                 <span className="absolute -bottom-6 sm:-bottom-7 w-max text-center text-xs text-gray-500 whitespace-nowrap">{step}</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};