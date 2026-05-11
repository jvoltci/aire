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
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Realtime polls.</h1>
        <p className="text-(--color-muted) mt-2">
          Create a yes/no poll, share the link, watch votes update live across the edge.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <label className="block">
          <span className="text-sm text-(--color-muted)">Title (optional)</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Coffee preferences"
            maxLength={120}
            className="mt-1 w-full px-3 py-2.5 rounded-lg bg-(--color-surface) border border-(--color-border) focus:border-(--color-accent) focus:outline-none transition"
          />
        </label>

        <div className="space-y-3">
          <span className="text-sm text-(--color-muted)">Questions (yes / no)</span>
          {questions.map((q, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={q}
                onChange={(e) => updateQ(i, e.target.value)}
                placeholder={`Question ${i + 1}`}
                maxLength={200}
                className="flex-1 px-3 py-2.5 rounded-lg bg-(--color-surface) border border-(--color-border) focus:border-(--color-accent) focus:outline-none transition"
              />
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQ(i)}
                  className="px-3 rounded-lg border border-(--color-border) text-(--color-muted) hover:text-(--color-no) hover:border-(--color-no) transition"
                  aria-label="Remove question"
                >
                  −
                </button>
              )}
            </div>
          ))}
          {questions.length < 20 && (
            <button
              type="button"
              onClick={addQ}
              className="text-sm text-(--color-accent) hover:underline"
            >
              + Add question
            </button>
          )}
        </div>

        {error && <div className="text-sm text-(--color-no)">{error}</div>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-lg bg-(--color-accent) text-black font-semibold hover:opacity-90 active:opacity-80 transition disabled:opacity-50"
        >
          {submitting ? 'Creating…' : 'Create poll'}
        </button>
      </form>
    </div>
  );
}
