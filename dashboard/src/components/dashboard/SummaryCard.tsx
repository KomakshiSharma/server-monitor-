interface SummaryCardProps {
  title: string;
  value: string;
}

export default function SummaryCard({
  title,
  value,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-md">
      <p className="text-sm text-slate-400">{title}</p>

      <h3 className="mt-2 text-3xl font-bold text-white">
        {value}
      </h3>
    </div>
  );
}
