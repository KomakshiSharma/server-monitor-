from src.database.supabase_client import supabase
from src.config.settings import SERVER_NAME, ENVIRONMENT


def register_server() -> str:
    print(f"[register_server] Looking for hostname = {SERVER_NAME}")

    existing = (
        supabase.table("servers")
        .select("*")
        .eq("hostname", SERVER_NAME)
        .execute()
    )

    if existing.data and len(existing.data) > 0:
        server = existing.data[0]
        print(
            f"[register_server] Found existing server: "
            f"{SERVER_NAME} -> {server['id']}"
        )
        return server["id"]

    inserted = (
        supabase.table("servers")
        .insert(
            {
                "hostname": SERVER_NAME,
                "environment": ENVIRONMENT,
            }
        )
        .execute()
    )

    server = inserted.data[0]
    print(
        f"[register_server] Registered NEW server: "
        f"{SERVER_NAME} -> {server['id']}"
    )
    return server["id"]
