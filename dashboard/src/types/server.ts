export interface Server {
  id: string;
  hostname: string;
  environment: string;
  created_at?: string;
}

export interface ServerMetric {
  id: string;
  server_id: string;
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  created_at: string;
}

export interface ServerWithLatestMetric {
  server: Server;
  latestMetric: ServerMetric | null;
}

export interface DashboardSummary{
  totalServers: number;
  avgCpu: number;
  avgMemory: number;
  avgDisk: number;
}
