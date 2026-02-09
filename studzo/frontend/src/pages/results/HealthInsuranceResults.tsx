import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, AlertTriangle, CheckCircle, Info, ArrowLeft } from 'lucide-react';
import Layout from '../../components/Layout/Layout';

const HealthInsuranceResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state || {}; // { summary, coverage_details, recommendation, tips }

    if (!location.state) {
        return (
            <div className="text-center mt-20">
                <p className="text-gray-500">No analysis data found.</p>
                <button onClick={() => navigate('/health-insurance')} className="text-teal-400 mt-4 underline">Go Back</button>
            </div>
        );
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-6">
                <button
                    onClick={() => navigate('/health-insurance')}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Input</span>
                </button>

                <div className="glass-panel p-8 rounded-2xl border-l-4 border-teal-500">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-2">Policy Analysis</h1>
                            <p className="text-gray-300">{data.summary}</p>
                        </div>
                        <ShieldCheck size={40} className="text-teal-500" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recommendation Card */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Info size={20} className="text-blue-400" />
                            AI Recommendation
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                            {data.recommendation}
                        </p>
                    </div>

                    {/* Tips Card */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <CheckCircle size={20} className="text-green-400" />
                            Actionable Tips
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                            {data.tips}
                        </p>
                    </div>
                </div>

                {/* Detailed Coverage Table */}
                <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-white mb-6">Coverage Details</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                                    <th className="pb-3 pl-2">Category</th>
                                    <th className="pb-3">Status</th>
                                    <th className="pb-3 pr-2">Notes</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {data.coverage_details?.map((item: any, i: number) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="py-4 pl-2 font-medium text-gray-200">{item.category}</td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${item.status.toLowerCase().includes('covered 100') ? 'bg-green-500/20 text-green-400' :
                                                item.status.toLowerCase().includes('not covered') ? 'bg-red-500/20 text-red-400' :
                                                    'bg-blue-500/20 text-blue-400'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-4 pr-2 text-sm text-gray-400">{item.notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HealthInsuranceResults;
