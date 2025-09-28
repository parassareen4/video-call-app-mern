import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './SocketContext';

// Polyfill for process in browser environment
if (typeof global === 'undefined') {
  window.global = window;
}
if (typeof process === 'undefined') {
  window.process = { env: {} };
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
