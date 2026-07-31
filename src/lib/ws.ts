import { WS_URL } from './env';

export type WsMessage =
  | { type: 'init'; questions: string[]; tally: import('./api').Tally }
  | { type: 'tally'; tally: import('./api').Tally }
  | { type: 'voted' }
  | { type: 'error'; message: string }
  | { type: 'pong' };

export interface PollSocket {
  /* Returns whether the frame actually left, and the return value is load-bearing rather
     than informational. A WebSocket that is CONNECTING or CLOSED cannot carry a frame, and
     this socket is both of those on a schedule: it is CONNECTING for the whole handshake
     after the Vote page renders, and CLOSED for up to 10s inside the reconnect backoff
     below. A caller that assumes the payload went out will wait forever for a reply that
     nobody was asked for — see the comment on submit() in Vote.tsx, which is the bug this
     return value exists to make impossible. */
  send(payload: object): boolean;
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
    send(payload) {
      if (ws?.readyState !== WebSocket.OPEN) return false;
      ws.send(JSON.stringify(payload));
      return true;
    },
    close() { closed = true; if (pingTimer) clearInterval(pingTimer); ws?.close(); },
  };
}
