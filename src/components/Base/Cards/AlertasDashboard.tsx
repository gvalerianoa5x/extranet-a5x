import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const AlertasDashboard: React.FC = () => {
  const alertas = [
    {
      type: 'muted',
      message:
        'Lorem ipsum dolor sit amet consectetur. Non eu at in fringilla quis. In ultrices consectetur elementum.',
    },
    {
      type: 'warning',
      message:
        'Lorem ipsum dolor sit amet consectetur. Sociis vel pharetra posuere senectus. Amet ac in ornare.',
    },
    {
      type: 'warning',
      message:
        'Lorem ipsum dolor sit amet consectetur. Sed lobortis luctus duis habitant. Aliquam mauris.',
    },
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'warning':
        return <AlertCircle className="text-yellow-500" size={16} />;
      case 'muted':
        return <Info className="text-gray-300" size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3 text-sm pt-1">
      {alertas.map((alert, index) => (
        <div
          key={index}
          className={`flex items-start gap-2 ${
            alert.type === 'muted' ? 'text-gray-400 line-through' : 'text-gray-800'
          }`}
        >
          {renderIcon(alert.type)}
          <span className="leading-snug">{alert.message}</span>
        </div>
      ))}
    </div>
  );
};

export default AlertasDashboard;
