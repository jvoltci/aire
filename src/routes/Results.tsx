import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPoll, type Poll, type Tally } from '../lib/api';
import { openPollSocket } from '../lib/ws';
import { Bar } from '../components/Bar';

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

  if (error) return <div className="text-(--color-no)">{error}</div>;
  if (!poll) return <div className="text-(--color-muted)">Loading…</div>;

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          {poll.title && <h1 className="text-2xl font-semibold">{poll.title}</h1>}
          <div className="flex items-center gap-2 mt-1 text-sm text-(--color-muted)">
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                status === 'live'
                  ? 'bg-(--color-yes)'
                  : status === 'offline'
                    ? 'bg-(--color-no)'
                    : 'bg-(--color-muted)'
              }`}
            />
            <span>{status === 'live' ? 'Live' : status === 'offline' ? 'Reconnecting…' : 'Connecting…'}</span>
            <span>·</span>
            <span className="tabular-nums">{tally?.total ?? 0} votes</span>
          </div>
        </div>
        <button
          onClick={share}
          className="text-sm px-3 py-1.5 rounded-md border border-(--color-border) hover:border-(--color-accent) hover:text-(--color-accent) transition"
        >
          {copied ? 'Copied!' : 'Share'}
        </button>
      </header>

      <div className="space-y-4">
        {poll.questions.map((q, i) => {
          const c = tally?.counts[String(i)] ?? { yes: 0, no: 0 };
          return (
            <div key={i} className="p-4 rounded-xl bg-(--color-surface) border border-(--color-border)">
              <div className="mb-3 font-medium">{q}</div>
              <Bar yes={c.yes} no={c.no} />
            </div>
          );
        })}
      </div>

      <div className="pt-2">
        <Link
          to={`/p/${id}`}
          className="text-sm text-(--color-accent) hover:underline"
        >
          ← Back to vote
        </Link>
      </div>
    </div>
  );
}
