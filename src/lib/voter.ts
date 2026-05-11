const KEY = 'aire.voterId';

export function getVoterId(): string {
  let id = localStorage.getItem(KEY);
  if (id && id.length >= 8) return id;
  id = (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36));
  localStorage.setItem(KEY, id);
  return id;
}
