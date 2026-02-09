import React, { useEffect, useState } from 'react';
import { aiService } from '../../services/ai';

const AIAnalytics: React.FC = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
        // Refresh every 30 seconds
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchStats = async () => {
        try {
            const data = await aiService.getAnalytics();
            setStats(data);
        } catch (error) {
            console.error("Failed to fetch analytics", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-4 text-center">Loading Analytics...</div>;
    if (!stats) return null;

    const maxCount = Math.max(...Object.values(stats.feature_breakdown || {}).map((v: any) => Number(v)) as number[], 1);

    return (
        <div className="bg-slate-900 text-white p-6 rounded-lg shadow-xl border border-slate-700">
            <h2 className="text-xl font-bold mb-6 flex items-center">
                📊 AI System Health & Analytics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-800 p-4 rounded border border-slate-600">
                    <div className="text-slate-400 text-sm">Total Interactions</div>
                    <div className="text-3xl font-bold text-blue-400">{stats.total_calls}</div>
                </div>
                <div className="bg-slate-800 p-4 rounded border border-slate-600">
                    <div className="text-slate-400 text-sm">Success Rate</div>
                    <div className={`text-3xl font-bold ${stats.success_rate > 95 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {stats.success_rate}%
                    </div>
                </div>
                <div className="bg-slate-800 p-4 rounded border border-slate-600">
                    <div className="text-slate-400 text-sm">Avg Latency</div>
                    <div className="text-3xl font-bold text-purple-400">{stats.average_latency}s</div>
                </div>
            </div>

            <div className="bg-slate-800 p-4 rounded border border-slate-600">
                <h3 className="font-bold mb-4 text-slate-300">Usage by Feature</h3>
                <div className="space-y-3">
                    {Object.entries(stats.feature_breakdown || {}).map(([feature, count]: [string, any]) => (
                        <div key={feature}>
                            <div className="flex justify-between text-sm mb-1">
                                <span>{feature}</span>
                                <span className="text-slate-400">{count}</span>
                            </div>
                            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div
                                    className="bg-blue-500 h-full rounded-full transition-all duration-500"
                                    style={{ width: `${(count / maxCount) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                    {Object.keys(stats.feature_breakdown || {}).length === 0 && (
                        <div className="text-slate-500 text-center text-sm py-2">No data yet</div>
                    )}
                </div>
            </div>

            <div className="mt-4 text-right text-xs text-slate-500">
                Auto-refreshing every 30s
            </div>
        </div>
    );
};

export default AIAnalytics;
