import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { DoptProvider } from '@dopt/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DoptProvider
      apiKey="YOUR_DOPT_BLOCKS_API_KEY"
      userId="SOME_USER_IDENTIFIER" // In real-world usage, you would pass this in dynamically
      flowVersions={{ 'tango-survey': 'uncommitted' }}
    >
      <App />
    </DoptProvider>
  </React.StrictMode>,
)
