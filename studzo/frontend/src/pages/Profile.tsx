import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { User, Mail, GraduationCap, MapPin, Phone, Calendar, Edit2, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: 'Demo User',
        email: 'demo@studzo.com',
        university: 'Stanford University',
        phone: '+1 (555) 123-4567',
        location: 'California, USA',
        joinDate: 'January 2026',
        bio: 'International student passionate about technology and cultural exchange.'
    });

    const [editedUser, setEditedUser] = useState(user);

    useEffect(() => {
        const storedUser = localStorage.getItem('studzo_user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser({ ...user, ...userData });
            setEditedUser({ ...user, ...userData });
        }
    }, []);

    const handleSave = () => {
        setUser(editedUser);
        localStorage.setItem('studzo_user', JSON.stringify(editedUser));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedUser(user);
        setIsEditing(false);
    };

    return (
        <Layout>
            <div className="space-y-6">
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold heading-gradient mb-2">My Profile</h1>
                        <p className="text-gray-400">Manage your personal information</p>
                    </div>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-lg hover:shadow-brand-primary/50 transition-all font-semibold"
                        >
                            <Edit2 size={20} />
                            Edit Profile
                        </button>
                    )}
                </header>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="md:col-span-1">
                        <div className="bg-dark-card rounded-2xl p-6 border border-white/5 shadow-xl">
                            <div className="text-center">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary mx-auto mb-4 flex items-center justify-center text-5xl font-bold">
                                    {(isEditing ? editedUser.name : user.name).charAt(0).toUpperCase()}
                                </div>
                                <h2 className="text-2xl font-bold mb-1">{isEditing ? editedUser.name : user.name}</h2>
                                <p className="text-gray-400 text-sm mb-4">{isEditing ? editedUser.email : user.email}</p>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-medium">
                                    <Calendar size={16} />
                                    Joined {user.joinDate}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Card */}
                    <div className="md:col-span-2">
                        <div className="bg-dark-card rounded-2xl p-6 border border-white/5 shadow-xl">
                            <h3 className="text-xl font-bold mb-6">Personal Information</h3>

                            <div className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                                        <User size={16} />
                                        Full Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedUser.name}
                                            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary transition-colors text-white"
                                        />
                                    ) : (
                                        <p className="text-lg">{user.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                                        <Mail size={16} />
                                        Email Address
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editedUser.email}
                                            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary transition-colors text-white"
                                        />
                                    ) : (
                                        <p className="text-lg">{user.email}</p>
                                    )}
                                </div>

                                {/* University */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                                        <GraduationCap size={16} />
                                        University
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedUser.university}
                                            onChange={(e) => setEditedUser({ ...editedUser, university: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary transition-colors text-white"
                                        />
                                    ) : (
                                        <p className="text-lg">{user.university}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                                        <Phone size={16} />
                                        Phone Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={editedUser.phone}
                                            onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary transition-colors text-white"
                                        />
                                    ) : (
                                        <p className="text-lg">{user.phone}</p>
                                    )}
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                                        <MapPin size={16} />
                                        Location
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedUser.location}
                                            onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary transition-colors text-white"
                                        />
                                    ) : (
                                        <p className="text-lg">{user.location}</p>
                                    )}
                                </div>

                                {/* Bio */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                                        About Me
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            value={editedUser.bio}
                                            onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary transition-colors text-white resize-none"
                                        />
                                    ) : (
                                        <p className="text-gray-400">{user.bio}</p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <AnimatePresence>
                                    {isEditing && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex gap-4 pt-4"
                                        >
                                            <button
                                                onClick={handleSave}
                                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-lg hover:shadow-brand-primary/50 transition-all font-semibold"
                                            >
                                                <Save size={20} />
                                                Save Changes
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-semibold"
                                            >
                                                <X size={20} />
                                                Cancel
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
