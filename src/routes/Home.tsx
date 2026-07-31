import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPoll } from '../lib/api';

export function Home() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<string[]>(['']);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateQ = (i: number, v: string) => {
    const next = [...questions];
    next[i] = v;
    setQuestions(next);
  };
  const addQ = () => setQuestions((q) => (q.length < 20 ? [...q, ''] : q));
  const removeQ = (i: number) =>
    setQuestions((q) => (q.length > 1 ? q.filter((_, idx) => idx !== i) : q));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    /* Guards the second Enter. The button carries aria-busy rather than `disabled` — see
       the comment on it — and aria-busy only stops POINTER events, so a keyboard submit
       could still fire twice. */
    if (submitting) return;
    const trimmed = questions.map((q) => q.trim()).filter(Boolean);
    if (trimmed.length === 0) {
      setError('Add at least one question.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const poll = await createPoll({ title: title.trim(), questions: trimmed });
      navigate(`/p/${poll.id}/results`);
    } catch (err) {
      setError((err as Error).message);
      setSubmitting(false);
    }
  };

  return (
    <div className="n-stack gap-8">
      <div>
        {/* The one display element in the app — --text-display at --weight-thin. See the
            .aire-display comment in index.css for why it is a class and not a utility. */}
        <h1 className="aire-display">Realtime polls.</h1>
        <p className="mt-2 text-muted-foreground">
          Create a yes/no poll, share the link, watch votes update live across the edge.
        </p>
      </div>

      <form onSubmit={submit} className="n-stack gap-5">
        <div className="n-field">
          <label className="n-label" htmlFor="poll-title">
            Title
          </label>
          <input
            id="poll-title"
            className="n-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Coffee preferences"
            maxLength={120}
            aria-describedby="poll-title-hint"
          />
          <p className="n-hint" id="poll-title-hint">
            Optional.
          </p>
        </div>

        <div className="n-stack gap-3">
          {/* A group of inputs with one shared label is a fieldset, and the legend is what
              a screen reader reads before each question. A bare <span> said this only to
              sighted readers. */}
          <fieldset className="n-stack gap-3 border-0 p-0 m-0">
            <legend className="n-label mb-1">Questions (yes / no)</legend>
            {questions.map((q, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className="n-input"
                  value={q}
                  onChange={(e) => updateQ(i, e.target.value)}
                  placeholder={`Question ${i + 1}`}
                  maxLength={200}
                  aria-label={`Question ${i + 1}`}
                />
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQ(i)}
                    className="n-btn n-btn-icon"
                    aria-label={`Remove question ${i + 1}`}
                  >
                    −
                  </button>
                )}
              </div>
            ))}
          </fieldset>
          {questions.length < 20 && (
            <button type="button" onClick={addQ} className="n-btn n-btn-sm self-start">
              + Add question
            </button>
          )}
        </div>

        {/* .n-note-danger, not coloured text. The glyph is required, not decorative: nilam
            reports danger/warn and danger/ok collapsing under deuteranopia at this hue, so
            a red message that is only red is a message some readers cannot categorise.
            role="alert" so it is announced when it appears. */}
        {error && (
          <div className="n-note n-note-danger" role="alert">
            <span className="n-note-glyph" aria-hidden="true">
              ×
            </span>
            <div>
              <span className="n-note-title">Could not create the poll.</span> {error}
            </div>
          </div>
        )}

        {/* aria-busy is the accessible signal and nilam draws the spinner from it. The
            label goes transparent rather than being replaced, so the row does not reflow.
            Creating a poll is one round trip of unknown duration, so a spinner is the
            honest loader; there is no proportion to report and .n-progress would invent
            one.

            NO `disabled` ATTRIBUTE, deliberately, and this is a measured nilam trap rather
            than a style preference. `.n-btn:disabled` sets background --neutral-2 and beats
            `.n-btn-fill` on specificity (0,2,0 against 0,1,0), while
            `.n-btn-fill[aria-busy]::before` still draws the spinner ring in --brand-ink.
            In dark mode --brand-ink is L 0.16 and --neutral-2 is L 0.212, so the two
            together are a near-black ring on a near-black button: 1.09:1, invisible. It is
            the same defect nilam's own comment records fixing for ghost buttons, resurfacing
            for the disabled+busy pair. aria-busy already sets pointer-events: none; the
            keyboard path is guarded in submit(). */}
        <button type="submit" className="n-btn n-btn-fill n-btn-lg" aria-busy={submitting}>
          {submitting ? 'Creating…' : 'Create poll'}
        </button>
      </form>
    </div>
  );
}
