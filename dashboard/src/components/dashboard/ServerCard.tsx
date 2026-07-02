import { ServerWithLatestMetric } from "@/types/server";

interface ServerCardProps {
  item: ServerWithLatestMetric;
}

export default function ServerCard({ item }: ServerCardProps) {
  const { server, latestMetric } = item;

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">
          {server.hostname}
        </h2>

        <p className="text-sm text-slate-400">
          {server.environment}
        </p>
      </div>

      {latestMetric ? (
        <div className="space-y-2 text-sm text-slate-200">
          <p>
            <span className="font-semibold text-white">CPU:</span>{" "}
            {latestMetric.cpu_usage.toFixed(2)}%
          </p>

          <p>
            <span className="font-semibold text-white">RAM:</span>{" "}
            {latestMetric.memory_usage.toFixed(2)}%
          </p>

          <p>
            <span className="font-semibold text-white">Disk:</span>{" "}
            {latestMetric.disk_usage.toFixed(2)}%
          </p>

          <p className="pt-2 text-xs text-slate-400">
            Last updated:{" "}
            {new Date(latestMetric.created_at).toLocaleTimeString()}
          </p>
        </div>
      ) : (
        <p className="text-sm text-slate-400">
          No metrics available yet.
        </p>
      )}
    </div>
  );
}
