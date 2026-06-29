import React from 'react';
import { Download, Copy, Share2 } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const QRDisplay = ({ registrationId, eventTitle }) => {
  const qrRef = React.useRef();

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `${eventTitle}-qr.png`;
    link.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(registrationId);
    alert('Registration ID copied!');
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${eventTitle} Ticket`,
          text: `Here is my ticket ID: ${registrationId} for ${eventTitle}.`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback if Web Share is not supported
      navigator.clipboard.writeText(`Event: ${eventTitle} | Ticket ID: ${registrationId}`);
      alert('Event details copied to clipboard to share!');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-xl">
      <h4 className="text-white font-bold">Your Check-in QR Code</h4>

      <div ref={qrRef} className="p-4 bg-white rounded-lg">
        <QRCodeCanvas
          value={registrationId}
          size={200}
          level="H"
          includeMargin={true}
        />
      </div>

      <p className="text-xs text-slate-400 text-center">
        Show this QR code at the event for check-in
      </p>

      <div className="w-full space-y-2">
        <button
          onClick={downloadQR}
          className="w-full flex items-center justify-center gap-2 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold transition-colors"
        >
          <Download className="w-4 h-4" />
          Download QR
        </button>

        <button
          onClick={copyToClipboard}
          className="w-full flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-bold transition-colors border border-white/10"
        >
          <Copy className="w-4 h-4" />
          Copy ID
        </button>

        <button
          onClick={shareQR}
          className="w-full flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 text-accent-blue rounded-lg font-bold transition-colors border border-accent-blue/30"
        >
          <Share2 className="w-4 h-4" />
          Share Ticket
        </button>
      </div>
    </div>
  );
};

export default QRDisplay;
