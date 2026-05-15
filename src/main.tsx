import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Guard: never let a service worker live inside Lovable preview iframes.
const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();
const isPreviewHost =
  window.location.hostname.includes('id-preview--') ||
  window.location.hostname.includes('lovableproject.com');

if ((isInIframe || isPreviewHost) && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((regs) => regs.forEach((r) => r.unregister()))
    .catch(() => undefined);
}

createRoot(document.getElementById('root')!).render(<App />);
