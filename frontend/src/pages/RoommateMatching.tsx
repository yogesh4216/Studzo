import React from 'react';
import Layout from '../components/Layout/Layout';
import RoommateMatchingComponent from '../components/Matching/RoommateMatching';

const RoommateMatching = () => {
    return (
        <Layout>
            <div className="space-y-6">
                <header>
                    <h1 className="text-3xl font-bold heading-gradient mb-2">Hostel & Roommate Finder</h1>
                    <p className="text-gray-400">Find compatible roommates and verified hostel listings.</p>
                </header>

                <div className="bg-dark-card rounded-2xl p-6 border border-white/5 shadow-xl">
                    <RoommateMatchingComponent />
                </div>
            </div>
        </Layout>
    );
};

export default RoommateMatching;
