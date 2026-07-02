"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  getServersWithLatestMetrics,
  getLatestMetricForServer,
} from "@/services/serverService";
import { ServerMetric, ServerWithLatestMetric } from "@/types/server";
import ServerCard from "./ServerCard";

export default function ServerGrid() {
  const [servers, setServers] = useState<ServerWithLatestMetric[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Initial load:
   * fetch all servers + latest metric for each one
   */
  async function loadServers() {
    setLoading(true);

    const data = await getServersWithLatestMetrics();

    setServers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadServers();
  }, []);

  /**
   * Realtime subscription:
   * whenever a new metric row is inserted into server_metrics,
   * update only the affected server card
   */
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

  if (loading) {
    return (
      <div className="p-8 text-slate-400">
        Loading server metrics...
      </div>
    );
  }

  if (servers.length === 0) {
    return (
      <div className="p-8 text-slate-400">
        No servers found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 p-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {servers.map((item) => (
        <ServerCard
          key={item.server.id}
          item={item}
        />
      ))}
    </div>
  );
}
