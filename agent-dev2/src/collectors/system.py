"""
System Collector

Collects system uptime.
"""

import time
import psutil


class SystemCollector:

    @staticmethod
    def uptime() -> float:
        """
        Returns system uptime in seconds.
        """

        return round(
            time.time() - psutil.boot_time(),
            2
        )
