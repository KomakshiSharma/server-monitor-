import os
from dotenv import load_dotenv
load_dotenv()
SERVER_NAME = os.getenv("SERVER_NAME","zoey")
ENVIRONMENT = os.getenv("ENVIRONMET","development")
COLLECTIN_INTERVAL= int(
	os.getenv("COLLECTION_INTERVAL", "10")
)
