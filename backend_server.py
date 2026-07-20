# from __future__ import annotations

# import hashlib
# import uuid
# from datetime import datetime, timezone
# from typing import Any
# from backend.database import supabase
# from fastapi import Depends, FastAPI, Header, HTTPException,  status
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel, Field
# from fastapi import UploadFile, File, Form

# from backend.analysis_service import build_resume_analysis_response

# app = FastAPI(title="AI Career Advisor API")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#         "http://127.0.0.1:5173",
#         "http://localhost:5174",
#         "http://127.0.0.1:5174",
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# class AuthSignupPayload(BaseModel):
#     name: str = Field(min_length=1)
#     email: str = Field(min_length=1)
#     password: str = Field(min_length=6)


# class AuthLoginPayload(BaseModel):
#     email: str = Field(min_length=1)
#     password: str = Field(min_length=6)


# class ProfileSettingsPayload(BaseModel):
#     notificationsEnabled: bool | None = None
#     weeklyDigest: bool | None = None
#     language: str | None = None


# class AnalyzePayload(BaseModel):
#     filename: str | None = None


# ANALYSIS_STORE: dict[str, dict[str, Any]] = {}
# HISTORY_STORE: list[dict[str, Any]] = []
# ACTIVE_TOKENS: dict[str, str] = {}


# def _password_hash(password: str) -> str:
#     return hashlib.sha256(password.strip().encode("utf-8")).hexdigest()


# USERS_STORE: dict[str, dict[str, Any]] = {
#     "demo@example.com": {
#         "name": "Demo User",
#         "email": "demo@example.com",
#         "passwordHash": _password_hash("password123"),
#         "role": "Job Seeker",
#         "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
#         "settings": {
#             "notificationsEnabled": True,
#             "weeklyDigest": False,
#             "language": "en",
#         },
#     }
# }


# def _serialize_user(user: dict[str, Any]) -> dict[str, Any]:
#     return {
#         "name": user.get("name"),
#         "email": user.get("email"),
#         "role": user.get("role", "Job Seeker"),
#         "avatar": user.get("avatar"),
#     }


# def _now_iso() -> str:
#     return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


# def _make_history_item(analysis_id: str, filename: str | None, score: int, target_role: str) -> dict[str, Any]:
#     return {
#         "id": analysis_id,
#         "filename": filename or "resume.pdf",
#         "date": _now_iso().split("T")[0],
#         "score": score,
#         "role": target_role,
#     }


# def _get_token_from_header(authorization: str | None) -> str:
#     if not authorization:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing Authorization header")
#     if not authorization.startswith("Bearer "):
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authorization format")
#     token = authorization.split(" ", 1)[1].strip()
#     if not token or token not in ACTIVE_TOKENS:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
#     return token


# def _get_authenticated_user(authorization: str | None = Header(default=None, alias="Authorization")) -> dict[str, Any]:
#     token = _get_token_from_header(authorization)
#     email = ACTIVE_TOKENS.get(token)
#     if not email or email not in USERS_STORE:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
#     return USERS_STORE[email]


# @app.get("/api/v1/health")
# async def health() -> dict[str, Any]:
#     return {
#         "status": "ok",
#         "timestamp": _now_iso(),
#         "analysis_count": len(ANALYSIS_STORE),
#         "user_count": len(USERS_STORE),
#     }


# @app.get("/")
# async def root_health() -> dict[str, str]:
#     return {"status": "ok"}


# @app.post("/api/v1/auth/signup")
# async def signup(payload: AuthSignupPayload) -> dict[str, Any]:
#     email = payload.email.lower()
#     if email in USERS_STORE:
#         raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exists")

#     user = {
#         "name": payload.name,
#         "email": email,
#         "passwordHash": _password_hash(payload.password),
#         "role": "Job Seeker",
#         "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
#         "settings": {
#             "notificationsEnabled": True,
#             "weeklyDigest": False,
#             "language": "en",
#         },
#     }
#     supabase.table("users").insert({
#     "name": payload.name,
#     "email": email,
#     "password": _password_hash(payload.password),
#     "role": "Job Seeker"
# }).execute()
#     token = str(uuid.uuid4())
#     ACTIVE_TOKENS[token] = email
#     return {
#         "data": {
#             "token": token,
#             "user": _serialize_user(user),
#         }
#     }


# @app.post("/api/v1/auth/login")
# async def login(payload: AuthLoginPayload) -> dict[str, Any]:
#     email = payload.email.lower()
#     user = USERS_STORE.get(email)
#     if user is None or user["passwordHash"] != _password_hash(payload.password):
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

#     token = str(uuid.uuid4())
#     ACTIVE_TOKENS[token] = email
#     return {
#         "data": {
#             "token": token,
#             "user": _serialize_user(user),
#         }
#     }


# @app.get("/api/v1/auth/me")
# async def get_current_user(user: dict[str, Any] = Depends(_get_authenticated_user)) -> dict[str, Any]:
#     return {
#         "data": {
#             "user": _serialize_user(user),
#             "settings": user.get("settings", {}),
#         }
#     }


# @app.post("/api/v1/auth/logout")
# async def logout(authorization: str | None = Header(default=None, alias="Authorization")) -> dict[str, str]:
#     token = _get_token_from_header(authorization)
#     ACTIVE_TOKENS.pop(token, None)
#     return {"status": "ok"}


# @app.get("/api/v1/history")
# async def get_history() -> dict[str, Any]:
#     return {"data": HISTORY_STORE}


# @app.post("/api/v1/upload-resume")
# async def upload_resume(file: UploadFile = File(...)) -> dict[str, Any]:
#     return {
#         "success": True,
#         "filename": file.filename,
#         "message": "File uploaded successfully and saved in session.",
#     }


# # @app.post("/api/v1/analyze")
# # async def analyze(file: UploadFile = File(...)) -> dict[str, Any]:
# #     payload = await file.read()
# #     result = build_resume_analysis_response(payload, filename=file.filename)
# #     analysis_id = f"analysis-{len(ANALYSIS_STORE) + 1}"
# #     ANALYSIS_STORE[analysis_id] = result
# #     HISTORY_STORE.insert(
# #         0,
# #         _make_history_item(
# #             analysis_id,
# #             file.filename,
# #             int(result.get("atsScore", 0)),
# #             result.get("targetRole", "Senior Full-Stack AI Engineer"),
# #         ),
# #     )

# @app.post("/api/v1/analyze")
# async def analyze(
#     file: UploadFile = File(...),
#     target_role: str = Form(...),
#     industry: str = Form(...)
# ):
#     payload = await file.read()

#     result = build_resume_analysis_response(
#         payload,
#         filename=file.filename,
#         target_role=target_role,
#         industry=industry,
#     )

#     return result

# @app.get("/api/v1/analysis/{analysis_id}")
# async def get_analysis(analysis_id: str) -> dict[str, Any]:
#     result = ANALYSIS_STORE.get(analysis_id)
#     if result is None:
#         return {"data": {}}
#     return {"data": result}


# @app.get("/api/v1/profile")
# async def get_profile(user: dict[str, Any] = Depends(_get_authenticated_user)) -> dict[str, Any]:
#     return {
#         "data": {
#             "user": _serialize_user(user),
#             "settings": user.get("settings", {}),
#         }
#     }


# @app.patch("/api/v1/profile/settings")
# async def update_profile_settings(
#     payload: ProfileSettingsPayload,
#     user: dict[str, Any] = Depends(_get_authenticated_user),
# ) -> dict[str, Any]:
#     settings = user.setdefault("settings", {})
#     if payload.notificationsEnabled is not None:
#         settings["notificationsEnabled"] = payload.notificationsEnabled
#     if payload.weeklyDigest is not None:
#         settings["weeklyDigest"] = payload.weeklyDigest
#     if payload.language is not None:
#         settings["language"] = payload.language

#     return {
#         "data": {
#             "user": _serialize_user(user),
#             "settings": settings,
#         }
#     }
from __future__ import annotations

import hashlib
import uuid
from datetime import datetime, timezone
from typing import Any

from fastapi import (
    Depends,
    FastAPI,
    Header,
    HTTPException,
    UploadFile,
    File,
    Form,
    status,
)
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from backend.analysis_service import build_resume_analysis_response
from backend.database import supabase

app = FastAPI(title="AI Career Advisor API")

# -----------------------------
# CORS
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Models
# -----------------------------

class AuthSignupPayload(BaseModel):
    name: str = Field(min_length=1)
    email: str = Field(min_length=1)
    password: str = Field(min_length=6)


class AuthLoginPayload(BaseModel):
    email: str = Field(min_length=1)
    password: str = Field(min_length=6)


class ProfileSettingsPayload(BaseModel):
    notificationsEnabled: bool | None = None
    weeklyDigest: bool | None = None
    language: str | None = None


class AnalyzePayload(BaseModel):
    filename: str | None = None


# -----------------------------
# Token Store
# -----------------------------

ACTIVE_TOKENS: dict[str, str] = {}

# -----------------------------
# Utility Functions
# -----------------------------

def _password_hash(password: str) -> str:
    return hashlib.sha256(
        password.strip().encode("utf-8")
    ).hexdigest()


def _now_iso() -> str:
    return (
        datetime.now(timezone.utc)
        .replace(microsecond=0)
        .isoformat()
    )


def _serialize_user(user: dict[str, Any]) -> dict[str, Any]:
    """
    Your users table only contains:
    id
    name
    email
    password
    created_at

    So we return defaults for the remaining fields
    used by the React frontend.
    """

    return {
        "name": user["name"],
        "email": user["email"],
        "role": "Job Seeker",
        "avatar": None,
    }


# -----------------------------
# Authentication Helpers
# -----------------------------

def _get_token_from_header(
    authorization: str | None,
) -> str:

    if authorization is None:
        raise HTTPException(
            status_code=401,
            detail="Missing Authorization header",
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid Authorization header",
        )

    token = authorization.split(" ")[1]

    if token not in ACTIVE_TOKENS:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token",
        )

    return token


def _get_authenticated_user(
    authorization: str | None = Header(
        default=None,
        alias="Authorization",
    ),
):

    token = _get_token_from_header(
        authorization
    )

    email = ACTIVE_TOKENS[token]

    response = (
        supabase.table("users")
        .select("*")
        .eq("email", email)
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized",
        )

    return response.data[0]


# -----------------------------
# Health
# -----------------------------

@app.get("/")
async def root():
    return {
        "status": "running"
    }


@app.get("/api/v1/health")
async def health():

    users = (
        supabase.table("users")
        .select("*", count="exact")
        .execute()
    )

    analysis = (
        supabase.table("analysis")
        .select("*", count="exact")
        .execute()
    )

    return {

        "status": "ok",

        "timestamp": _now_iso(),

        "users": users.count,

        "analysis": analysis.count,
    }


# -----------------------------
# Authentication
# -----------------------------

@app.post("/api/v1/auth/signup")
async def signup(
    payload: AuthSignupPayload,
):

    email = payload.email.lower()

    existing = (
        supabase.table("users")
        .select("*")
        .eq("email", email)
        .execute()
    )

    if existing.data:

        raise HTTPException(
            status_code=409,
            detail="User already exists",
        )

    hashed = _password_hash(
        payload.password
    )

    supabase.table("users").insert({

        "name": payload.name,

        "email": email,

        "password": hashed,

    }).execute()

    user = (
        supabase.table("users")
        .select("*")
        .eq("email", email)
        .execute()
    ).data[0]

    token = str(uuid.uuid4())

    ACTIVE_TOKENS[token] = email

    return {

        "data": {

            "token": token,

            "user": _serialize_user(user)

        }

    }
# -----------------------------
# Login
# -----------------------------

@app.post("/api/v1/auth/login")
async def login(
    payload: AuthLoginPayload,
):

    email = payload.email.lower()

    response = (
        supabase.table("users")
        .select("*")
        .eq("email", email)
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    user = response.data[0]

    hashed_password = _password_hash(
        payload.password
    )

    if user["password"] != hashed_password:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )


    token = str(uuid.uuid4())

    ACTIVE_TOKENS[token] = email


    return {

        "data": {

            "token": token,

            "user": _serialize_user(user)

        }

    }



# -----------------------------
# Logout
# -----------------------------

@app.post("/api/v1/auth/logout")
async def logout(
    authorization: str | None = Header(
        default=None,
        alias="Authorization",
    ),
):

    token = _get_token_from_header(
        authorization
    )


    if token in ACTIVE_TOKENS:

        del ACTIVE_TOKENS[token]


    return {

        "message": "Logged out successfully"

    }



# -----------------------------
# Current User
# -----------------------------

@app.get("/api/v1/auth/me")
async def current_user(
    user=Depends(_get_authenticated_user)
):

    return {
        "data": {
            "user": _serialize_user(user),
            "settings": {
                "notificationsEnabled": True,
                "weeklyDigest": True,
                "language": "English"
            }
        }
    }


# -----------------------------
# Resume Upload
# -----------------------------

@app.post("/api/v1/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),

    user = Depends(
        _get_authenticated_user
    )
):

    if not file.filename.endswith(
        (".pdf", ".docx")
    ):

        raise HTTPException(

            status_code=400,

            detail="Only PDF and DOCX files allowed"

        )


    content = await file.read()


    return {

        "message": "Resume uploaded",

        "filename": file.filename,

        "size": len(content),

        "user": user["email"]

    }



# -----------------------------
# Resume History
# -----------------------------

@app.get("/api/v1/history")
async def get_history(
    user = Depends(
        _get_authenticated_user
    )
):

    email = user["email"]


    response = (

        supabase

        .table("history")

        .select("*")

        .eq(
            "user_email",
            email
        )

        .order(
            "created_at",
            desc=True
        )

        .execute()

    )


    return {

        "data": response.data

    }



# -----------------------------
# Profile Settings
# -----------------------------

@app.get("/api/v1/profile")
async def get_profile(
    user = Depends(
        _get_authenticated_user
    )
):

    return {

        "data": {

            **_serialize_user(user),

            "settings": {

                "notificationsEnabled": True,

                "weeklyDigest": True,

                "language": "English"

            }

        }

    }



@app.put("/api/v1/profile")
async def update_profile(
    payload: ProfileSettingsPayload,

    user = Depends(
        _get_authenticated_user
    )
):

    return {

        "message": "Profile updated",

        "settings": payload.model_dump()

    }
# -----------------------------
# Resume Analysis
# -----------------------------

@app.post("/api/v1/analyze")
async def analyze_resume(

    file: UploadFile = File(...),

    target_role: str = Form(...),

    industry: str = Form(...),

    user = Depends(
        _get_authenticated_user
    )

):

    """
    Main AI Resume Analysis Endpoint

    Flow:

    1. Receive resume file
    2. Send resume to analysis_service
    3. Generate AI career analysis
    4. Save result in analysis table
    5. Save summary in history table
    """


    try:

        # -----------------------------
        # Read uploaded file
        # -----------------------------

        file_bytes = await file.read()


        if not file.filename.lower().endswith(
            ".pdf"
        ):

            raise HTTPException(

                status_code=400,

                detail="Only PDF resumes are supported"

            )



        # -----------------------------
        # Run AI Analysis
        # -----------------------------

        result = build_resume_analysis_response(

            file_bytes,

            filename=file.filename,

            target_role=target_role,

            industry=industry,

        )



        # -----------------------------
        # Extract ATS Score
        # -----------------------------

        ats_score = 0


        if isinstance(result, dict):

            ats_score = (

                result.get(
                    "atsScore"
                )

                or

                result.get(
                    "ats_score"
                )

                or 0

            )



        # -----------------------------
        # Save Complete Analysis
        # -----------------------------

        analysis_insert = {

            "user_email": user["email"],

            "target_role": target_role,

            "industry": industry,

            "ats_score": int(ats_score),

            "result": result,

        }



        supabase.table(
            "analysis"
        ).insert(
            analysis_insert
        ).execute()



        # -----------------------------
        # Save History
        # -----------------------------

        history_insert = {


            "user_email": user["email"],


            "filename": file.filename,


            "score": int(ats_score),


            "role": target_role,


        }



        supabase.table(
            "history"
        ).insert(
            history_insert
        ).execute()



        return {


            "success": True,


            "data": result


        }



    except HTTPException:

        raise



    except Exception as e:


        print(
            "ANALYSIS ERROR:",
            str(e)
        )


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )



# -----------------------------
# Get Single Analysis
# -----------------------------

@app.get("/api/v1/analysis/{analysis_id}")
async def get_analysis(

    analysis_id: str,

    user = Depends(
        _get_authenticated_user
    )

):


    response = (

        supabase.table(
            "analysis"
        )

        .select("*")

        .eq(
            "id",
            analysis_id
        )

        .eq(
            "user_email",
            user["email"]
        )

        .execute()

    )


    if not response.data:


        raise HTTPException(

            status_code=404,

            detail="Analysis not found"

        )



    return {


        "data": response.data[0]


    }



# -----------------------------
# Get All User Analyses
# -----------------------------

@app.get("/api/v1/analyses")
async def get_all_analyses(

    user = Depends(
        _get_authenticated_user
    )

):


    response = (

        supabase.table(
            "analysis"
        )

        .select("*")

        .eq(
            "user_email",
            user["email"]
        )

        .order(
            "created_at",
            desc=True
        )

        .execute()

    )


    return {


        "data": response.data


    }
# -----------------------------
# JSON Serialization Helper
# -----------------------------

def make_json_serializable(data):

    """
    Converts:
    - Pydantic models
    - datetime objects
    - UUID objects
    - nested objects

    into JSON compatible data
    """

    if data is None:

        return None


    if hasattr(data, "model_dump"):

        return make_json_serializable(
            data.model_dump()
        )


    if isinstance(data, dict):

        return {

            key: make_json_serializable(value)

            for key, value in data.items()

        }


    if isinstance(data, list):

        return [

            make_json_serializable(item)

            for item in data

        ]


    if isinstance(data, (datetime,)):

        return data.isoformat()


    if isinstance(data, uuid.UUID):

        return str(data)


    return data



# -----------------------------
# Replace Analysis Save Logic
# -----------------------------

"""
IMPORTANT:

In /api/v1/analyze endpoint,
replace:

"result": result,

with:

"result": make_json_serializable(result)

This prevents Supabase JSONB errors.
"""



# -----------------------------
# Latest Analysis
# -----------------------------

@app.get("/api/v1/latest-analysis")
async def latest_analysis(

    user = Depends(
        _get_authenticated_user
    )

):

    response = (

        supabase.table(
            "analysis"
        )

        .select("*")

        .eq(
            "user_email",
            user["email"]
        )

        .order(
            "created_at",
            desc=True
        )

        .limit(1)

        .execute()

    )


    if not response.data:

        return {

            "data": None

        }


    return {

        "data": response.data[0]

    }



# -----------------------------
# Delete Analysis History
# -----------------------------

@app.delete("/api/v1/history/{analysis_id}")
async def delete_history(

    analysis_id: str,

    user = Depends(
        _get_authenticated_user
    )

):


    result = (

        supabase.table(
            "analysis"
        )

        .delete()

        .eq(
            "id",
            analysis_id
        )

        .eq(
            "user_email",
            user["email"]
        )

        .execute()

    )


    return {

        "message": "Analysis deleted",

        "data": result.data

    }



# -----------------------------
# Server Startup Check
# -----------------------------

@app.on_event("startup")
async def startup_event():

    print(
        """
====================================
 AI Career Advisor API Started
====================================

Available Routes:

GET     /
GET     /api/v1/health

POST    /api/v1/auth/signup
POST    /api/v1/auth/login
POST    /api/v1/auth/logout
GET     /api/v1/auth/me

POST    /api/v1/upload

POST    /api/v1/analyze

GET     /api/v1/history
GET     /api/v1/analyses
GET     /api/v1/latest-analysis

GET     /api/v1/profile
PUT     /api/v1/profile

====================================
        """
    )



# -----------------------------
# Development Run
# -----------------------------

if __name__ == "__main__":

    import uvicorn


    uvicorn.run(

        "backend_server:app",

        host="0.0.0.0",

        port=8000,

        reload=True

    )