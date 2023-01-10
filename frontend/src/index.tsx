import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/widoki/styles.css';
import App from './app/widoki/App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';
import { store } from './funkcjonalnosci/sklep/configureStore';


export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
      <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
reportWebVitals();
