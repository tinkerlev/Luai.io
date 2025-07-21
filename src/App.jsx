import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import Landing from './pages/Landing';
import './index.css';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Landing />} />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;