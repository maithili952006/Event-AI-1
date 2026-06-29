import React from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NotificationCenter = () => {
  const { notifications } = useApp();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/30';
      case 'error':
        return 'bg-red-500/10 border-red-500/30';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30';
      default:
        return 'bg-blue-500/10 border-blue-500/30';
    }
  };

  return (
    <div className="fixed top-20 right-6 space-y-3 z-50 max-w-sm">
      {notifications.map(notif => (
        <div
          key={notif.id}
          className={`flex items-center gap-3 p-4 rounded-lg border ${getBgColor(notif.type)} backdrop-blur-md animate-in fade-in slide-in-from-top-4`}
        >
          {getIcon(notif.type)}
          <p className="text-white text-sm font-medium flex-1">{notif.message}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
