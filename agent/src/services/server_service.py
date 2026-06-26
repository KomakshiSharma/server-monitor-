from src.database.supabase_client import supabase
from src.config.settings import SERVER_NAME, ENVIRONMENT


def register_server():
    """
    Ensure the current server exists in the database.
    Return its UUID.
    """

    response = (
        supabase.table("servers")
        .select("*")
        .eq("hostname", SERVER_NAME)
        .execute()
    )

    # Server already exists
    if response.data:
        server = response.data[0]

        print(f"Server already registered: {SERVER_NAME}")

        return server["id"]

    # Create new server
    response = (
        supabase.table("servers")
        .insert(
            {
                "hostname": SERVER_NAME,
                "environment": ENVIRONMENT,
            }
        )
        .execute()
    )

    server = response.data[0]

    print(f"Registered new server: {SERVER_NAME}")

    return server["id"]
