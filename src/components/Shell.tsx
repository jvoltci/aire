import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 2.4.1 Bypass Blocks. .n-skip is translated out of view until focused. */}
      <a href="#main" className="n-skip">
        Skip to content
      </a>

      <header className="sticky top-0 z-10 border-b border-neutral-6 bg-neutral-1/80 backdrop-blur">
        <div className="n-container max-w-3xl flex items-center justify-between py-3">
          <Link to="/" className="n-cluster group">
            {/* The mark. --brand-9 (via bg-brand-fill) is the solved solid, so it is the
                deep teal in light mode and the L 0.66 glow in dark — one declaration,
                both polarities, no dark: variant. */}
            <span className="w-6 h-6 rounded-full bg-brand-fill aire-live-dot" />
            <span className="font-semibold tracking-tight text-lg text-neutral-12 group-hover:text-brand transition">
              aire
            </span>
          </Link>
          <a
            href="https://github.com/jvoltci/aire"
            target="_blank"
            rel="noreferrer"
            className="n-btn n-btn-ghost n-btn-sm"
          >
            github
          </a>
        </div>
      </header>

      <main id="main" className="flex-1 w-full">
        <div className="n-container max-w-3xl py-8">{children}</div>
      </main>

      <footer className="border-t border-neutral-6">
        <div className="n-container max-w-3xl flex items-center justify-between py-4 text-xs text-muted-foreground">
          <span>aire · realtime polls at the edge</span>
          <span>powered by Cloudflare Workers</span>
        </div>
      </footer>
    </div>
  );
}
