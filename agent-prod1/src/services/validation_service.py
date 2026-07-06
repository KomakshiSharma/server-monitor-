"""
Validation Service

Checks required environment variables
before starting the monitoring agent.
"""

from src.config.settings import (
    SERVER_NAME,
    ENVIRONMENT,
    SUPABASE_URL,
    SUPABASE_KEY,
)

from src.utils.logger import logger


class ValidationService:

    @staticmethod
    def validate():

        logger.info("Validating configuration...")

        required = {
            "SERVER_NAME": SERVER_NAME,
            "ENVIRONMENT": ENVIRONMENT,
            "SUPABASE_URL": SUPABASE_URL,
            "SUPABASE_KEY": SUPABASE_KEY,
        }

        for key, value in required.items():

            if not value:

                raise ValueError(
                    f"Missing environment variable: {key}"
                )

        logger.info("Configuration validated successfully.")
