import { supabase } from "@/lib/supabase";
import { AlertWithServer } from "@/types/alert";

interface AlertRow {
  id: number;
  server_id: string;
  metric_type: "cpu" | "memory" | "disk";
  metric_value: number;
  message: string;
  severity: "warning" | "critical";
  status: "active" | "resolved";
  created_at: string;
  resolved_at?: string | null;
}

interface ServerRow {
  id: string;
  hostname: string;
  environment: string;
}

/**
 * Fetch active alerts and manually attach server info.
 * This avoids Supabase relation/join issues on alerts -> servers.
 */
export async function getActiveAlerts(): Promise<AlertWithServer[]> {
  const { data: alertRows, error: alertError } = await supabase
    .from("alerts")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (alertError) {
    console.error("Error fetching alerts table:", {
     message: alertError?.message,
     details: alertError?.details,
     hint: alertError?.hint,
     code: alertError?.code,
     name: alertError?.name,
     full: alertError,
  });
  }

  const { data: serverRows, error: serverError } = await supabase
    .from("servers")
    .select("id, hostname, environment");

  if (serverError) {
    console.error("Error fetching servers for alerts:", serverError);
    return [];
  }

  const alerts = (alertRows ?? []) as AlertRow[];
  const servers = (serverRows ?? []) as ServerRow[];

  const serverMap = new Map(
    servers.map((server) => [server.id, server])
  );

  return alerts.map((alert) => {
    const server = serverMap.get(alert.server_id);

    return {
      id: alert.id,
      server_id: alert.server_id,
      metric_type: alert.metric_type,
      metric_value: alert.metric_value,
      message: alert.message,
      severity: alert.severity,
      status: alert.status,
      created_at: alert.created_at,
      resolved_at: alert.resolved_at ?? null,
      server_name: server?.hostname ?? "Unknown Server",
      environment: server?.environment ?? "unknown",
    };
  });
}
