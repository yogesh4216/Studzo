import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Settings as SettingsIcon, User, Lock, Bell, Shield, Moon, Globe, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Settings = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [twoFactor, setTwoFactor] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('studzo_user');
        navigate('/login');
    };

    const settingsSections = [
        {
            title: 'Account Settings',
            icon: User,
            items: [
                {
                    label: 'Email & Password',
                    description: 'Update your email and password',
                    action: () => { }
                },
                {
                    label: 'Two-Factor Authentication',
                    description: 'Add an extra layer of security',
                    toggle: { value: twoFactor, onChange: setTwoFactor }
                }
            ]
        },
        {
            title: 'Preferences',
            icon: SettingsIcon,
            items: [
                {
                    label: 'Notifications',
                    description: 'Manage your notification preferences',
                    toggle: { value: notifications, onChange: setNotifications }
                },
                {
                    label: 'Dark Mode',
                    description: 'Switch between light and dark theme',
                    toggle: { value: darkMode, onChange: setDarkMode }
                },
                {
                    label: 'Language',
                    description: 'English (US)',
                    action: () => { }
                }
            ]
        },
        {
            title: 'Privacy & Security',
            icon: Shield,
            items: [
                {
                    label: 'Privacy Settings',
                    description: 'Control who can see your information',
                    action: () => { }
                },
                {
                    label: 'Data & Privacy',
                    description: 'Manage your data and download options',
                    action: () => { }
                }
            ]
        }
    ];

    return (
        <Layout>
            <div className="space-y-6">
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold heading-gradient mb-2">Settings</h1>
                        <p className="text-gray-400">Manage your account and preferences</p>
                    </div>
                </header>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Settings */}
                    <div className="lg:col-span-2 space-y-6">
                        {settingsSections.map((section, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-dark-card rounded-2xl p-6 border border-white/5 shadow-xl"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center">
                                        <section.icon size={20} className="text-brand-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold">{section.title}</h2>
                                </div>

                                <div className="space-y-4">
                                    {section.items.map((item, itemIdx) => (
                                        <div
                                            key={itemIdx}
                                            className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                                            onClick={item.action}
                                        >
                                            <div>
                                                <h3 className="font-semibold">{item.label}</h3>
                                                <p className="text-sm text-gray-400">{item.description}</p>
                                            </div>
                                            {item.toggle ? (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        item.toggle.onChange(!item.toggle.value);
                                                    }}
                                                    className={`relative w-14 h-7 rounded-full transition-colors ${item.toggle.value ? 'bg-gradient-to-r from-brand-primary to-brand-secondary' : 'bg-gray-600'
                                                        }`}
                                                >
                                                    <span
                                                        className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-all ${item.toggle.value ? 'right-1' : 'left-1'
                                                            }`}
                                                    />
                                                </button>
                                            ) : (
                                                <span className="text-gray-400">→</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Demo Credentials */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-dark-card rounded-2xl p-6 border border-white/5 shadow-xl"
                        >
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <Lock size={18} className="text-brand-primary" />
                                Demo Account
                            </h3>
                            <div className="space-y-3">
                                <div className="p-3 rounded-xl bg-brand-primary/10 border border-brand-primary/20">
                                    <p className="text-xs text-gray-400 mb-1">Email</p>
                                    <p className="text-sm font-mono">demo@studzo.com</p>
                                </div>
                                <div className="p-3 rounded-xl bg-brand-primary/10 border border-brand-primary/20">
                                    <p className="text-xs text-gray-400 mb-1">Password</p>
                                    <p className="text-sm font-mono">demo123</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Logout */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-dark-card rounded-2xl p-6 border border-white/5 shadow-xl"
                        >
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all font-semibold"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        </motion.div>

                        {/* Help */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-dark-card rounded-2xl p-6 border border-white/5 shadow-xl"
                        >
                            <h3 className="font-bold mb-4">Need Help?</h3>
                            <div className="space-y-2">
                                <a href="#" className="block text-sm text-gray-400 hover:text-brand-primary transition-colors">
                                    Help Center
                                </a>
                                <a href="#" className="block text-sm text-gray-400 hover:text-brand-primary transition-colors">
                                    Contact Support
                                </a>
                                <a href="#" className="block text-sm text-gray-400 hover:text-brand-primary transition-colors">
                                    Terms of Service
                                </a>
                                <a href="#" className="block text-sm text-gray-400 hover:text-brand-primary transition-colors">
                                    Privacy Policy
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Settings;
