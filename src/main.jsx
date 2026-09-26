import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/dm-sans/wght.css'
import '@fontsource/dm-serif-display/latin-400.css'
import '@fontsource/dm-serif-display/latin-400-italic.css'
import './index.css'
import App from './App.jsx'
import { preparePage } from './routePages'

function mount() {
  const root = document.getElementById('root');
  const app = (
    <StrictMode>
      <App initialTime={root.dataset.renderedAt} />
    </StrictMode>
  );
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
// Finish module evaluation before loading the route; this also avoids holding
// dependent modules behind a top-level await in bundled deployments.
preparePage(window.location.pathname).then(mount);
