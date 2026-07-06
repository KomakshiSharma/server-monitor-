"""
Disk Collector

Collects disk usage information.
"""

import psutil


class DiskCollector:
    """
    Disk metrics collector.
    """

    @staticmethod
    def usage() -> float:
        """
        Returns root partition disk usage percentage.
        """

        disk = psutil.disk_usage("/")

        return round(disk.percent, 2)

