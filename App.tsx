
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { StepIndicator } from './components/StepIndicator';
import { PolicySetup } from './components/steps/PolicySetup';
import { AddMembers } from './components/steps/AddMembers';
import { PremiumCalculation } from './components/steps/PremiumCalculation';
import { ReviewConfirm } from './components/steps/ReviewConfirm';
import { GenerateQuotation } from './components/steps/GenerateQuotation';
import { QuotationData, initialQuotationData } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [quotationData, setQuotationData] = useState<QuotationData>(initialQuotationData);

  const resetQuotation = useCallback(() => {
    setQuotationData(initialQuotationData);
    setStep(1);
  }, []);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  const goToStep = (stepNumber: number) => setStep(stepNumber);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PolicySetup data={quotationData} setData={setQuotationData} nextStep={nextStep} />;
      case 2:
        return <AddMembers data={quotationData} setData={setQuotationData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <PremiumCalculation data={quotationData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <ReviewConfirm data={quotationData} nextStep={nextStep} prevStep={prevStep} goToStep={goToStep} />;
      case 5:
        return <GenerateQuotation data={quotationData} resetQuotation={resetQuotation} />;
      default:
        return <PolicySetup data={quotationData} setData={setQuotationData} nextStep={nextStep} />;
    }
  };

  const steps = ["Policy Setup", "Add Members", "Premiums", "Review", "Generate"];

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 overflow-x-hidden">
      <Header onNewQuotation={resetQuotation} />
      <main className="container mx-auto p-2 sm:p-4 lg:p-8 max-w-full">
        <div className="max-w-5xl mx-auto w-full">
          {step < 5 && <StepIndicator steps={steps} currentStep={step} />}
          <div className="mt-4 sm:mt-8 bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 w-full">
            {renderStep()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
