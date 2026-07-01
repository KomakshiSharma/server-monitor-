import os
from dotenv import load_dotenv

load_dotenv()

SERVER_NAME = os.getenv("SERVER_NAME", "unknown")

ENVIRONMENT = os.getenv("ENVIRONMENT","devlopment")

SUPABASE_URL = os.getenv("SUPABASE_URL")

SUPABASE_KEY = os.getenv("SUPABASE_KEY")

COLLECTION_INTERVAL = int(
    os.getenv("COLLECTION_INTERVAL", "10")
)
