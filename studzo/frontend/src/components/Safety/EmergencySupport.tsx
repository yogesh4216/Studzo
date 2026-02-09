import React, { useState } from 'react';
import { aiService } from '../../services/ai';

const EmergencySupport: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleEmergency = async () => {
        setLoading(true);
        try {
            const data = await aiService.getEmergencySupport(inputText);
            const parsed = JSON.parse(data.raw_response.replace(/```json/g, '').replace(/```/g, ''));
            setResult(parsed);
        } catch (error) {
            console.error(error);
            alert('Connection failed. Please call 911 immediately if in danger.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 animate-pulse z-50 font-bold border-4 border-red-500/30 flex items-center gap-2"
            >
                🆘 <span className="hidden md:inline">Emergency Help</span>
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-panel w-full max-w-lg p-6 rounded-2xl border-2 border-red-500/50 shadow-2xl shadow-red-900/50">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
                        🆘 Emergency Assistance
                    </h2>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">✕</button>
                </div>

                {!result ? (
                    <div className="space-y-5">
                        <p className="font-medium text-gray-200">Are you in immediate danger? Describe your situation.</p>
                        <textarea
                            placeholder="e.g., 'I feel unsafe walking home', 'Medical emergency', 'Panic attack'..."
                            className="input-field text-lg min-h-[120px] border-red-500/30 focus:border-red-500"
                            rows={3}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={handleEmergency}
                                disabled={loading || !inputText}
                                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-xl hover:opacity-90 font-bold text-lg shadow-lg shadow-red-600/20"
                            >
                                {loading ? 'Analyzing...' : 'GET ADVICE'}
                            </button>
                            <a href="tel:911" className="bg-white/10 text-white px-4 py-3 rounded-xl text-center flex items-center justify-center font-bold hover:bg-white/20 border border-white/5 transition-colors">
                                Call 911 / 112
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 animate-fade-in">
                        <div className={`p-5 rounded-xl text-center border ${result.severity === 'CRITICAL' ? 'bg-red-500/20 border-red-500 text-white' : 'bg-yellow-500/20 border-yellow-500 text-yellow-100'
                            }`}>
                            <h3 className="text-2xl font-bold tracking-wide">{result.severity} ALERT</h3>
                            <p className="text-lg mt-2 font-medium">{result.message_to_user}</p>
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <h4 className="font-bold text-gray-200 mb-2">📢 Action Plan:</h4>
                            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{result.action_plan}</p>
                        </div>

                        {result.emergency_contacts?.length > 0 && (
                            <div>
                                <h4 className="font-bold text-gray-200 mb-3">📞 Important Contacts:</h4>
                                <ul className="space-y-2">
                                    {result.emergency_contacts.map((c: any, i: number) => (
                                        <li key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                                            <span className="text-gray-300">{c.name}</span>
                                            <a href={`tel:${c.number}`} className="font-bold text-blue-400 hover:text-blue-300">{c.number}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            onClick={() => setResult(null)}
                            className="w-full py-2 text-gray-500 hover:text-white transition-colors text-sm"
                        >
                            Reset Assessment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmergencySupport;
