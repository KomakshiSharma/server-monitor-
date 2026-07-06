"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { AlertWithServer } from "@/types/alert";
import { getActiveAlerts } from "@/services/alertService";
import AlertCard from "./AlertCard";

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState<AlertWithServer[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAlerts() {
    setLoading(true);
    const data = await getActiveAlerts();
    setAlerts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadAlerts();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("alerts-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "alerts",
        },
        async () => {
          // easiest + safest approach:
          // refetch alerts whenever a new alert is inserted
          await loadAlerts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Active Alerts
        </h2>
        <p className="text-sm text-slate-400">
          Current warning and critical issues detected across monitored servers
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          Loading alerts...
        </div>
      ) : alerts.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          No active alerts right now.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </section>
  );
}
