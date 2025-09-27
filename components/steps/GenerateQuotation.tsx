
import React from 'react';
import { QuotationData } from '../../types';
import { Button } from '../common/Button';
import { QuotationView } from '../QuotationView';

interface GenerateQuotationProps {
  data: QuotationData;
  resetQuotation: () => void;
}

export const GenerateQuotation: React.FC<GenerateQuotationProps> = ({ data, resetQuotation }) => {

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 no-print space-y-4 sm:space-y-0">
            <div className="flex-1">
                 <h2 className="text-xl sm:text-2xl font-bold text-sic-green">Quotation Generated</h2>
                 <p className="text-sm sm:text-base text-gray-600">The quotation for "{data.policyDetails.groupName}" is ready.</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <Button onClick={handlePrint} variant="primary" className="w-full sm:w-auto">
                    Download PDF / Print
                </Button>
                <Button variant="secondary" onClick={() => alert("Email functionality not implemented.")} className="w-full sm:w-auto">
                    Email to Client
                </Button>
                <Button onClick={resetQuotation} variant="ghost" className="w-full sm:w-auto">
                    Start New Quotation
                </Button>
            </div>
      </div>
      
      <div className="print-container bg-white p-4 sm:p-8 rounded-lg shadow-2xl border">
        <QuotationView data={data} />
      </div>

    </div>
  );
};