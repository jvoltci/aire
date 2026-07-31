import { API_URL } from './env';

export interface Poll {
  id: string;
  title: string;
  questions: string[];
  createdAt: number;
}

export interface Tally {
  counts: Record<string, { yes: number; no: number }>;
  total: number;
}

/* Omit<Poll, 'createdAt'>, not Poll, because POST /polls does not send one. Measured against
 * the running worker: it answers {"id","title","questions"} — it returns the row it just
 * built rather than re-reading it, and only GET /polls/:id carries createdAt. Typed as Poll
 * this promised a `createdAt: number` that is `undefined` at runtime, and TypeScript would
 * have let a caller do arithmetic on it. Home only reads .id, so nothing was broken yet; the
 * type was the thing that was wrong. */
export async function createPoll(input: {
  title: string;
  questions: string[];
}): Promise<Omit<Poll, 'createdAt'>> {
  const r = await fetch(`${API_URL}/polls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!r.ok) throw new Error(((await r.json().catch(() => ({}))) as { error?: string }).error ?? 'create failed');
  return (await r.json()) as Omit<Poll, 'createdAt'>;
}

export async function getPoll(id: string): Promise<Poll> {
  const r = await fetch(`${API_URL}/polls/${id}`);
  if (!r.ok) throw new Error('poll not found');
  return (await r.json()) as Poll;
}

export async function getResults(id: string): Promise<Tally> {
  const r = await fetch(`${API_URL}/polls/${id}/results`);
  if (!r.ok) throw new Error('results unavailable');
  return (await r.json()) as Tally;
}
