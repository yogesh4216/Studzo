# Studzo

<div align="center">

**Home, wherever you study**

![Studzo Banner](https://img.shields.io/badge/Powered%20by-Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi&logoColor=white)

</div>

## 🌟 About Studzo

Studzo is an AI-powered platform helping international students navigate the complexities of studying abroad. From finding compatible roommates and affordable housing to understanding cultural norms, accessing financial resources, and discovering job opportunities—Studzo brings everything students need into one seamless experience.

**AI platform for international students: housing, roommates, culture guides, financial aid, and job opportunities in one seamless experience.**

## ✨ Key Features

- 🏠 **Hostel & Roommate Finder** - AI-powered compatibility matching with detailed personality scores
- 🏥 **Health Insurance** - Personalized plan recommendations tailored to student needs
- 🌍 **Cultural Guide** - Navigate customs and cultural norms with AI-powered insights
- 💰 **Financial Aid** - Discover scholarships, grants, and financial resources
- 👥 **Community Finder** - Connect with fellow students and cultural groups
- 💼 **Job Finder** - Campus jobs and internships with visa compliance checks

## 🤖 Powered by Google Gemini AI

Studzo leverages Google Gemini AI to provide:

- **Smart Roommate Matching**: Analyzes lifestyle preferences, study habits, and personality for compatibility scores
- **Cultural Intelligence**: Context-aware guidance explaining *why* customs matter and how to navigate them
- **Health Insurance Analysis**: Processes complex documents and explains medical jargon in simple language
- **Financial Aid Discovery**: Searches thousands of scholarships with personalized matches
- **Intelligent Recommendations**: Understands nuance and provides genuinely helpful, conversational responses

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **Framer Motion** for smooth animations
- **Lucide Icons** for modern iconography
- **Glassmorphism UI** for a premium, modern aesthetic

### Backend
- **FastAPI** (Python) for high-performance async APIs
- **Google Gemini API** for AI-powered features
- **SQLite** for local development
- **Uvicorn** ASGI server

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/studzo.git
cd studzo
```

2. **Setup Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
echo "GEMINI_API_KEY=your_api_key_here" > .env
echo "DATABASE_URL=sqlite:///./homehub.db" >> .env
echo 'BACKEND_CORS_ORIGINS=["http://localhost:5173"]' >> .env

# Start backend server
uvicorn main:app --reload --port 8000
```

3. **Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Demo Credentials

For testing the authentication flow:
- Email: `demo@studzo.com`
- Password: `demo123`

## 📁 Project Structure

```
studzo/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── App.tsx         # Main app component
│   │   └── index.css       # Global styles
│   └── package.json
│
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic
│   │   └── config.py       # Configuration
│   ├── prompts/            # Gemini AI prompts
│   └── main.py             # Application entry point
│
└── README.md
```

## 🎯 Core Features in Detail

### Roommate Matching
Gemini AI analyzes preferences like sleep schedule, study habits, cleanliness, and hobbies to generate compatibility scores with personalized conversation starters.

### Cultural Guide
Get context-aware cultural guidance that explains local customs, social norms, and helps you navigate new environments respectfully.

### Health Insurance
AI processes complex insurance documents, compares coverage options, and recommends plans based on your specific needs and budget.

### Financial Aid
Personalized scholarship matches with application tips and deadline reminders, searching through thousands of opportunities.

## 🌐 API Endpoints

- `POST /api/v1/roommate/match` - Find compatible roommates
- `GET /api/v1/hostel/search` - Search for housing
- `POST /api/v1/cultural/guidance` - Get cultural insights
- `POST /api/v1/financial/guidance` - Financial advice
- `GET /api/v1/jobs/search` - Find student jobs
- `POST /api/v1/community/connect` - Discover communities

Full API documentation available at `/docs` when running the backend.

## 🔐 Security

- API keys stored securely in environment variables
- Backend-only API calls (keys never exposed to frontend)
- `.env` files excluded from version control
- CORS configured for production deployment

## 🎨 Design Philosophy

Studzo features a modern glassmorphism design with:
- Vibrant gradient colors
- Smooth micro-animations
- Premium dark mode aesthetic
- Responsive layouts for all devices
- Accessible, intuitive navigation

## 🚦 Roadmap

- [ ] Real-time chat & messaging
- [ ] University partnerships for verified housing
- [ ] Mobile apps (iOS & Android)
- [ ] Multi-language support
- [ ] Visa & immigration guidance
- [ ] Student verification system
- [ ] Events & meetups feature
- [ ] Student marketplace

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🏆 Hackathon Project

Built for the Google Gemini AI Hackathon 2024. Studzo aims to make studying abroad accessible, affordable, and less stressful for millions of international students worldwide.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

<div align="center">

**Made with ❤️ for international students everywhere**

*Powered by Google Gemini AI*

</div>
