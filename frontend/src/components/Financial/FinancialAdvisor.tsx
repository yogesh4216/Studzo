import React, { useState } from 'react';
import { aiService } from '../../services/ai';
import { Shield, AlertTriangle, CheckCircle, TrendingUp, DollarSign, BookOpen, Landmark, Briefcase, FileText } from 'lucide-react';

const FinancialAdvisor: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'planner' | 'scam-check'>('planner');

    // Planner State
    const [formData, setFormData] = useState({
        host_country: '', home_country: '', length: '1 year',
        income: 0, expenses: 0, rent: 0, food: 0, other: 0, budget: 0
    });
    const [planResult, setPlanResult] = useState<any>(null);
    const [planLoading, setPlanLoading] = useState(false);

    // Scam Check State
    const [scamText, setScamText] = useState('');
    const [scamResult, setScamResult] = useState<any>(null);
    const [scamLoading, setScamLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value });
    };

    const handleAnalyzePlan = async () => {
        setPlanLoading(true);
        try {
            const data = await aiService.getFinancialGuidance(formData);
            const parsed = JSON.parse(data.raw_response.replace(/```json/g, '').replace(/```/g, ''));
            setPlanResult(parsed);
        } catch (error) {
            console.error(error);
        } finally {
            setPlanLoading(false);
        }
    };

    const handleScamCheck = async () => {
        setScamLoading(true);
        try {
            const data = await aiService.analyzeFinancialRisk(scamText);
            setScamResult(data);
        } catch (error) {
            console.error(error);
        } finally {
            setScamLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col md:flex-row gap-6">
            {/* Left Sidebar - Controls */}
            <div className="w-full md:w-80 flex-shrink-0 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                {/* Tabs */}
                <div className="flex bg-white/5 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('planner')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'planner' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Advisor
                    </button>
                    <button
                        onClick={() => setActiveTab('scam-check')}
                        className={`flex-1 py-2 text-sm flex items-center justify-center gap-2 font-medium rounded-lg transition-all ${activeTab === 'scam-check' ? 'bg-red-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Shield size={14} /> Scam Check
                    </button>
                </div>

                {activeTab === 'planner' ? (
                    <div className="space-y-4 animate-fade-in">
                        <div className="grid grid-cols-2 gap-3">
                            <input name="host_country" placeholder="Host Country" className="input-field text-sm" onChange={handleChange} />
                            <input name="home_country" placeholder="Home Country" className="input-field text-sm" onChange={handleChange} />
                        </div>
                        <input name="length" placeholder="Program Length (e.g. 1 year)" className="input-field text-sm" onChange={handleChange} />

                        <div className="grid grid-cols-2 gap-3">
                            <input name="income" type="number" placeholder="Income ($)" className="input-field text-sm" onChange={handleChange} />
                            <input name="budget" type="number" placeholder="Budget ($)" className="input-field text-sm" onChange={handleChange} />
                        </div>

                        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                            <label className="text-xs text-gray-400 uppercase font-bold mb-2 block">Monthly Expenses ($)</label>
                            <div className="grid grid-cols-3 gap-2">
                                <input name="rent" type="number" placeholder="Rent" className="input-field text-xs px-2" onChange={handleChange} />
                                <input name="food" type="number" placeholder="Food" className="input-field text-xs px-2" onChange={handleChange} />
                                <input name="other" type="number" placeholder="Other" className="input-field text-xs px-2" onChange={handleChange} />
                            </div>
                        </div>

                        <button onClick={handleAnalyzePlan} disabled={planLoading} className="btn-primary w-full bg-gradient-to-r from-green-500 to-emerald-600">
                            {planLoading ? 'Analyzing...' : 'Generate Plan'}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4 animate-fade-in">
                        <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                            <h4 className="font-bold text-red-400 text-xs uppercase mb-2">Scam Detector</h4>
                            <p className="text-xs text-gray-400 mb-4">Paste any suspicious email, message, job offer, or rental listing text here.</p>
                            <textarea
                                value={scamText}
                                onChange={(e) => setScamText(e.target.value)}
                                className="input-field min-h-[150px] font-mono text-xs"
                                placeholder="Paste text here..."
                            />
                        </div>
                        <button onClick={handleScamCheck} disabled={scamLoading || !scamText} className="btn-primary w-full bg-gradient-to-r from-red-500 to-rose-600">
                            {scamLoading ? 'Scanning...' : 'Check Risk'}
                        </button>
                    </div>
                )}

                {planResult?.daily_literacy_tip && (
                    <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                        <h4 className="flex items-center gap-2 font-bold text-blue-400 text-xs mb-2">
                            <BookOpen size={14} /> Daily Money Tip
                        </h4>
                        <p className="text-xs text-gray-300 italic">"{planResult.daily_literacy_tip}"</p>
                    </div>
                )}
            </div>

            {/* Right Content */}
            <div className="flex-1 min-h-0 bg-dark-card/50 rounded-2xl border border-white/5 overflow-hidden flex flex-col relative">
                {/* Default State */}
                {!planResult && !scamResult && !planLoading && !scamLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-8 text-center">
                        <TrendingUp size={48} className="mb-4 opacity-20" />
                        <h3 className="text-xl font-bold text-gray-300">Financial Intelligence</h3>
                        <p className="max-w-md mt-2">Get specific banking advice, check for scams, and build a localized student budget.</p>
                    </div>
                )}

                {/* Loading State */}
                {(planLoading || scamLoading) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                )}

                {/* Planner Results */}
                {activeTab === 'planner' && planResult && (
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 animate-fade-in">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="bg-green-500/10 p-5 rounded-xl border border-green-500/20">
                                <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2"><DollarSign size={18} /> Budget Plan</h4>
                                <p className="text-sm text-gray-300 leading-relaxed">{planResult.budget_plan}</p>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <h4 className="font-bold text-blue-400 mb-2 text-sm flex items-center gap-2"><Landmark size={16} /> Banking Essentials</h4>
                                    <div className="text-xs text-gray-300 space-y-1">
                                        <p><span className="text-gray-500">Recommended:</span> {planResult.banking_guide?.account_type}</p>
                                        <p><span className="text-gray-500">Documents:</span> {planResult.banking_guide?.documents?.join(', ')}</p>
                                        <p className="text-yellow-400/80 mt-1"><AlertTriangle size={10} className="inline mr-1" /> {planResult.banking_guide?.fees_warning}</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <h4 className="font-bold text-orange-400 mb-2 text-sm flex items-center gap-2"><Briefcase size={16} /> Work & Tax Rules</h4>
                                    <div className="text-xs text-gray-300 space-y-1">
                                        <p><span className="text-gray-500">Limit:</span> {planResult.tax_work_rules?.work_limit}</p>
                                        <p><span className="text-gray-500">Tax Info:</span> {planResult.tax_work_rules?.tax_basics}</p>
                                        <p className="text-red-400/80 mt-1">{planResult.tax_work_rules?.violation_consequences}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <h4 className="font-bold text-white text-sm mb-3">Cost Saving Tips</h4>
                                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                                    {planResult.cost_saving_tips?.map((s: string, i: number) => <li key={i}>{s}</li>)}
                                </ul>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <h4 className="font-bold text-white text-sm mb-3">Scholarships</h4>
                                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                                    {planResult.scholarships?.map((s: string, i: number) => <li key={i}>{s}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Scam Results */}
                {activeTab === 'scam-check' && scamResult && (
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col items-center justify-center animate-fade-in">
                        <div className={`p-8 rounded-2xl border-2 w-full max-w-lg text-center ${scamResult.risk_level === 'Critical' || scamResult.risk_level === 'High' ? 'bg-red-500/10 border-red-500 text-red-100' :
                                scamResult.risk_level === 'Medium' ? 'bg-yellow-500/10 border-yellow-500 text-yellow-100' :
                                    'bg-green-500/10 border-green-500 text-green-100'
                            }`}>
                            <div className="mb-4 flex justify-center">
                                {scamResult.risk_level === 'Critical' || scamResult.risk_level === 'High' ? <AlertTriangle size={64} className="text-red-500" /> :
                                    scamResult.risk_level === 'Medium' ? <AlertTriangle size={64} className="text-yellow-500" /> :
                                        <CheckCircle size={64} className="text-green-500" />}
                            </div>

                            <h2 className="text-3xl font-bold mb-2">{scamResult.risk_level} Risk</h2>
                            <p className="text-lg opacity-80 mb-6 font-medium">{scamResult.scam_type}</p>

                            <div className="bg-black/20 p-4 rounded-xl text-left mb-6">
                                <h4 className="font-bold text-sm uppercase opacity-70 mb-2">Analysis</h4>
                                <p className="text-sm leading-relaxed">{scamResult.analysis}</p>
                            </div>

                            {scamResult.red_flags && scamResult.red_flags.length > 0 && (
                                <div className="text-left mb-6">
                                    <h4 className="font-bold text-sm uppercase opacity-70 mb-2">Red Flags</h4>
                                    <ul className="list-disc list-inside text-sm space-y-1">
                                        {scamResult.red_flags.map((flag: string, i: number) => (
                                            <li key={i}>{flag}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {scamResult.safe_alternative && (
                                <div className="text-left bg-green-500/20 p-4 rounded-xl border border-green-500/30">
                                    <h4 className="font-bold text-green-400 text-sm uppercase mb-2">Safe Alternative</h4>
                                    <p className="text-sm text-green-100">{scamResult.safe_alternative}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinancialAdvisor;
