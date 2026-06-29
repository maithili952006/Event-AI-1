import React from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Download, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  FileText, 
  Wand2, 
  RefreshCw 
} from 'lucide-react';

const PosterStudio = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const eventId = searchParams.get('eventId');
    const { getEventById, updateEventPoster } = useApp();
    
    const [prompt, setPrompt] = React.useState('');
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [posterData, setPosterData] = React.useState(null);
    const [errorMessage, setErrorMessage] = React.useState('');

    React.useEffect(() => {
        if (eventId) {
            const event = getEventById(eventId);
            if (event) {
                const autoPrompt = `${event.title}, event poster, professional, clean design, high resolution`;
                setPrompt(autoPrompt);
                
                // Auto-trigger generation for new events
                if (!posterData && !isGenerating && !errorMessage) {
                    setTimeout(() => {
                        handleGenerate();
                    }, 500);
                }
            }
        }
    }, [eventId, getEventById]);

    const handleSaveToEvent = () => {
        if (!posterData?.imageUrl || !eventId) return;
        updateEventPoster(eventId, posterData.imageUrl);
        navigate(`/event-details?eventId=${eventId}`);
    };

    const handleGenerate = async () => {
        if (!prompt) return;

        setIsGenerating(true);
        setErrorMessage('');
        
        // Helper to generate a visual prompt locally without any API key
        const generateVisualPromptLocally = (event) => {
            const categories = {
                'Tech': 'futuristic, cyberpunk, neon lighting, digital interface, 8k resolution',
                'Business': 'professional, modern architecture, clean lines, corporate elegance, high-end',
                'Gaming': 'dynamic, colorful, cinematic action, high energy, gaming aesthetics',
                'Educational': 'minimalist, inspirational, bright academic setting, clean design',
                'Creative': 'artistic, vibrant colors, abstract shapes, expressive lighting'
            };
            
            const categoryStyle = categories[event?.category] || 'cinematic, professional, vibrant';
            // Simplify prompt to avoid character issues and ensure reliability
            const cleanTitle = (event?.title || prompt || 'Event').replace(/[^\w\s]/gi, '');
            return {
                title: event?.title || 'Nexus Event',
                tagline: 'Join the Future of Innovation',
                visualPrompt: `${categoryStyle} poster, ${cleanTitle}, high resolution, professional graphic design`
            };
        };

        try {
            // ALWAYS USE LOCAL KEYLESS AI
            console.log('Using robust keyless AI generation...');
            const currentEvent = eventId ? getEventById(eventId) : null;
            const data = generateVisualPromptLocally(currentEvent);
            const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(data.visualPrompt)}?width=1080&height=1440&nologo=true&seed=${Math.floor(Math.random() * 1000000)}`;
            
            // Add a small delay for premium feel
            await new Promise(resolve => setTimeout(resolve, 1500));
            setPosterData({ ...data, imageUrl });
        } catch (error) {
            console.error('Generation failed:', error);
            setErrorMessage("Generation failed. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const event = eventId ? getEventById(eventId) : null;

    return (
        <div className="bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Minimal Header */}
                <div className="flex items-center justify-between">
                    <Link to="/hosted-events" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Events
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side: Information */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase leading-none tracking-tighter">
                                    AI Poster <span className="text-primary italic">Generator</span>
                                </h1>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                                {isGenerating ? 'Our AI is orchestrating a professional design...' : 'Your custom event visual is ready.'}
                            </p>
                        </div>

                        {event && (
                            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
                                <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Project Information
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Title</p>
                                            <p className="font-bold text-lg dark:text-white leading-tight">{event.title}</p>
                                        </div>
                                        <div className="bg-primary/10 px-2 py-1 rounded text-[10px] font-bold text-primary uppercase">{event.category}</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date</p>
                                            <p className="font-bold">{event.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Location</p>
                                            <p className="font-bold truncate">{event.location}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Vision Summary</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic line-clamp-2">"{event.description}"</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!errorMessage && (
                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={handleGenerate}
                                    disabled={isGenerating}
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 disabled:opacity-50 shadow-lg shadow-primary/20"
                                >
                                    <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                                    {isGenerating ? 'AI Orchestrating...' : 'Regenerate New Concept'}
                                </button>
                                
                                {posterData && (
                                    <button 
                                        onClick={handleSaveToEvent}
                                        className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-500/20"
                                    >
                                        <CheckCircle2 className="w-5 h-5" />
                                        Confirm & Save to Event
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Side: Results */}
                    <div className="relative group">
                        <div className="aspect-[3/4] bg-slate-200 dark:bg-[#1a120e] rounded-[3rem] shadow-2xl overflow-hidden relative border-8 border-white dark:border-white/5">
                            {isGenerating ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-20 transition-all">
                                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                        <Wand2 className="w-10 h-10 text-primary animate-bounce font-bold" />
                                    </div>
                                    <p className="text-white font-black text-xl uppercase tracking-[0.2em] animate-pulse">Designing...</p>
                                </div>
                            ) : posterData ? (
                                <div className="h-full w-full animate-in fade-in zoom-in duration-700 relative">
                                    <img 
                                        src={posterData.imageUrl} 
                                        alt="AI Generated" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onLoad={() => console.log('Poster image loaded successfully')}
                                        onError={(e) => {
                                            if (event?.poster) {
                                                e.target.src = event.poster;
                                            } else {
                                                setErrorMessage("Image failed to load. Try regenerating.");
                                            }
                                        }}
                                    />
                                    {/* Glassmorphism Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 flex flex-col justify-between p-8 md:p-12 text-center">
                                        <div className="space-y-4 pt-4">
                                            <div className="inline-block px-4 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">
                                                AI Generated Visual
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                                                {posterData.title}
                                            </h2>
                                            <div className="h-1 w-12 bg-primary mx-auto rounded-full"></div>
                                            <p className="text-sm md:text-xl font-black text-primary/90 tracking-[0.2em] uppercase drop-shadow-md">
                                                {posterData.tagline}
                                            </p>
                                        </div>
                                        <div className="mt-auto pb-4">
                                            <button 
                                                onClick={() => window.open(posterData.imageUrl || event?.poster, '_blank')}
                                                className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase text-[10px] tracking-widest px-8 py-3 rounded-full flex items-center gap-3 mx-auto hover:bg-white hover:text-black transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download 4K Source
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : event?.poster ? (
                                <div className="h-full w-full relative">
                                     <img 
                                        src={event.poster} 
                                        alt="Original Poster" 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <p className="text-white font-bold uppercase tracking-widest text-xs">Using Original Photo</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center opacity-40">
                                    <div className="w-24 h-24 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                                        <Sparkles className="w-12 h-12 text-slate-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-400 mb-2 uppercase tracking-widest">Awaiting Vision</h3>
                                    <p className="text-slate-400 text-sm max-w-[200px]">The AI is ready to materialize your event visual.</p>
                                </div>
                            )}
                        </div>
                        
                        {/* Status Floaties */}
                        {posterData && !isGenerating && (
                            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 animate-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-500/20 rounded-xl flex items-center justify-center">
                                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Status</p>
                                        <p className="font-bold text-sm">Design Ready</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <style>{`
                @keyframes pulse-soft {
                    0%, 100% { transform: scale(1); opacity: 0.1; }
                    50% { transform: scale(1.1); opacity: 0.15; }
                }
                .pulse-box { animation: pulse-soft 3s infinite ease-in-out; }
            `}</style>
        </div>
    );
};

export default PosterStudio;
