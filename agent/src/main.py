from src.database.supabase_client import supabase
from src.services.server_service import register_server

def main():

	print("Starting Monitoring Agent...\n")
	server_id = register_server()
	print(f"\nServer ID: {server_id}")
	print("\nRegistration completed successfully.")
	
if " __name__==" "__main__":
	main()
