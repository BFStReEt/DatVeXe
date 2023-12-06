import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/components/Login/Login.jsx'

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Login />
    </React.StrictMode>
  );
}
