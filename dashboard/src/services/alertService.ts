import { supabase } from "@/lib/supabase";
import { Alert, AlertWithServer } from "@/types/alert";

/**
 * Fetch active alerts with server details.
 */
export async function getActiveAlerts(): Promise<AlertWithServer[]> {
  const { data, error } = await supabase
    .from("alerts")
    .select(`
      id,
      server_id,
      metric_type,
      metric_value,
      message,
      severity,
      status,
      created_at,
      servers (
        hostname,
        environment
      )
    `)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching alerts:", error);
    return [];
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    server_id: row.server_id,
    metric_type: row.metric_type,
    metric_value: row.metric_value,
    message: row.message,
    severity: row.severity,
    status: row.status,
    created_at: row.created_at,
    server_name: row.servers?.hostname ?? "Unknown Server",
    environment: row.servers?.environment ?? "unknown",
  }));
}
