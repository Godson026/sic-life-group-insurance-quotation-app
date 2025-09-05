import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className="relative flex items-center">
      <div
        onTouchStart={() => setIsVisible(!isVisible)}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-pointer"
      >
        {children}
      </div>
      {isVisible && (
        <div 
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 max-w-[calc(100vw-2rem)] p-3 bg-gray-900 text-white text-xs sm:text-sm rounded-lg shadow-xl z-50
                     scale-95 sm:scale-100 origin-bottom tooltip-container"
          role="tooltip"
        >
          <p className="leading-relaxed">{text}</p>
          <svg className="absolute text-gray-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve" aria-hidden="true">
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
          </svg>
          {/* Close button for mobile */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-1 right-1 text-white/70 hover:text-white text-lg leading-none sm:hidden"
            aria-label="Close tooltip"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};
