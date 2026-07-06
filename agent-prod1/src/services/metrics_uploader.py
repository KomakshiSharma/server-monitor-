from src.database.supabase_client import supabase
from src.models.metric import Metric
from src.utils.logger import logger


class MetricsUploader:
    @staticmethod
    def upload(server_id: str, metric: Metric) -> bool:
        try:
            payload = {
                "server_id": server_id,
                "cpu_usage": metric.cpu_usage,
                "memory_usage": metric.memory_usage,
                "disk_usage": metric.disk_usage,
            }

            logger.info(
                f"[MetricsUploader] inserting payload: {payload}"
            )

            (
                supabase.table("server_metrics")
                .insert(payload)
                .execute()
            )

            logger.info(
                f"[MetricsUploader] upload successful for server_id={server_id}"
            )
            return True

        except Exception as error:
            logger.exception(
                f"[MetricsUploader] upload failed for server_id={server_id}: {error}"
            )
            return False
