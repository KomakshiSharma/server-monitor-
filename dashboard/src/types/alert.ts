export interface Alert {
  id: number;
  server_id: string;
  metric_type: "cpu" | "memory" | "disk";
  metric_value: number;
  message: string;
  severity: "warning" | "critical";
  status: "active" | "resolved";
  created_at: string;
}

export interface AlertWithServer extends Alert {
  server_name: string;
  environment?: string;
}
