import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import * as serviceWorker from './serviceWorker';
import store from './store';


Sentry.init({
  dsn: 'https://8e8625db8d2440e797880769b2a8e1fc@o109264.ingest.sentry.io/5533666',
  release: `just-speak-web@${process.env.npm_package_version}`,
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

function FallbackComponent() {
  return <div>An error has occurred</div>;
}
ReactDOM.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
      <Provider store={store}>
        <App />
      </Provider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
