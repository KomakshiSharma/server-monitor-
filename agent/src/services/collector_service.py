from src.collectors.cpu import CPUCollector
from src.models.metric import Metric


class CollectorService:

    @staticmethod
    def collect() -> Metric:

        cpu = CPUCollector.usage()

        metric = Metric(
            cpu_usage=cpu
        )

        return metric
