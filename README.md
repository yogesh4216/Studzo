# Studzo

<div align="center">

**Home, wherever you study**

![Studzo Banner](https://img.shields.io/badge/Powered%20by-Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi&logoColor=white)

</div>

## 🌟 About Studzo

Studzo is an AI-powered platform helping international students navigate the complexities of studying abroad. From finding compatible roommates and affordable housing to understanding cultural norms, accessing financial resources, and discovering job opportunities—Studzo brings everything students need into one seamless experience.

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

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **Framer Motion** for smooth animations
- **Tailwind CSS** for modern styling

### Backend
- **FastAPI** (Python) for high-performance async APIs
- **Google Gemini API** for AI-powered features
- **SQLite** for local development

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Google Gemini API key

### Quick Start

1. **Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

2. **Frontend**
```bash
cd frontend
npm install
npm run dev
```

## 🌐 API Endpoints

- `POST /api/v1/ai/roommate-match` - Find compatible roommates
- `POST /api/v1/ai/hostel-discovery` - Search for housing
- `POST /api/v1/ai/cultural-guidance` - Get cultural insights
- `POST /api/v1/ai/financial-guidance` - Financial advice
- `POST /api/v1/ai/job-finder` - Find student jobs
- `POST /api/v1/ai/health-insurance` - Insurance policy analysis

## 🏆 Hackathon Project

Built for the Google Gemini 3 Hackathon. Studzo aims to make studying abroad accessible and less stressful for international students worldwide.

<div align="center">

**Made with ❤️ for international students everywhere**

</div>
