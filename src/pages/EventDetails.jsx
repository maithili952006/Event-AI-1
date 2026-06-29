import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Layers, Bell, Share2, Info, MapPin, Building2, Network, BellRing, Cpu, Sparkles, CheckCircle2, Calendar, Ticket, Globe, Users, DollarSign, QrCode, Smartphone, Wallet, Mail, Phone, Clock, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import QRDisplay from '../components/QRDisplay';
import QRScanner from '../components/QRScanner';

const EventDetails = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');
  const { getEventById, registerForEvent, isUserRegistered, currentUser, getEventRegistrations, getEventStats, addNotification } = useApp();
  const event = getEventById(eventId);
  
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPaymentQR, setShowPaymentQR] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('gpay');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);
  const [registerName, setRegisterName] = useState(currentUser?.name || '');
  const [registerEmail, setRegisterEmail] = useState(currentUser?.email || '');
  const [registerCollege, setRegisterCollege] = useState('');
  const [registerIdea, setRegisterIdea] = useState('');
  const [regMessage, setRegMessage] = useState('');
  const [notificationEmail, setNotificationEmail] = useState(currentUser?.email || '');
  const [notificationPhone, setNotificationPhone] = useState('');
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [deadlineTime, setDeadlineTime] = useState(null);

  useEffect(() => {
    if (event?.registrationDeadline) {
      setDeadlineTime(new Date(event.registrationDeadline));
    }
  }, [event]);
  
  const [showSuccessStep, setShowSuccessStep] = useState(false);
  const isRegistered = isUserRegistered(eventId);
  const registrations = getEventRegistrations(eventId);
  const stats = getEventStats(eventId);

  if (!event) {
    return (
      <div className="bg-background-dark min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg">Event not found</p>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">Back to home</Link>
        </div>
      </div>
    );
  }

  const handlePayment = (method) => {
    setPaymentMethod(method);
    setIsProcessingPayment(true);
    setShowPaymentQR(true);
  };

  const confirmPayment = () => {
    onPaymentSuccess();
    setShowSuccessStep(true);
  };

  const closePaymentModal = () => {
    setShowPayment(false);
    setShowPaymentQR(false);
    setShowSuccessStep(false);
  };

  const handleNotificationSubscription = () => {
    if (!notificationEmail && !notificationPhone) {
      addNotification('Please enter at least email or phone number', 'error');
      return;
    }
    // Simulate sending notification preferences
    setTimeout(() => {
      addNotification(`✅ Notifications will be sent to ${notificationEmail || notificationPhone}`, 'success');
      setNotificationEnabled(true);
    }, 800);
  };

  const handleEventRegister = () => {
    if (!registerName.trim() || !registerEmail.trim() || !registerCollege.trim() || !registerIdea.trim()) {
      addNotification('Please fill all required fields to register.', 'error');
      return;
    }

    if (stats.availableSeats <= 0) {
      addNotification('Event is full.', 'error');
      return;
    }

    if (event.registrationFee <= 0) {
      onPaymentSuccess();
      return;
    }

    setShowPayment(true);
  };

  const onPaymentSuccess = async () => {
    const registration = await registerForEvent(eventId, {
      fee: event.registrationFee,
      userName: registerName,
      email: registerEmail,
      college: registerCollege,
      idea: registerIdea,
    });
    if (registration) {
      setRegistrationId(registration.id);
      setRegMessage(`Thanks ${registerName}! Registration successful. The ticket is in your inbox and on screen.`);
      addNotification('✅ Registered successfully. Confirmation email sent!', 'success');
      // Simulate sending email
      console.log(`Email sent to ${registerEmail}: Registration confirmed for ${event.title}`);
    }
  };

  const getDeadlineStatus = () => {
    if (!deadlineTime) return null;
    const now = new Date();
    const diff = deadlineTime - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (diff < 0) return { text: 'Registration Closed', color: 'text-red-500', bg: 'bg-red-500/10' };
    if (days > 0) return { text: `${days}d ${hours % 24}h left`, color: 'text-amber-500', bg: 'bg-amber-500/10' };
    if (hours > 0) return { text: `${hours}h left`, color: 'text-orange-500', bg: 'bg-orange-500/10' };
    return { text: 'Closing soon!', color: 'text-red-500', bg: 'bg-red-500/10' };
  };

  const deadlineStatus = getDeadlineStatus();

  return (
    <div className="bg-background-dark min-h-screen text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Layers className="text-primary w-6 h-6" />
            <h2 className="text-xl font-bold text-white">NexaHub</h2>
          </Link>
          <div className="flex items-center gap-4">
            <button className="p-2 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Registration Section - Full Width */}
        {!isRegistered && event.status !== 'draft' && (
          <div className="bg-primary text-white p-8 rounded-2xl shadow-xl space-y-6 mb-8">
            <div>
              <h3 className="text-2xl font-black mb-2">Register for {event.title}</h3>
              <p className="text-primary/80 text-sm">Limited spots available</p>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-white">Your Name</label>
              <input
                type="text"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder="Your full name"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-slate-300 focus:ring-2 focus:ring-primary outline-none"
              />

              <label className="block text-sm font-medium text-white">Your Email</label>
              <input
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-slate-300 focus:ring-2 focus:ring-primary outline-none"
              />

              <label className="block text-sm font-medium text-white">College Name</label>
              <input
                type="text"
                value={registerCollege}
                onChange={(e) => setRegisterCollege(e.target.value)}
                placeholder="Your college name"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-slate-300 focus:ring-2 focus:ring-primary outline-none"
              />

              <label className="block text-sm font-medium text-white">Idea/Topic</label>
              <input
                type="text"
                value={registerIdea}
                onChange={(e) => setRegisterIdea(e.target.value)}
                placeholder="Your idea or topic"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-slate-300 focus:ring-2 focus:ring-primary outline-none"
              />

              <div className="flex justify-between items-center">
                <span className="text-sm">Registration Fee</span>
                <span className="font-black text-lg">₹{event.registrationFee}</span>
              </div>

              <button
                onClick={handleEventRegister}
                disabled={stats.availableSeats <= 0}
                className="w-full py-4 bg-white text-primary rounded-xl font-black text-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {stats.availableSeats > 0 ? 'Proceed to Payment' : 'Event Full'}
              </button>

              {event.registrationFee === 0 && (
                <p className="text-center text-sm text-primary/80">✨ This event is FREE! Click proceed to confirm.</p>
              )}
            </div>

            {regMessage && (
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-sm text-green-100">
                {regMessage}
              </div>
            )}
          </div>
        )}

        {/* Registered - QR Code */}
        {registrationId && event.registrationFee > 0 && (
          <div className="bg-white/5 border border-primary/30 p-8 rounded-2xl space-y-6 mb-8">
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <h3 className="text-xl font-black text-white">Successfully Registered!</h3>
            </div>
            <QRDisplay registrationId={registrationId} eventTitle={event.title} />
          </div>
        )}

        {/* Registered - No QR for Free Events */}
        {registrationId && event.registrationFee === 0 && (
          <div className="bg-white/5 border border-primary/30 p-8 rounded-2xl space-y-6 mb-8">
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <h3 className="text-xl font-black text-white">Successfully Registered!</h3>
              <p className="text-slate-300">This is a free event. No payment required.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Poster */}
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl h-96">
              {event.poster ? (
                <img 
                  src={event.poster} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent-purple/30 flex items-center justify-center text-6xl">
                  🎉
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase rounded mb-3">
                  {event.category}
                </span>
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-black text-white mb-2">{event.title}</h1>
                    <p className="text-slate-300">{event.description}</p>
                  </div>
                  {currentUser?.id === event.organizerId && (
                    <Link
                      to={`/poster-studio?eventId=${event.id}`}
                      className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg"
                    >
                      <Sparkles className="w-4 h-4 text-primary" />
                      Edit Poster
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Event Info Boxes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <Calendar className="text-primary w-6 h-6 mb-2" />
                <p className="text-xs text-slate-400 uppercase mb-1">Date & Time</p>
                <p className="text-white font-bold">{event.date}</p>
                <p className="text-slate-400 text-sm">{event.time || 'Time TBD'}</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <MapPin className="text-primary w-6 h-6 mb-2" />
                <p className="text-xs text-slate-400 uppercase mb-1">Location</p>
                <p className="text-white font-bold">{event.location}</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <Users className="text-accent-blue w-6 h-6 mb-2" />
                <p className="text-xs text-slate-400 uppercase mb-1">Registrations</p>
                <p className="text-white font-bold">{stats.totalRegistrations}/{event.capacity}</p>
                <p className="text-slate-400 text-sm">{stats.availableSeats} spots left</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <DollarSign className="text-accent-magenta w-6 h-6 mb-2" />
                <p className="text-xs text-slate-400 uppercase mb-1">Registration Fee</p>
                <p className="text-white font-bold">₹{event.registrationFee}</p>
              </div>
            </div>

            {/* About */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                About This Event
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {event.description || 'No description provided.'}
              </p>
              <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-sm text-slate-300">
                  ✨ Organized by: <span className="font-bold text-white">{event.organizer}</span>
                </p>
              </div>
            </div>

            {/* Contact Information */}
            {(event.contactEmail || event.contactPhone) && (
              <div className="bg-white/5 border border-white/10 p-8 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Phone className="w-6 h-6 text-accent-blue" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.contactEmail && (
                    <a href={`mailto:${event.contactEmail}`} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <Mail className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-xs text-slate-400 uppercase mb-1">Email</p>
                        <p className="text-white font-bold hover:underline">{event.contactEmail}</p>
                      </div>
                    </a>
                  )}
                  {event.contactPhone && (
                    <a href={`tel:${event.contactPhone}`} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <Phone className="w-5 h-5 text-accent-magenta mt-1" />
                      <div>
                        <p className="text-xs text-slate-400 uppercase mb-1">Phone</p>
                        <p className="text-white font-bold hover:underline">{event.contactPhone}</p>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Registration Deadline & Notifications */}
            {event.registrationDeadline && (
              <div className="bg-white/5 border border-white/10 p-8 rounded-xl space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      <Clock className="w-6 h-6 text-accent-magenta" />
                      Registration Deadline
                    </h3>
                    <p className="text-slate-300">{new Date(event.registrationDeadline).toLocaleString()}</p>
                  </div>
                  {deadlineStatus && (
                    <div className={`px-4 py-2 rounded-lg ${deadlineStatus.bg} font-bold ${deadlineStatus.color}`}>
                      {deadlineStatus.text}
                    </div>
                  )}
                </div>

                {!notificationEnabled && deadlineStatus?.text !== 'Registration Closed' && (
                  <div className="p-4 border border-amber-500/30 bg-amber-500/10 rounded-lg">
                    <p className="text-sm text-amber-300 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Get notified before registration closes!
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">Email Address</label>
                        <input
                          type="email"
                          value={notificationEmail}
                          onChange={(e) => setNotificationEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">Phone (Optional)</label>
                        <input
                          type="tel"
                          value={notificationPhone}
                          onChange={(e) => setNotificationPhone(e.target.value)}
                          placeholder="+91 9876543210"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary outline-none text-sm"
                        />
                      </div>
                      <button
                        onClick={handleNotificationSubscription}
                        className="w-full py-2 bg-primary/20 border border-primary/30 hover:bg-primary/30 text-primary rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                      >
                        <BellRing className="w-4 h-4" />
                        Get Deadline Notifications
                      </button>
                    </div>
                  </div>
                )}

                {notificationEnabled && (
                  <div className="p-4 border border-green-500/30 bg-green-500/10 rounded-lg text-green-300 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    ✅ You'll receive notifications when registration deadline is approaching
                  </div>
                )}
              </div>
            )}

            {/* Attendees List */}
            {registrations.length > 0 && (
              <div className="bg-white/5 border border-white/10 p-8 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-4">Registered Attendees ({registrations.length})</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {registrations.map(reg => (
                    <div key={reg.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                      <div>
                        <p className="text-white font-bold text-sm">{reg.userName}</p>
                        <p className="text-xs text-slate-400">{reg.email}</p>
                      </div>
                      {reg.checkedIn && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Registration & QR */}
          <div className="space-y-6">
            <div className="sticky top-24">
              {/* Registered - QR Code */}
              {registrationId && event.registrationFee > 0 && (
                <div className="bg-white/5 border border-primary/30 p-8 rounded-2xl space-y-6">
                  <div className="text-center">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <h3 className="text-xl font-black text-white">Successfully Registered!</h3>
                  </div>
                  <QRDisplay registrationId={registrationId} eventTitle={event.title} />
                </div>
              )}

              {/* Registered - No QR for Free Events */}
              {registrationId && event.registrationFee === 0 && (
                <div className="bg-white/5 border border-primary/30 p-8 rounded-2xl space-y-6">
                  <div className="text-center">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <h3 className="text-xl font-black text-white">Successfully Registered!</h3>
                    <p className="text-slate-300">This is a free event. No payment required.</p>
                  </div>
                </div>
              )}

              {/* Check-in for Organizers */}
              {currentUser?.role === 'organizer' && currentUser?.id === event.organizerId && (
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-primary" />
                    Check-in
                  </h4>
                  <button
                    onClick={() => setShowQRScanner(true)}
                    className="w-full py-3 bg-primary/20 border border-primary/30 hover:bg-primary/30 text-primary rounded-lg font-bold flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    Scan QR Code
                  </button>
                  <div className="p-3 bg-white/5 rounded-lg text-xs text-slate-400 text-center">
                    Checked in: {stats.checkedIn} / {stats.totalRegistrations}
                  </div>
                </div>
              )}

              {/* Event Status */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                <p className="text-xs text-slate-400 uppercase mb-1">Event Status</p>
                <p className="text-white font-bold">{event.status === 'draft' ? '📝 Draft' : '🔴 Live'}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background-dark border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto space-y-6">
            <div>
              <h3 className="text-2xl font-black text-white mb-1">Payment</h3>
              <p className="text-slate-400">Choose payment method</p>
            </div>

            {showSuccessStep ? (
              <div className="space-y-6 text-center animate-in zoom-in duration-500">
                <div className="flex flex-col items-center gap-4">
                  <div className="size-16 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Payment Done!</h3>
                    <p className="text-slate-400">Your registration is successful. Your entry ticket is ready.</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl inline-block mx-auto shadow-2xl border-4 border-primary/20">
                  <QRDisplay registrationId={registrationId} eventTitle={event.title} />
                </div>

                <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
                  <p className="text-xs text-primary font-bold leading-relaxed">
                    ✨ Show this QR code at the event entrance for seamless check-in. A copy has been sent to your email.
                  </p>
                </div>

                <button
                  onClick={closePaymentModal}
                  className="w-full py-4 bg-primary text-white rounded-xl font-black hover:bg-primary/90 transition-all shadow-lg"
                >
                  Exit
                </button>
              </div>
            ) : !showPaymentQR ? (
              <div className="space-y-4">
                <button
                  onClick={() => handlePayment('gpay')}
                  className="w-full p-4 border border-white/10 hover:border-blue-500/50 bg-white/5 rounded-xl flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-white">Google Pay</p>
                      <p className="text-xs text-slate-400">UPI/Card Payment</p>
                    </div>
                  </div>
                  <span className="text-lg font-black text-slate-400 group-hover:text-white transition-colors">₹{event.registrationFee}</span>
                </button>

                <button
                  onClick={() => handlePayment('upi')}
                  className="w-full p-4 border border-white/10 hover:border-purple-500/50 bg-white/5 rounded-xl flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-white">UPI Payment</p>
                      <p className="text-xs text-slate-400">PhonePe, Paytm, etc</p>
                    </div>
                  </div>
                  <span className="text-lg font-black text-slate-400 group-hover:text-white transition-colors">₹{event.registrationFee}</span>
                </button>
              </div>
            ) : (
            <>
              {/* ... (Steps indicator remains same) ... */}
              <div className="flex items-center justify-between px-4 mb-8">
                {[
                    { step: 1, label: 'Scan' },
                    { step: 2, label: 'Pay' },
                    { step: 3, label: 'Verify' }
                ].map((s, i) => (
                    <React.Fragment key={s.step}>
                        <div className="flex flex-col items-center gap-2">
                            <div className={`size-8 rounded-full flex items-center justify-center font-bold text-xs ${
                                i <= 2 ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/5 border border-white/10 text-slate-500'
                            }`}>
                                {s.step}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${i <= 2 ? 'text-primary' : 'text-slate-500'}`}>{s.label}</span>
                        </div>
                        {i < 2 && <div className="h-[1px] flex-1 bg-white/10 mx-2 -translate-y-3"></div>}
                    </React.Fragment>
                ))}
              </div>

              <div className="space-y-6 text-center animate-in zoom-in duration-300">
                <div className="bg-white p-4 rounded-2xl inline-block mx-auto shadow-2xl border-4 border-primary/20">
                    <div className="relative">
                        <QrCode className="w-48 h-48 text-black opacity-10" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=eventai@upi&pn=EventAI&am=${event.registrationFee}&cu=INR`} 
                                alt="Payment QR"
                                className="w-40 h-40"
                            />
                        </div>
                    </div>
                </div>
                
                <div className="space-y-2">
                    <p className="text-white font-bold text-lg">Scan to Pay ₹{event.registrationFee}</p>
                    <p className="text-slate-400 text-xs">Scanning with {paymentMethod.toUpperCase()}...</p>
                </div>

                <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl space-y-2 text-left">
                    <div className="flex items-center gap-3">
                        <div className="size-2 bg-primary rounded-full animate-ping"></div>
                        <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Awaiting Transaction...</p>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">After scanning, click the button below to generate your entry ticket.</p>
                </div>

                <button
                  onClick={confirmPayment}
                  className="w-full py-4 bg-primary text-white rounded-xl font-black hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 mb-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Proceed
                </button>

                

                <button
                    onClick={() => setShowPaymentQR(false)}
                    className="text-slate-500 text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors"
                >
                    Back to methods
                </button>
              </div>
            </>
            )}

            {!showPaymentQR && !showSuccessStep && (
              <button
                onClick={() => setShowPayment(false)}
                className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
            )}

            <p className="text-xs text-slate-500 text-center">💡 Secure encrypted payment gateway enabled.</p>
          </div>
        </div>
      )}

      {/* QR Scanner */}
      {showQRScanner && (
        <QRScanner eventId={eventId} onClose={() => setShowQRScanner(false)} />
      )}
    </div>
  );
};

export default EventDetails;
