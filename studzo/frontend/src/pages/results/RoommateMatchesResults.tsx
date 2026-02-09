import { useLocation, useNavigate } from 'react-router-dom';
import { Users, Star, UserCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const RoommateMatchesResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { matches = [] } = location.state || {};

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-400 hover:text-white transition">
                <ArrowLeft size={20} className="mr-2" /> Back to Matching
            </button>

            <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Your Roommate Matches</h1>
                    <p className="text-gray-400">Found {matches.length} compatible candidates based on your profile.</p>
                </div>
            </div>

            {matches.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl">
                    <Users size={48} className="mx-auto text-gray-600 mb-4" />
                    <p className="text-xl text-gray-400">No strong matches found at the moment.</p>
                    <p className="text-sm text-gray-500 mt-2">Try adjusting your profile or check back later.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matches.map((match: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-6 rounded-xl relative group hover:border-purple-500/50 transition-colors"
                        >
                            <div className="absolute top-4 right-4 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                <Star size={14} className="fill-purple-300" />
                                {match.compatibility_score}%
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-bold">
                                    {match.candidate_name?.[0] || "U"}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{match.candidate_name || "Anonymous User"}</h3>
                                    <p className="text-sm text-gray-400">Potential Roommate</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Strengths</div>
                                    <div className="flex flex-wrap gap-2">
                                        {match.strengths?.slice(0, 3).map((s: string, i: number) => (
                                            <span key={i} className="text-xs bg-green-500/10 text-green-300 px-2 py-1 rounded">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {match.potential_conflicts && match.potential_conflicts.length > 0 && (
                                    <div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Conflicts</div>
                                        <div className="text-xs text-red-300 bg-red-500/10 p-2 rounded">
                                            {match.potential_conflicts[0]}
                                        </div>
                                    </div>
                                )}

                                <div className="p-3 bg-white/5 rounded-lg">
                                    <p className="text-xs text-gray-300 italic">"{match.tips}"</p>
                                </div>
                            </div>

                            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all flex items-center justify-center gap-2">
                                <UserCheck size={18} /> Connect with {match.candidate_name?.split(' ')[0]}
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RoommateMatchesResults;
