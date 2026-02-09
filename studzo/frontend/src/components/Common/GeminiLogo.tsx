import React from 'react';

const GeminiLogo = ({ size = 16 }: { size?: number }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gemini-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B6B" />
                    <stop offset="50%" stopColor="#9D4EDD" />
                </linearGradient>
                <linearGradient id="gemini-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4ECDC4" />
                    <stop offset="100%" stopColor="#45B7D1" />
                </linearGradient>
                <linearGradient id="gemini-gradient-3" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#F7B731" />
                    <stop offset="50%" stopColor="#5F9EA0" />
                </linearGradient>
            </defs>
            {/* Four-pointed star shape */}
            <path
                d="M12 2 C12 2, 15 8, 22 12 C15 16, 12 22, 12 22 C12 22, 9 16, 2 12 C9 8, 12 2, 12 2Z"
                fill="url(#gemini-gradient-1)"
                opacity="0.9"
            />
            <path
                d="M12 4 C12 4, 14 9, 20 12 C14 15, 12 20, 12 20 C12 20, 10 15, 4 12 C10 9, 12 4, 12 4Z"
                fill="url(#gemini-gradient-2)"
                opacity="0.8"
            />
            <path
                d="M12 6 C12 6, 13 10, 18 12 C13 14, 12 18, 12 18 C12 18, 11 14, 6 12 C11 10, 12 6, 12 6Z"
                fill="url(#gemini-gradient-3)"
                opacity="0.7"
            />
        </svg>
    );
};

export default GeminiLogo;
