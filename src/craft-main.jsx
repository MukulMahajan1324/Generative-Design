import React from 'react';
import ReactDOM from 'react-dom/client';
import CraftInteractiveBackground from './components/CraftInteractiveBackground';
import './index.css';

function CraftReplicaClean() {
  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#19231f] select-none touch-none m-0 p-0">
      <CraftInteractiveBackground />
    </main>
  );
}

const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <CraftReplicaClean />
    </React.StrictMode>
  );
}
