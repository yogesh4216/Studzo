import React from 'react';
import Layout from '../components/Layout/Layout';
import FinancialAdvisorComponent from '../components/Financial/FinancialAdvisor';

const FinancialGuidance = () => {
    return (
        <Layout>
            <div className="space-y-6">
                <header>
                    <h1 className="text-3xl font-bold heading-gradient mb-2">Financial Advisor</h1>
                    <p className="text-gray-400">Smart budgeting, expense tracking, and financial advice for students.</p>
                </header>

                <div className="bg-dark-card rounded-2xl p-6 border border-white/5 shadow-xl h-[calc(100vh-200px)]">
                    <FinancialAdvisorComponent />
                </div>
            </div>
        </Layout>
    );
};

export default FinancialGuidance;
