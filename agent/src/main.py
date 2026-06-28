import time

from src.config.settings import (
    COLLECTION_INTERVAL,
    SERVER_NAME,
)

from src.services.collector_service import CollectorService
from src.utils.logger import logger


def main():

    logger.info("=" * 50)
    logger.info("Server Monitoring Agent")
    logger.info("=" * 50)

    logger.info(
        f"Server : {SERVER_NAME}"
    )

    logger.info(
        f"Interval : {COLLECTION_INTERVAL} seconds"
    )

    while True:

        metric = CollectorService.collect()

        logger.info(
            f"CPU Usage : {metric.cpu_usage}%"
        )

        time.sleep(COLLECTION_INTERVAL)


if __name__ == "__main__":
    main()
