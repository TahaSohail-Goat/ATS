import React from 'react';
import ReactDOM from 'react-dom/client';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import { App } from './App';
import './styles/globals.css';

// Render country flag emojis on platforms without native support (e.g. Windows).
polyfillCountryFlagEmojis();

// Initialize theme from localStorage or system preference
const stored = localStorage.getItem('ats-theme');
if (stored === 'light') {
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.add('light');
} else {
  document.documentElement.classList.remove('light');
  document.documentElement.classList.add('dark');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
