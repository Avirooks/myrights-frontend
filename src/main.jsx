import * as Sentry from "@sentry/react";
import { Analytics } from '@vercel/analytics/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import './styles/navbar.css';
import App from './App.jsx';

Sentry.init({
  dsn: "https://8f5464955d47348a29cc5cc7cf998cfd@o4511563680251904.ingest.de.sentry.io/4511563685298256",
  dataCollection: { userInfo: false },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
);