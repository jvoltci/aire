/* The loading state for Vote and Results.
 *
 * .n-skeleton and not .n-spinner, because the shape IS known: every poll renders as a
 * stack of cards, each a question line above two full-width rows. nilam's own guidance —
 * "prefer .n-skeleton wherever the shape is predictable. A spinner tells the reader
 * nothing about what is arriving; a skeleton tells them where to look when it does."
 *
 * It is NOT .n-bar either: a bar answers "something is happening" for the whole panel,
 * and here something more specific can be said.
 *
 * The count is a guess (the question count is not known until the fetch returns), so this
 * takes `rows` and the caller passes what it expects. Two is the honest default — most
 * polls are short, and a skeleton that overstates the length is worse than one that
 * understates it, because content shifting UP as it loads is more disorienting than
 * content growing down.
 *
 * aria-hidden on the shapes and one role="status" with real text above them: a screen
 * reader gets "Loading poll…" once, not twelve announcements about grey rectangles.
 * Under prefers-reduced-motion nilam.motion keeps these breathing on opacity rather than
 * freezing them — a frozen skeleton reads as content that has arrived and is blank. */
export function PollSkeleton({ rows = 2 }: { rows?: number }) {
  return (
    <div className="n-stack gap-6">
      <span className="n-loading" role="status">
        Loading poll…
      </span>

      <div className="n-stack gap-4" aria-hidden="true">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="n-card n-card-pad n-stack gap-3">
            {/* The question line. Deliberately not full width — a heading never is. */}
            <div className="n-skeleton h-5 w-3/5" />
            <div className="n-skeleton h-2 w-full" />
            <div className="n-skeleton h-2 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
