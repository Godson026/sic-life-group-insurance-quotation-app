
import React, { useMemo } from 'react';
import { QuotationData, RiderId } from '../../types';
import { AVAILABLE_RIDERS } from '../../constants';
import { Button } from '../common/Button';

interface PremiumCalculationProps {
  data: QuotationData;
  nextStep: () => void;
  prevStep: () => void;
}

// Simple age factor: premium increases by 1.5% for each year over 30
const getAgeFactor = (age: number) => {
    if (age <= 30) return 1;
    return 1 + (age - 30) * 0.015;
}

const calculatePremium = (sumAssured: number, age: number, riderId: RiderId) => {
    const rider = AVAILABLE_RIDERS.find(r => r.id === riderId);
    if (!rider) return 0;
    const basePremium = (sumAssured / 1000) * rider.premiumRate;
    return basePremium * getAgeFactor(age);
};

export const PremiumCalculation: React.FC<PremiumCalculationProps> = ({ data, nextStep, prevStep }) => {
    const { members, policyDetails, selectedRiders } = data;
    const sumAssured = policyDetails.sumAssured;
    const activeRiders = useMemo(() => AVAILABLE_RIDERS.filter(r => selectedRiders.has(r.id)), [selectedRiders]);

    const memberPremiums = useMemo(() => {
        return members.map(member => {
            const premiums: { [key in RiderId]?: number } = {};
            let total = 0;
            activeRiders.forEach(rider => {
                const premium = calculatePremium(sumAssured, member.age, rider.id);
                premiums[rider.id] = premium;
                total += premium;
            });
            return { ...member, premiums, total };
        });
    }, [members, sumAssured, activeRiders]);

    const totalGroupPremium = useMemo(() => {
        return memberPremiums.reduce((acc, member) => acc + member.total, 0);
    }, [memberPremiums]);
    
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-sic-green mb-4 sm:mb-6">Step 3: Premium Calculation</h2>
      <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">Below is the premium breakdown for each member based on the selected riders and a sum assured of <span className="font-bold">GH₵{sumAssured.toLocaleString()}</span>.</p>
      
      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-4">
        {memberPremiums.map((member) => (
          <div key={member.id} className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-sm font-medium text-gray-900 truncate flex-1">{member.fullName}</h3>
              <span className="text-sm font-bold text-sic-green ml-2">GH₵{member.total.toFixed(2)}</span>
            </div>
            <div className="text-xs text-gray-600 mb-3">
              <p>Age: {member.age}</p>
            </div>
            <div className="space-y-1">
              {activeRiders.map(rider => (
                <div key={rider.id} className="flex justify-between text-xs">
                  <span className="text-gray-600">{rider.name.split('(')[0]}:</span>
                  <span className="font-medium">GH₵{member.premiums[rider.id]?.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="bg-sic-green text-white p-4 rounded-lg text-center">
          <p className="text-sm font-bold">Total Group Annual Premium:</p>
          <p className="text-lg font-bold text-sic-lime">GH₵{totalGroupPremium.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Age</th>
                  {activeRiders.map(rider => (
                      <th key={rider.id} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">{rider.name.split('(')[0]}</th>
                  ))}
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {memberPremiums.map((member) => (
                  <tr key={member.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{member.fullName}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.age}</td>
                    {activeRiders.map(rider => (
                         <td key={rider.id} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">GH₵{member.premiums[rider.id]?.toFixed(2)}</td>
                    ))}
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-gray-800">GH₵{member.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                    <td colSpan={2 + activeRiders.length} className="pt-6 pb-2 text-right font-bold text-lg text-sic-green">Total Group Annual Premium:</td>
                    <td className="pt-6 pb-2 font-bold text-lg text-sic-green">GH₵{totalGroupPremium.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      
      <div className="mt-6 sm:mt-8 flex justify-between">
        <Button onClick={prevStep} variant="ghost">Back</Button>
        <Button onClick={nextStep}>Next: Review & Confirm</Button>
      </div>
    </div>
  );
};