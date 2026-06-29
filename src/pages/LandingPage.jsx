import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  PlayCircle, 
  Sparkles, 
  Calendar, 
  Repeat, 
  Users, 
  Ticket, 
  Share2, 
  Mail,
  MoreHorizontal,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import PublicEventCard from '../components/PublicEventCard';


const LandingPage = () => {
    const { getPublicEvents, currentUser } = useApp();

    return (
        <div className="relative min-h-screen flex flex-col font-display selection:bg-accent-purple/30">
            {/* Navigation */}
            <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-blue rounded-lg flex items-center justify-center shadow-lg shadow-accent-purple/20">
                            <Layers className="text-white w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black tracking-tighter text-white">NexaHub<span className="text-accent-purple">AI</span></h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-10">
                        <Link className="px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-bold hover:bg-white/10 transition-all shadow-lg" to="/live-hub">
                            Live Hub
                        </Link>
                        {currentUser?.role === 'organizer' && (
                            <Link className="px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-bold hover:bg-white/10 transition-all shadow-lg" to="/hosted-events">
                                My Hosted Events
                            </Link>
                        )}
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="px-5 py-2.5 text-sm font-bold text-white hover:text-accent-purple transition-colors">Login</Link>
                        <Link to="/signup" className="px-6 py-2.5 bg-accent-purple hover:bg-accent-purple/90 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-accent-purple/25">
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-grow pt-20">
                <section className="relative px-6 py-24 md:py-32 bg-background-dark overflow-hidden mesh-gradient">
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-purple/10 blur-[120px] rounded-full"></div>
                    <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                            <span className="flex h-2 w-2 rounded-full bg-accent-blue animate-pulse"></span>
                            <span className="text-xs font-semibold tracking-widest uppercase text-accent-blue">v2.0 Now Live</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-white">
                            Orchestrate the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-accent-blue to-accent-purple">Future of Events</span>
                        </h1>
                        <p className="max-w-2xl text-lg md:text-xl text-slate-400 mb-12 leading-relaxed">
                            Revolutionize your event management with NexaHub's AI-driven automation. Streamline workflows, engage attendees, and scale effortlessly with professional orchestration.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            {currentUser?.role === 'organizer' ? (
                                <Link to="/hosted-events" className="px-8 py-4 bg-accent-purple text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-accent-purple/30 text-center">
                                    Manage My Events
                                </Link>
                            ) : (
                                <Link to="/live-hub" className="px-8 py-4 bg-accent-purple text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-accent-purple/30 text-center">
                                    Explore Live Events
                                </Link>
                            )}
                            <Link to="/live-hub" className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                                <Calendar className="w-6 h-6" />
                                View Event Details
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Value Proposition */}
                <section className="px-6 py-24 bg-background-dark">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {currentUser?.role === 'organizer' ? (
                                <Link to="/poster-studio" className="glass-panel p-8 rounded-2xl group hover:border-accent-purple/50 transition-all block">
                                    <div className="w-14 h-14 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center mb-6 group-hover:bg-accent-purple group-hover:text-white transition-all text-accent-purple">
                                        <Sparkles className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-white">AI Poster Gen</h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        Generate stunning, thematic event posters in seconds using advanced generative AI tailored to your unique brand identity.
                                    </p>
                                </Link>
                            ) : (
                                <div className="glass-panel p-8 rounded-2xl group hover:border-accent-purple/50 transition-all block">
                                    <div className="w-14 h-14 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center mb-6 group-hover:bg-accent-purple group-hover:text-white transition-all text-accent-purple">
                                        <Ticket className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-white">Smart Ticketing</h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        Experience seamless entry with AI-verified QR tickets and real-time event updates delivered straight to your device.
                                    </p>
                                </div>
                            )}
                            {/* Smart Deadlines */}
                            <div className="glass-panel p-8 rounded-2xl group hover:border-accent-blue/50 transition-all">
                                <div className="w-14 h-14 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mb-6 group-hover:bg-accent-blue group-hover:text-white transition-all text-accent-blue">
                                    <Calendar className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-white">Smart Deadlines</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Let AI handle the scheduling. Automatically adjust timelines based on real-world vendor responses and task completion rates.
                                </p>
                            </div>
                            {/* Real-time Sync */}
                            <div className="glass-panel p-8 rounded-2xl group hover:border-accent-purple/50 transition-all">
                                <div className="w-14 h-14 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center mb-6 group-hover:bg-accent-purple group-hover:text-white transition-all text-accent-purple">
                                    <Repeat className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-white">Real-time Sync</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Keep every team member in the loop with instant data synchronization across all devices and global cloud platforms.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Live Events Hub */}
                <section className="px-6 py-24 bg-[#0a0a0a] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full"></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                                    <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Live Hub</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                                    Ongoing <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-blue">Events</span>
                                </h2>
                            </div>
                            <div className="flex flex-col items-end gap-4">
                                <p className="text-slate-400 max-w-md text-lg text-right">
                                    Explore the most anticipated events currently happening or about to start. Secure your spot before the clock hits zero.
                                </p>
                                <Link to="/live-hub" className="text-primary font-bold flex items-center gap-2 hover:underline">
                                    View Dedicated Hub <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {getPublicEvents().length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {getPublicEvents().map(event => (
                                    <PublicEventCard key={event.id} event={event} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-16 text-center">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Calendar className="w-10 h-10 text-slate-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">No Live Events Yet</h3>
                                <p className="text-slate-500 mb-8 max-w-sm mx-auto">Be the first to orchestrate the future! Create your event and bring it to the live hub.</p>
                                {currentUser?.role === 'organizer' && (
                                    <Link to="/upload-event" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:scale-105 transition-transform">
                                        <Plus className="w-5 h-5" />
                                        Launch Your Event
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Dashboard Preview (Bento Grid) */}
                <section className="px-6 py-24 bg-background-dark/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Your Event Command Center</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">Manage every aspect of your event through a unified, high-fidelity interface designed for performance.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:min-h-[600px]">
                            <div className="md:col-span-2 md:row-span-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-1 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative h-full w-full bg-background-dark rounded-xl p-6 border border-white/5">
                                    <div className="flex justify-between items-center mb-6">
                                        <h4 className="font-bold text-lg text-white">Main Analytics</h4>
                                        <MoreHorizontal className="text-slate-500 w-6 h-6" />
                                    </div>
                                    <div className="w-full h-4/5 flex items-center justify-center bg-white/5 rounded-lg border border-white/5 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFq8NVSkU_2fZJk6gTcUxcYw_ZRPLA4zT3fvHvR_MlcTkNhSEcfwWHqQKy8e9Hq7wtyGsJ57qOOBFfjYm5iDyirj4ioGtv46KiZkm8ekHKrEjjjyX4wEtedk1ED_Ff36kPy8XxfcO0TxKhT3yhtwUVq6HZSr3SQCI8yK3p1SgL9M9YS0IMG26lJI0yQuLOWTEugSZiaTMebfTWiYNjtNq1-MENAmWvmhfj-poHTxRcjT02G6h9BFOYaqGHSM8XM9hu9c96g038Of5e')" }}></div>
                                </div>
                            </div>
                            <div className="md:col-span-1 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 flex flex-col justify-between">
                                <Users className="text-accent-blue w-8 h-8" />
                                <div>
                                    <div className="text-3xl font-black text-white">12.4k</div>
                                    <div className="text-sm text-slate-400">Total Attendees</div>
                                </div>
                            </div>
                            <div className="md:col-span-1 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 flex flex-col justify-between">
                                <Ticket className="text-accent-purple w-8 h-8" />
                                <div>
                                    <div className="text-3xl font-black text-white">89%</div>
                                    <div className="text-sm text-slate-400">Tickets Sold</div>
                                </div>
                            </div>
                            <div className="md:col-span-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 relative overflow-hidden">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <h4 className="font-bold text-white">Active Vendor Feeds</h4>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-slate-700"></div>
                                            <span className="text-sm text-white">Main Stage AV Team</span>
                                        </div>
                                        <span className="text-xs text-slate-500">Live</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-slate-700"></div>
                                            <span className="text-sm text-white">Catering Services</span>
                                        </div>
                                        <span className="text-xs text-slate-500">Scheduled</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 py-24">
                    <div className="max-w-5xl mx-auto rounded-[2rem] bg-gradient-to-br from-accent-purple via-accent-blue to-accent-purple p-[1px] shadow-2xl shadow-accent-purple/20">
                        <div className="bg-background-dark rounded-[2rem] px-8 py-16 md:py-24 text-center">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">Ready to build your <br />next event?</h2>
                            <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
                                Join over 500+ event organizers already using NexaHub AI to power their global conferences and local meetups.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link to="/signup" className="px-10 py-4 bg-white text-black font-black rounded-xl hover:bg-slate-200 transition-colors text-center cursor-pointer">
                                    Sign Up Now
                                </Link>
                                <button className="px-10 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-background-dark border-t border-white/5 px-6 py-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-accent-purple to-accent-blue rounded flex items-center justify-center">
                            <Layers className="text-white w-5 h-5" />
                        </div>
                        <span className="font-bold text-white text-xl">NexaHub AI</span>
                    </div>
                    <div className="flex gap-8 text-sm text-slate-500">
                        <a className="hover:text-white transition-colors" href="#">Privacy</a>
                        <a className="hover:text-white transition-colors" href="#">Terms</a>
                        <a className="hover:text-white transition-colors" href="#">Security</a>
                        <a className="hover:text-white transition-colors" href="#">Docs</a>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-all cursor-pointer">
                            <Share2 className="w-6 h-6" />
                        </div>
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-all cursor-pointer">
                            <Mail className="w-6 h-6" />
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-xs text-slate-600">
                    © 2024 NexaHub AI Orchestration Platform. All rights reserved.
                </div>
            </footer>

            <style>{`
                .mesh-gradient {
                    background-color: #0a0a0a;
                    background-image: 
                        radial-gradient(at 0% 0%, rgba(168, 85, 247, 0.15) 0px, transparent 50%),
                        radial-gradient(at 100% 0%, rgba(59, 130, 246, 0.15) 0px, transparent 50%);
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
