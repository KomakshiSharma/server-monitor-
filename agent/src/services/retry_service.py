"""
Retry Service

Provides retry functionality
for temporary failures.
"""

import time

from src.utils.logger import logger


class RetryService:

    @staticmethod
    def execute(function, retries=3, delay=2):

        for attempt in range(1, retries + 1):

            try:

                return function()

            except Exception as error:

                logger.warning(
                    f"Attempt {attempt}/{retries} failed: {error}"
                )

                if attempt == retries:

                    raise

                time.sleep(delay)
