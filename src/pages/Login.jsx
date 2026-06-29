import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Network, Mail, Lock, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Login = () => {
    const [role, setRole] = useState('organizer');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useApp();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({
            email,
            name: email.split('@')[0],
            role,
        });
        navigate(role === 'organizer' ? '/upload-event' : '/hosted-events');
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
                    Don't have an account? <Link className="text-portal-indigo font-semibold hover:underline" to="/signup">Sign up</Link>
                </div>
            </div>

            {/* Main Login Card */}
            <main className="relative z-10 w-full max-w-md px-6">
                <div className="glass-card rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome back</h1>
                        <p className="text-slate-500 dark:text-slate-400">Manage your events with AI precision</p>
                    </div>

                    {/* Role Selector Toggle */}
                    <div className="flex p-1 bg-slate-200/50 dark:bg-white/5 rounded-xl mb-8">
                        <button
                            onClick={() => setRole('organizer')}
                            className={`flex-1 text-center py-2 text-sm font-medium rounded-lg transition-all ${role === 'organizer' ? 'bg-white dark:bg-slate-800 text-portal-indigo shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                        >
                            Organizer
                        </button>
                        <button
                            onClick={() => setRole('attendee')}
                            className={`flex-1 text-center py-2 text-sm font-medium rounded-lg transition-all ${role === 'attendee' ? 'bg-white dark:bg-slate-800 text-portal-indigo shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                        >
                            Attendee
                        </button>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Work Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-portal-indigo transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    className="block w-full pl-11 pr-4 py-3 bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-portal-indigo/20 focus:border-portal-indigo transition-all text-slate-900 dark:text-white placeholder:text-slate-500 outline-none"
                                    placeholder="name@company.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                                <a className="text-xs text-portal-indigo hover:underline" href="#">Forgot password?</a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-portal-indigo transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    className="block w-full pl-11 pr-12 py-3 bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-portal-indigo/20 focus:border-portal-indigo transition-all text-slate-900 dark:text-white placeholder:text-slate-500 outline-none"
                                    placeholder="••••••••"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-200" type="button">
                                    <Eye className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Sign In Button */}
                        <button className="relative w-full py-3 bg-portal-indigo hover:bg-portal-indigo/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-portal-indigo/20 flex items-center justify-center overflow-hidden group" type="submit">
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                                </svg>
                                Signing in...
                            </span>
                            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#121212] px-2 text-slate-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <button className="w-full py-3 px-4 bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-slate-700 dark:text-slate-200 font-medium font-bold">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                        </svg>
                        Sign in with Google
                    </button>
                </div>

                {/* Footer links */}
                <footer className="mt-8 text-center text-xs text-slate-500 space-x-4">
                    <Link className="hover:text-portal-indigo transition-colors" to="#">Privacy Policy</Link>
                    <span>•</span>
                    <Link className="hover:text-portal-indigo transition-colors" to="#">Terms of Service</Link>
                    <span>•</span>
                    <Link className="hover:text-portal-indigo transition-colors" to="#">Help Center</Link>
                </footer>
            </main>

            {/* Decorative Floating Elements */}
            <div className="absolute top-1/4 right-10 w-24 h-24 bg-portal-indigo/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-accent-purple/20 rounded-full blur-3xl"></div>
        </div>
    );
};

export default Login;
