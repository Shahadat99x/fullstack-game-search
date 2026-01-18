interface ResultsSummaryProps {
  count: number;
}

export function ResultsSummary({ count }: ResultsSummaryProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <p className="text-sm text-gray-400">
        Results found: <span className="font-semibold text-white">{count.toLocaleString()}</span>
      </p>
    </div>
  );
}
