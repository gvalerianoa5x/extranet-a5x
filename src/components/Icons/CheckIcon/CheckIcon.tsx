import React from 'react';

interface CheckIconProps {
  size?: number;
  className?: string;
}

export const CheckIcon: React.FC<CheckIconProps> = ({ size = 16, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      
      <path 
        d="M17.9 7.1L16.5 5.7L11 11.2L12.4 12.6L17.9 7.1ZM22.2 5.7L12.4 15.5L8.3 11.4L6.9 12.8L12.4 18.3L23.6 7.1L22.2 5.7ZM1.4 12.8L6.9 18.3L8.3 16.9L2.8 11.4L1.4 12.8Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CheckIcon;