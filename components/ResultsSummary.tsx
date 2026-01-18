interface ResultsSummaryProps {
  count: number;
}

export function ResultsSummary({ count }: ResultsSummaryProps) {
  return (
    <div className="py-4 mb-4">
      <h2 className="text-sm font-medium text-white/80">
        Results found: <span className="text-white font-semibold">{count}</span>
      </h2>
    </div>
  );
}
