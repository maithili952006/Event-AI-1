import React from 'react';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';

const PublicEventCard = ({ event }) => {
  const isLive = new Date(event.date).toDateString() === new Date().toDateString();
  const isPast = new Date(event.date) < new Date() && !isLive;

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden group hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full">
      {/* Visual Header */}
      <div className="relative aspect-video overflow-hidden">
        {event.poster ? (
          <img 
            src={event.poster} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent-purple/20 to-accent-blue/20 flex items-center justify-center">
            <Calendar className="w-16 h-16 text-primary/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
        
        {/* Status & Category Badge */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
            {event.category}
          </span>
          {isLive ? (
            <div className="flex items-center gap-2 bg-red-500/20 backdrop-blur-md border border-red-500/30 px-3 py-1 rounded-full">
               <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
               <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">Live Now</span>
            </div>
          ) : isPast ? (
            <span className="bg-slate-700/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-slate-400 text-[10px] font-black uppercase tracking-widest">Ended</span>
          ) : (
            <span className="bg-primary/20 backdrop-blur-md border border-primary/30 px-3 py-1 rounded-full text-primary text-[10px] font-black uppercase tracking-widest">Upcoming</span>
          )}
        </div>

        {/* Countdown Overlay */}
        <div className="absolute bottom-6 left-6 right-6 transform transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <CountdownTimer targetDate={event.date} />
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-6">
          <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors leading-tight mb-3">
            {event.title}
          </h3>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-slate-400 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              {event.date} • {event.time || 'TBA'}
            </p>
            <p className="flex items-center gap-2 text-slate-400 text-sm">
              <MapPin className="w-4 h-4 text-accent-blue" />
              {event.location}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                  u{i}
                </div>
              ))}
            </div>
            <span className="text-xs text-slate-500 font-bold tracking-tight">
              {event.attendees?.length || 0}+ attending
            </span>
          </div>
          
          <Link 
            to={`/event-details?eventId=${event.id}`}
            className="flex items-center gap-2 text-primary font-black text-sm group/link"
          >
            Register
            <ArrowRight className="w-5 h-5 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicEventCard;
