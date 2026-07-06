"""
Supabase Client

Creates a single reusable connection to Supabase.
"""

from supabase import Client,create_client

from src.config.settings import (
    SUPABASE_KEY,
    SUPABASE_URL,
)

from src.utils.logger import logger


class SupabaseClient:
    """
    Handles creation of the Supabase client.
    """

    def __init__(self):

        if not SUPABASE_URL:

            raise ValueError(
                "SUPABASE_URL is missing."
            )

        if not SUPABASE_KEY:

            raise ValueError(
                "SUPABASE_KEY is missing."
            )

        self.client: Client = create_client(
            SUPABASE_URL,
            SUPABASE_KEY
        )

        logger.info(
            "Connected to Supabase."
        )

    def get_client(self) -> Client:
        """
        Return the initialized Supabase client.
        """
        return self.client


supabase = SupabaseClient().get_client()
