from src.models.metric import Metric
from src.services.metrics_uploader import MetricsUploader
from src.services.server_service import register_server

server_id = register_server()

metric = Metric(
    cpu_usage=20.5,
    memory_usage=54.3,
    disk_usage=71.8
)

MetricsUploader.upload(
    server_id,
    metric
)
