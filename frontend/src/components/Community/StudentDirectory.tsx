import React, { useState, useMemo } from 'react';
import { Search, MapPin, BookOpen, GraduationCap, Globe, Filter, User, Gamepad2, Heart, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface StudentProfile {
    id: string;
    name: string;
    avatar: string;
    country_of_origin: string;
    current_city: string;
    university: string;
    major: string;
    intake_year: number;
    languages: string[];
    interests: string[]; // technology, sports, music, etc.
    arrival_status: 'Not Arrived' | 'Recently Arrived' | 'Settled';
    visa_type?: 'F-1' | 'J-1' | 'H-1B' | 'Other';
    bio: string;
    is_online?: boolean;
}

// --- Mock Data ---
const MOCK_STUDENTS: StudentProfile[] = [
    {
        id: '1',
        name: 'Aarav Patel',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav',
        country_of_origin: 'India',
        current_city: 'Boston, MA',
        university: 'Northeastern University',
        major: 'Computer Science',
        intake_year: 2024,
        languages: ['English', 'Hindi', 'Gujarati'],
        interests: ['Technology', 'Cricket', 'Coding'],
        arrival_status: 'Recently Arrived',
        visa_type: 'F-1',
        bio: 'Looking for study groups and cricket buddies!',
        is_online: true,
    },
    {
        id: '2',
        name: 'Li Wei',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Li',
        country_of_origin: 'China',
        current_city: 'New York, NY',
        university: 'NYU',
        major: 'Data Science',
        intake_year: 2023,
        languages: ['English', 'Mandarin'],
        interests: ['Research', 'Music', 'Photography'],
        arrival_status: 'Settled',
        visa_type: 'F-1',
        bio: 'Love exploring NYC cafes and jazz clubs.',
    },
    {
        id: '3',
        name: 'Elena Rodriguez',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
        country_of_origin: 'Spain',
        current_city: 'Boston, MA',
        university: 'Boston University',
        major: 'International Relations',
        intake_year: 2025,
        languages: ['English', 'Spanish', 'French'],
        interests: ['Volunteering', 'Politics', 'Hiking'],
        arrival_status: 'Not Arrived',
        bio: 'Incoming student! excited to meet people beforehand.',
    },
    {
        id: '4',
        name: 'Yuki Tanaka',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki',
        country_of_origin: 'Japan',
        current_city: 'San Francisco, CA',
        university: 'UC Berkeley',
        major: 'Robotics',
        intake_year: 2024,
        languages: ['English', 'Japanese'],
        interests: ['Technology', 'Startups', 'Anime'],
        arrival_status: 'Recently Arrived',
        visa_type: 'J-1',
        bio: 'Building robots and exploring the Bay Area startup scene.',
        is_online: true,
    },
    {
        id: '5',
        name: 'Priya Sharma',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
        country_of_origin: 'India',
        current_city: 'Chicago, IL',
        university: 'UIUC',
        major: 'Electrical Engineering',
        intake_year: 2023,
        languages: ['English', 'Hindi', 'Punjabi'],
        interests: ['Music', 'Dancing', 'Research'],
        arrival_status: 'Settled',
        bio: 'PhD student. Coffee addict.',
    },
    {
        id: '6',
        name: 'Hans Muller',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hans',
        country_of_origin: 'Germany',
        current_city: 'Boston, MA',
        university: 'MIT',
        major: 'Physics',
        intake_year: 2024,
        languages: ['English', 'German'],
        interests: ['Physics', 'Hiking', 'Beer'],
        arrival_status: 'Recently Arrived',
        bio: 'New in town. Lets hike the white mountains!',
    },
    {
        id: '7',
        name: 'Sofia Rossi',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
        country_of_origin: 'Italy',
        current_city: 'New York, NY',
        university: 'Columbia University',
        major: 'Architecture',
        intake_year: 2024,
        languages: ['English', 'Italian'],
        interests: ['Art', 'Design', 'Fashion'],
        arrival_status: 'Recently Arrived',
        bio: 'Passionate about sustainable design.',
    },
    {
        id: '8',
        name: 'Ahmed Hassan',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
        country_of_origin: 'Egypt',
        current_city: 'Los Angeles, CA',
        university: 'UCLA',
        major: 'Film Studies',
        intake_year: 2023,
        languages: ['English', 'Arabic'],
        interests: ['Movies', 'Filmmaking', 'Soccer'],
        arrival_status: 'Settled',
        bio: 'Aspiring director. Lets make a short film!',
    }
];

// --- Components ---

const FilterSection = ({ title, options, selected, onChange }: { title: string, options: string[], selected: string[], onChange: (val: string) => void }) => {
    return (
        <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{title}</h4>
            <div className="flex flex-wrap gap-2">
                {options.map(opt => (
                    <button
                        key={opt}
                        onClick={() => onChange(opt)}
                        className={`text-xs px-3 py-1 rounded-full border transition-all ${selected.includes(opt)
                                ? 'bg-brand-primary text-white border-brand-primary'
                                : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30'
                            }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
};

const StudentDirectory: React.FC = () => {
    // State for filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [selectedUniversities, setSelectedUniversities] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const [showFilters, setShowFilters] = useState(false);

    // Derived Options for Filters
    const countries = Array.from(new Set(MOCK_STUDENTS.map(s => s.country_of_origin))).sort();
    const universities = Array.from(new Set(MOCK_STUDENTS.map(s => s.university))).sort();
    const interests = Array.from(new Set(MOCK_STUDENTS.flatMap(s => s.languages.concat(s.interests)))).sort().slice(0, 10); // Mix of lang and interests for demo
    const statuses = ['Not Arrived', 'Recently Arrived', 'Settled'];

    // Helper to toggle selection
    const toggleSelection = (list: string[], item: string) => {
        return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
    };

    // Filter Logic
    const filteredStudents = useMemo(() => {
        return MOCK_STUDENTS.filter(student => {
            const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.bio.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(student.country_of_origin);
            const matchesUni = selectedUniversities.length === 0 || selectedUniversities.includes(student.university);
            const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(student.arrival_status);
            // Check if any of the student's interests/languages match the selected interests filter
            const matchesInterest = selectedInterests.length === 0 ||
                selectedInterests.some(i => student.interests.includes(i) || student.languages.includes(i));

            return matchesSearch && matchesCountry && matchesUni && matchesStatus && matchesInterest;
        });
    }, [searchQuery, selectedCountries, selectedUniversities, selectedStatus, selectedInterests]);

    return (
        <div className="h-full flex flex-col md:flex-row gap-6 relative">
            {/* Mobile Filter Toggle */}
            <button
                className="md:hidden absolute top-0 right-0 p-2 bg-white/10 rounded-lg z-10"
                onClick={() => setShowFilters(!showFilters)}
            >
                <Filter size={20} />
            </button>

            {/* Filters Sidebar */}
            <AnimatePresence>
                {(showFilters || window.innerWidth >= 768) && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={`w-full md:w-64 flex-shrink-0 bg-dark-card/50 p-4 rounded-xl border border-white/5 h-fit overflow-y-auto max-h-[calc(100vh-150px)] custom-scrollbar ${showFilters ? 'block' : 'hidden md:block'}`}
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Filter size={18} className="text-brand-primary" />
                            <h3 className="font-bold text-lg">Smart Filters</h3>
                        </div>

                        <FilterSection
                            title="Arrival Status"
                            options={statuses}
                            selected={selectedStatus}
                            onChange={(val) => setSelectedStatus(toggleSelection(selectedStatus, val))}
                        />

                        <FilterSection
                            title="Country of Origin"
                            options={countries}
                            selected={selectedCountries}
                            onChange={(val) => setSelectedCountries(toggleSelection(selectedCountries, val))}
                        />

                        <FilterSection
                            title="University"
                            options={universities}
                            selected={selectedUniversities}
                            onChange={(val) => setSelectedUniversities(toggleSelection(selectedUniversities, val))}
                        />

                        <FilterSection
                            title="Interests & Languages"
                            options={interests}
                            selected={selectedInterests}
                            onChange={(val) => setSelectedInterests(toggleSelection(selectedInterests, val))}
                        />

                        <button
                            onClick={() => {
                                setSelectedCountries([]);
                                setSelectedUniversities([]);
                                setSelectedStatus([]);
                                setSelectedInterests([]);
                                setSearchQuery('');
                            }}
                            className="w-full py-2 text-xs text-brand-primary hover:text-white transition-colors border border-brand-primary/30 rounded-lg hover:bg-brand-primary/10"
                        >
                            Reset All Filters
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-0">
                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, major, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-dark-card pl-12 pr-4 py-3 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                    />
                </div>

                {/* Results Grid */}
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filteredStudents.map(student => (
                            <motion.div
                                key={student.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-dark-card p-5 rounded-2xl border border-white/5 hover:border-brand-primary/30 transition-all group relative overflow-hidden"
                            >
                                {/* Status Badge */}
                                <div className={`absolute top-4 right-4 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${student.arrival_status === 'Settled' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        student.arrival_status === 'Recently Arrived' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                            'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                    }`}>
                                    {student.arrival_status}
                                </div>

                                <div className="flex items-start gap-4 mb-4">
                                    <div className="relative">
                                        <img src={student.avatar} alt={student.name} className="w-14 h-14 rounded-full bg-white/5" />
                                        {student.is_online && (
                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#131620] rounded-full"></span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-white group-hover:text-brand-primary transition-colors">{student.name}</h3>
                                        <div className="flex items-center text-xs text-gray-400 gap-1 mt-0.5">
                                            <MapPin size={12} />
                                            <span>{student.current_city}</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-400 gap-1 mt-0.5">
                                            <Globe size={12} />
                                            <span>From {student.country_of_origin}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                        <BookOpen size={16} className="text-brand-secondary" />
                                        <span>{student.major}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                        <GraduationCap size={16} className="text-brand-secondary" />
                                        <span>{student.university} ({student.intake_year})</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {student.languages.slice(0, 2).map((lang, i) => (
                                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/5">
                                            {lang}
                                        </span>
                                    ))}
                                    {student.interests.slice(0, 3).map((int, i) => (
                                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-brand-primary/10 text-brand-primary border border-brand-primary/10">
                                            {int}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-xs text-gray-400 italic line-clamp-2 mb-4">
                                    "{student.bio}"
                                </p>

                                <button className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                                    <MessageCircle size={16} />
                                    Connect
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {filteredStudents.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                            <User size={48} className="mb-4 opacity-20" />
                            <p>No students found matching your filters.</p>
                            <button
                                onClick={() => {
                                    setSelectedCountries([]);
                                    setSelectedUniversities([]);
                                    setSelectedStatus([]);
                                    setSelectedInterests([]);
                                    setSearchQuery('');
                                }}
                                className="mt-2 text-brand-primary hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentDirectory;
