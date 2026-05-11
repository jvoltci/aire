import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { Home } from './routes/Home';
import { Vote } from './routes/Vote';
import { Results } from './routes/Results';
import { Shell } from './components/Shell';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/p/:id" element={<Vote />} />
          <Route path="/p/:id/results" element={<Results />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Shell>
    </HashRouter>
  </StrictMode>,
);
