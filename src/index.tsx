import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import { App } from './components/App/App';
import { store } from './store';

const root = ReactDOM.createRoot(
  // eslint-disable-next-line prettier/prettier
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
