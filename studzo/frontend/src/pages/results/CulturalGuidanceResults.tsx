import { useLocation, useNavigate } from 'react-router-dom';
import { Globe, BookOpen, Users, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const CulturalGuidanceResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state || {}; // Expecting full response object

    // Fallback if data is raw
    const aiData = data.raw ? { encouragement: data.raw } : data;

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-400 hover:text-white transition">
                <ArrowLeft size={20} className="mr-2" /> Back to Guide
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10 p-8 rounded-2xl relative overflow-hidden"
            >
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-4">Your Cultural Integration Guide</h1>
                    <p className="text-lg text-gray-200 italic">
                        "{aiData.encouragement || "Welcome! Embracing a new culture is a journey. Here is your personalized roadmap."}"
                    </p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Differences */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Globe className="text-indigo-400" /> Key Cultural Differences
                    </h2>
                    <div className="space-y-4">
                        {aiData.key_differences?.map((diff: string, idx: number) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card p-5 rounded-xl border-l-4 border-indigo-500"
                            >
                                <p className="text-gray-200">{diff}</p>
                            </motion.div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold flex items-center gap-2 mt-8">
                        <Users className="text-pink-400" /> Social Norms & Tips
                    </h2>
                    <div className="glass-card p-6 rounded-xl space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold text-pink-300 mb-2">Social Norms</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                                    {aiData.social_norms?.map((norm: string, i: number) => (
                                        <li key={i}>{norm}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-pink-300 mb-2">Making Friends</h3>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    {aiData.friendship_advice}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Quick Tips & Resources */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-6 rounded-xl bg-orange-500/10 border-orange-500/30"
                    >
                        <h3 className="font-bold text-orange-400 mb-3 flex items-center gap-2">
                            <AlertTriangle size={18} /> Culture Shock
                        </h3>
                        <p className="text-sm text-gray-300">
                            {aiData.culture_shock_warning}
                        </p>
                    </motion.div>

                    <div className="glass-card p-6 rounded-xl">
                        <h3 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                            <BookOpen size={18} /> Resources
                        </h3>
                        <ul className="space-y-2">
                            {aiData.community_resources?.map((res: string, i: number) => (
                                <li key={i} className="text-sm text-gray-300 border-b border-white/10 pb-2 last:border-0 last:pb-0">
                                    {res}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="glass-card p-6 rounded-xl">
                        <h3 className="font-bold text-blue-400 mb-3">Maintaining Connection</h3>
                        <p className="text-sm text-gray-300">
                            {aiData.maintaining_culture}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
import { AlertTriangle } from 'lucide-react';

export default CulturalGuidanceResults;
