import React from 'react';
import Container from '@cloudscape-design/components/container';

interface CardProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon, children }) => {
  return (
    <Container
      header={
        <div className="flex items-center text-sm font-semibold text-gray-800 gap-2">
          {icon}
          {title}
        </div>
      }
      className="rounded-xl border border-gray-300 shadow-sm px-4 py-3 bg-white w-full"
    >
      {children}
    </Container>
  );
};

export default Card;
