import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './styles/globals.css';

// The theme is applied before first paint by the inline script in index.html,
// which also swallows the SecurityError that reading localStorage throws in
// private/locked-down browsers. Nothing to do here.

const root = document.getElementById('root')!;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Production routes are pre-rendered at build time. Vite dev still serves an
// empty root, so use client rendering there and hydration for static HTML.
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
