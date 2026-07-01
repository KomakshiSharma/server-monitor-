"""
Logger Configuration
"""

import logging
import os

LOG_DIR = "logs"

os.makedirs(LOG_DIR, exist_ok=True)

logger = logging.getLogger("server-monitor")

logger.setLevel(logging.INFO)

formatter = logging.Formatter(
    "%(asctime)s | %(levelname)s | %(message)s"
)

# Console Handler
console_handler = logging.StreamHandler()
console_handler.setFormatter(formatter)

# File Handler
file_handler = logging.FileHandler(
    os.path.join(LOG_DIR, "agent.log")
)

file_handler.setFormatter(formatter)

if not logger.handlers:
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)
