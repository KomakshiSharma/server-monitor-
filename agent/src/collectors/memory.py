"""
Memory Collector

Collects RAM usage information from the operating system.
"""

import psutil


class MemoryCollector:
    """
    Memory metrics collector.
    """

    @staticmethod
    def usage() -> float:
        """
        Returns RAM usage percentage.

        Returns:
            float
        """

        memory = psutil.virtual_memory()

        return round(memory.percent, 2)
