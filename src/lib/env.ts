export const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ??
  'https://aire-api.altrusian.workers.dev';

export const WS_URL = API_URL.replace(/^http/, 'ws');
