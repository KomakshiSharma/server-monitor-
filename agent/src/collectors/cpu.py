import psutil


class CPUCollector:
    """
    Collects CPU metrics.
    """

    @staticmethod
    def usage() -> float:
        """
        Return CPU usage percentage.
        """

        value = psutil.cpu_percent(
            interval=1
        )

        return round(value, 2)
