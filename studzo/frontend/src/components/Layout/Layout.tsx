import React, { ReactNode, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Zap, Heart, Globe, DollarSign, BookOpen, Shield, Users, BarChart3, LogOut, Menu, Bell, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import GeminiBadge from '../Common/GeminiBadge';

interface LayoutProps {
    children: ReactNode;
}

const SidebarItem = ({ icon: Icon, label, path, active = false }: { icon: any, label: string, path: string, active?: boolean }) => (
    <Link to={path}>
        <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 text-white border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Icon size={20} className={active ? 'text-brand-primary' : ''} />
            <span className="font-medium">{label}</span>
        </div>
    </Link>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const [notifications, setNotifications] = useState<{ id: number, message: string, type: string }[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showToast, setShowToast] = useState<{ message: string, type: string } | null>(null);
    const [userId] = useState(1); // Hardcoded for demo

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/api/v1/ai/notifications/${userId}`);

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                const newNotif = { id: Date.now(), message: data.message, type: data.type };
                setNotifications(prev => [newNotif, ...prev]);
                setShowToast({ message: data.message, type: data.type });

                // Hide toast after 3s
                setTimeout(() => setShowToast(null), 5000);
            } catch (e) {
                console.error("Failed to parse notification:", event.data);
            }
        };

        return () => socket.close();
    }, [userId]);

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="flex min-h-screen text-gray-100 font-sans bg-[#0f111a]">
            {/* Glassmorphism Sidebar */}
            <aside className="w-64 fixed h-full glass-panel hidden md:flex flex-col z-20 border-r border-white/5">
                <div className="p-6">
                    <div className="flex items-center space-x-2 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/20">
                            <Zap size={18} className="text-white" fill="currentColor" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">Studzo</h1>
                        <p className="text-xs text-gray-400 mt-1">Home, wherever you study</p>
                    </div>

                    <nav className="space-y-1">
                        <SidebarItem icon={Home} label="Dashboard" path="/dashboard" active={isActive('/dashboard')} />
                        <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Features</div>

                        <SidebarItem icon={Users} label="Hostel & Roommate Finder" path="/roommate-matching" active={isActive('/roommate-matching')} />
                        <SidebarItem icon={Shield} label="Health Insurance" path="/health-insurance" active={isActive('/health-insurance')} />
                        <SidebarItem icon={Globe} label="Cultural Guide" path="/cultural-guidance" active={isActive('/cultural-guidance')} />
                        <SidebarItem icon={DollarSign} label="Financial Aid" path="/financial-guidance" active={isActive('/financial-guidance')} />
                        <SidebarItem icon={Users} label="Community Finder" path="/community" active={isActive('/community')} />
                        <SidebarItem icon={Shield} label="Job Finder" path="/job-finder" active={isActive('/job-finder')} />
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-white/5 space-y-3">
                    <Link to="/profile">
                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 flex items-center justify-center text-sm font-bold">
                                D
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium">Demo User</div>
                                <div className="text-xs text-gray-400">View Profile</div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/settings" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-400 hover:text-white">
                        <BarChart3 size={16} />
                        Settings
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 relative min-h-screen bg-gradient-to-br from-[#0f111a] via-[#131620] to-[#0f111a]">

                {/* Desktop Notification Bell (Absolute) */}
                <div className="hidden md:flex absolute top-6 right-8 z-30">
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
                        >
                            <Bell size={24} className="text-gray-300" />
                            {notifications.length > 0 && (
                                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0f111a]"></span>
                            )}
                        </button>

                        <AnimatePresence>
                            {showNotifications && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 mt-2 w-80 glass-panel rounded-xl shadow-2xl border border-white/10 overflow-hidden"
                                >
                                    <div className="p-3 border-b border-white/10 flex justify-between items-center bg-white/5">
                                        <h3 className="font-semibold text-sm">Notifications</h3>
                                        <button onClick={() => setNotifications([])} className="text-xs text-brand-primary hover:underline">Clear all</button>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="p-4 text-center text-gray-500 text-sm">No new notifications</div>
                                        ) : (
                                            notifications.map(n => (
                                                <div key={n.id} className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                                                    <p className="text-sm text-gray-200">{n.message}</p>
                                                    <span className="text-[10px] text-gray-500 uppercase mt-1 block">{n.type}</span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Header */}
                <header className="md:hidden glass-panel p-4 flex items-center justify-between sticky top-0 z-30 border-b border-white/10">
                    <div className="flex flex-col">
                        <span className="font-bold">Studzo</span>
                        <span className="text-xs text-gray-400">Home, wherever you study</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative"
                        >
                            <Bell size={24} className="text-gray-400" />
                            {notifications.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                        </button>
                        <Menu className="text-gray-400" />
                    </div>
                </header>

                {/* Mobile Notifications Dropdown (Simple) */}
                {showNotifications && (
                    <div className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-[#1a1d2d] w-full max-w-sm rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                            <div className="p-4 border-b border-white/10 flex justify-between items-center">
                                <h3 className="font-bold">Notifications</h3>
                                <button onClick={() => setShowNotifications(false)}><X size={20} /></button>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">No new notifications</div>
                                ) : (
                                    notifications.map(n => (
                                        <div key={n.id} className="p-4 border-b border-white/5">
                                            <p className="text-sm text-gray-200">{n.message}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-7xl mx-auto p-6 lg:p-8 relative z-0">
                    {children}
                </div>

                {/* Toast Notification */}
                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, x: '-50%' }}
                            animate={{ opacity: 1, y: 0, x: '-50%' }}
                            exit={{ opacity: 0, y: 20, x: '-50%' }}
                            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-full glass-panel border border-brand-primary/30 shadow-[0_0_30px_rgba(var(--brand-primary-rgb),0.3)]"
                        >
                            <span className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium text-white">{showToast.message}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <GeminiBadge />
            </main>
        </div>
    );
};

export default Layout;
