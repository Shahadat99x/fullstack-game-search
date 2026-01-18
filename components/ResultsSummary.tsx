interface ResultsSummaryProps {
  count: number;
}

export function ResultsSummary({ count }: ResultsSummaryProps) {
  return (
    <div className="flex items-center justify-between py-4 mb-2">
      <h2 className="text-sm font-medium text-[var(--text-secondary)]">
        Results found: <span className="text-white font-semibold">{count.toLocaleString()}</span>
      </h2>
    </div>
  );
}
