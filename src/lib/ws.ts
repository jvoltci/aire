import { WS_URL } from './env';

export type WsMessage =
  | { type: 'init'; questions: string[]; tally: import('./api').Tally }
  | { type: 'tally'; tally: import('./api').Tally }
  | { type: 'voted' }
  | { type: 'error'; message: string }
  | { type: 'pong' };

export interface PollSocket {
  send(payload: object): void;
  close(): void;
}

export function openPollSocket(
  pollId: string,
  onMessage: (m: WsMessage) => void,
  onStatus?: (s: 'open' | 'closed' | 'error') => void,
): PollSocket {
  let ws: WebSocket | null = null;
  let closed = false;
  let retry = 0;
  let pingTimer: number | null = null;

  const connect = () => {
    if (closed) return;
    ws = new WebSocket(`${WS_URL}/polls/${pollId}/ws`);
    ws.onopen = () => {
      retry = 0;
      onStatus?.('open');
      pingTimer = window.setInterval(() => {
        try { ws?.send(JSON.stringify({ type: 'ping' })); } catch { /* ignore */ }
      }, 25000);
    };
    ws.onmessage = (e) => {
      try { onMessage(JSON.parse(e.data) as WsMessage); } catch { /* ignore */ }
    };
    ws.onerror = () => onStatus?.('error');
    ws.onclose = () => {
      if (pingTimer) { clearInterval(pingTimer); pingTimer = null; }
      onStatus?.('closed');
      if (!closed) {
        const delay = Math.min(1000 * 2 ** retry++, 10000);
        setTimeout(connect, delay);
      }
    };
  };

  connect();

  return {
    send(payload) { ws?.readyState === WebSocket.OPEN && ws.send(JSON.stringify(payload)); },
    close() { closed = true; if (pingTimer) clearInterval(pingTimer); ws?.close(); },
  };
}
