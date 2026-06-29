import React from 'react';
import { Calendar, Users, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const HostedEventCard = ({ event }) => {
    const { getEventStats } = useApp();
    const stats = getEventStats(event.id);
    
    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300">
            <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary/30 to-accent-purple/30 flex items-center justify-center text-6xl">
                {event.poster ? (
                  <img 
                    src={event.poster} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <>🎉</>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 backdrop-blur-md border text-[10px] font-bold uppercase tracking-wider rounded ${
                        event.status === 'draft' 
                            ? 'bg-slate-500/20 border-slate-500/30 text-slate-300' 
                            : 'bg-primary/20 border-primary/30 text-primary'
                    }`}>
                        {event.status === 'draft' ? '📝 Draft' : '🔴 Live'}
                    </span>
                </div>
                <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-wider rounded">
                        {event.category}
                    </span>
                </div>
            </div>
            
            <div className="p-6 space-y-4">
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                        {event.title}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {event.date} at {event.time || '—'}
                    </p>
                </div>

                <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent-blue" />
                        <div>
                            <p className="text-xs text-slate-400">Registrations</p>
                            <p className="text-sm font-bold text-white">{stats.totalRegistrations}/{event.capacity}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-accent-magenta" />
                        <div>
                            <p className="text-xs text-slate-400">Fee</p>
                            <p className="text-sm font-bold text-white">₹{event.registrationFee}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Link 
                        to={`/event-details?eventId=${event.id}`}
                        className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 hover:bg-white hover:text-slate-900 transition-all group/btn"
                    >
                        View
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                    <Link 
                        to={`/poster-studio?eventId=${event.id}`}
                        className="flex-1 py-3 bg-primary/10 border border-primary/30 rounded-xl text-sm font-bold text-primary flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all"
                    >
                        ✨ AI Poster
                    </Link>
                </div>

                <div className="flex gap-2">
                    <button 
                        onClick={() => {
                            if (event.poster) {
                                const link = document.createElement('a');
                                link.href = event.poster;
                                link.download = `${event.title}-flyer.png`;
                                link.click();
                            } else {
                                alert('No poster available to download');
                            }
                        }}
                        className="flex-1 py-3 bg-accent-blue/10 border border-accent-blue/30 rounded-xl text-sm font-bold text-accent-blue flex items-center justify-center gap-2 hover:bg-accent-blue hover:text-white transition-all"
                    >
                        📥 Download Flyer
                    </button>
                </div>

                {/* Registration Link */}
                <div className="mt-2">
                    <label className="text-xs text-slate-400">Registration Link</label>
                    <div className="flex gap-2 items-center mt-1">
                        <input
                            type="text"
                            value={`${window.location.origin}/event-details?eventId=${event.id}`}
                            readOnly
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-xs text-white"
                            onFocus={e => e.target.select()}
                        />
                        <button
                            onClick={() => {navigator.clipboard.writeText(`${window.location.origin}/event-details?eventId=${event.id}`)}}
                            className="px-2 py-1 bg-primary text-white text-xs rounded hover:bg-primary/80"
                        >
                            Copy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HostedEventCard;
