import time

from src.config.settings import (
    SERVER_NAME,
    ENVIRONMENT,
    COLLECTION_INTERVAL,
)
from src.services.collector_service import CollectorService
from src.services.metrics_uploader import MetricsUploader
from src.services.server_service import register_server
from src.utils.logger import logger


def display_metric(metric):
    print("\n" + "=" * 60)
    print(f"Server       : {SERVER_NAME}")
    print(f"Environment  : {ENVIRONMENT}")
    print("-" * 60)
    print(f"CPU Usage    : {metric.cpu_usage:.2f}%")
    print(f"RAM Usage    : {metric.memory_usage:.2f}%")
    print(f"Disk Usage   : {metric.disk_usage:.2f}%")
    print("=" * 60 + "\n")


def main():
    logger.info("==============================================")
    logger.info("Starting monitoring agent")
    logger.info(f"SERVER_NAME         = {SERVER_NAME}")
    logger.info(f"ENVIRONMENT         = {ENVIRONMENT}")
    logger.info(f"COLLECTION_INTERVAL = {COLLECTION_INTERVAL}")
    logger.info("==============================================")

    server_id = register_server()
    logger.info(f"[{SERVER_NAME}] ACTIVE SERVER ID = {server_id}")

    while True:
        try:
            metric = CollectorService.collect()

            logger.info(
                f"[{SERVER_NAME}] Uploading metric using server_id={server_id}"
            )

            success = MetricsUploader.upload(server_id, metric)

            if success:
                logger.info(f"[{SERVER_NAME}] Upload Status: SUCCESS")
            else:
                logger.warning(f"[{SERVER_NAME}] Upload Status: FAILED")

            display_metric(metric)

        except Exception as error:
            logger.exception(f"[{SERVER_NAME}] Unexpected Error: {error}")

        time.sleep(COLLECTION_INTERVAL)


if __name__ == "__main__":
    main()
