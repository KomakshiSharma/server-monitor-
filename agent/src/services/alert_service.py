from src.database.supabase_client import supabase
from src.models.metric import Metric
from src.utils.logger import logger


class AlertService:
    CPU_WARNING_THRESHOLD = 80
    MEMORY_WARNING_THRESHOLD = 90
    DISK_WARNING_THRESHOLD = 90

    @staticmethod
    def check_and_create_alerts(server_id: str, metric: Metric) -> None:
        """
        Check all metric thresholds and create alerts if needed.
        Prevent duplicate active alerts for the same server + metric type.
        """

        AlertService._check_metric(
            server_id=server_id,
            metric_type="cpu",
            metric_value=metric.cpu_usage,
            threshold=AlertService.CPU_WARNING_THRESHOLD,
        )

        AlertService._check_metric(
            server_id=server_id,
            metric_type="memory",
            metric_value=metric.memory_usage,
            threshold=AlertService.MEMORY_WARNING_THRESHOLD,
        )

        AlertService._check_metric(
            server_id=server_id,
            metric_type="disk",
            metric_value=metric.disk_usage,
            threshold=AlertService.DISK_WARNING_THRESHOLD,
        )

    @staticmethod
    def _check_metric(
        server_id: str,
        metric_type: str,
        metric_value: float,
        threshold: float,
    ) -> None:
        """
        Create an alert only if:
        - metric_value crosses threshold
        - there is no active alert already for that server + metric_type
        """

        if metric_value < threshold:
            return

        existing = (
            supabase.table("alerts")
            .select("*")
            .eq("server_id", server_id)
            .eq("metric_type", metric_type)
            .eq("status", "active")
            .execute()
        )

        if existing.data and len(existing.data) > 0:
            logger.info(
                f"[AlertService] Active {metric_type} alert already exists "
                f"for server_id={server_id}. Skipping duplicate."
            )
            return

        severity = AlertService._get_severity(metric_value)
        message = AlertService._build_message(metric_type, metric_value, threshold)

        payload = {
            "server_id": server_id,
            "metric_type": metric_type,
            "metric_value": metric_value,
            "message": message,
            "severity": severity,
            "status": "active",
        }

        try:
            (
                supabase.table("alerts")
                .insert(payload)
                .execute()
            )

            logger.warning(
                f"[AlertService] Created {metric_type.upper()} alert "
                f"for server_id={server_id} | value={metric_value:.2f}%"
            )

        except Exception as error:
            logger.exception(
                f"[AlertService] Failed to create alert: {error}"
            )

    @staticmethod
    def _get_severity(metric_value: float) -> str:
        """
        Simple severity model:
        - 80-89.99 => warning
        - 90+ => critical
        """
        if metric_value >= 90:
            return "critical"
        return "warning"

    @staticmethod
    def _build_message(
        metric_type: str,
        metric_value: float,
        threshold: float,
    ) -> str:
        return (
            f"{metric_type.upper()} usage is {metric_value:.2f}% "
            f"(threshold: {threshold:.2f}%)"
        )
