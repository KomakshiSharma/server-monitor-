# Database Design

## Servers

Represents a monitored machine.

Fields:

- id
- hostname
- environment
- created_at

Example:

prod-server-1
prod-server-2


## Server Metrics

Stores server statistics.

Fields:

- cpu_usage
- ram_usage
- disk_usage
- created_at



## Alerts

Stores threshold violations.

Fields:

- severity
- message
- resolved
