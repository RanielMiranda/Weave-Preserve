import react from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

const ToastMessage = ({ message, type, onClose }) => {
  const baseClasses = "fixed bottom-5 right-5 p-4 rounded-xl shadow-2xl transition-all duration-300 transform flex items-center space-x-3 z-50 max-w-sm";
  let icon, colorClasses;

  switch (type) {
    case 'success':
      icon = <CheckCircle className="w-6 h-6" />;
      colorClasses = "bg-green-600 text-white";
      break;
    case 'error':
      icon = <AlertTriangle className="w-6 h-6" />;
      colorClasses = "bg-red-600 text-white";
      break;
    default:
      icon = null;
      colorClasses = "bg-gray-800 text-white";
  }

  return (
    <div className={`${baseClasses} ${colorClasses}`}>
      {icon}
      <p className="flex-1 font-medium">{message}</p>
      <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ToastMessage