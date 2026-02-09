import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiService } from '../services/ai';
import { ShieldCheck, FileText, Send } from 'lucide-react';
import Layout from '../components/Layout/Layout';

const HealthInsurance: React.FC = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAnalyze = async () => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const data = await aiService.analyzeHealthInsurance(query);
            navigate('/health-insurance/result', { state: data });
        } catch (error) {
            console.error(error);
            alert('Analysis failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
                        Health Insurance Guide
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Upload your policy text or ask questions to understand your coverage better.
                    </p>
                </div>

                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Paste Policy Text or Ask a Question
                            </label>
                            <div className="relative">
                                <textarea
                                    className="w-full h-48 bg-black/20 border border-white/10 rounded-xl p-4 text-gray-200 focus:outline-none focus:border-teal-500/50 transition-colors resize-none"
                                    placeholder="e.g., 'Does this plan cover dental?' or paste your policy summary here..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <div className="absolute top-4 right-4 text-gray-500">
                                    <FileText size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleAnalyze}
                                disabled={loading || !query.trim()}
                                className={`
                                    flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all
                                    ${loading || !query.trim()
                                        ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg hover:shadow-teal-500/25 hover:scale-[1.02] active:scale-95'}
                                `}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Analyzing...</span>
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck size={20} />
                                        <span>Analyze Coverage</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Suggestions */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["Is dental covered?", "What is my deductible?", "Emergency room costs?"].map((suggestion, i) => (
                        <button
                            key={i}
                            onClick={() => setQuery(suggestion)}
                            className="p-4 glass-panel rounded-xl hover:bg-white/5 transition-colors text-left text-sm text-gray-400 hover:text-teal-400"
                        >
                            <span className="block mb-1 text-xs uppercase tracking-wider opacity-50">Suggestion</span>
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default HealthInsurance;
