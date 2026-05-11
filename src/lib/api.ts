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

export async function createPoll(input: { title: string; questions: string[] }): Promise<Poll> {
  const r = await fetch(`${API_URL}/polls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!r.ok) throw new Error(((await r.json().catch(() => ({}))) as { error?: string }).error ?? 'create failed');
  return (await r.json()) as Poll;
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
