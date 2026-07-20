# 🚀 PathFinder AI – AI Career Advisor

> An AI-powered career advisory platform that provides intelligent resume analysis, ATS evaluation, personalized career guidance, skill gap identification, interview preparation, and downloadable career reports.

---

## 📖 Overview

**PathFinder AI** is a web-based AI Career Advisor developed to help students, graduates, and professionals improve their employability through personalized career insights.

The platform analyzes resumes using Artificial Intelligence, evaluates ATS compatibility, identifies strengths and weaknesses, recommends missing skills, generates interview questions, and provides actionable career guidance.

This project supports **United Nations Sustainable Development Goal (SDG) 8 – Decent Work and Economic Growth** by helping users become more career-ready.

---

## ✨ Features

- 📄 Resume Upload & Analysis
- 🤖 AI-Powered Resume Evaluation
- 📊 ATS Score Calculation
- 💪 Strength & Weakness Analysis
- 🎯 Skill Gap Identification
- 📚 Personalized Career Recommendations
- 💼 Career Summary Generation
- 🎤 AI Interview Preparation Questions
- 📥 Downloadable PDF Career Report
- 👤 User Authentication (Signup/Login)
- 📜 Analysis History
- 🌙 Dark Mode Support
- 📱 Responsive Design

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Lucide React Icons

### Backend
- Python
- FastAPI
- Uvicorn
- Pydantic

### Database
- Supabase (PostgreSQL)

### AI Integration
- OpenAI GPT API

### Tools
- Git & GitHub
- VS Code

---

## 📁 Project Structure

```text
PathFinder-AI/
│
├── backend/
│   ├── analysis_service.py
│   ├── database.py
│   ├── pdf_generator.py
│   ├── prompts.py
│   └── ...
│
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── assets/
│   └── ...
│
├── backend_server.py
├── package.json
├── requirements.txt
├── .env
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/PathFinder-AI.git

cd PathFinder-AI
```

---

## 2. Backend Setup

Create a virtual environment

```bash
python -m venv venv
```

Activate the environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

## 3. Frontend Setup

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

---

## 4. Configure Environment Variables

Create a **.env** file inside the project root.

```env
OPENAI_API_KEY=your_openai_api_key

SUPABASE_URL=your_supabase_url

SUPABASE_KEY=your_supabase_service_role_key
```

---

## 5. Start Backend

```bash
uvicorn backend_server:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

---

## 6. Start Frontend

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

# 🗄️ Database Schema

## Users Table

| Column | Type |
|----------|------|
| id | UUID |
| name | Text |
| email | Text |
| password | Text |
| created_at | Timestamp |

---

## Analysis Table

| Column | Type |
|----------|------|
| id | UUID |
| user_email | Text |
| target_role | Text |
| industry | Text |
| ats_score | Integer |
| result | JSONB |
| created_at | Timestamp |

---

## History Table

| Column | Type |
|----------|------|
| id | UUID |
| user_email | Text |
| filename | Text |
| score | Integer |
| role | Text |
| created_at | Timestamp |

---

# 🔄 Workflow

1. User creates an account.
2. User logs in.
3. Uploads resume (PDF).
4. Selects target role and industry.
5. AI analyzes resume.
6. ATS score is calculated.
7. Career summary is generated.
8. Missing skills are identified.
9. Interview questions are generated.
10. User downloads the career report.

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/health` | Health Check |
| POST | `/api/v1/auth/signup` | User Registration |
| POST | `/api/v1/auth/login` | User Login |
| GET | `/api/v1/auth/me` | Current User |
| POST | `/api/v1/auth/logout` | Logout |
| POST | `/api/v1/upload-resume` | Upload Resume |
| POST | `/api/v1/analyze` | Analyze Resume |
| GET | `/api/v1/history` | Analysis History |
| GET | `/api/v1/analysis/{id}` | Get Analysis |

---

# 🎯 Objectives

- Improve employability through AI.
- Optimize resumes for ATS.
- Provide personalized career guidance.
- Identify missing technical and soft skills.
- Prepare users for interviews.
- Support informed career decisions.

---

# 🌍 SDG Alignment

This project contributes to:

## **SDG 8 – Decent Work and Economic Growth**

PathFinder AI promotes:

- Employment readiness
- Career development
- Skill enhancement
- Better workforce productivity
- Equal access to career guidance

---

# 🔮 Future Enhancements

- LinkedIn Profile Analysis
- AI Career Roadmap
- Job Recommendation Engine
- Mock AI Interviews
- Resume Version Comparison
- Recruiter Dashboard
- Mobile Application
- Multi-language Support
- Email Notifications
- Real-time Labour Market Insights

---

# 👨‍💻 Contributors

**Project:** PathFinder AI – AI Career Advisor

Developed by:

- Your Name
- Team Members (if applicable)

Academic Project – Final Year Project

---

# 📄 License

This project is intended for educational and research purposes.

---

# 🙏 Acknowledgements

- OpenAI
- Supabase
- FastAPI
- React
- Tailwind CSS
- Vite
- Framer Motion
- Lucide React
- PostgreSQL

---

## ⭐ If you found this project useful, consider giving it a star!

**PathFinder AI — Empowering Careers with Artificial Intelligence.**
