import React from 'react';
import ReactDOM from 'react-dom/client';
import { ContextProvider } from './contexts/ContextProvider';
import AntdConfigProvider from './providers/antd-config-provider';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <AntdConfigProvider>
      <App />
    </AntdConfigProvider>
  </ContextProvider>,
);
