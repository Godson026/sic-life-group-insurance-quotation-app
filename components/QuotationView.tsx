import React, { useMemo } from 'react';
import { QuotationData } from '../types';
import { AVAILABLE_RIDERS } from '../constants';
import { SicLifeLogo } from './common/SicLifeLogo';

interface QuotationViewProps {
  data: QuotationData;
  validityPeriod?: string;
}

export const QuotationView: React.FC<QuotationViewProps> = ({ data, validityPeriod = '30 days' }) => {
  const { policyDetails, selectedRiders, members } = data;

  const activeRiders = useMemo(() => {
    return AVAILABLE_RIDERS.filter(rider => selectedRiders.has(rider.id));
  }, [selectedRiders]);

  const memberPremiums = useMemo(() => {
    const getAgeFactor = (age: number) => (age > 30 ? 1 + (age - 30) * 0.015 : 1);
    return members.map(member => {
      const total = activeRiders.reduce((memberTotal, rider) => {
        const basePremium = (policyDetails.sumAssured / 1000) * rider.premiumRate;
        return memberTotal + (basePremium * getAgeFactor(member.age));
      }, 0);
      return { ...member, premium: total };
    });
  }, [members, policyDetails.sumAssured, activeRiders]);

  const totalPremium = useMemo(() => {
    return memberPremiums.reduce((total, member) => total + member.premium, 0);
  }, [memberPremiums]);

  return (
    <div className="font-sans text-sm">
      <header className="flex flex-col sm:flex-row justify-between items-start pb-6 border-b-4 border-sic-lime space-y-4 sm:space-y-0">
        <div>
          <SicLifeLogo width={200} height={80} className="h-16 sm:h-20" />
        </div>
        <div className="text-left sm:text-right w-full sm:w-auto">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sic-green">Provisional Premium Quotation</h1>
          <p className="text-gray-700 mt-1 text-sm sm:text-base">Date: {new Date().toLocaleDateString()}</p>
        </div>
      </header>
      
      <main className="mt-6 sm:mt-8">
        <section className="mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            <div>
                <h2 className="font-bold text-sic-green border-b pb-1 mb-2 text-sm sm:text-base">QUOTATION FOR</h2>
                <p className="font-semibold text-base sm:text-lg">{policyDetails.groupName}</p>
                <p className="text-sm sm:text-base">{policyDetails.contactPerson}</p>
                <p className="text-sm sm:text-base">{policyDetails.contactNumber}</p>
            </div>
             <div>
                <h2 className="font-bold text-sic-green border-b pb-1 mb-2 text-sm sm:text-base">POLICY DETAILS</h2>
                <p className="text-sm sm:text-base"><span className="font-semibold">Sum Assured:</span> GH₵ {policyDetails.sumAssured.toLocaleString()}</p>
                <p className="text-sm sm:text-base"><span className="font-semibold">Policy Period:</span> {policyDetails.durationYears} Year</p>
            </div>
        </section>

        <section className="mb-6 sm:mb-8">
            <h2 className="font-bold text-sic-green border-b pb-1 mb-3 text-sm sm:text-base">COVERED BENEFITS (RIDERS)</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-1">
                {activeRiders.map(rider => (
                    <li key={rider.id} className="flex items-center">
                        <svg className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span className="text-sm sm:text-base">{rider.name}</span>
                    </li>
                ))}
            </ul>
        </section>

        <section className="mb-6 sm:mb-8">
            <h2 className="font-bold text-sic-green border-b pb-1 mb-3 text-sm sm:text-base">MEMBER SCHEDULE & PREMIUMS</h2>
            
            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-3">
              {memberPremiums.map((member) => (
                <div key={member.id} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-gray-900 truncate flex-1">{member.fullName}</h3>
                    <span className="text-sm font-bold text-sic-green ml-2">GH₵ {member.premium.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>DOB: {member.dob}</p>
                    <p>Age: {member.age}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-700 sm:pl-3">Full Name</th>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Date of Birth</th>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Age</th>
                            <th scope="col" className="px-3 py-2 text-right text-xs font-semibold text-gray-700">Annual Premium (GH₵)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {memberPremiums.map((member) => (
                          <tr key={member.id}>
                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{member.fullName}</td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600">{member.dob}</td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600">{member.age}</td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-800 text-right font-medium">{member.premium.toFixed(2)}</td>
                          </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>

        <section className="bg-gray-100 p-4 sm:p-6 rounded-lg">
            <h2 className="font-bold text-sic-green mb-4 text-center text-lg sm:text-xl">PREMIUM SUMMARY</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <p className="text-base sm:text-lg text-gray-700 text-center sm:text-left">Total Annual Group Premium:</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sic-green">GH₵ {totalPremium.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
        </section>
      </main>

      <footer className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t text-xs text-gray-500 text-center">
        <div className="bg-sic-lime/20 border border-sic-lime rounded-lg p-3 mb-4">
          <p className="font-medium text-sic-dark-green text-xs sm:text-sm">
            This provisional quotation is valid for a period of <span className="font-bold">{validityPeriod}</span>.
          </p>
        </div>
        <p className="text-xs sm:text-sm">Premiums may be subject to underwriting.</p>
        <p className="font-bold mt-2 text-xs sm:text-sm">SIC Life Insurance Ltd.</p>
        <p className="text-xs sm:text-sm">Head Office, P.O. Box 3933, Accra, Ghana</p>
      </footer>
    </div>
  );
};