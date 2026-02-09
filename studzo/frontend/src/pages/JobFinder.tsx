import React, { useState } from 'react';
import { aiService } from '../services/ai';
import Layout from '../components/Layout/Layout';
import { Search, Briefcase, MapPin, DollarSign, Clock, Shield, AlertTriangle, CheckCircle, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JobFinder: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'find' | 'scam'>('find');

    // Find Jobs State
    const [query, setQuery] = useState('');
    const [userProfile, setUserProfile] = useState({
        visa: 'F-1',
        major: 'CS',
        skills: ['Python', 'Excel'],
        availability: 'Weekends'
    });
    const [jobs, setJobs] = useState<any[]>([]);
    const [searchSummary, setSearchSummary] = useState('');
    const [loading, setLoading] = useState(false);

    // Scam Check State
    const [scamText, setScamText] = useState('');
    const [scamResult, setScamResult] = useState<any>(null);
    const [scamLoading, setScamLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const data = await aiService.findJobs(userProfile, query);
            setJobs(data.results || []);
            setSearchSummary(data.summary || '');
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleScamCheck = async () => {
        setScamLoading(true);
        try {
            const data = await aiService.analyzeJobScam(scamText);
            setScamResult(data);
        } catch (e) {
            console.error(e);
        } finally {
            setScamLoading(false);
        }
    };

    return (
        <Layout>
            <div className="h-[calc(100vh-140px)] flex flex-col space-y-4">
                <header className="flex-shrink-0 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold heading-gradient mb-1">Smart Job Finder</h1>
                        <p className="text-gray-400 text-sm">Find safe, visa-compliant part-time work near campus.</p>
                    </div>
                    <div className="flex bg-white/5 rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab('find')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'find' ? 'bg-brand-primary text-white shadow' : 'text-gray-400 hover:text-white'}`}
                        >
                            Find Jobs
                        </button>
                        <button
                            onClick={() => setActiveTab('scam')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'scam' ? 'bg-red-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                        >
                            Scam Detector
                        </button>
                    </div>
                </header>

                <div className="flex-1 min-h-0 bg-dark-card/50 rounded-2xl border border-white/5 overflow-hidden flex flex-col">

                    {/* FIND JOBS TAB */}
                    {activeTab === 'find' && (
                        <div className="flex-1 flex flex-col p-6 animate-fade-in">
                            {/* Profile Config */}
                            <div className="mb-6 flex gap-4 overflow-x-auto pb-2">
                                <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/5 min-w-fit">
                                    <label className="text-xs text-brand-primary font-bold uppercase block mb-1">Visa Type</label>
                                    <select
                                        value={userProfile.visa}
                                        onChange={(e) => setUserProfile({ ...userProfile, visa: e.target.value })}
                                        className="bg-transparent text-white text-sm focus:outline-none"
                                    >
                                        <option value="F-1">F-1 Student</option>
                                        <option value="J-1">J-1 Exchange</option>
                                        <option value="Citizen">US Citizen</option>
                                    </select>
                                </div>
                                <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/5 min-w-fit">
                                    <label className="text-xs text-gray-400 uppercase block mb-1">Availability</label>
                                    <input
                                        value={userProfile.availability}
                                        onChange={(e) => setUserProfile({ ...userProfile, availability: e.target.value })}
                                        className="bg-transparent text-white text-sm focus:outline-none w-24"
                                    />
                                </div>
                            </div>

                            {/* Search */}
                            <div className="relative mb-6">
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    className="input-field pl-12 h-14 text-lg"
                                    placeholder="Try 'Weekend jobs near library' or 'On-campus admin roles'..."
                                />
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <button
                                    onClick={handleSearch}
                                    disabled={loading}
                                    className="absolute right-2 top-2 bottom-2 bg-brand-primary hover:bg-brand-secondary text-white px-6 rounded-lg font-bold transition-colors"
                                >
                                    {loading ? 'Searching...' : 'Search Jobs'}
                                </button>
                            </div>

                            {/* Results */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
                                {searchSummary && <div className="text-sm text-gray-400 mb-2">{searchSummary}</div>}

                                {jobs.length === 0 && !loading && (
                                    <div className="text-center text-gray-500 mt-20">
                                        <Briefcase size={48} className="mx-auto mb-4 opacity-20" />
                                        <p>Search for jobs to get started.</p>
                                    </div>
                                )}

                                {jobs.map((job: any) => (
                                    <motion.div
                                        key={job.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white/5 p-5 rounded-xl border border-white/5 hover:border-brand-primary/30 transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg text-white">{job.title}</h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                                    <Briefcase size={14} /> {job.employer}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-green-400">{job.rate}</div>
                                                <div className="text-xs text-gray-500">{job.hours}</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 my-3">
                                            <div className="bg-black/20 p-2 rounded text-xs text-gray-300 flex items-center gap-2">
                                                <MapPin size={12} className="text-brand-secondary" /> {job.commute}
                                            </div>
                                            <div className={`p-2 rounded text-xs flex items-center gap-2 font-bold ${job.visa_status === 'Safe' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-500'
                                                }`}>
                                                <Shield size={12} /> {job.visa_status}: {job.visa_reason}
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-400 italic border-l-2 border-white/10 pl-3 mb-3">
                                            "{job.why_recommended}"
                                        </p>

                                        <div className="flex gap-2 justify-end">
                                            <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">Save</button>
                                            <button className="text-xs bg-brand-primary hover:bg-brand-secondary text-white px-4 py-1.5 rounded-lg transition-colors">Apply Now</button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SCAM DETECTOR TAB */}
                    {activeTab === 'scam' && (
                        <div className="flex-1 flex flex-col p-6 animate-fade-in relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-red-500/5 blur-3xl rounded-full pointer-events-none"></div>

                            <div className="max-w-3xl mx-auto w-full flex flex-col h-full">
                                <div className="text-center mb-8">
                                    <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
                                    <h2 className="text-2xl font-bold text-white mb-2">Job Scam Shield</h2>
                                    <p className="text-gray-400 text-sm">Paste any suspicious job offer, email, or WhatsApp message below.</p>
                                </div>

                                <textarea
                                    value={scamText}
                                    onChange={(e) => setScamText(e.target.value)}
                                    className="flex-1 bg-black/20 border border-red-500/20 rounded-xl p-6 text-gray-300 resize-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-mono text-sm mb-6"
                                    placeholder="Paste text here..."
                                />

                                <button
                                    onClick={handleScamCheck}
                                    disabled={scamLoading || !scamText}
                                    className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all"
                                >
                                    {scamLoading ? 'Analyzing Patterns...' : 'Analyze for Scams'}
                                </button>

                                {/* Scam Result Modal */}
                                <AnimatePresence>
                                    {scamResult && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                                        >
                                            <div className="bg-[#131620] w-full max-w-lg rounded-3xl border border-red-500/30 p-6 shadow-2xl relative">
                                                <button
                                                    onClick={() => setScamResult(null)}
                                                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                                                >
                                                    ✕
                                                </button>

                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${scamResult.risk_level === 'High' ? 'bg-red-500 text-white' :
                                                    scamResult.risk_level === 'Medium' ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'
                                                    }`}>
                                                    <Shield size={12} /> {scamResult.risk_level} Risk
                                                </div>

                                                <h3 className="text-2xl font-bold text-white mb-2">{scamResult.verdict}</h3>
                                                <p className="text-gray-300 mb-6">{scamResult.explanation}</p>

                                                <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20 mb-6">
                                                    <h4 className="font-bold text-red-500 text-sm mb-2">Red Flags Detected</h4>
                                                    <ul className="space-y-2">
                                                        {scamResult.red_flags.map((flag: string, i: number) => (
                                                            <li key={i} className="text-sm text-red-300 flex items-start gap-2">
                                                                <AlertTriangle size={14} className="mt-0.5 shrink-0" /> {flag}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="space-y-2">
                                                    <h4 className="font-bold text-white text-sm">Safe Next Steps</h4>
                                                    {scamResult.safe_next_steps.map((step: string, i: number) => (
                                                        <div key={i} className="bg-white/5 px-3 py-2 rounded-lg text-sm text-gray-300 flex items-center gap-2">
                                                            <CheckCircle size={14} className="text-green-500" /> {step}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </Layout>
    );
};

export default JobFinder;
