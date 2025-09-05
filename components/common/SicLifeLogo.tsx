
import React from 'react';

interface SicLifeLogoProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export const SicLifeLogo: React.FC<SicLifeLogoProps> = ({ className, width = 200, height = "auto" }) => (
    <img 
      src="/sic-life-logo.png" 
      alt="SIC Life - Absolute peace of mind" 
      width={width} 
      height={height}
      className={className}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
);
