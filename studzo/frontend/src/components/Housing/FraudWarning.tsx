import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiService } from '../../services/ai';

const FraudWarning: React.FC = () => {
    const [listingText, setListingText] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAnalyze = async () => {
        if (!listingText.trim()) return;

        setLoading(true);
        try {
            // Call API
            const data = await aiService.analyzeHousing({ description: listingText });

            // Navigate to results page with data
            navigate('/fraud-detection/result', { state: data });

        } catch (error) {
            console.error(error);
            alert('Failed to analyze. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col justify-center">
            <div className="space-y-6">
                <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold text-white">Check a Listing</h3>
                    <p className="text-gray-400 text-sm">Paste the description or details below.</p>
                </div>

                <textarea
                    className="input-field min-h-[150px] w-full bg-black/20 border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500 transition-all"
                    rows={6}
                    placeholder="e.g. 'Luxury apartment in city center, only $500/month...'"
                    value={listingText}
                    onChange={(e) => setListingText(e.target.value)}
                />

                <button
                    onClick={handleAnalyze}
                    disabled={loading || !listingText.trim()}
                    className={`btn-primary w-full py-4 text-lg font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                            Analyzing...
                        </span>
                    ) : (
                        'Analyze for Fraud'
                    )}
                </button>
            </div>
        </div>
    );
};

export default FraudWarning;
