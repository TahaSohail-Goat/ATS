import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/globals.css';
import 'flag-icons/css/flag-icons.min.css';

// The theme is applied before first paint by the inline script in index.html,
// which also swallows the SecurityError that reading localStorage throws in
// private/locked-down browsers. Nothing to do here.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
