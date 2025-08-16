// // src/App.jsx
// import React, { useEffect } from 'react';
// import { RouterProvider } from 'react-router-dom';
// import { initEventTracking } from './utils/eventTracking';
// import { AuthProvider } from './context/AuthContext';
// import { PsychologistsProvider } from './context/PsychologistsContext';
// import { AnalyticsProvider } from './context/AnalyticsContext';
// import { BookingProvider } from './context/BookingContext';
// import ErrorBoundary from './components/common/ErrorBoundary';
// import router from './routes';

// function App() {
//   // Initialize analytics and event tracking
//   useEffect(() => {
//     initEventTracking();
//   }, []);

//   return (
//     <React.StrictMode>
//       <RouterProvider router={router}>
//         <ErrorBoundary>
//           <AuthProvider>
//             <PsychologistsProvider>
//               <AnalyticsProvider>
//                 <BookingProvider>
//                   {/* Router content will be automatically rendered here */}
//                 </BookingProvider>
//               </AnalyticsProvider>
//             </PsychologistsProvider>
//           </AuthProvider>
//         </ErrorBoundary>
//       </RouterProvider>
//     </React.StrictMode>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './lib/fontAwesome';
import NotFound from './pages/NotFound'; // Assuming you have a NotFound page

// Import your main pages
import HomePage from './pages/Home';
import PsychologistsPage from './pages/Psychologists'; // Placeholder
import PsychologistDetailPage from './pages/PsychologistDetail'; // Placeholder
import HowItWorksPage from './pages/HowItWorks'; // Placeholder
import ContactPage from './pages/Contact'; // Placeholder
import AboutPage from './pages/About'; // Placeholder

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} /> {/* Placeholder */}
            <Route path="/psychologists" element={<PsychologistsPage />} /> {/* Placeholder */}
            <Route path="/psychologists/:slug" element={<PsychologistDetailPage />} /> {/* Placeholder */}
            <Route path="/contact" element={<ContactPage />} /> {/* Placeholder */}
            <Route path="/about" element={<AboutPage />} /> {/* Placeholder */}
            {/* Add more routes here for Admin and Portal sections later */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
