interface ResultsSummaryProps {
  count: number;
}

export function ResultsSummary({ count }: ResultsSummaryProps) {
  return (
    <div>
      <h2 className="text-base font-medium text-white/80">
        Results found: <span className="text-white font-semibold">{count}</span>
      </h2>
    </div>
  );
}
