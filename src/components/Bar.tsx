interface BarProps {
  yes: number;
  no: number;
}

export function Bar({ yes, no }: BarProps) {
  const total = yes + no;
  const yesPct = total === 0 ? 0 : (yes / total) * 100;
  const noPct = total === 0 ? 0 : (no / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3 text-sm">
        <div className="flex-1 min-w-0">
          <div className="flex justify-between mb-1">
            <span className="text-(--color-yes) font-medium">Yes</span>
            <span className="text-(--color-muted) tabular-nums">
              {yes} · {yesPct.toFixed(0)}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-(--color-surface-2) overflow-hidden">
            <div
              className="h-full bg-(--color-yes) transition-[width] duration-500 ease-out"
              style={{ width: `${yesPct}%` }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <div className="flex-1 min-w-0">
          <div className="flex justify-between mb-1">
            <span className="text-(--color-no) font-medium">No</span>
            <span className="text-(--color-muted) tabular-nums">
              {no} · {noPct.toFixed(0)}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-(--color-surface-2) overflow-hidden">
            <div
              className="h-full bg-(--color-no) transition-[width] duration-500 ease-out"
              style={{ width: `${noPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
