interface BarProps {
  yes: number;
  no: number;
}

/* One row of the tally. .n-meter, not .n-progress: a vote share is a measurement that has
 * settled, not an operation in flight. See the .aire-meter comment in index.css for the
 * two contrast measurements behind the border and the step-10 fills.
 *
 * WCAG 1.4.1, and it is load-bearing rather than box-ticking here. nilam reports that at
 * hue 219.5 danger/ok collapse under deuteranopia at 0.0248 against a 0.09 floor — red and
 * green are ONE colour to roughly 1 in 12 men, and no hue assignment fixes it. So the row
 * is identified by the word "Yes" or "No" and by a fixed order (Yes always above No), and
 * the value is printed as a figure beside the bar. Delete the labels and the component
 * stops being accessible; the colour is the decoration, not the signal.
 *
 * role="meter" with the aria-value* trio, because a styled <div> carries no semantics of
 * its own and the percentage is the whole content. aria-valuetext gives a screen reader
 * "47 of 59, 80%" rather than a bare number. */
function Row({
  label,
  count,
  pct,
  variant,
}: {
  label: string;
  count: number;
  pct: number;
  variant: 'yes' | 'no';
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1 text-sm">
        <span className={`font-medium ${variant === 'yes' ? 'text-ok' : 'text-danger'}`}>
          {label}
        </span>
        {/* Tabular figures: these numbers change live, and proportional digits make the
            column jitter on every tally message. */}
        <span className="text-muted-foreground tabular-nums">
          {count} · {pct.toFixed(0)}%
        </span>
      </div>
      <div
        className={`n-meter aire-meter ${variant === 'yes' ? 'aire-meter-yes' : 'aire-meter-no'}`}
        role="meter"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${label}: ${count} votes, ${pct.toFixed(0)} percent`}
      >
        {/* inlineSize, not width. nilam declares `transition: inline-size var(--dur-3)` on
            .n-meter-fill, and naming the same property is what guarantees the live tally
            animates rather than jumping. nilam.base's reduced-motion rule cuts that
            transition to 0.01ms, which is correct — the bar moving is decoration; the
            figure beside it is the information. */}
        <div className="n-meter-fill" style={{ inlineSize: `${pct}%` }} />
      </div>
    </div>
  );
}

export function Bar({ yes, no }: BarProps) {
  const total = yes + no;
  const yesPct = total === 0 ? 0 : (yes / total) * 100;
  const noPct = total === 0 ? 0 : (no / total) * 100;

  return (
    <div className="n-stack gap-2">
      <Row label="Yes" count={yes} pct={yesPct} variant="yes" />
      <Row label="No" count={no} pct={noPct} variant="no" />
    </div>
  );
}
