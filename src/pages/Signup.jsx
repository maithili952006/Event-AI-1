import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Network, User, Mail, Lock, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Signup = () => {
    const [role, setRole] = useState('organizer');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useApp();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({
            name,
            email,
            role,
        });
        navigate('/login');
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-mesh overflow-x-hidden overflow-y-auto py-12 md:py-0 font-display selection:bg-portal-indigo/30">
            {/* Subtle Glow Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-portal-indigo/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/10 rounded-full blur-[120px]"></div>

            {/* Navigation / Logo */}
            <div className="absolute top-0 w-full px-8 py-6 flex justify-between items-center z-10">
                <Link to="/" className="flex items-center gap-2">
                    <div className="size-8 bg-gradient-to-br from-portal-indigo to-accent-purple rounded-lg flex items-center justify-center text-white shadow-lg shadow-portal-indigo/20">
                        <Network className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">NexaHub <span className="text-portal-indigo">AI</span></span>
                </Link>
                <div className="hidden sm:block text-sm text-slate-500 dark:text-slate-400">
                    Already have an account? <Link className="text-portal-indigo font-semibold hover:underline" to="/login">Log in</Link>
                </div>
            </div>

            {/* Main Signup Card */}
            <main className="relative z-10 w-full max-w-lg px-6 py-20">
                <div className="glass-card rounded-3xl p-8 lg:p-10 shadow-2xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-black mb-2 text-white tracking-tight">Create Account</h1>
                        <p className="text-slate-400">Join the next generation of AI-powered event management.</p>
                    </div>
                    
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Role Selection */}
                        <div className="flex p-1 bg-slate-200/50 dark:bg-white/5 rounded-xl mb-6">
                            <button
                                type="button"
                                onClick={() => setRole('organizer')}
                                className={`flex-1 text-center py-2.5 text-sm font-bold rounded-lg transition-all uppercase tracking-wider ${role === 'organizer' ? 'bg-white dark:bg-slate-800 text-portal-indigo shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                            >
                                Organizer
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('attendee')}
                                className={`flex-1 text-center py-2.5 text-sm font-bold rounded-lg transition-all uppercase tracking-wider ${role === 'attendee' ? 'bg-white dark:bg-slate-800 text-portal-indigo shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                            >
                                Attendee
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1 text-slate-300">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-portal-indigo transition-colors w-5 h-5" />
                                    <input
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-portal-indigo/20 focus:border-portal-indigo transition-all text-white placeholder:text-slate-500 outline-none"
                                        placeholder="John Doe"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1 text-slate-300">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-portal-indigo transition-colors w-5 h-5" />
                                    <input
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-portal-indigo/20 focus:border-portal-indigo transition-all text-white placeholder:text-slate-500 outline-none"
                                        placeholder="john@company.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1 text-slate-300">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-portal-indigo transition-colors w-5 h-5" />
                                <input
                                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-portal-indigo/20 focus:border-portal-indigo transition-all text-white placeholder:text-slate-500 outline-none"
                                    placeholder="••••••••"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200" type="button">
                                    <Eye className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button className="relative w-full py-4 bg-portal-indigo hover:bg-portal-indigo/90 text-white font-bold rounded-xl shadow-lg shadow-portal-indigo/25 transition-all transform active:scale-[0.98] mt-4 overflow-hidden group" type="submit">
                            <span className="relative z-10">Create My Account</span>
                            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-white/10"></div></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0f111a] px-3 text-slate-500 font-medium">Or continue with</span></div>
                        </div>

                        {/* Social Auth */}
                        <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-white/10 transition-all text-white font-bold" type="button">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                            </svg>
                            <span className="text-sm">Sign up with Google</span>
                        </button>
                    </form>

                    <p className="mt-8 text-center text-[10px] uppercase tracking-widest text-slate-500 font-bold leading-relaxed">
                        By signing up, you agree to our <Link className="text-portal-indigo hover:underline" to="#">Terms</Link> and <Link className="text-portal-indigo hover:underline" to="#">Privacy</Link>
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 px-6 text-center relative z-10 w-full">
                <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">© 2024 NexaHub AI Technologies • Orchestrating the Future</p>
            </footer>
        </div>
    );
};

export default Signup;
