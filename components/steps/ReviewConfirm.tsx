import React, { useMemo } from 'react';
import { QuotationData } from '../../types';
import { AVAILABLE_RIDERS } from '../../constants';
import { Button } from '../common/Button';

interface ReviewConfirmProps {
  data: QuotationData;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

export const ReviewConfirm: React.FC<ReviewConfirmProps> = ({ data, nextStep, prevStep, goToStep }) => {
  const { policyDetails, selectedRiders, members } = data;

  const activeRiders = useMemo(() => {
    return AVAILABLE_RIDERS
      .filter(rider => selectedRiders.has(rider.id))
      .map(rider => rider.name);
  }, [selectedRiders]);

  const memberPremiums = useMemo(() => {
    const getAgeFactor = (age: number) => (age > 30 ? 1 + (age - 30) * 0.015 : 1);
    const activeRiderList = AVAILABLE_RIDERS.filter(r => selectedRiders.has(r.id));
    
    return members.map(member => {
        const memberPremium = activeRiderList.reduce((memberTotal, rider) => {
            const basePremium = (policyDetails.sumAssured / 1000) * rider.premiumRate;
            return memberTotal + (basePremium * getAgeFactor(member.age));
        }, 0);
        return { ...member, premium: memberPremium };
    });
  }, [members, policyDetails.sumAssured, selectedRiders]);

  const totalPremium = useMemo(() => {
    return memberPremiums.reduce((acc, member) => acc + member.premium, 0);
  }, [memberPremiums]);


  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-sic-green mb-4 sm:mb-6">Step 4: Review & Confirm</h2>
      <div className="space-y-6 sm:space-y-8">
        
        {/* Group Details */}
        <div className="p-4 sm:p-6 border rounded-lg bg-gray-50">
          <h3 className="text-base sm:text-lg font-semibold text-sic-green mb-4">Policy Details</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 sm:gap-y-4">
            <div className="sm:col-span-2">
              <dt className="text-xs sm:text-sm font-medium text-gray-500">Group Name</dt>
              <dd className="mt-1 text-sm sm:text-base text-gray-900 font-semibold">{policyDetails.groupName}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-xs sm:text-sm font-medium text-gray-500">Contact Person</dt>
              <dd className="mt-1 text-sm sm:text-base text-gray-900 font-semibold">{policyDetails.contactPerson}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-xs sm:text-sm font-medium text-gray-500">Contact Number</dt>
              <dd className="mt-1 text-sm sm:text-base text-gray-900 font-semibold">{policyDetails.contactNumber}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-xs sm:text-sm font-medium text-gray-500">Sum Assured</dt>
              <dd className="mt-1 text-sm sm:text-base text-gray-900 font-semibold">GH₵ {policyDetails.sumAssured.toLocaleString()}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-xs sm:text-sm font-medium text-gray-500">Policy Duration</dt>
              <dd className="mt-1 text-sm sm:text-base text-gray-900 font-semibold">{policyDetails.durationYears} Year(s)</dd>
            </div>
          </dl>
        </div>

        {/* Riders Selected */}
        <div className="p-4 sm:p-6 border rounded-lg bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
            <h3 className="text-base sm:text-lg font-semibold text-sic-green">Riders Selected</h3>
            <Button variant="ghost" onClick={() => goToStep(1)} className="text-xs sm:text-sm !px-3 !py-2">Edit Riders</Button>
          </div>
          <ul className="space-y-2">
            {activeRiders.map(name => (
              <li key={name} className="flex items-center">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs sm:text-sm text-gray-700">{name}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Member Summary */}
        <div className="p-4 sm:p-6 border rounded-lg bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
                <h3 className="text-base sm:text-lg font-semibold text-sic-green">Member Summary ({members.length})</h3>
                <Button variant="ghost" onClick={() => goToStep(2)} className="text-xs sm:text-sm !px-3 !py-2">Edit Members</Button>
            </div>
            
            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-3 max-h-60 overflow-y-auto">
              {memberPremiums.map(member => (
                <div key={member.id} className="bg-white p-3 rounded-lg border">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-gray-900 truncate flex-1">{member.fullName}</h4>
                    <span className="text-sm font-bold text-sic-green ml-2">GH₵ {member.premium.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500">Age: {member.age}</p>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block max-h-60 overflow-y-auto border rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Full Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Age</th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Annual Premium</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {memberPremiums.map(member => (
                            <tr key={member.id}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{member.fullName}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{member.age}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">GH₵ {member.premium.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>


        {/* Premium Summary */}
        <div className="p-4 sm:p-6 border rounded-lg bg-sic-green text-white">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Premium Summary</h3>
          <div className="flex justify-between items-center text-sm sm:text-lg">
            <span>Total Number of Members:</span>
            <span className="font-bold">{members.length}</span>
          </div>
          <hr className="my-3 border-green-400"/>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-lg sm:text-2xl space-y-2 sm:space-y-0">
            <span className="font-semibold">Total Annual Premium:</span>
            <span className="font-bold text-sic-lime">GH₵ {totalPremium.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>

      </div>
      <div className="mt-6 sm:mt-8 flex justify-between">
        <Button onClick={prevStep} variant="ghost">Back</Button>
        <Button onClick={nextStep} variant="secondary">Generate Quotation</Button>
      </div>
    </div>
  );
};