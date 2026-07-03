import {supabase} from "@/lib/supabase";
import {
  DashboardSummary,
  Server,
  ServerMetric,
  ServerWithLatestMetric,
  TrendPoint,
 }
  from "@/types/server";

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

/**
 * Build summary metrics from latest server metrics
 */
export function buildDashboardSummary(
  servers: ServerWithLatestMetric[]
): DashboardSummary {
  const totalServers = servers.length;

  const metrics = servers
    .map((item) => item.latestMetric)
    .filter((metric): metric is ServerMetric => metric !== null);

  if (metrics.length === 0) {
    return {
      totalServers,
      avgCpu: 0,
      avgMemory: 0,
      avgDisk: 0,
    };
  }

  const totalCpu = metrics.reduce((sum, metric) => sum + metric.cpu_usage, 0);
  const totalMemory = metrics.reduce(
    (sum, metric) => sum + metric.memory_usage,
    0
  );
  const totalDisk = metrics.reduce((sum, metric) => sum + metric.disk_usage, 0);

  return {
    totalServers,
    avgCpu: totalCpu / metrics.length,
    avgMemory: totalMemory / metrics.length,
    avgDisk: totalDisk / metrics.length,
  };
}
/**
 *Fetch metric history for one server
 */
export async function getServerMetricHistory(
  serverId: string,
  limit = 20
): Promise<TrendPoint[]>{
  const{data, error} = await supabase
     .from("server_metrics")
     .select("*")
     .eq("server_id",serverId)
     .order("created_at",{asending: false})
     .limit(limit);
  if(error){
     console.error('Error fetching history for ${serverId}:',error);
     return [];
 }

  const rows = (data ?? []).reverse();

  return rows.map((row) => ({
    time: new Date(row.created_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    fullTime: new Date(row.created_at).toLocaleString(),
    cpu: row.cpu_usage,
    memory: row.memory_usage,
    disk: row.disk_usage,
  }));
}
