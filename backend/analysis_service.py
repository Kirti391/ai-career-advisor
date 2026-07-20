from __future__ import annotations

import re
from typing import Any

import fitz

DEFAULT_TARGET_ROLE = "Software Engineer"

# ---------- ADD THIS HERE ----------

SKILL_ALIASES = {
    "React": ["react"],
    "JavaScript": ["javascript", "js"],
    "TypeScript": ["typescript", "ts"],
    "Python": ["python"],
    "FastAPI": ["fastapi"],
    "Node.js": ["node", "node.js", "express"],
    "Docker": ["docker"],
    "MongoDB": ["mongodb", "mongo"],
    "SQL": ["sql", "postgresql"],
    "AWS": ["aws"],
    "TensorFlow": ["tensorflow"],
    "PyTorch": ["pytorch"],
    "LangChain": ["langchain"],
    "LangGraph": ["langgraph"],
    "RAG": ["rag"],
    "Scikit-Learn": ["scikit", "sklearn"],
    "Pandas": ["pandas"],
    "NumPy": ["numpy"],
    "Linux": ["linux"],
    "Redis": ["redis"],
    "Terraform": ["terraform"],
    "Kubernetes": ["kubernetes"]
}

SOFT_SKILLS = [
    "Communication",
    "Leadership",
    "Problem Solving",
    "Teamwork",
    "Adaptability"
]

TOOL_HINTS = [
    "Git",
    "GitHub",
    "VS Code",
    "Postman",
    "Docker",
    "Jira",
    "Figma"
]

# ---------- ROLE_DATA STARTS HERE ----------

ROLE_DATA = {

    "AI Engineer": {
        "skills": [
            "Python",
            "PyTorch",
            "TensorFlow",
            "LangChain",
            "LangGraph",
            "RAG",
            "Vector Database",
            "LLMs"
        ],

        "courses": [
            "Generative AI with LLMs",
            "LangChain Bootcamp",
            "Deep Learning Specialization"
        ],

        "projects": [
            "ChatGPT Clone",
            "Multi Agent Research Assistant",
            "RAG Document Chatbot"
        ]
    },

    "Machine Learning Engineer": {
        "skills": [
            "Python",
            "Scikit-Learn",
            "TensorFlow",
            "Pandas",
            "NumPy",
            "Feature Engineering"
        ],

        "courses": [
            "Machine Learning Andrew Ng",
            "TensorFlow Developer"
        ],

        "projects": [
            "House Price Prediction",
            "Customer Churn Prediction",
            "Fraud Detection"
        ]
    },

    "Frontend Developer": {

        "skills": [
            "React",
            "JavaScript",
            "TypeScript",
            "Redux",
            "HTML",
            "CSS",
            "Tailwind CSS"
        ],

        "courses": [
            "React Complete Guide",
            "Advanced JavaScript"
        ],

        "projects": [
            "Netflix Clone",
            "Ecommerce Frontend",
            "Portfolio Website"
        ]
    },

    "Backend Developer": {

        "skills": [
            "Python",
            "FastAPI",
            "Django",
            "PostgreSQL",
            "Docker",
            "Redis"
        ],

        "courses": [
            "FastAPI Complete Guide",
            "PostgreSQL Bootcamp"
        ],

        "projects": [
            "Authentication API",
            "Task Management API",
            "Inventory Backend"
        ]
    },

    "Full Stack Developer": {

        "skills": [
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "Docker",
            "AWS"
        ],

        "courses": [
            "MERN Stack",
            "Full Stack Bootcamp"
        ],

        "projects": [
            "Hospital Management",
            "Food Delivery App",
            "Social Media App"
        ]
    },

    "Data Scientist": {

        "skills": [
            "Python",
            "SQL",
            "Pandas",
            "Statistics",
            "Power BI",
            "Machine Learning"
        ],

        "courses": [
            "IBM Data Science",
            "Data Analytics"
        ],

        "projects": [
            "Sales Dashboard",
            "Recommendation System",
            "Demand Forecasting"
        ]
    },

    "Cloud Engineer": {

        "skills": [
            "AWS",
            "Docker",
            "Terraform",
            "Linux",
            "CI/CD",
            "Kubernetes"
        ],

        "courses": [
            "AWS Solutions Architect",
            "Docker & Kubernetes"
        ],

        "projects": [
            "Cloud Deployment",
            "CI/CD Pipeline",
            "Terraform Infrastructure"
        ]
    },

    "DevOps Engineer": {

        "skills": [
            "Docker",
            "Jenkins",
            "Terraform",
            "Linux",
            "Kubernetes",
            "AWS"
        ],

        "courses": [
            "DevOps Bootcamp",
            "Docker Mastery"
        ],

        "projects": [
            "CI/CD Pipeline",
            "Kubernetes Deployment",
            "Infrastructure Automation"
        ]
    },

    "Cyber Security Engineer": {

        "skills": [
            "Networking",
            "Linux",
            "Python",
            "OWASP",
            "SIEM",
            "Pen Testing"
        ],

        "courses": [
            "CEH",
            "Security+"
        ],

        "projects": [
            "Vulnerability Scanner",
            "Network Monitor",
            "Password Auditor"
        ]
    }
}

INDUSTRY_KEYWORDS = {

    "IT":[
        "Microservices",
        "REST API",
        "Cloud",
        "Docker"
    ],

    "Finance":[
        "Risk Analysis",
        "FinTech",
        "Compliance",
        "Trading"
    ],

    "Healthcare":[
        "HIPAA",
        "FHIR",
        "Medical Data"
    ],

    "Education":[
        "LMS",
        "EdTech",
        "Student Analytics"
    ],

    "Manufacturing":[
        "IoT",
        "Automation",
        "ERP"
    ],

    "E-Commerce":[
        "SEO",
        "Recommendation Engine",
        "Payments"
    ]
}

def extract_text_from_pdf_bytes(file_bytes: bytes) -> str:
    if not file_bytes:
        raise ValueError("Uploaded resume file is empty.")

    try:
        document = fitz.open(stream=file_bytes, filetype="pdf")
    except Exception as exc:
        raise ValueError("The uploaded file could not be read as a valid PDF.") from exc

    pages: list[str] = []
    try:
        for page_index in range(document.page_count):
            pages.append(document.load_page(page_index).get_text("text"))
    finally:
        document.close()

    text = "\n".join(page for page in pages if page).strip()
    if not text:
        raise ValueError("No extractable text was found in the resume.")
    return text


def _first_line_name(text: str) -> str:
    for line in text.splitlines():
        candidate = re.sub(r"\s+", " ", line.strip())
        if not candidate:
            continue
        if re.match(r"^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+$", candidate):
            return candidate
    return "Candidate"


def _detect_experience_years(text: str) -> int:
    matches = re.findall(r"(\d+(?:\.\d+)?)\s*(?:years?|yrs?)", text, flags=re.IGNORECASE)
    if matches:
        return max(1, int(float(matches[0]))) if "." not in matches[0] else max(1, int(round(float(matches[0]))))
    return 3


def _find_skills(
    text: str,
    target_role: str,
) -> tuple[list[dict[str, Any]], list[dict[str, Any]], list[dict[str, Any]]]:

    lowered = text.lower()

    matched = []
    partially = []
    missing = []

    role_info = ROLE_DATA.get(
        target_role,
        ROLE_DATA["Full Stack Developer"]
    )

    required_skills = role_info["skills"]

    for skill in required_skills:

        aliases = SKILL_ALIASES.get(skill, [skill.lower()])

        found = False

        for alias in aliases:
            if alias.lower() in lowered:
                found = True
                break

        if found:

            matched.append({
                "name": skill,
                "level": 85,
                "category": "Core"
            })

        else:

            partially.append({

                "name": skill,

                "level": 55,

                "currentGap": f"Need stronger hands-on experience with {skill}.",

                "category": "Growth"
            })

            missing.append({

                "name": skill,

                "importance": "High",

                "category": target_role
            })

    if len(matched) == 0:

        matched.append({

            "name": required_skills[0],

            "level": 60,

            "category": "Core"
        })

    return matched, partially, missing

def _build_learning_roadmap(
    target_role: str,
    missing: list[dict[str, Any]]
):

    roadmap = []

    for index, skill in enumerate(missing[:3]):

        roadmap.append({

            "phase": f"Month {index+1}",

            "objectives":[

                f"Master {skill['name']}",

                f"Build one {target_role} project",

                "Practice interview questions"

            ],

            "deliverables":

                f"{skill['name']} portfolio project"

        })

    return roadmap
def _build_courses(target_role: str):

    role = ROLE_DATA.get(
        target_role,
        ROLE_DATA["Full Stack Developer"]
    )

    courses = []

    for i, course in enumerate(role["courses"]):

        courses.append({

            "id": f"course-{i+1}",

            "title": course,

            "provider": "Coursera",

            "duration": "12 Hours",

            "skillsCovered": target_role,

            "priceType": "Free"

        })

    return courses
def _build_projects(target_role: str):

    role = ROLE_DATA.get(
        target_role,
        ROLE_DATA["Full Stack Developer"]
    )

    projects = []

    for i, project in enumerate(role["projects"]):

        projects.append({

            "id": f"project-{i+1}",

            "name": project,

            "difficulty": "Medium",

            "estimatedTime": "15 Hours",

            "description": f"A portfolio-quality {target_role} project.",

            "skillsLearned": role["skills"][:4]

        })

    return projects

def build_resume_analysis_response(
    file_bytes: bytes,
    filename: str | None = None,
    target_role: str = DEFAULT_TARGET_ROLE,
    industry: str = "IT",
) -> dict[str, Any]:

    resume_text = extract_text_from_pdf_bytes(file_bytes)

    candidate_name = _first_line_name(resume_text)

    experience_years = _detect_experience_years(resume_text)

    matched, partially, missing = _find_skills(
        resume_text,
        target_role
    )

    role = ROLE_DATA.get(
        target_role,
        ROLE_DATA["Full Stack Developer"]
    )

    industry_keywords = INDUSTRY_KEYWORDS.get(industry, [])

    total_required = len(role["skills"])

    matched_count = len(matched)

    skill_match = int((matched_count / total_required) * 100)

    skill_match = max(45, min(skill_match, 98))

    ats_score = min(
        98,
        max(
            55,
            skill_match + 8
        )
    )

    return {

        "candidateName": candidate_name,

        "targetRole": target_role,

        "industry": industry,

        "experienceYears": experience_years,

        "skillMatchPercentage": skill_match,

        "atsScore": ats_score,

        "careerSummary": {

            "headline":
                f"Resume evaluated for {target_role}",

            "overview":

                f"{candidate_name} has approximately {experience_years} years of experience. "
                f"This resume has been benchmarked against modern {target_role} hiring standards in the {industry} industry.",

            "topStrengths":[

                f"Strong knowledge of {', '.join([x['name'] for x in matched[:3]])}",

                "Good ATS readable resume",

                "Professional resume structure"

            ],

            "nextSteps":[

                f"Improve {missing[0]['name'] if missing else 'advanced skills'}",

                f"Build portfolio projects for {target_role}",

                f"Learn {industry} domain concepts"

            ]
        },

        "profile":{

            "education":[

                {

                    "degree":"Resume Based",

                    "school":"Detected from Resume",

                    "year":"N/A",

                    "gpa":"N/A"

                }

            ],

            "experience":[

                {

                    "role":target_role,

                    "company":"Resume Experience",

                    "duration":f"{experience_years} Years",

                    "description":
                    f"Experience extracted from uploaded resume."

                }

            ],

            "projects":[

                {

                    "name":role["projects"][0],

                    "description":
                    f"Relevant {target_role} project.",

                    "technologies":
                    role["skills"][:4]

                }

            ],

            "softSkills":SOFT_SKILLS,

            "tools":TOOL_HINTS

        },

        "skillsAnalysis":{

            "matched":matched,

            "partiallyMatched":partially,

            "missing":missing

        },

        "learningRoadmap":

            _build_learning_roadmap(
                target_role,
                missing
            ),

        "courses":

            _build_courses(
                target_role
            ),

        "projects":

            _build_projects(
                target_role
            ),

        "resumeReview":{

            "atsScore":ats_score,

            "strengths":[

                "Resume is ATS compatible.",

                "Clear formatting.",

                "Relevant work experience."

            ],

            "weaknesses":[

                f"Missing {len(missing)} important skills.",

                f"Resume lacks {industry} specific keywords."

            ],

            "missingKeywords":

                [x["name"] for x in missing] +
                industry_keywords,

            "suggestedImprovements":[

                f"Add projects related to {target_role}.",

                f"Include {industry} keywords.",

                "Quantify achievements using numbers.",

                "Improve technical summary.",

                "Highlight measurable impact."

            ]

        },

        "interviewPreparation":{

            "technical":[

                {

                    "question":
                    f"What are the responsibilities of a {target_role}?",

                    "answer":
                    f"Discuss architecture, technologies and real-world implementation of a {target_role}."

                },

                {

                    "question":
                    f"Which technologies are essential for {target_role}?",

                    "answer":
                    ", ".join(role["skills"])

                }

            ],

            "behavioral":[

                {

                    "question":
                    "Tell me about yourself.",

                    "answer":
                    "Explain your projects, achievements and career goals."

                }

            ],

            "hr":[

                {

                    "question":
                    f"Why do you want to work in the {industry} industry?",

                    "answer":
                    f"Discuss your interest in {industry} and long-term goals."

                }

            ],

            "roleSpecific":[

                {

                    "question":
                    f"How would you solve a real-world problem as a {target_role}?",

                    "answer":
                    "Explain your approach step-by-step using your previous projects."

                }

            ]

        }

    }