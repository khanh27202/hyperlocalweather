import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!); // The '!' asserts that rootElement is non-null.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
