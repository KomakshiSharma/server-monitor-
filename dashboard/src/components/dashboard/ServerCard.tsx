import { ServerWithLatestMetric } from "@/types/server";

interface ServerCardProps {
  item: ServerWithLatestMetric;
}

function getStatus(
  cpu: number,
  memory: number,
  disk: number
): "HEALTHY" | "WARNING" | "CRITICAL" {
  const maxUsage = Math.max(cpu, memory, disk);

  if (maxUsage >= 85) return "CRITICAL";
  if (maxUsage >= 70) return "WARNING";
  return "HEALTHY";
}

function getStatusClasses(status: "HEALTHY" | "WARNING" | "CRITICAL") {
  if (status === "CRITICAL") {
    return "bg-red-500/20 text-red-400 border border-red-500/30";
  }

  if (status === "WARNING") {
    return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
  }

  return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
}

function getBarColor(value: number) {
  if (value >= 85) return "bg-red-500";
  if (value >= 70) return "bg-yellow-500";
  return "bg-emerald-500";
}

function MetricBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-medium text-white">
          {value.toFixed(2)}%
        </span>
      </div>

      <div className="h-2 w-full rounded-full bg-slate-800">
        <div
          className={`h-2 rounded-full ${getBarColor(value)}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}

export default function ServerCard({ item }: ServerCardProps) {
  const { server, latestMetric } = item;

  if (!latestMetric) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-md">
        <div className="mb-3">
          <h2 className="text-xl font-bold text-white">
            {server.hostname}
          </h2>
          <p className="text-sm text-slate-400">
            {server.environment}
          </p>
        </div>

        <p className="text-sm text-slate-400">
          No metrics available yet.
        </p>
      </div>
    );
  }

  const status = getStatus(
    latestMetric.cpu_usage,
    latestMetric.memory_usage,
    latestMetric.disk_usage
  );

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-md">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">
            {server.hostname}
          </h2>

          <p className="text-sm text-slate-400">
            {server.environment}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
            status
          )}`}
        >
          {status}
        </span>
      </div>

      <div className="space-y-4">
        <MetricBar
          label="CPU"
          value={latestMetric.cpu_usage}
        />

        <MetricBar
          label="RAM"
          value={latestMetric.memory_usage}
        />

        <MetricBar
          label="Disk"
          value={latestMetric.disk_usage}
        />
      </div>

      <p className="mt-5 text-xs text-slate-400">
        Last updated:{" "}
        {new Date(latestMetric.created_at).toLocaleTimeString()}
      </p>
    </div>
  );
}
