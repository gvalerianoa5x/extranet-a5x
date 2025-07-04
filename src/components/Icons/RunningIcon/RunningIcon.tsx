import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const RunningIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => {
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
        d="M12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6Z"
        fill="currentColor" 
      />
      <path
        d="M15 8C14.25 7 12.5 7 11.5 7.5C10.5 8 9.5 9.5 9.5 9.5L8.5 12.5L7 18L9 18.5L10.5 14L11 13L11 16L11 21L13 21.5L13.5 16L14.5 14L16 16L18 19L19.5 18L17 13C17 13 15.75 9 15 8Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default RunningIcon;