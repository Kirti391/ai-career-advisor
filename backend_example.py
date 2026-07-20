from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="AI Career Advisor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    filename: str

@app.get("/api/v1/history")
async def get_history():
    return {
        "data": [
            {
                "id": "analysis-1",
                "filename": "sample.pdf",
                "date": "2026-07-19",
                "score": 82,
                "role": "Senior Frontend Engineer"
            }
        ]
    }

@app.post("/api/v1/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    return {
        "success": True,
        "filename": file.filename,
        "message": "File uploaded successfully and saved in session."
    }

@app.post("/api/v1/analyze")
async def analyze(req: AnalyzeRequest):
    return {
        "candidateName": "Alex Rivera",
        "targetRole": "Senior Frontend Engineer",
        "experienceYears": 4,
        "skillMatchPercentage": 78,
        "atsScore": 82,
        "careerSummary": {
            "headline": "Strong frontend foundation with room to grow in backend systems.",
            "overview": "Your profile is solid for a frontend-to-full-stack transition.",
            "nextSteps": [
                "Learn FastAPI fundamentals",
                "Add PostgreSQL and Docker experience",
                "Build a full-stack project with auth and deployment"
            ]
        },
        "skillsAnalysis": {
            "matched": [
                {"name": "React"},
                {"name": "JavaScript"}
            ],
            "partiallyMatched": [
                {"name": "TypeScript"}
            ],
            "missing": [
                {"name": "FastAPI"},
                {"name": "Docker"},
                {"name": "SQL"}
            ]
        },
        "courses": [
            {"title": "FastAPI for Production", "provider": "Coursera", "priceType": "Free"},
            {"title": "Docker Fundamentals", "provider": "Udemy", "priceType": "Paid"}
        ],
        "projects": [
            {"name": "FastAPI Auth Service", "difficulty": "Intermediate", "estimatedTime": "2 weeks"}
        ]
    }

@app.get("/api/v1/analysis/{analysis_id}")
async def get_analysis(analysis_id: str):
    return {
        "data": {
            "candidateName": "Alex Rivera",
            "targetRole": "Senior Frontend Engineer",
            "experienceYears": 4,
            "skillMatchPercentage": 78,
            "atsScore": 82,
            "careerSummary": {
                "headline": "Strong frontend foundation with room to grow in backend systems.",
                "overview": "Your profile is solid for a frontend-to-full-stack transition.",
                "nextSteps": [
                    "Learn FastAPI fundamentals",
                    "Add PostgreSQL and Docker experience",
                    "Build a full-stack project with auth and deployment"
                ]
            },
            "skillsAnalysis": {
                "matched": [
                    {"name": "React"},
                    {"name": "JavaScript"}
                ],
                "partiallyMatched": [
                    {"name": "TypeScript"}
                ],
                "missing": [
                    {"name": "FastAPI"},
                    {"name": "Docker"},
                    {"name": "SQL"}
                ]
            },
            "courses": [
                {"title": "FastAPI for Production", "provider": "Coursera", "priceType": "Free"},
                {"title": "Docker Fundamentals", "provider": "Udemy", "priceType": "Paid"}
            ],
            "projects": [
                {"name": "FastAPI Auth Service", "difficulty": "Intermediate", "estimatedTime": "2 weeks"}
            ]
        }
    }
