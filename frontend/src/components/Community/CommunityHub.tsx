import React, { useState } from 'react';
import { aiService } from '../../services/ai';
import { Search, MapPin, Users, Hash, Shield, MessageCircle, Star, Filter, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CommunityHub: React.FC = () => {
    const [query, setQuery] = useState('');
    const [userProfile, setUserProfile] = useState({
        origin: 'India',
        university: 'Northeastern',
        major: 'Computer Science',
        interests: ['Cricket', 'Coding', 'Movies']
    });

    // Results State
    const [results, setResults] = useState<any[]>([]);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    // Chat State
    const [activeCommunity, setActiveCommunity] = useState<any>(null);
    const [chatQuestion, setChatQuestion] = useState('');
    const [chatAnswer, setChatAnswer] = useState<any>(null);
    const [chatLoading, setChatLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const data = await aiService.communityConnect(userProfile, query);
            setResults(data.results || []);
            setSummary(data.analysis_summary || '');
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleAskCommunity = async () => {
        if (!chatQuestion || !activeCommunity) return;
        setChatLoading(true);
        try {
            // Context includes description and tags
            const context = `Community: ${activeCommunity.name}. ${activeCommunity.description}. Rules: Be respectful.`;
            const data = await aiService.askCommunity(context, chatQuestion);
            setChatAnswer(data);
        } catch (e) {
            console.error(e);
        } finally {
            setChatLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col md:flex-row gap-6">
            {/* Quick Profile & Filters Sidebar */}
            <div className="w-full md:w-80 flex-shrink-0 space-y-4">
                <div className="bg-dark-card p-5 rounded-2xl border border-white/5">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                        <Users size={18} className="text-brand-primary" />
                        Smart Finder
                    </h3>

                    <div className="space-y-3">
                        <div>
                            <label className="text-xs text-gray-400 uppercase">I am from</label>
                            <input
                                value={userProfile.origin}
                                onChange={(e) => setUserProfile({ ...userProfile, origin: e.target.value })}
                                className="input-field w-full mt-1"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase">Studying at</label>
                            <input
                                value={userProfile.university}
                                onChange={(e) => setUserProfile({ ...userProfile, university: e.target.value })}
                                className="input-field w-full mt-1"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase">Interested in</label>
                            <input
                                value={userProfile.interests.join(', ')}
                                onChange={(e) => setUserProfile({ ...userProfile, interests: e.target.value.split(',') })}
                                className="input-field w-full mt-1"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-brand-primary/10 p-5 rounded-2xl border border-brand-primary/20">
                    <h4 className="font-bold text-brand-primary text-sm mb-2">Did you know?</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                        Gemini analyzes community vibes to match you with groups that fit your social energy—whether you're a networking pro or just want a quiet study buddy.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-0 bg-dark-card/50 rounded-2xl border border-white/5 overflow-hidden">
                {/* Search Bar */}
                <div className="p-6 border-b border-white/5 bg-dark-card/80 backdrop-blur-sm z-10">
                    <div className="relative">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder="Describe your ideal community (e.g. 'Tamil students who love hiking')..."
                            className="w-full bg-black/20 text-white pl-12 pr-32 py-4 rounded-xl border border-white/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-lg shadow-inner"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="absolute right-2 top-2 bottom-2 bg-brand-primary hover:bg-brand-secondary text-white px-6 rounded-lg font-bold transition-all shadow-lg shadow-brand-primary/20"
                        >
                            {loading ? 'Scanning...' : 'Find Groups'}
                        </button>
                    </div>
                    {summary && <div className="mt-3 text-sm text-gray-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>{summary}</div>}
                </div>

                {/* Results List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
                    {results.length === 0 && !loading && (
                        <div className="text-center text-gray-500 mt-20">
                            <Users size={64} className="mx-auto mb-4 opacity-10" />
                            <p>Enter a search or use your profile to find communities.</p>
                        </div>
                    )}

                    {results.map((community: any) => (
                        <motion.div
                            key={community.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-brand-primary/30 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                                        {community.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-white group-hover:text-brand-primary transition-colors">{community.name}</h3>
                                        <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                                            <span className="flex items-center gap-1"><Users size={12} /> {community.members} Members</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                            <span className="text-brand-secondary">{community.category}</span>
                                            {community.safety_note && <span className="flex items-center gap-1 text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full"><Shield size={10} /> {community.safety_note}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-brand-primary">{community.relevance_score}%</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-widest">Match</div>
                                </div>
                            </div>

                            <p className="text-gray-300 text-sm mb-4 leading-relaxed">{community.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-lg border border-white/5">
                                    ✨ Best for: {community.best_for}
                                </span>
                                {community.tags.map((tag: string, i: number) => (
                                    <span key={i} className="bg-black/20 text-gray-400 text-xs px-2 py-1 rounded-md border border-white/5 flex items-center gap-1">
                                        <Hash size={10} /> {tag.replace('#', '')}
                                    </span>
                                ))}
                            </div>

                            {/* Why Recommended AI Insight */}
                            <div className="bg-gradient-to-r from-brand-primary/10 to-transparent p-3 rounded-lg border-l-2 border-brand-primary text-sm text-gray-300 italic mb-4">
                                " {community.why_recommended} "
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 btn-primary py-2 text-sm">
                                    Join Community
                                </button>
                                <button
                                    onClick={() => { setActiveCommunity(community); setChatAnswer(null); setChatQuestion(''); }}
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-white transition-colors flex items-center gap-2 text-sm"
                                >
                                    <MessageCircle size={16} />
                                    Ask Gemini
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* AI Chat Modal/Overlay */}
            <AnimatePresence>
                {activeCommunity && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#131620] w-full max-w-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[600px]"
                        >
                            <div className="p-5 border-b border-white/5 bg-white/5 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-white">Ask about {activeCommunity.name}</h3>
                                    <p className="text-xs text-gray-400">Gemini analyzes community history to answer.</p>
                                </div>
                                <button onClick={() => setActiveCommunity(null)} className="text-gray-400 hover:text-white">✕</button>
                            </div>

                            <div className="p-6 flex-1 overflow-y-auto">
                                {!chatAnswer ? (
                                    <div className="space-y-4">
                                        <p className="text-gray-300 text-sm">What would you like to know?</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['Is this group active?', 'Are they fresher friendly?', 'Do they host events?', 'Is it safe?'].map(q => (
                                                <button key={q} onClick={() => setChatQuestion(q)} className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-colors">
                                                    {q}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-brand-primary/10 p-4 rounded-xl border border-brand-primary/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Star size={16} className="text-brand-primary" fill="currentColor" />
                                            <span className="font-bold text-brand-primary text-sm">Gemini Answer</span>
                                        </div>
                                        <p className="text-sm text-gray-200 leading-relaxed mb-3">{chatAnswer.answer}</p>
                                        <div className="flex gap-2 text-[10px] text-gray-500 uppercase tracking-widest">
                                            <span>Confidence: {chatAnswer.confidence}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border-t border-white/5 bg-black/20">
                                <div className="relative">
                                    <input
                                        value={chatQuestion}
                                        onChange={(e) => setChatQuestion(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAskCommunity()}
                                        placeholder="ask a specific question..."
                                        className="input-field pr-12"
                                        autoFocus
                                    />
                                    <button
                                        onClick={handleAskCommunity}
                                        disabled={chatLoading || !chatQuestion}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-brand-primary text-white rounded-lg disabled:opacity-50"
                                    >
                                        {chatLoading ? <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <MessageCircle size={16} />}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CommunityHub;
