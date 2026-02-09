import React from 'react';

const GeminiBadge = () => {
    return (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-white/10 shadow-lg bg-black/40 backdrop-blur-md">
            <span className="text-xs font-semibold text-gray-300">
                Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Gemini</span>
            </span>
        </div>
    );
};

export default GeminiBadge;
