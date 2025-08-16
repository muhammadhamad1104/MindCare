// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './lib/fontAwesome';
// import './index.css';
// import App from './App';
// import { PsychologistsProvider } from './context/PsychologistsContext';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <PsychologistsProvider>
//       <App />
//     </PsychologistsProvider>
//   </React.StrictMode>
// )
// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import ErrorFallback from './components/common/ErrorBoundary';
import Loading from './components/common/Loading';
import './lib/fontAwesome';
import './index.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { PsychologistsProvider } from './context/PsychologistsContext';
import { BookingProvider } from './context/BookingContext';
import { AnalyticsProvider } from './context/AnalyticsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        <BrowserRouter>
          <AuthProvider>
            <PsychologistsProvider>
              <BookingProvider>
                <AnalyticsProvider>
                  <React.Suspense fallback={<Loading fullScreen />}>
                    <App />
                  </React.Suspense>
                </AnalyticsProvider>
              </BookingProvider>
            </PsychologistsProvider>
          </AuthProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);