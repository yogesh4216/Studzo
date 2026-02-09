import React from 'react';
import Layout from '../components/Layout/Layout';

const Home = () => {
    return (
        <Layout>
            <div className="px-4 py-6 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                    <p className="text-gray-500 text-xl">Dashboard Home</p>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
