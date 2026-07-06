import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

SERVER_NAME = os.getenv("SERVER_NAME", "unknown-server")
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

COLLECTION_INTERVAL = int(os.getenv("COLLECTION_INTERVAL", "10"))
