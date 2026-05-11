import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-(--color-border) bg-(--color-surface)/60 backdrop-blur sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-6 h-6 rounded-full bg-(--color-accent) live-dot" />
            <span className="font-semibold tracking-tight text-lg group-hover:text-(--color-accent) transition">
              aire
            </span>
          </Link>
          <a
            href="https://github.com/jvoltci/aire"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-(--color-muted) hover:text-(--color-fg) transition"
          >
            github
          </a>
        </div>
      </header>
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">{children}</main>
      <footer className="border-t border-(--color-border) text-(--color-muted) text-xs">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <span>aire · realtime polls at the edge</span>
          <span>powered by Cloudflare Workers</span>
        </div>
      </footer>
    </div>
  );
}
