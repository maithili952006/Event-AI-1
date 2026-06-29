import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Bell, Search, Filter, Calendar, Clock, ArrowRight, Zap, Sparkles, BarChart3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PublicEventCard from '../components/PublicEventCard';

const LiveHub = () => {
    const { getPublicEvents, currentUser } = useApp();
    const publicEvents = getPublicEvents();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filter, setFilter] = React.useState('All');

    const categories = ['All', ...new Set(publicEvents.map(e => e.category))];

    const filteredEvents = publicEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             event.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'All' || event.category === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent-purple rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                            <Layers className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">NexaHub</h2>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">Live Events Hub</p>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Home</Link>
                        <Link to="/live-hub" className="text-sm font-bold text-primary relative">
                            Live Hub
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                        </Link>
                        {currentUser?.role === 'organizer' && (
                            <Link to="/poster-studio" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">AI Studio</Link>
                        )}
                    </nav>

                    <div className="flex items-center gap-4">
                        {currentUser?.role === 'organizer' && (
                            <Link to="/hosted-events" className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                                Dashboard
                            </Link>
                        )}
                        <button className="p-2.5 bg-primary/10 text-primary rounded-xl relative hover:scale-105 transition-transform">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 size-2 bg-primary rounded-full ring-2 ring-white dark:ring-background-dark"></span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Hero Section (Simplified for main area) */}
                        <div className="relative mb-12 rounded-[2.5rem] overflow-hidden bg-slate-900 aspect-[21/7] flex items-center px-12">
                            <div className="absolute inset-0 opacity-40">
                                <img 
                                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2070" 
                                    className="w-full h-full object-cover" 
                                    alt="Background"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent"></div>
                            </div>
                            
                            <div className="relative z-10">
                                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 leading-tight">
                                    Live Event <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-blue">Orchestration</span>
                                </h1>
                                <p className="text-slate-300 text-sm max-w-md">
                                    Real-time tracking for the most exciting events.
                                </p>
                            </div>
                        </div>

                        {/* Filters & Search */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilter(cat)}
                                        className={`px-6 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                                            filter === cat
                                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                                : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-primary/50'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search live events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Events Grid Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
                                Available Events
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black">
                                    {filteredEvents.length}
                                </span>
                            </h2>
                        </div>

                        {/* Events Grid */}
                        {filteredEvents.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {filteredEvents.map(event => (
                                    <PublicEventCard key={event.id} event={event} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-slate-50 dark:bg-white/5 rounded-[3rem] border border-dashed border-slate-200 dark:border-white/10">
                                <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <Clock className="w-10 h-10 text-slate-400" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No Live Events Found</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">
                                    We couldn't find any events matching your criteria.
                                </p>
                                <button 
                                    onClick={() => {setSearchQuery(''); setFilter('All');}}
                                    className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Event Summary */}
                    <div className="lg:w-80 space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 sticky top-28">
                            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-primary" />
                                Event Summary
                            </h3>
                            
                            <div className="space-y-6">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Events</p>
                                    <p className="text-3xl font-black text-white">{publicEvents.length}</p>
                                </div>
                                
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Capacity</p>
                                    <p className="text-3xl font-black text-primary">
                                        {publicEvents.reduce((sum, e) => sum + (e.capacity || 0), 0).toLocaleString()}+
                                    </p>
                                </div>

                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Top Category</p>
                                    <p className="text-xl font-black text-accent-purple">
                                        {Object.entries(publicEvents.reduce((acc, e) => {
                                            acc[e.category] = (acc[e.category] || 0) + 1;
                                            return acc;
                                        }, {})).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
                                    </p>
                                </div>

                                <div className="pt-6">
                                    <div className="p-6 bg-gradient-to-br from-primary/20 to-accent-purple/20 rounded-[1.5rem] border border-primary/20 text-center">
                                        <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
                                        <h4 className="text-white font-bold mb-2">Want to Host?</h4>
                                        <p className="text-slate-400 text-xs mb-4">Create your own event and generate AI posters in seconds.</p>
                                        <Link 
                                            to="/upload-event"
                                            className="inline-block w-full py-3 bg-primary text-white text-sm font-black rounded-xl hover:scale-105 transition-all shadow-lg shadow-primary/20"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Newsletter/Footer CTA */}
            <div className="max-w-7xl mx-auto px-6 mb-24">
                <div className="bg-gradient-to-br from-portal-purple to-accent-blue rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black mb-4">Don't Miss the Next Big Wave</h2>
                        <p className="text-white/80 mb-8 max-w-xl mx-auto font-medium">Subscribe to our newsletter to receive real-time alerts for the hottest events at NexaHub.</p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input 
                                type="email" 
                                placeholder="Enter your email"
                                className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-6 py-4 outline-none placeholder:text-white/60 font-bold"
                            />
                            <button className="bg-white text-portal-purple px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform shadow-xl">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveHub;
