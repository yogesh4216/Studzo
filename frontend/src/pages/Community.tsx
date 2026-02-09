import React from 'react';
import Layout from '../components/Layout/Layout';
import CommunityHub from '../components/Community/CommunityHub';


const Community = () => {
    return (
        <Layout>
            <div className="h-[calc(100vh-140px)] flex flex-col space-y-4">
                <header className="flex-shrink-0">
                    <h1 className="text-3xl font-bold heading-gradient mb-1">Community Hub</h1>
                    <p className="text-gray-400 text-sm">Discover communities, events, and peers powered by Gemini AI.</p>
                </header>

                <div className="flex-1 min-h-0">
                    <CommunityHub />
                </div>
            </div>
        </Layout>
    );
};

export default Community;
