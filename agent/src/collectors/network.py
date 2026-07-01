"""
Network Collector

Collects network statistics.
"""

import psutil


class NetworkCollector:
    """
    Collect network I/O statistics.
    """

    @staticmethod
    def usage() -> dict:
        """
        Returns total bytes sent and received.
        """

        network = psutil.net_io_counters()

        return {
            "bytes_sent": network.bytes_sent,
            "bytes_received": network.bytes_recv
        }
