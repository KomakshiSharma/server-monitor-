import os
from dotenv import load_dotenv

load_dotenv()

SERVER_NAME = os.getenv("SERVER_NAME", "unknown")

ENVIRONMENT = os.getenv("ENVIRONMENT","devlopment")

COLLECTION_INTERVAL = int(
    os.getenv("COLLECTION_INTERVAL", "10")
)
