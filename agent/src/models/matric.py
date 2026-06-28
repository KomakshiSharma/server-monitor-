from dataclasses import dataclass


@dataclass(slots=True)
class Metric:
    cpu_usage: float
