import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

import RoommateMatching from './pages/RoommateMatching';
import HealthInsurance from './pages/HealthInsurance';
import CulturalGuidance from './pages/CulturalGuidance';
import FinancialGuidance from './pages/FinancialGuidance';
import Community from './pages/Community';


import RoommateMatchesResults from './pages/results/RoommateMatchesResults';
import HealthInsuranceResults from './pages/results/HealthInsuranceResults';
import JobFinder from './pages/JobFinder';
import CulturalGuidanceResults from './pages/results/CulturalGuidanceResults';

const Home = () => <div className="p-4"><h1>Welcome to Studzo</h1><p className="text-gray-400">Home, wherever you study</p><br /><a href="/dashboard" className="text-blue-600 underline">Go to Dashboard</a></div>;

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />

                    <Route path="/roommate-matching" element={<RoommateMatching />} />
                    <Route path="/roommate-matching/result" element={<RoommateMatchesResults />} />
                    <Route path="/job-finder" element={<JobFinder />} />
                    <Route path="/health-insurance" element={<HealthInsurance />} />
                    <Route path="/health-insurance/result" element={<HealthInsuranceResults />} />

                    <Route path="/cultural-guidance" element={<CulturalGuidance />} />
                    <Route path="/cultural-guidance/result" element={<CulturalGuidanceResults />} />

                    <Route path="/financial-guidance" element={<FinancialGuidance />} />
                    <Route path="/community" element={<Community />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
