from dataclasses import dataclass


@dataclass(slots=True)
class Metric:
    """
    Represents one snapshot of server metrics.
    """

    cpu_usage: float

    memory_usage: float

    disk_usage: float
