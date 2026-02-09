MOCK_HEALTH_INSURANCE_RESP = {
    "summary": "This is a standard PPO plan.",
    "coverage_details": [
        {"category": "Preventive Care", "status": "Covered 100%", "notes": "No copay required."},
        {"category": "Emergency Room", "status": "Covered 80%", "notes": "After deductible."}
    ],
    "recommendation": "Good plan for general health.",
    "tips": "Ensure you stay in-network to avoid high costs."
}

MOCK_HOUSING_RESP = {
    "fraud_risk_score": 85,
    "red_flags": ["Price significantly below market", "Suspicious payment request (Western Union)", "Landlord unable to show property"],
    "warnings": "This listing exhibits classic signs of a rental scam.",
    "recommendation": "avoid",
    "confidence": 95
}

MOCK_ROOMMATE_RESP = [
    {
        "candidate_id": 1,
        "candidate_name": "Alex Chen",
        "candidate_age": 22,
        "candidate_major": "Computer Science",
        "candidate_year": "Junior",
        "compatibility_score": 92,
        "match_tier": "Perfect",
        "strengths": ["Shared sleep schedule (night owl)", "Both value cleanliness", "Similar social habits"],
        "potential_conflicts": ["None detected"],
        "recommendation": "excellent",
        "tips": "Great match! Discuss guest policies early.",
        "conversation_starters": ["Ask about favorite tech stack", "Discuss study music preferences", "Talk about weekend routines"],
        "why_it_works": "Both are quiet, studious CS majors who prefer organized living spaces."
    },
    {
        "candidate_id": 2,
        "candidate_name": "Jordan Patel",
        "candidate_age": 21,
        "candidate_major": "Biology",
        "candidate_year": "Sophomore",
        "compatibility_score": 75,
        "match_tier": "Good",
        "strengths": ["Similar interests in outdoor activities", "Both non-smokers", "Compatible budgets"],
        "potential_conflicts": ["Different noise tolerance (you prefer quiet, they enjoy music)"],
        "recommendation": "good",
        "tips": "Establish quiet hours and headphone policy upfront.",
        "conversation_starters": ["Discuss hiking trails nearby", "Talk about meal sharing arrangements", "Set boundaries for guests"],
        "why_it_works": "Shared outdoor interests create common ground despite study habit differences."
    }
]


MOCK_MENTAL_HEALTH_RESP = {
    "validation": "It sounds like you're feeling overwhelmed, which is completely normal during this transition.",
    "root_cause": "Adjustment to new academic pressure and cultural isolation.",
    "coping_strategies": ["Take short walks", "Practice 4-7-8 breathing", "Connect with student union"],
    "community_activities": ["International student coffee hour", "Campus yoga club"],
    "professional_help_advice": "Consider visiting the campus counseling center if feelings persist.",
    "crisis_resources": ["Campus Emergency: 555-0199"],
    "success_story": "Maria felt similar in her first month but found her circle through the hiking club.",
    "next_steps": "Try one social activity this week.",
    "risk_level": "medium"
}

MOCK_CULTURAL_RESP = {
    "key_differences": ["Direct communication style", "Dinner time is earlier (6 PM)"],
    "social_norms": ["Tipping 15-20% is expected", "Personal space is valued"],
    "culture_shock_warning": "You might find the pace of life faster/slower than home.",
    "friendship_advice": "Join clubs based on interests, not just nationality.",
    "food_lifestyle_tips": "Grocery stores close earlier on Sundays.",
    "maintaining_culture": "Cook your favorite meal for new friends.",
    "specific_country_tips": "Get a local transit card immediately.",
    "community_resources": ["International Student Office", "Local Cultural Center"],
    "misconceptions": ["Everyone is rich", "Food is always unhealthy"],
    "encouragement": "You will adapt quickly!"
}

MOCK_CULTURAL_EVENTS_RESP = {
    "events": [
        {
            "title": "Diwali Festival of Lights",
            "date": "Upcoming this weekend",
            "type": "festival",
            "description": "Grand celebration with fireworks, sweets, and music.",
            "location": "City Square Park",
            "cultural_significance": "Victory of light over darkness.",
            "attendees": "Open to all, very family-friendly.",
            "dress_code": "Traditional Indian wear or smart casual.",
            "trust_badge": "Registered Association"
        },
        {
            "title": "Monthly International Potluck",
            "date": "Next Friday",
            "type": "meetup",
            "description": "Bring a dish from your home country and meet other students.",
            "location": "Student Union Hall",
            "cultural_significance": "Community building and food sharing.",
            "attendees": "Students and faculty.",
            "dress_code": "Casual.",
            "trust_badge": "University Group"
        }
    ],
    "community_summary": "The Indian community is highly active with monthly events.",
    "active_groups": ["Indian Student Association", "Global Friends Network"]
}

MOCK_HOSTEL_RESP = {
    "results": [
        {
            "id": 1,
            "name": "Scholars Inn - University Circle",
            "price": "$650/mo",
            "distance": "5 mins walk",
            "type": "Shared Room",
            "facilities": ["Wifi", "Study Lounge", "Gym"],
            "best_for": "Freshers",
            "pros": ["Walking distance to class", "Weekly cleaning included"],
            "cons": ["Small rooms", "Strict quiet hours"],
            "verified": True,
            "coordinates": { "lat": 40.7128, "lng": -74.0060 }
        },
        {
            "id": 2,
            "name": "Co-Living Heights",
            "price": "$500/mo",
            "distance": "15 mins bus",
            "type": "Private Room",
            "facilities": ["Wifi", "Kitchen", "Rooftop"],
            "best_for": "Social Butterflies",
            "pros": ["Social events", "Modern amenities"],
            "cons": ["Farther from campus", "Noisy weekends"],
            "verified": False,
            "coordinates": { "lat": 40.7150, "lng": -74.0100 }
        }
    ],
    "search_summary": "Found 2 hostels near campus matching your criteria."
}

MOCK_LEASE_RESP = {
    "summary": "This is a standard 12-month lease agreement. It appears mostly fair but has a strict guest policy.",
    "key_terms": [
        {"term": "Rent", "explanation": "$800 per month, due on the 1st."},
        {"term": "Security Deposit", "explanation": "One month's rent ($800), refundable upon move-out."},
        {"term": "Lease Term", "explanation": "Fixed for 12 months, no early termination without penalty."}
    ],
    "red_flags": ["Clause 14: 'Landlord may enter at any time' (Illegal in most states)"],
    "rating": "Caution",
    "recommendation": "Ask to modify Clause 14 to require 24-hour notice before entry."
}

MOCK_COMMUNITY_RESP = {
    "results": [
        {
            "id": 101,
            "name": "Global Tech Students",
            "category": "Academic",
            "members": 450,
            "best_for": "CS & Engineering Majors",
            "description": "A community for international tech students to share coding tips, hackathon teams, and career advice.",
            "relevance_score": 98,
            "why_recommended": "Perfect match for your Computer Science major.",
            "tags": ["#Coding", "#Hackathons", "#CareerPrep"],
            "safety_note": "Student-Led, Faculty Advisor"
        },
        {
            "id": 102,
            "name": "Desi Foodies & Explorers",
            "category": "Social",
            "members": 1200,
            "best_for": "Food Lovers",
            "description": "We explore the best local restaurants and cook authentic meals together on weekends.",
            "relevance_score": 85,
            "why_recommended": "Matches your interest in 'Cooking'.",
            "tags": ["#Food", "#Social", "#WeekendVibes"],
            "safety_note": "Public Group"
        }
    ],
    "analysis_summary": "Found 2 active communities based on your profile."
}

MOCK_ASK_COMMUNITY_RESP = {
    "answer": "Yes, this group is extremely active! They host weekly coding challenges on Thursdays and a monthly networking mixer with alumni.",
    "confidence": "High",
    "related_topics": ["Coding Challenges", "Alumni Networking"]
}

MOCK_JOB_RESP = {
    "results": [
        {
            "id": 201,
            "title": "Campus Library Assistant",
            "employer": "University Library",
            "rate": "$16/hr",
            "hours": "10-15 hrs/week",
            "visa_status": "Safe",
            "visa_reason": "On-campus employment is permitted for F-1 students (limit 20hrs).",
            "commute": "On Campus (5 min walk)",
            "match_score": 95,
            "why_recommended": "Quiet environment, fits your study schedule.",
            "shift": "Evenings/Weekends",
            "tags": ["#OnCampus", "#Admin", "#Quiet"]
        },
        {
            "id": 202,
            "title": "Department Research Aide",
            "employer": "CS Department",
            "rate": "$18/hr",
            "hours": "10 hrs/week",
            "visa_status": "Safe",
            "visa_reason": "On-campus academic role.",
            "commute": "On Campus (Engineering Building)",
            "match_score": 90,
            "why_recommended": "Great for your resume and networking with professors.",
            "shift": "Flexible",
            "tags": ["#Research", "#Academic", "#ResumeBooster"]
        }
    ],
    "summary": "Found 2 on-campus jobs that fit your F-1 visa restrictions."
}

MOCK_JOB_SCAM_RESP = {
    "risk_level": "High",
    "red_flags": [
        "Unrealistic Pay: $500/hr for 'easy data entry'",
        "Suspicious Contact: Uses a generic Gmail address instead of a company domain",
        "Urgency: 'Act now' language often signals a scam"
    ],
    "safety_score": 10,
    "verdict": "Likely a Scam",
    "explanation": "This job offer exhibits multiple classic scam indicators. Legitimate employers rarely use personal emails for hiring or offer such high pay for unskilled tasks.",
}
MOCK_FINANCIAL_GUIDANCE_RESP = {
    "cost_saving_tips": ["Buy used textbooks from seniors", "Cook at home instead of dining out", "Use university shuttle instead of Uber"],
    "work_options": ["On-campus library assistant", "Research assistant positions", "Cafeteria shifts"],
    "scholarships": ["International Student Merit Award", "Departmental Grants"],
    "budget_plan": "allocate 50% for needs, 30% for wants, 20% for savings.",
    "emergency_fund_advice": "Start saving $50/month immediately.",
    "money_transfer_tips": "Use services like Wise or Remitly for better rates than banks.",
    "credit_building": "Get a secured credit card to start building history.",
    "banking_guide": {"account_type": "Student Checking", "documents": ["Passport", "I-20", "Proof of address"], "fees_warning": "Avoid overdraft fees by opting out."},
    "tax_work_rules": {"work_limit": "20 hours/week on-campus", "tax_basics": "File Form 8843 every year.", "violation_consequences": "Visa termination."},
    "month_by_month_plan": [{"month": 1, "focus": "Setup bank account", "budget_target": "$1000"}, {"month": 2, "focus": "Track spending", "budget_target": "$900"}],
    "daily_literacy_tip": "Track every small expense this week."
}

MOCK_FINANCIAL_RISK_RESP = {
    "risk_level": "High",
    "scam_type": "Payment Fraud",
    "red_flags": ["Request for payment via gift cards", "Urgent language", "Sender address looks suspicious"],
    "analysis": "This is a classic gift card scam. No legitimate business asks for payment in gift cards.",
    "safe_alternative": "Contact the official support number independently."
}

MOCK_COMMUNITY_RECOMMENDATION_RESP = {
    "loneliness_root_cause": "Moving to a new country often leads to isolation due to language barriers and lack of social network.",
    "recommended_activities": ["Join a student club", "Volunteer for campus events", "Attend cultural mixers"],
    "clubs_to_join": ["International Student Association", "Photography Club"],
    "events_this_week": ["Global Coffee Hour", "Campus Movie Night"],
    "expected_impact": "Building a support network will reduce feelings of isolation."
}

MOCK_EMERGENCY_RESP = {
    "severity": "MEDIUM",
    "action_plan": "1. Stay calm. 2. Contact campus security if on campus. 3. Call the provided helpline.",
    "emergency_contacts": [
        {"name": "Campus Security", "number": "555-0199", "description": "24/7 Patrol"},
        {"name": "Student Counseling", "number": "555-0200", "description": "Mental health support"}
    ],
    "message_to_user": "We are here for you. Please reach out to the contacts provided.",
    "is_life_threatening": False
}
