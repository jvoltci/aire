import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPoll, type Poll, type Tally } from '../lib/api';
import { openPollSocket } from '../lib/ws';
import { Bar } from '../components/Bar';
import { PollSkeleton } from '../components/PollSkeleton';

export function Results() {
  const { id = '' } = useParams();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [tally, setTally] = useState<Tally | null>(null);
  const [status, setStatus] = useState<'connecting' | 'live' | 'offline'>('connecting');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getPoll(id)
      .then((p) => { if (!cancelled) setPoll(p); })
      .catch((e) => { if (!cancelled) setError((e as Error).message); });
    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    if (!poll) return;
    const s = openPollSocket(
      poll.id,
      (m) => {
        if (m.type === 'init') setTally(m.tally);
        else if (m.type === 'tally') setTally(m.tally);
      },
      (st) => {
        if (st === 'open') setStatus('live');
        else if (st === 'closed' || st === 'error') setStatus('offline');
      },
    );
    return () => s.close();
  }, [poll]);

  const voteUrl = `${location.origin}${location.pathname}#/p/${id}`;
  const share = async () => {
    try {
      await navigator.clipboard.writeText(voteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  };

  if (error) {
    return (
      <div className="n-note n-note-danger" role="alert">
        <span className="n-note-glyph" aria-hidden="true">×</span>
        <div>
          <span className="n-note-title">These results are not available.</span> {error}{' '}
          <Link to="/" className="n-link">Create a new poll</Link>.
        </div>
      </div>
    );
  }
  if (!poll) return <PollSkeleton rows={2} />;

  return (
    <div className="n-stack gap-6">
      <header className="flex items-start justify-between gap-4">
        <div className="n-stack gap-2">
          {poll.title && <h1 className="text-2xl font-semibold">{poll.title}</h1>}
          <div className="n-cluster text-sm text-muted-foreground">
            {/* The connection state as a .n-badge WITH a glyph, and the glyph is required
                rather than decorative. nilam reports BRAND/ok collapsing under tritanopia
                at hue 219.5 (0.0333 against a 0.09 floor) and warn/ok collapsing under
                both protanopia and deuteranopia — so a green pill sitting next to a teal
                brand mark, distinguished only by hue, is exactly the case that fails. The
                ✓ / ! and the words carry it.

                This replaced a 6px coloured dot, which had nowhere to put a glyph. */}
            <StatusBadge status={status} />
            {/* Tabular figures: this number changes on every tally message, and
                proportional digits shift the whole row when it crosses 9 -> 10. */}
            <span className="tabular-nums">
              {tally?.total ?? 0} {tally?.total === 1 ? 'vote' : 'votes'}
            </span>
          </div>
        </div>
        <button onClick={share} className="n-btn n-btn-sm">
          {copied ? 'Copied ✓' : 'Share'}
        </button>
        {/* The clipboard result announced to a screen reader, which a visual label change
            alone does not do. */}
        <span className="n-sr-only" role="status">
          {copied ? 'Vote link copied to the clipboard' : ''}
        </span>
      </header>

      {/* .n-bar and not .n-progress or .n-skeleton, on purpose. The socket handshake is a
          wait of UNKNOWN duration affecting the whole panel — exactly the question .n-bar
          answers. .n-progress would have to invent a proportion, and .n-skeleton would
          claim the cards below had not arrived when they have and only the tally is
          pending. Removed once the socket is open rather than parked at 100%.

          Under prefers-reduced-motion nilam.motion turns the travelling bar into a
          full-width opacity pulse instead of freezing it, because a frozen loader reads as
          a hung app. Not defeated here. */}
      {status !== 'live' && (
        <div
          className="n-bar"
          role="progressbar"
          aria-label={status === 'connecting' ? 'Connecting to live results' : 'Reconnecting'}
        />
      )}

      <div className="n-stack gap-4">
        {poll.questions.map((q, i) => {
          const c = tally?.counts[String(i)] ?? { yes: 0, no: 0 };
          return (
            <div key={i} className="n-card n-card-pad n-stack gap-3">
              <h2 className="font-medium text-neutral-12">{q}</h2>
              <Bar yes={c.yes} no={c.no} />
            </div>
          );
        })}
      </div>

      <div>
        <Link to={`/p/${id}`} className="n-link text-sm">
          ← Back to vote
        </Link>
      </div>
    </div>
  );
}

/* Three states, three nilam status families, each carrying its own glyph. `offline` is
 * warn and not danger because ws.ts reconnects with exponential backoff by itself — the
 * app is not broken, it is waiting, and spending `danger` on a recoverable state leaves
 * nothing louder to say when something really has failed. */
function StatusBadge({ status }: { status: 'connecting' | 'live' | 'offline' }) {
  if (status === 'live') {
    return (
      <span className="n-badge n-badge-ok">
        <i className="n-badge-glyph" aria-hidden="true">✓</i>
        Live
      </span>
    );
  }
  if (status === 'offline') {
    return (
      <span className="n-badge n-badge-warn">
        <i className="n-badge-glyph" aria-hidden="true">!</i>
        Reconnecting…
      </span>
    );
  }
  /* A spinner and not a glyph, because this state IS a wait. .n-spinner-sm is the inline
     size, which is the one that fits inside a badge. */
  return (
    <span className="n-badge">
      <span className="n-spinner n-spinner-sm" aria-hidden="true" />
      Connecting…
    </span>
  );
}
