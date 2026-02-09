import React, { useState } from 'react';
import { aiService } from '../../services/ai';
import { Users, Home, FileText, Search, Shield, MapPin, CheckCircle, AlertTriangle, Star, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Candidates
const MOCK_CANDIDATES = [
    { id: 1, name: "Liam", age: 22, major: "CS", habits: "Night owl, Gamer", nationality: "UK" },
    { id: 2, name: "Wei", age: 21, major: "Business", habits: "Early riser, Quiet", nationality: "China" },
    { id: 3, name: "Priya", age: 23, major: "Design", habits: "Social, Cook", nationality: "India" },
];

const AccommodationHub: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'roommate' | 'hostel'>('roommate');

    // Roommate State
    const [userProfile, setUserProfile] = useState({ name: 'Me', habits: 'Quiet, Studious', major: 'CS' });
    const [matches, setMatches] = useState<any[]>([]);
    const [matchLoading, setMatchLoading] = useState(false);

    // Hostel State
    const [hostelQuery, setHostelQuery] = useState('');
    const [hostelResults, setHostelResults] = useState<any>(null);
    const [hostelLoading, setHostelLoading] = useState(false);

    // Handlers
    const handleMatch = async () => {
        setMatchLoading(true);
        try {
            const data = await aiService.matchRoommates(userProfile, MOCK_CANDIDATES);
            setMatches(data);
        } catch (e) {
            console.error(e);
        } finally {
            setMatchLoading(false);
        }
    };

    const handleHostelSearch = async () => {
        setHostelLoading(true);
        try {
            const data = await aiService.searchHostels(hostelQuery, {});
            setHostelResults(data);
        } catch (e) {
            console.error(e);
        } finally {
            setHostelLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 flex-shrink-0 space-y-2">
                <button
                    onClick={() => setActiveTab('roommate')}
                    className={`w-full text-left p-4 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'roommate' ? 'bg-brand-primary text-white shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                >
                    <Users size={20} />
                    <div>
                        <div className="font-bold text-sm">Roommate Finder</div>
                        <div className="text-xs opacity-70">AI Capability Score</div>
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('hostel')}
                    className={`w-full text-left p-4 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'hostel' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                >
                    <Home size={20} />
                    <div>
                        <div className="font-bold text-sm">Hostel</div>
                        <div className="text-xs opacity-70">Verified Listings</div>
                    </div>
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-dark-card/50 rounded-2xl border border-white/5 overflow-hidden flex flex-col relative">

                {/* ROOMMATE TAB */}
                {activeTab === 'roommate' && (
                    <div className="flex-1 flex flex-col p-6 animate-fade-in">
                        <div className="bg-white/5 p-4 rounded-xl mb-6">
                            <h3 className="font-bold text-white mb-2">My Profile</h3>
                            <div className="flex gap-4">
                                <input
                                    value={userProfile.habits}
                                    onChange={(e) => setUserProfile({ ...userProfile, habits: e.target.value })}
                                    className="input-field flex-1"
                                    placeholder="Describe your habits (e.g. Night owl, clean freak)..."
                                />
                                <button onClick={handleMatch} disabled={matchLoading} className="btn-primary flex items-center gap-2">
                                    {matchLoading ? 'Matching...' : 'Find Match'}
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
                            {matches.map((m: any, i: number) => (
                                <div key={i} className="glass-card p-4 flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-blue-500 flex items-center justify-center font-bold text-xl">
                                        {m.candidate_name?.[0]}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-lg">{m.candidate_name}</h4>
                                                <div className="text-xs text-brand-primary font-bold px-2 py-0.5 rounded-full bg-brand-primary/10 inline-block mb-2">
                                                    {m.match_score}% Match • {m.match_tier}
                                                </div>
                                            </div>
                                            <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">Connect</button>
                                        </div>
                                        <p className="text-sm text-gray-300 italic mb-3">"{m.why_it_works}"</p>

                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className="bg-green-500/10 p-2 rounded text-green-300">
                                                <span className="font-bold block mb-1">Talk About:</span>
                                                {m.conversation_starters?.slice(0, 2).map((s: string, idx: number) => <div key={idx}>• {s}</div>)}
                                            </div>
                                            <div className="bg-red-500/10 p-2 rounded text-red-300">
                                                <span className="font-bold block mb-1">Potential Conflict:</span>
                                                {m.potential_conflicts}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* HOSTEL TAB */}
                {activeTab === 'hostel' && (
                    <div className="flex-1 flex flex-col p-6 animate-fade-in">
                        <div className="relative mb-6">
                            <input
                                value={hostelQuery}
                                onChange={(e) => setHostelQuery(e.target.value)}
                                className="input-field pl-12 h-14 text-lg"
                                placeholder="Describe what you want (e.g. 'Quiet hostel near campus under $500')..."
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <button
                                onClick={handleHostelSearch}
                                disabled={hostelLoading || !hostelQuery}
                                className="absolute right-2 top-2 bottom-2 bg-purple-600 hover:bg-purple-500 text-white px-6 rounded-lg font-bold transition-colors"
                            >
                                {hostelLoading ? 'Searching...' : 'Search'}
                            </button>
                        </div>

                        {hostelResults && (
                            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
                                <div className="text-sm text-gray-400 mb-2">{hostelResults.search_summary}</div>
                                {hostelResults.results.map((h: any, i: number) => (
                                    <div key={i} className="glass-card p-0 overflow-hidden flex flex-col md:flex-row">
                                        <div className="w-full md:w-48 bg-gray-800 flex items-center justify-center">
                                            <Home size={40} className="text-gray-600" />
                                        </div>
                                        <div className="p-5 flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-bold text-xl text-white">{h.name}</h3>
                                                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                                        <MapPin size={14} /> {h.distance}
                                                        {h.verified && <span className="text-blue-400 flex items-center gap-1"><Shield size={12} /> Verified</span>}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xl font-bold text-green-400">{h.price}</div>
                                                    <div className="text-xs text-gray-500">{h.type}</div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {h.facilities.map((f: string, idx: number) => (
                                                    <span key={idx} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300">{f}</span>
                                                ))}
                                                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30">✨ Best for {h.best_for}</span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 text-xs">
                                                <div>
                                                    <div className="font-bold text-green-400 mb-1">Pros</div>
                                                    <ul className="list-disc list-inside text-gray-400">
                                                        {h.pros.map((p: string, idx: number) => <li key={idx}>{p}</li>)}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-red-400 mb-1">Cons</div>
                                                    <ul className="list-disc list-inside text-gray-400">
                                                        {h.cons.map((c: string, idx: number) => <li key={idx}>{c}</li>)}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccommodationHub;
