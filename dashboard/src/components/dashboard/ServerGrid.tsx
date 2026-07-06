"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  buildDashboardSummary,
  getServersWithLatestMetrics,
} from "@/services/serverService";
import {
  ServerMetric,
  ServerWithLatestMetric,
} from "@/types/server";
import SummaryCards from "./SummaryCards";
import ServerCard from "./ServerCard";
import ServerTrends from "./ServerTrends";
import AlertsPanel from "./AlertsPanel";

export default function ServerGrid() {
  const [servers, setServers] = useState<ServerWithLatestMetric[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadServers() {
    setLoading(true);

    const data = await getServersWithLatestMetrics();
    console.log("Fetched servers with latest metrics:", data);

    setServers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadServers();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("server-metrics-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "server_metrics",
        },
        async (payload) => {
          const newMetric = payload.new as ServerMetric;

          setServers((prev) =>
            prev.map((item) =>
              item.server.id === newMetric.server_id
                ? {
                    ...item,
                    latestMetric: newMetric,
                  }
                : item
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const summary = useMemo(() => {
    return buildDashboardSummary(servers);
  }, [servers]);

  if (loading) {
    return (
      <div className="p-8 text-slate-400">
        Loading server metrics...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <SummaryCards summary={summary} />

      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-white">
            Servers
          </h2>
          <p className="text-sm text-slate-400">
            Latest health snapshot for each registered server
          </p>
        </div>

        {servers.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
            No servers found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {servers.map((item) => (
              <ServerCard
                key={item.server.id}
                item={item}
              />
            ))}
          </div>
        )}
      </div>

      <ServerTrends servers={servers.map((item) => item.server)} />

      <AlertsPanel />
    </div>
  );
}
