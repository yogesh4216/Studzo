import React, { useState } from 'react';
import { aiService } from '../../services/ai';
import { MapPin, Calendar, Users, Info, Globe, AlertCircle, CheckCircle } from 'lucide-react';

interface Event {
    title: string;
    date: string;
    type: string;
    description: string;
    location: string;
    cultural_significance: string;
    attendees: string;
    dress_code: string;
    trust_badge: string;
}

const CulturalGuide: React.FC = () => {
    // State
    const [activeTab, setActiveTab] = useState<'guide' | 'events'>('events');
    const [formData, setFormData] = useState({
        home_country: 'India',
        host_country: 'United States',
        university: 'Northeastern University',
        city: 'Boston',
        week: 1,
        challenges: '',
        date_range: 'This Month'
    });

    const [guideResult, setGuideResult] = useState<any>(null);
    const [eventsResult, setEventsResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGetGuide = async () => {
        setLoading(true);
        try {
            const data = await aiService.getCulturalGuidance(formData);
            const parsed = JSON.parse(data.raw_response.replace(/```json/g, '').replace(/```/g, ''));
            setGuideResult(parsed);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDiscovery = async () => {
        setLoading(true);
        try {
            const data = await aiService.culturalDiscovery({
                home_country: formData.home_country,
                host_country: formData.host_country,
                city: formData.city,
                date_range: formData.date_range
            });
            setEventsResult(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col md:flex-row gap-6">
            {/* Left Sidebar - Controls */}
            <div className="w-full md:w-80 flex-shrink-0 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                {/* Tabs */}
                <div className="flex bg-white/5 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'events' ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Events
                    </button>
                    <button
                        onClick={() => setActiveTab('guide')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'guide' ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Guide
                    </button>
                </div>

                {/* Form Inputs */}
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Coming From</label>
                        <input name="home_country" value={formData.home_country} onChange={handleChange} className="input-field" placeholder="e.g. India" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Going To</label>
                        <div className="grid grid-cols-2 gap-2">
                            <input name="host_country" value={formData.host_country} onChange={handleChange} className="input-field" placeholder="Country" />
                            <input name="city" value={formData.city} onChange={handleChange} className="input-field" placeholder="City" />
                        </div>
                    </div>

                    {activeTab === 'guide' ? (
                        <>
                            <input name="university" value={formData.university} onChange={handleChange} className="input-field" placeholder="University" />
                            <textarea name="challenges" value={formData.challenges} onChange={handleChange} className="input-field min-h-[80px]" placeholder="Specific challenges..." />
                            <button onClick={handleGetGuide} disabled={loading} className="btn-primary w-full">
                                {loading ? 'Analyzing...' : 'Get Cultural Guide'}
                            </button>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-bold block mb-1">When?</label>
                                <select name="date_range" value={formData.date_range} onChange={handleChange} className="input-field">
                                    <option>This Week</option>
                                    <option>This Month</option>
                                    <option>Upcoming</option>
                                </select>
                            </div>
                            <button onClick={handleDiscovery} disabled={loading} className="btn-primary w-full bg-gradient-to-r from-teal-500 to-emerald-500">
                                {loading ? 'Discovering...' : 'Find Events'}
                            </button>
                        </>
                    )}
                </div>

                {/* Community Summary Widget */}
                {eventsResult && eventsResult.community_summary && (
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <h4 className="flex items-center gap-2 font-bold text-teal-400 text-sm mb-2">
                            <Users size={16} /> Community Pulse
                        </h4>
                        <p className="text-xs text-gray-300 italic mb-3">"{eventsResult.community_summary}"</p>
                        <div className="flex flex-wrap gap-2">
                            {eventsResult.active_groups?.map((group: string, i: number) => (
                                <span key={i} className="text-[10px] bg-teal-500/10 text-teal-300 px-2 py-1 rounded-full border border-teal-500/20">{group}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Content Area */}
            <div className="flex-1 min-h-0 bg-dark-card/50 rounded-2xl border border-white/5 overflow-hidden flex flex-col relative">
                {!guideResult && !eventsResult && !loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-8 text-center">
                        <Globe size={48} className="mb-4 opacity-20" />
                        <h3 className="text-xl font-bold text-gray-300">Cultural Intelligence</h3>
                        <p className="max-w-md mt-2">Discover events, find your community, and learn specific cultural norms for your host country.</p>
                        <p className="text-sm mt-4 text-teal-400">Try searching for events!</p>
                    </div>
                )}

                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    {/* Events View */}
                    {activeTab === 'events' && eventsResult && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="bg-teal-500/20 text-teal-400 p-2 rounded-lg"><Calendar size={24} /></span>
                                Cultural Events in {formData.city}
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {eventsResult.events?.map((event: Event, index: number) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedEvent(event)}
                                        className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-500/50 transition-all rounded-xl p-4 cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">{event.type}</span>
                                            {event.trust_badge && (
                                                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                    <CheckCircle size={10} /> {event.trust_badge}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">{event.title}</h3>
                                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                                            <span className="flex items-center gap-1"><MapPin size={12} /> {event.location}</span>
                                        </div>
                                        <p className="text-sm text-gray-300 line-clamp-2">{event.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Guide View */}
                    {activeTab === 'guide' && guideResult && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="bg-brand-primary/10 border border-brand-primary/20 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold text-brand-primary mb-4 flex items-center gap-2">
                                    <AlertCircle size={20} /> Key Differences
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {guideResult.key_differences?.map((d: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0"></span>
                                            {d}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                                    <h4 className="font-bold text-white mb-3">Social Norms</h4>
                                    <ul className="space-y-2">
                                        {guideResult.social_norms?.map((s: string, i: number) => (
                                            <li key={i} className="text-xs text-gray-400">Please {s}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                                    <h4 className="font-bold text-white mb-3">Food & Lifestyle</h4>
                                    <p className="text-sm text-gray-400">{guideResult.food_lifestyle_tips}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Event Detail Modal (In-place overlay) */}
                {selectedEvent && (
                    <div className="absolute inset-0 z-20 bg-[#131620] bg-opacity-95 backdrop-blur-sm p-6 flex flex-col animate-fade-in custom-scrollbar overflow-y-auto">
                        <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white z-30 bg-white/10 p-2 rounded-full"><UtilityX size={20} /></button>

                        <div className="flex-1 pt-8">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">{selectedEvent.type}</span>
                                {selectedEvent.trust_badge && (
                                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full flex items-center gap-1 border border-blue-500/30">
                                        <CheckCircle size={10} /> Verified: {selectedEvent.trust_badge}
                                    </span>
                                )}
                            </div>

                            <h2 className="text-3xl font-bold text-white mb-4">{selectedEvent.title}</h2>

                            <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-300">
                                <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                                    <Calendar size={16} className="text-teal-400" /> {selectedEvent.date}
                                </span>
                                <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                                    <MapPin size={16} className="text-teal-400" /> {selectedEvent.location}
                                </span>
                                <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                                    <Users size={16} className="text-teal-400" /> {selectedEvent.attendees}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="flex items-center gap-2 font-bold text-white mb-2"><Info size={18} /> About</h4>
                                        <p className="text-gray-400 leading-relaxed">{selectedEvent.description}</p>
                                    </div>
                                    <div>
                                        <h4 className="flex items-center gap-2 font-bold text-white mb-2"><Globe size={18} /> Cultural Significance</h4>
                                        <p className="text-gray-400 leading-relaxed">{selectedEvent.cultural_significance}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-teal-500/10 p-5 rounded-xl border border-teal-500/20">
                                        <h4 className="font-bold text-teal-400 mb-2 text-sm">Advice for Newcomers</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <span className="text-xs text-gray-500 uppercase font-bold">Dress Code</span>
                                                <p className="text-gray-300 text-sm">{selectedEvent.dress_code}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 uppercase font-bold">Expectations</span>
                                                <p className="text-gray-300 text-sm">Open to everyone, very welcoming to students.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Start Helper for X Icon
const UtilityX = ({ size = 24 }: { size?: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export default CulturalGuide;
