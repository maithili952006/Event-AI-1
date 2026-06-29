import React, { useState } from 'react';
import { X, Smartphone, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const QRScanner = ({ eventId, onClose }) => {
  const { checkInAttendee, getEventById } = useApp();
  const [scannedCode, setScannedCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successName, setSuccessName] = useState('');
  const event = getEventById(eventId);

  const handleScan = (e) => {
    const code = e.target.value;
    if (code.length > 10) {
      const result = checkInAttendee(eventId, code);
      if (result) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
      setScannedCode('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background-dark border border-white/10 rounded-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Smartphone className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-white">QR Check-in</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-slate-400 mb-6">{event?.title}</p>

        {showSuccess ? (
          <div className="py-12 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-white font-bold text-lg">Checked In!</p>
          </div>
        ) : (
          <>
            <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-sm text-slate-300">
                📱 Point camera at QR code or paste code below
              </p>
            </div>

            <input
              type="text"
              placeholder="Scan QR code..."
              value={scannedCode}
              onChange={handleScan}
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none mb-6"
            />

            <p className="text-xs text-slate-500 text-center">
              Scanned code will auto-process when complete
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
