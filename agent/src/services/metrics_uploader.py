"""
Metrics Uploader

Uploads collected metrics to Supabase.
"""

from dataclasses import asdict

from src.database.supabase_client import supabase
from src.models.metric import Metric
from src.utils.logger import logger
from src.services.retry_service import RetryService

class MetricsUploader:
    """
    Uploads metrics to Supabase.
    """

    TABLE_NAME = "server_metrics"

    @staticmethod
    def upload(server_id: str, metric: Metric) -> bool:
        """
        Upload one metric snapshot.

        Parameters
        ----------
        server_id : str
            UUID of the server.

        metric : Metric
            Metric object.

        Returns
        -------
        bool
            True if upload succeeded,
            False otherwise.
        """

        try:

            data = asdict(metric)

            data["server_id"] = server_id

            (
                RetryService.execute(
   		 lambda:
	           supabase
        	   .table(MetricsUploader.TABLE_NAME)
        	   .insert(data)
        	   .execute()
)		
            )

            logger.info(
                "Metrics uploaded successfully."
            )

            return True

        except Exception as error:

            logger.exception(
                f"Failed to upload metrics: {error}"
            )

            return False
