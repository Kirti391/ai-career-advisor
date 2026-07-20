# 🚀 PathFinder AI – AI Career Advisor

> **An AI-powered career advisory platform that provides intelligent resume analysis, ATS evaluation, personalized career guidance, skill gap identification, interview preparation, and downloadable career reports.**

---

## 🎓 Internship Acknowledgement

This project, **PathFinder AI – AI Career Advisor**, was developed as part of the **6-Week Virtual IBM SkillsBuild Academic Internship 2026 – AI Automation & Intelligent Solutions**, offered in collaboration with **IBM SkillsBuild, AICTE, and BharatCares (CSRBOX Group)**.

The internship focused on developing expertise in:

- Artificial Intelligence (AI)
- Agentic AI
- Intelligent Automation
- Workflow Orchestration
- AI-Powered Solution Development

Through this internship, participants gained hands-on experience through guided mentorship, expert-led masterclasses, and real-world AI project development aligned with the **United Nations Sustainable Development Goals (UN SDGs)**.

**PathFinder AI** was developed under this internship to support **SDG 8 – Decent Work and Economic Growth** by improving employability through AI-powered career guidance, resume intelligence, and interview preparation.

---

# 📖 Overview

**PathFinder AI** is a web-based AI Career Advisor designed to help students, graduates, and professionals improve their employability through personalized career insights.

The platform analyzes resumes using Artificial Intelligence, evaluates ATS compatibility, identifies strengths and weaknesses, recommends missing skills, generates interview questions, and provides actionable career guidance.

It empowers users to make informed career decisions while supporting **United Nations Sustainable Development Goal 8 (Decent Work and Economic Growth).**

---

# ✨ Features

- 📄 AI Resume Analysis
- 📊 ATS Score Evaluation
- 💪 Resume Strength & Weakness Analysis
- 🎯 Skill Gap Identification
- 📚 Personalized Career Recommendations
- 🧠 AI Career Summary Generation
- 🎤 AI Interview Preparation Questions
- 📥 Downloadable PDF Career Report
- 👤 User Authentication (Signup/Login)
- 📜 Resume Analysis History
- 🌙 Dark Mode Support
- 📱 Fully Responsive Interface

---

# 🛠️ Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Lucide React Icons

## Backend

- Python
- FastAPI
- Uvicorn
- Pydantic

## Database

- Supabase (PostgreSQL)

## Artificial Intelligence

- OpenAI GPT API

## Development Tools

- Git & GitHub
- Visual Studio Code
- Postman

---

# 📁 Project Structure

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
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   └── ...
│
├── backend_server.py
├── package.json
├── requirements.txt
├── README.md
└── .env
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

Activate it

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Install Python dependencies

```bash
pip install -r requirements.txt
```

---

## 3. Frontend Setup

Install Node modules

```bash
npm install
```

Run the frontend

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

## 5. Run Backend

```bash
uvicorn backend_server:app --reload
```

Backend Server

```
http://127.0.0.1:8000
```

---

## 6. Run Frontend

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

---

# 🗄️ Database Schema

## Users

| Column | Type |
|---------|------|
| id | UUID |
| name | TEXT |
| email | TEXT |
| password | TEXT |
| created_at | TIMESTAMP |

---

## Analysis

| Column | Type |
|---------|------|
| id | UUID |
| user_email | TEXT |
| target_role | TEXT |
| industry | TEXT |
| ats_score | INTEGER |
| result | JSONB |
| created_at | TIMESTAMP |

---

## History

| Column | Type |
|---------|------|
| id | UUID |
| user_email | TEXT |
| filename | TEXT |
| score | INTEGER |
| role | TEXT |
| created_at | TIMESTAMP |

---

# 🔄 Application Workflow

1. User creates an account.
2. User logs into the platform.
3. Uploads a resume in PDF format.
4. Selects target role and industry.
5. AI analyzes the resume.
6. ATS score is generated.
7. Resume strengths and weaknesses are identified.
8. Missing skills are recommended.
9. Personalized career summary is generated.
10. Interview preparation questions are created.
11. User downloads the career report.

---

# 📡 REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/health` | Health Check |
| POST | `/api/v1/auth/signup` | Register User |
| POST | `/api/v1/auth/login` | Login User |
| GET | `/api/v1/auth/me` | Current User |
| POST | `/api/v1/auth/logout` | Logout |
| POST | `/api/v1/upload-resume` | Upload Resume |
| POST | `/api/v1/analyze` | Analyze Resume |
| GET | `/api/v1/history` | Resume Analysis History |
| GET | `/api/v1/analysis/{id}` | Analysis Details |

---

# 🎯 Objectives

- Improve employability using Artificial Intelligence.
- Optimize resumes for Applicant Tracking Systems (ATS).
- Identify technical and soft skill gaps.
- Provide personalized career recommendations.
- Help users prepare for interviews.
- Support informed career planning and professional growth.

---

# 🌍 SDG Alignment

This project directly contributes to:

## **SDG 8 – Decent Work and Economic Growth**

PathFinder AI supports SDG 8 by:

- Enhancing employability
- Improving career readiness
- Promoting lifelong learning
- Supporting workforce development
- Providing equal access to career guidance

---

# 📈 Future Enhancements

- LinkedIn Profile Analysis
- AI Career Roadmap Generator
- AI Mock Interview Simulator
- Job Recommendation Engine
- Resume Version Comparison
- Recruiter Dashboard
- Mobile Application
- Multi-language Support
- Email Notifications
- Real-time Labour Market Insights

---

# 👥 Contributors

**Project Name**

**PathFinder AI – AI Career Advisor**

**Developed By**

- Team Name- Hackovate
- Team Members - Palak Garg , Kirti

**Academic Project**

IBM SkillsBuild Virtual Internship 2026

---

# 📜 License

This project is developed for **educational and research purposes** under the **IBM SkillsBuild Academic Internship Program 2026**.

---

# 🙏 Acknowledgements

We sincerely acknowledge the support and guidance provided by:

- IBM SkillsBuild
- AICTE (All India Council for Technical Education)
- BharatCares (CSRBOX Group)
- OpenAI
- Supabase
- FastAPI
- React
- Tailwind CSS
- Framer Motion
- PostgreSQL
- Vite

Their platforms, tools, mentorship, and learning resources played a significant role in the successful development of this project.

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

It helps support the project and encourages future development.

---

# 💡 Quote

> **"Empowering Careers with Artificial Intelligence."**

**PathFinder AI – Helping Every Career Find Its Path.**
