import React, { useState } from 'react';
import { SicLifeLogo } from './common/SicLifeLogo';
import { Button } from './common/Button';

interface HeaderProps {
    onNewQuotation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewQuotation }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg no-print">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-6 space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
             <SicLifeLogo width={160} height={60} className="h-12 sm:h-16" />
             <div className="text-center sm:text-left">
               <h1 className="text-sic-green text-lg sm:text-xl lg:text-2xl font-bold">
                 Group Business Quote Generator
               </h1>
               <p className="text-sic-dark-green text-sm sm:text-base font-medium">
                 Professional Insurance Solutions
               </p>
             </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Button 
              variant="secondary" 
              onClick={onNewQuotation} 
              className="!px-4 !py-2 !shadow-none !bg-sic-lime !text-sic-dark-green hover:!bg-white hover:!text-sic-green"
            >
                New Quotation
            </Button>
             <Button 
               variant="ghost" 
               disabled 
               className="!px-4 !py-2 !shadow-none !text-sic-green hover:!bg-sic-green/10"
             >
               Saved Quotations
             </Button>
             <Button 
               variant="ghost" 
               disabled 
               className="!px-4 !py-2 !shadow-none !text-sic-green hover:!bg-sic-green/10"
             >
               Settings
             </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-sic-green hover:bg-sic-green/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-sic-green/20 py-4">
            <nav className="flex flex-col space-y-2">
              <Button 
                variant="secondary" 
                onClick={() => {
                  onNewQuotation();
                  setIsMobileMenuOpen(false);
                }} 
                className="!px-4 !py-3 !shadow-none !w-full !justify-start !bg-sic-lime !text-sic-dark-green hover:!bg-white hover:!text-sic-green"
              >
                New Quotation
              </Button>
              <Button 
                variant="ghost" 
                disabled 
                className="!px-4 !py-3 !shadow-none !w-full !justify-start !text-sic-green hover:!bg-sic-green/10"
              >
                Saved Quotations
              </Button>
              <Button 
                variant="ghost" 
                disabled 
                className="!px-4 !py-3 !shadow-none !w-full !justify-start !text-sic-green hover:!bg-sic-green/10"
              >
                Settings
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};