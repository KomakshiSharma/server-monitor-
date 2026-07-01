"""
Server Monitoring Agent

Collects system metrics and uploads them to Supabase continiously.
"""

import time

from src.config.settings import (
    COLLECTION_INTERVAL,
    SERVER_NAME,
    ENVIRONMENT,
)
from src.services.validation_service import ValidationService
from src.services.heartbeat_service import HeartbeatService
from src.services.collector_service import CollectorService
from src.services.metrics_uploader import MetricsUploader
from src.services.server_service import register_server
from src.utils.logger import logger


SEPARATOR = "=" * 60


def display_metric(metric):
    """
    Display collected metrics.
        metric: Metric object containing CPU, RAM and Disk usage.
    """

    logger.info(SEPARATOR)

    logger.info(f"Server       : {SERVER_NAME}")
    logger.info(f"Environment  : {ENVIRONMENT}")

    logger.info("-" * 60)

    logger.info(f"CPU Usage    : {metric.cpu_usage:.2f}%")
    logger.info(f"RAM Usage    : {metric.memory_usage:.2f}%")
    logger.info(f"Disk Usage   : {metric.disk_usage:.2f}%")

    logger.info(SEPARATOR)


def main():
    """
    Starts the monitoring agent.
    """

    logger.info(SEPARATOR)
    logger.info("Server Monitoring Agent Started")
    logger.info(SEPARATOR)

    logger.info(f"Server Name        : {SERVER_NAME}")
    logger.info(f"Environment        : {ENVIRONMENT}")
    logger.info(f"Collection Interval: {COLLECTION_INTERVAL} seconds")

    logger.info(SEPARATOR)
    # Register server once
    ValidationService.validate()
    server_id = register_server()
    logger.info(f"Server UUID  : {server_id}")
    try:

      while True:

            # Collect metrics
            metric = CollectorService.collect()

            # Upload metrics
            try:

                success = MetricsUploader.upload(
                    server_id,
                    metric
                )

                if success:
                    logger.info("Upload Status : SUCCESS")

                else:
                    logger.warning("Upload Status : FAILED")

            except Exception as error:

                logger.exception(
                    f"Upload Failed : {error}"
                )

            # ---------------------------------------
            # Display metrics
            # ---------------------------------------
            display_metric(metric)

            HeartbeatService.beat()

            time.sleep(COLLECTION_INTERVAL)
            # ---------------------------------------
            # Wait before next collection
            # ---------------------------------------
            time.sleep(COLLECTION_INTERVAL)


            
    except KeyboardInterrupt:

        logger.info("")
        logger.info("Monitoring Agent Stopped.")

    except Exception as error:

        logger.exception(f"Unexpected Error: {error}")


if __name__ == "__main__":
    main()
