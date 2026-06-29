import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, Bell, Plus, MapPin, Users, DollarSign, Calendar, QrCode, CheckCircle2, Globe, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QRCodeCanvas } from 'qrcode.react';

const UploadEvent = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technology');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [registrationFee, setRegistrationFee] = useState('0');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [posterFile, setPosterFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const { createEvent, categories, addCategory } = useApp();
  const [newCategory, setNewCategory] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdEventId, setCreatedEventId] = useState(null);
  const navigate = useNavigate();

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory);
      setCategory(newCategory);
      setNewCategory('');
    }
  };

  const handlePosterUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Poster size should be less than 5MB');
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      setPosterFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPosterPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    
    if (!title || !date || !location) {
      alert('Please fill in all required fields');
      return;
    }

    const eventData = {
      title,
      category,
      date,
      time,
      location,
      description,
      capacity: parseInt(capacity) || 100,
      registrationFee: parseFloat(registrationFee) || 0,
      contactEmail,
      contactPhone,
      registrationDeadline,
      poster: posterPreview,
      status: 'live',
    };

    console.log("Attempting to create event with data:", eventData);
    try {
      const newEvent = await createEvent(eventData);
      console.log("Event creation response:", newEvent);
      if (newEvent) {
        setCreatedEventId(newEvent.id);
        setShowSuccess(true);
        // We'll let the user click to go to poster studio from the success screen
      } else {
        console.error("No event returned from createEvent");
        alert("Failed to create event. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert(`Failed to create event: ${err.message || 'Unknown error'}. Please check your connection.`);
    }
  };

  return (
    <div className="bg-background-dark font-display text-slate-100 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Layers className="text-primary w-6 h-6" />
            <h2 className="text-xl font-bold text-white">NexaHub</h2>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium text-slate-400 hover:text-white" to="/hosted-events">Dashboard</Link>
            <Link className="text-sm font-medium text-white border-b-2 border-primary pb-1" to="/upload-event">Create Event</Link>
          </nav>
          <button className="p-2 relative">
            <Bell className="w-6 h-6 text-slate-400" />
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-white mb-2">Create New Event</h1>
          <p className="text-slate-400">Launch your event on NexaHub with registration fees and QR check-in</p>
        </div>

        <form onSubmit={handleCreateEvent} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Basics */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="text-primary w-6 h-6" />
                Event Details
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Event Title *</label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Global AI Conference 2026"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Date *</label>
                  <input
                    required
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Location *</label>
                <input
                  required
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Silicon Valley Tech Hub, Palo Alto"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us about your event..."
                  rows="4"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>

            {/* Poster Upload */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Event Poster
              </h3>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePosterUpload}
                    className="hidden"
                    id="poster-upload"
                  />
                  <label htmlFor="poster-upload" className="cursor-pointer">
                    {posterPreview ? (
                      <div className="space-y-4">
                        <img 
                          src={posterPreview} 
                          alt="Poster preview" 
                          className="max-w-full max-h-48 mx-auto rounded-lg object-cover"
                        />
                        <p className="text-sm text-slate-400">Click to change poster</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <svg className="w-12 h-12 text-slate-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <div>
                          <p className="text-lg font-bold text-white">Upload Event Poster</p>
                          <p className="text-sm text-slate-400">PNG, JPG, or GIF (max 5MB)</p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>

                {posterFile && (
                  <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                    <p className="text-sm text-slate-300">
                      📸 Poster uploaded: <span className="font-bold text-white">{posterFile.name}</span>
                      <span className="text-slate-400"> ({(posterFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-white">Category & Registration</h3>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none appearance-none cursor-pointer"
                  style={{ backgroundColor: '#1a1a1a' }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} style={{ backgroundColor: '#1a1a1a', color: 'white' }}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Add New Category */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Add new category..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-white">Contact Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="organizer@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Fees & Capacity */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-white">Registration & Capacity</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="100"
                    min="1"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={registrationFee}
                    onChange={(e) => setRegistrationFee(e.target.value)}
                    placeholder="0"
                    min="0"
                    step="10"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Registration Deadline</label>
                <input
                  type="datetime-local"
                  value={registrationDeadline}
                  onChange={(e) => setRegistrationDeadline(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                />
                <p className="text-xs text-slate-400 mt-1">Registrations close at this time</p>
              </div>

              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-sm text-slate-300">
                  💡 Attendees will register online. Each gets a unique QR code for check-in at the event.
                </p>
              </div>
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <h4 className="text-sm font-bold text-slate-400 uppercase">Preview</h4>

              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center overflow-hidden">
                  {posterPreview ? (
                    <img 
                      src={posterPreview} 
                      alt="Event poster" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Calendar className="w-12 h-12 text-slate-600" />
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white truncate">{title || 'Event Title'}</h3>
                    <p className="text-xs text-slate-400 mt-1">{category}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-slate-300">
                      <Calendar className="w-4 h-4" />
                      {date || 'Select date'}
                    </p>
                    <p className="flex items-center gap-2 text-slate-300">
                      <MapPin className="w-4 h-4" />
                      {location || 'Select location'}
                    </p>
                    <p className="flex items-center gap-2 text-slate-300">
                      <Users className="w-4 h-4" />
                      {capacity || '0'} spots
                    </p>
                    <p className="flex items-center gap-2 text-primary font-bold">
                      <DollarSign className="w-4 h-4" />
                      ₹{registrationFee || '0'} entry
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg text-xs text-slate-300">
                      🎯 QR check-in enabled
                    </div>
                    
                    <div className="bg-white p-3 rounded-xl flex flex-col items-center gap-2">
                        <p className="text-[10px] text-slate-500 font-bold uppercase">Registration QR Preview</p>
                        <QRCodeCanvas 
                            value={`${window.location.origin}/event-details?eventId=preview`}
                            size={120}
                        />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-primary to-accent-purple hover:shadow-lg hover:shadow-primary/20 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Proceed
              </button>

              <Link
                to="/hosted-events"
                className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-bold text-center transition-all"
              >
                View My Events
              </Link>
            </div>
          </div>
        </form>
      </main>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-background-dark border border-white/10 rounded-2xl p-8 max-w-md w-full text-center space-y-6 animate-in zoom-in duration-300">
            <div className="size-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
              <Plus className="w-10 h-10 text-green-500 rotate-45" />
            </div>
            
            <div>
              <h2 className="text-3xl font-black text-white mb-2">Event Created!</h2>
              <p className="text-slate-400">Your event "{title}" is now live.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
              <div className="space-y-2">
                <p className="text-white font-bold text-sm uppercase tracking-wider">Registration QR</p>
                <div className="bg-white p-4 rounded-2xl inline-block shadow-2xl border-4 border-primary/20">
                  <QRCodeCanvas 
                    value={`${window.location.origin}/event-details?eventId=${createdEventId}`}
                    size={160}
                    level="H"
                    includeMargin={true}
                  />
                </div>
              </div>

              {posterPreview && (
                <div className="space-y-2">
                  <p className="text-white font-bold text-sm uppercase tracking-wider">Event Flyer</p>
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 h-[200px] w-[140px]">
                    <img 
                      src={posterPreview} 
                      alt="Flyer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-white font-bold">Registration QR Code</p>
              <p className="text-xs text-slate-400 px-4">
                Share this QR code or the link below for attendees to register.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate(`/poster-studio?eventId=${createdEventId}`)}
                className="w-full py-4 bg-primary text-white rounded-xl font-black hover:bg-primary/90 transition-all shadow-lg"
              >
                Go to Poster Studio
              </button>
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all"
              >
                Create Another Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadEvent;
