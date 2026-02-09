import React from 'react';
import Layout from '../components/Layout/Layout';
import { Shield, Users, Heart, Globe, DollarSign, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, icon: Icon, path, color }: any) => (
    <Link to={path}>
        <div className="glass-card p-6 flex flex-col items-center text-center space-y-4 hover:scale-105 transition-transform cursor-pointer group relative overflow-hidden">
            <div className={`absolute inset-0 bg-${color}-500/10 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            <div className={`w-16 h-16 rounded-full bg-${color}-500/20 flex items-center justify-center`}>
                <Icon size={32} className={`text-${color}-400`} />
            </div>
            <h3 className="font-bold text-lg text-white">{title}</h3>
            <p className="text-sm text-gray-400">Click to access</p>
        </div>
    </Link>
);

const Dashboard: React.FC = () => {
    return (
        <Layout>
            <div className="space-y-8">
                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-bold heading-gradient mb-1">Dashboard</h1>
                    <p className="text-gray-400">Welcome back! Here's your personalized overview.</p>
                </div>

                {/* Quick Access Grid */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-4">Quick Access</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        <FeatureCard title="Roommate Match" icon={Users} path="/roommate-matching" color="yellow" />
                        <FeatureCard title="Health Insurance" icon={Shield} path="/health-insurance" color="teal" />
                        <FeatureCard title="Cultural Guide" icon={Globe} path="/cultural-guidance" color="teal" />
                        <FeatureCard title="Financial Aid" icon={DollarSign} path="/financial-guidance" color="green" />
                        <FeatureCard title="Community Finder" icon={Users} path="/community" color="orange" />
                        <FeatureCard title="Job Finder" icon={Shield} path="/job-finder" color="purple" />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
