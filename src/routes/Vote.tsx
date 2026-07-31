import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPoll, type Poll } from '../lib/api';
import { openPollSocket, type PollSocket } from '../lib/ws';
import { getVoterId } from '../lib/voter';
import { PollSkeleton } from '../components/PollSkeleton';

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
    if (!poll || !socket || !allAnswered || submitting) return;
    setSubmitting(true);
    setError(null);
    socket.send({ type: 'vote', voterId: getVoterId(), answers });
  };

  if (error && !poll) {
    return (
      <div className="n-note n-note-danger" role="alert">
        <span className="n-note-glyph" aria-hidden="true">×</span>
        <div>
          <span className="n-note-title">This poll is not available.</span> {error}{' '}
          <Link to="/" className="n-link">Create a new one</Link>.
        </div>
      </div>
    );
  }
  if (!poll) return <PollSkeleton rows={2} />;

  return (
    <div className="n-stack gap-6">
      <header>
        {poll.title && <h1 className="text-2xl font-semibold">{poll.title}</h1>}
        <p className="mt-1 text-sm text-muted-foreground">
          Cast your vote. Live results update in real time.
        </p>
      </header>

      <div className="n-stack gap-4">
        {poll.questions.map((q, i) => {
          const key = String(i);
          const value = answers[key];
          return (
            <div key={i} className="n-card n-card-pad n-stack gap-3">
              {/* NOT a <fieldset>/<legend>, and this was a measured regression rather than
                  a preference. A <legend> is laid out in its fieldset's BORDER box: it
                  notches the border, escapes .n-card-pad's padding and cuts the top-left
                  radius. Screenshotted in both modes — the question sat on the card's top
                  edge with the border broken around it.
                  role="radiogroup" + aria-labelledby gives the group the same accessible
                  name from the visible heading, with no layout side effects. */}
              <h2 id={`q${i}`} className="font-medium text-neutral-12">
                {q}
              </h2>
              <div
                className="grid grid-cols-2 gap-2"
                role="radiogroup"
                aria-labelledby={`q${i}`}
              >
                {/* Two .n-btn, and the selected one becomes a FILL. That is the whole
                    polarity trick: --ok-9 / --danger-9 with --ok-ink / --danger-ink, so the
                    label is legible on the fill in both modes without a dark: variant and
                    without the `text-black` these used to hard-code.

                    aria-checked, not a class, carries the state — so the accessible state
                    and the visible state cannot disagree. And the state is ALSO carried by
                    the word: nilam reports danger/ok collapsing under deuteranopia at
                    0.0248 here, so "Yes" and "No" are doing the WCAG 1.4.1 work. */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={value === 'yes'}
                  onClick={() => setAnswers((a) => ({ ...a, [key]: 'yes' }))}
                  className={value === 'yes' ? 'n-btn aire-btn-ok' : 'n-btn text-ok'}
                >
                  Yes
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={value === 'no'}
                  onClick={() => setAnswers((a) => ({ ...a, [key]: 'no' }))}
                  className={value === 'no' ? 'n-btn n-btn-danger' : 'n-btn text-danger'}
                >
                  No
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="n-note n-note-danger" role="alert">
          <span className="n-note-glyph" aria-hidden="true">×</span>
          <div>
            <span className="n-note-title">Vote not recorded.</span> {error}
          </div>
        </div>
      )}

      <div className="n-cluster">
        {/* aria-disabled rather than `disabled`, so the button stays focusable and a
            screen-reader user can find out WHY it is unavailable from the hint below.
            A `disabled` control is skipped by the tab order and explains nothing.
            aria-busy is deliberately NOT combined with it — nilam's
            `.n-btn[aria-disabled='true']` swaps the background to --neutral-2 and beats
            `.n-btn-fill`, which leaves the --brand-ink spinner near-invisible in dark mode
            at 1.09:1. submit() returns early unless allAnswered, so the two can never both
            be true here. */}
        <button
          type="button"
          onClick={submit}
          aria-disabled={!allAnswered || undefined}
          aria-busy={submitting}
          aria-describedby={allAnswered ? undefined : 'vote-blocked'}
          className="n-btn n-btn-fill n-btn-lg flex-1"
        >
          {submitting ? 'Submitting…' : 'Submit vote'}
        </button>
        <Link to={`/p/${poll.id}/results`} className="n-btn n-btn-lg">
          Skip → results
        </Link>
      </div>
      {!allAnswered && (
        <p className="n-hint" id="vote-blocked">
          Answer every question to submit.
        </p>
      )}
    </div>
  );
}
