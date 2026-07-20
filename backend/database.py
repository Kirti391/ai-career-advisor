from pathlib import Path
from dotenv import load_dotenv
import os
from supabase import create_client

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

print("SUPABASE_URL =", SUPABASE_URL)

if not SUPABASE_URL:
    raise Exception("SUPABASE_URL not found in .env")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)