interface AlertBadgeProps {
  severity: "warning" | "critical";
}

export default function AlertBadge({ severity }: AlertBadgeProps) {
  const isCritical = severity === "critical";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
        isCritical
          ? "bg-red-500/20 text-red-300 border border-red-500/30"
          : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
      }`}
    >
      {severity}
    </span>
  );
}
