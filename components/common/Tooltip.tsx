import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div 
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-sm p-4 bg-gray-900 text-white text-sm rounded-lg shadow-xl 
                   opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 pointer-events-none
                   scale-95 group-hover:scale-100 origin-bottom"
        role="tooltip"
      >
        <p className="leading-relaxed">{text}</p>
        <svg className="absolute text-gray-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve" aria-hidden="true">
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
        </svg>
      </div>
    </div>
  );
};
