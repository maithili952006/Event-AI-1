import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Bell, Plus, Search, Filter, Calendar, BarChart3, Users, Clock, Eye, Edit, Trash2, CheckCircle, AlertCircle, DollarSign, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import HostedEventCard from '../components/HostedEventCard';

const HostedEvents = () => {
  const { events, getUserEvents, deleteEvent, currentUser, updateEvent, getUserRegistrations } = useApp();
  const [statusFilter, setStatusFilter] = useState('published');
  const [searchQuery, setSearchQuery] = useState('');

  const userEvents = currentUser?.role === 'organizer' 
    ? getUserEvents(currentUser.id)
    : events;

  const draftEvents = userEvents.filter(e => e.status === 'draft');
  const publishedEvents = userEvents.filter(e => !e.status || e.status === 'published' || e.status === 'live');

  const filteredEvents = statusFilter === 'draft' 
    ? draftEvents 
    : publishedEvents;

  const searchedEvents = filteredEvents.filter(e =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalEvents: publishedEvents.length,
    draftEvents: draftEvents.length,
    totalAttendees: userEvents.reduce((sum, e) => sum + (e.attendees?.length || 0), 0),
    totalRevenue: userEvents.reduce((sum, e) => {
      const registrations = e.registrations?.length || 0;
      return sum + (registrations * (e.registrationFee || 0));
    }, 0),
  };

  const handlePublish = (eventId) => {
    updateEvent(eventId, { status: 'published' });
  };

  const handleDelete = (eventId) => {
    if (confirm('Delete this event?')) {
      deleteEvent(eventId);
    }
  };

  return (
    <div className="bg-background-dark font-display text-slate-100 min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Layers className="text-primary w-6 h-6" />
            <h2 className="text-xl font-bold text-white">NexaHub</h2>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-slate-400 hover:text-white">Explorer</Link>
            <Link to="/live-hub" className="text-sm font-medium text-slate-400 hover:text-white">Live Hub</Link>
            <Link to="/hosted-events" className="text-sm font-medium text-white border-b-2 border-primary pb-1">Dashboard</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="p-2 relative">
              <Bell className="w-6 h-6 text-slate-400" />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
            </button>
            <Link
              to="/upload-event"
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Event
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <BarChart3 className="text-primary w-6 h-6 mb-2" />
            <div className="text-2xl font-black text-white">{stats.totalEvents}</div>
            <div className="text-sm text-slate-400">Published Events</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <AlertCircle className="text-accent-magenta w-6 h-6 mb-2" />
            <div className="text-2xl font-black text-white">{stats.draftEvents}</div>
            <div className="text-sm text-slate-400">Draft Events</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <Users className="text-accent-blue w-6 h-6 mb-2" />
            <div className="text-2xl font-black text-white">{stats.totalAttendees}</div>
            <div className="text-sm text-slate-400">Total Registrations</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <DollarSign className="text-green-500 w-6 h-6 mb-2" />
            <div className="text-2xl font-black text-white">₹{stats.totalRevenue}</div>
            <div className="text-sm text-slate-400">Total Revenue</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">Your Events</h1>
            <p className="text-slate-400 mt-1">{searchedEvents.length} event{searchedEvents.length !== 1 ? 's' : ''} found</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary w-64"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter('published')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  statusFilter === 'published'
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-1" />
                Published
              </button>
              <button
                onClick={() => setStatusFilter('draft')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  statusFilter === 'draft'
                    ? 'bg-accent-magenta text-white'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                <AlertCircle className="w-4 h-4 inline mr-1" />
                Drafts ({draftEvents.length})
              </button>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {searchedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchedEvents.map(event => (
              <div key={event.id} className="group">
                <HostedEventCard event={event} />
                
                {/* Event Actions */}
                {currentUser?.role === 'organizer' && currentUser?.id === event.organizerId && (
                  <div className="mt-3 flex gap-2">
                    {event.status === 'draft' && (
                      <button
                        onClick={() => handlePublish(event.id)}
                        className="flex-1 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Publish
                      </button>
                    )}
                    <Link
                      to={`/poster-studio?eventId=${event.id}`}
                      className="flex-1 py-2 bg-accent-purple/20 hover:bg-accent-purple/30 border border-accent-purple/30 text-accent-purple rounded-lg text-sm font-bold text-center flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      AI Poster
                    </Link>
                    <Link
                      to={`/upload-event?eventId=${event.id}`}
                      className="flex-1 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary rounded-lg text-sm font-bold text-center flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 mb-4">No {statusFilter} events found</p>
            <Link
              to="/upload-event"
              className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold"
            >
              Create First Event
            </Link>
          </div>
        )}

        {/* User's Registrations */}
        {currentUser && (
          <div className="mt-12">
            <h2 className="text-2xl font-black text-white mb-6">Your Registrations</h2>
            {(() => {
              const userRegs = getUserRegistrations(currentUser.id);
              return userRegs.length > 0 ? (
                <div className="space-y-4">
                  {userRegs.map(reg => {
                    const event = events.find(e => e.id === reg.eventId);
                    if (!event) return null;
                    return (
                      <div key={reg.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-white">{event.title}</h3>
                            <p className="text-slate-400">{event.date} • {event.location}</p>
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm text-slate-400">Name</p>
                                <p className="text-white font-bold">{reg.userName}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-400">College</p>
                                <p className="text-white font-bold">{reg.college || 'Not provided'}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-400">Idea/Topic</p>
                                <p className="text-white font-bold">{reg.idea || 'Not provided'}</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-400">Fee Paid</p>
                            <p className="text-white font-bold">₹{reg.registrationFee}</p>
                            {reg.checkedIn && (
                              <CheckCircle className="w-6 h-6 text-green-500 mt-2" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-slate-400">No registrations yet.</p>
              );
            })()}
          </div>
        )}
      </main>
    </div>
  );
};

export default HostedEvents;
