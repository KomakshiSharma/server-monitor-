import AlertBadge from "./AlertBadge";
import { AlertWithServer } from "@/types/alert";

interface AlertCardProps {
  alert: AlertWithServer;
}

function formatMetricType(metricType: string) {
  if (metricType === "cpu") return "CPU";
  if (metricType === "memory") return "Memory";
  if (metricType === "disk") return "Disk";
  return metricType;
}

function formatTime(timestamp: string) {
  return new Date(timestamp).toLocaleString();
}

export default function AlertCard({ alert }: AlertCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {alert.server_name}
          </h3>
          <p className="text-sm text-slate-400">
            {alert.environment}
          </p>
        </div>

        <AlertBadge severity={alert.severity} />
      </div>

      <div className="space-y-2">
        <p className="text-sm text-slate-300">
          <span className="font-medium text-white">
            {formatMetricType(alert.metric_type)}
          </span>{" "}
          alert
        </p>

        <p className="text-sm text-slate-300">
          {alert.message}
        </p>

        <p className="text-sm text-slate-400">
          Current value:{" "}
          <span className="font-medium text-white">
            {alert.metric_value.toFixed(2)}%
          </span>
        </p>

        <p className="text-xs text-slate-500">
          Created at: {formatTime(alert.created_at)}
        </p>
      </div>
    </div>
  );
}
