import { DashboardSummary } from "@/types/server";
import SummaryCard from "./SummaryCard";

interface SummaryCardsProps {
  summary: DashboardSummary;
}

export default function SummaryCards({
  summary,
}: SummaryCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Servers"
        value={summary.totalServers.toString()}
      />

      <SummaryCard
        title="Avg CPU Usage"
        value={`${summary.avgCpu.toFixed(2)}%`}
      />

      <SummaryCard
        title="Avg RAM Usage"
        value={`${summary.avgMemory.toFixed(2)}%`}
      />

      <SummaryCard
        title="Avg Disk Usage"
        value={`${summary.avgDisk.toFixed(2)}%`}
      />
    </div>
  );
}
