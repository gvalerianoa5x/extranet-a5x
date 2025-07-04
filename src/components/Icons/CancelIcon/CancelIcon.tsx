import React from 'react';

interface CancelIconProps {
  size?: number;
  className?: string;
}

export const CancelIcon: React.FC<CancelIconProps> = ({ size = 16, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      
      <circle 
        cx="12" 
        cy="12" 
        r="9" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none" 
      />
      <line 
        x1="5" 
        y1="19" 
        x2="19" 
        y2="5" 
        stroke="currentColor" 
        strokeWidth="2" 
      />
    </svg>
  );
};

export default CancelIcon;