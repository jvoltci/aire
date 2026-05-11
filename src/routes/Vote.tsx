import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPoll, type Poll } from '../lib/api';
import { openPollSocket, type PollSocket } from '../lib/ws';
import { getVoterId } from '../lib/voter';

export function Vote() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [answers, setAnswers] = useState<Record<string, 'yes' | 'no'>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<PollSocket | null>(null);

  useEffect(() => {
    let cancelled = false;
    getPoll(id)
      .then((p) => { if (!cancelled) setPoll(p); })
      .catch((e) => { if (!cancelled) setError((e as Error).message); });
    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    if (!poll) return;
    const s = openPollSocket(poll.id, (m) => {
      if (m.type === 'voted') navigate(`/p/${poll.id}/results`, { replace: true });
      else if (m.type === 'error') {
        if (m.message === 'already voted') navigate(`/p/${poll.id}/results`, { replace: true });
        else { setError(m.message); setSubmitting(false); }
      }
    });
    setSocket(s);
    return () => s.close();
  }, [poll, navigate]);

  const allAnswered = useMemo(
    () => poll != null && poll.questions.every((_, i) => answers[String(i)] != null),
    [poll, answers],
  );

  const submit = () => {
    if (!poll || !socket || !allAnswered) return;
    setSubmitting(true);
    setError(null);
    socket.send({ type: 'vote', voterId: getVoterId(), answers });
  };

  if (error && !poll) return <div className="text-(--color-no)">{error}</div>;
  if (!poll) return <div className="text-(--color-muted)">Loading…</div>;

  return (
    <div className="space-y-6">
      <header>
        {poll.title && <h1 className="text-2xl font-semibold">{poll.title}</h1>}
        <p className="text-(--color-muted) text-sm mt-1">
          Cast your vote. Live results update in real time.
        </p>
      </header>

      <div className="space-y-4">
        {poll.questions.map((q, i) => {
          const key = String(i);
          const value = answers[key];
          return (
            <div key={i} className="p-4 rounded-xl bg-(--color-surface) border border-(--color-border)">
              <div className="mb-3 font-medium">{q}</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAnswers((a) => ({ ...a, [key]: 'yes' }))}
                  className={`py-2.5 rounded-lg border font-medium transition ${
                    value === 'yes'
                      ? 'bg-(--color-yes) text-black border-transparent'
                      : 'bg-transparent text-(--color-yes) border-(--color-border) hover:border-(--color-yes)'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setAnswers((a) => ({ ...a, [key]: 'no' }))}
                  className={`py-2.5 rounded-lg border font-medium transition ${
                    value === 'no'
                      ? 'bg-(--color-no) text-black border-transparent'
                      : 'bg-transparent text-(--color-no) border-(--color-border) hover:border-(--color-no)'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {error && <div className="text-sm text-(--color-no)">{error}</div>}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={submit}
          disabled={!allAnswered || submitting}
          className="flex-1 py-3 rounded-lg bg-(--color-accent) text-black font-semibold hover:opacity-90 disabled:opacity-40 transition"
        >
          {submitting ? 'Submitting…' : 'Submit vote'}
        </button>
        <Link
          to={`/p/${poll.id}/results`}
          className="px-4 py-3 rounded-lg border border-(--color-border) text-(--color-muted) hover:text-(--color-fg) transition"
        >
          Skip → results
        </Link>
      </div>
    </div>
  );
}
