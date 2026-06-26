from dotenv import load_dotenv
import os

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")

SUPABASE_KEY = os.getenv("SUPABASE_KEY")

SERVER_NAME = os.getenv("SERVER_NAME")

ENVIRONMENT = os.getenv("ENVIRONMENT")
