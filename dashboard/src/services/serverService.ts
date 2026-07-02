import { supabase } from "@/lib/supabase";
import {
  Server,
  ServerMetric,
  ServerWithLatestMetric,
} from "@/types/server";

/**
 * Fetch all servers from Supabase
 */
export async function getServers(): Promise<Server[]> {
  const { data, error } = await supabase
    .from("servers")
    .select("*")
    .order("hostname", { ascending: true });

  if (error) {
    console.error("Error fetching servers:", error);
    return [];
  }

  return data ?? [];
}

/**
 * Fetch latest metric for one server
 */
export async function getLatestMetricForServer(
  serverId: string
): Promise<ServerMetric | null> {
  const { data, error } = await supabase
    .from("server_metrics")
    .select("*")
    .eq("server_id", serverId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching latest metric for ${serverId}:`, error);
    return null;
  }

  return data ?? null;
}

/**
 * Fetch all servers + latest metric for each server
 */
export async function getServersWithLatestMetrics(): Promise<
  ServerWithLatestMetric[]
> {
  const servers = await getServers();

  const results = await Promise.all(
    servers.map(async (server) => {
      const latestMetric = await getLatestMetricForServer(server.id);

      return {
        server,
        latestMetric,
      };
    })
  );

  return results;
}
