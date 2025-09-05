
import React, { useState } from 'react';
import { QuotationData, RiderId } from '../../types';
import { AVAILABLE_RIDERS, SUM_ASSURED_OPTIONS } from '../../constants';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Tooltip } from '../common/Tooltip';

interface PolicySetupProps {
  data: QuotationData;
  setData: React.Dispatch<React.SetStateAction<QuotationData>>;
  nextStep: () => void;
}

export const PolicySetup: React.FC<PolicySetupProps> = ({ data, setData, nextStep }) => {
  const { policyDetails, selectedRiders } = data;
  const [customSumAssured, setCustomSumAssured] = useState<string>('');
  const [isCustom, setIsCustom] = useState(!SUM_ASSURED_OPTIONS.includes(policyDetails.sumAssured));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData(prev => ({
      ...prev,
      policyDetails: { ...prev.policyDetails, [e.target.name]: e.target.value }
    }));
  };
  
  const handleSumAssuredChange = (value: number) => {
    setIsCustom(false);
    setCustomSumAssured('');
    setData(prev => ({ ...prev, policyDetails: { ...prev.policyDetails, sumAssured: value } }));
  };

  const handleCustomSumAssuredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsCustom(true);
    setCustomSumAssured(value);
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue > 0) {
      setData(prev => ({ ...prev, policyDetails: { ...prev.policyDetails, sumAssured: numericValue } }));
    }
  };

  const handleRiderToggle = (riderId: RiderId) => {
    setData(prev => {
      const newSelection = new Set(prev.selectedRiders);
      if (newSelection.has(riderId)) {
        if (riderId !== RiderId.GROUP_LIFE) { // Prevent unchecking Group Life
            newSelection.delete(riderId);
        }
      } else {
        newSelection.add(riderId);
      }
      return { ...prev, selectedRiders: newSelection };
    });
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-sic-green mb-4 sm:mb-6">Step 1: Policy Setup</h2>
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="md:col-span-2">
            <Input id="groupName" label="Group/Institution Name" name="groupName" value={policyDetails.groupName} onChange={handleInputChange} placeholder="e.g., Acme Corporation" />
          </div>
          <Input id="contactPerson" label="Contact Person" name="contactPerson" value={policyDetails.contactPerson} onChange={handleInputChange} placeholder="e.g., Jane Doe" />
          <Input id="contactNumber" label="Contact Number" name="contactNumber" type="tel" value={policyDetails.contactNumber} onChange={handleInputChange} placeholder="e.g., 024 123 4567" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sum Assured (GH₵)</label>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {SUM_ASSURED_OPTIONS.map(option => (
              <button key={option} type="button" onClick={() => handleSumAssuredChange(option)} className={`px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-2 transition-colors duration-200 min-h-[44px] touch-manipulation ${!isCustom && policyDetails.sumAssured === option ? 'bg-sic-green text-white border-sic-green' : 'bg-white text-gray-700 border-gray-300 hover:border-sic-green hover:bg-sic-green/5'}`}>
                {option.toLocaleString()}
              </button>
            ))}
            <div className="relative">
              <input type="number" placeholder="Custom Amount" value={isCustom ? customSumAssured : ''} onChange={handleCustomSumAssuredChange} className="w-32 sm:w-40 px-3 sm:px-4 py-2 sm:py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm placeholder:text-gray-400 transition-all duration-200 ease-in-out hover:border-sic-green focus:outline-none focus:ring-2 focus:ring-sic-lime/70 focus:border-sic-green text-base sm:text-sm min-h-[44px] touch-manipulation" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Riders (Benefits)</label>
          <div className="space-y-3">
            {AVAILABLE_RIDERS.map(rider => (
              <div 
                key={rider.id} 
                className={`p-3 sm:p-4 border rounded-lg flex items-start space-x-3 sm:space-x-4 transition-all duration-200 ${selectedRiders.has(rider.id) ? 'border-sic-green bg-sic-lime/10' : 'border-gray-200 bg-white'} ${rider.id !== RiderId.GROUP_LIFE ? 'hover:shadow-md hover:border-sic-green' : ''}`}
              >
                  <input 
                      id={rider.id}
                      type="checkbox"
                      className="h-5 w-5 rounded border-gray-300 text-sic-green focus:ring-sic-green focus:ring-offset-2 mt-1 flex-shrink-0 touch-manipulation"
                      checked={selectedRiders.has(rider.id)}
                      onChange={() => handleRiderToggle(rider.id)}
                      disabled={rider.id === RiderId.GROUP_LIFE}
                  />
                  <div className="flex-1 min-w-0">
                      <label htmlFor={rider.id} className={`font-semibold text-gray-800 block text-sm sm:text-base ${rider.id !== RiderId.GROUP_LIFE ? 'cursor-pointer' : 'cursor-default'}`}>
                          {rider.name}
                      </label>
                      <div className="flex items-start mt-1">
                          <label htmlFor={rider.id} className={`text-xs sm:text-sm text-gray-600 mr-2 flex-1 ${rider.id !== RiderId.GROUP_LIFE ? 'cursor-pointer' : 'cursor-default'}`}>
                              {rider.description}
                          </label>
                          <Tooltip text={rider.details}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                          </Tooltip>
                      </div>
                  </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">* Group Life (Death Only) is a mandatory base cover.</p>
        </div>

      </div>
      <div className="mt-8 flex justify-end">
        <Button onClick={nextStep} disabled={!policyDetails.groupName || !policyDetails.contactPerson || !policyDetails.contactNumber || policyDetails.sumAssured <= 0}>
          Next: Add Members
        </Button>
      </div>
    </div>
  );
};