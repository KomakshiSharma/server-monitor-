"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getServerMetricHistory } from "@/services/serverService";
import { Server, ServerMetric, TrendPoint } from "@/types/server";
import MetricChart from "./MetricChart";

interface ServerTrendsProps {
  servers: Server[];
}

export default function ServerTrends({
  servers,
}: ServerTrendsProps) {
  const [selectedServerId, setSelectedServerId] = useState("");
  const [historyLimit, setHistoryLimit] = useState(20);
  const [trendData, setTrendData] = useState<TrendPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (servers.length > 0 && !selectedServerId) {
      setSelectedServerId(servers[0].id);
    }
  }, [servers, selectedServerId]);

  useEffect(() => {
    if (!selectedServerId) return;

    async function loadHistory() {
      setLoading(true);

      const history = await getServerMetricHistory(
        selectedServerId,
        historyLimit
      );

      setTrendData(history);
      setLoading(false);
    }

    loadHistory();
  }, [selectedServerId, historyLimit]);

  useEffect(() => {
    if (!selectedServerId) return;

    const channel = supabase
      .channel(`server-trends-${selectedServerId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "server_metrics",
        },
        async (payload) => {
          const newMetric = payload.new as ServerMetric;

          if (newMetric.server_id !== selectedServerId) return;

          const history = await getServerMetricHistory(
            selectedServerId,
            historyLimit
          );

          setTrendData(history);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedServerId, historyLimit]);

  const selectedServer =
    servers.find((server) => server.id === selectedServerId) ?? null;

  return (
    <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Server Trends
          </h2>
          <p className="text-sm text-slate-400">
            Historical CPU, RAM, and Disk usage for the selected server
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div>
            <label className="mb-1 block text-sm text-slate-400">
              Server
            </label>
            <select
              value={selectedServerId}
              onChange={(e) => setSelectedServerId(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none"
            >
              {servers.map((server) => (
                <option key={server.id} value={server.id}>
                  {server.hostname} ({server.environment})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-400">
              History
            </label>
            <select
              value={historyLimit}
              onChange={(e) => setHistoryLimit(Number(e.target.value))}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none"
            >
              <option value={20}>Last 20 points</option>
              <option value={50}>Last 50 points</option>
              <option value={100}>Last 100 points</option>
            </select>
          </div>
        </div>
      </div>

      {selectedServer && (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="text-lg font-semibold text-white">
            {selectedServer.hostname}
          </h3>
          <p className="text-sm text-slate-400">
            {selectedServer.environment}
          </p>
        </div>
      )}

      {loading ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          Loading server trends...
        </div>
      ) : trendData.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          No trend data available for this server.
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-1">
          <MetricChart
            title="CPU Usage Trend"
            dataKey="cpu"
            data={trendData}
          />

          <MetricChart
            title="RAM Usage Trend"
            dataKey="memory"
            data={trendData}
          />

          <MetricChart
            title="Disk Usage Trend"
            dataKey="disk"
            data={trendData}
          />
        </div>
      )}
    </div>
  );
}
