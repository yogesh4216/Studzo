import React from 'react';
import Layout from '../components/Layout/Layout';
import CulturalGuideComponent from '../components/Cultural/CulturalGuide';

const CulturalGuidance = () => {
    return (
        <Layout>
            <div className="space-y-6">
                <header>
                    <h1 className="text-3xl font-bold heading-gradient mb-2">Cultural Guide</h1>
                    <p className="text-gray-400">Navigate new cultures, understand local norms, and feel at home anywhere.</p>
                </header>

                <div className="bg-dark-card rounded-2xl p-6 border border-white/5 shadow-xl h-[calc(100vh-200px)]">
                    <CulturalGuideComponent />
                </div>
            </div>
        </Layout>
    );
};

export default CulturalGuidance;
