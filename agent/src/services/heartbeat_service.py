"""
Heartbeat Service

Logs that the monitoring agent
is still running.
"""

from datetime import datetime

from src.utils.logger import logger


class HeartbeatService:

    @staticmethod
    def beat():

        logger.info(
            f"Heartbeat | Agent Alive | {datetime.now()}"
        )
