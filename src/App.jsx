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
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/services/penetration-testing" element={<PenetrationTesting />} />
            <Route path="/services/incident-response" element={<IncidentResponse />} />
            <Route path="/services/security-audits" element={<SecurityAudits />} />
            <Route path="/services/vulnerability-assessments" element={<VulnerabilityAssessments />} />
            <Route path="/services/red-team-operations" element={<RedTeamOperations />} />
            <Route path="/services/compliance-consulting" element={<ComplianceConsulting />} />
            <Route path="/services/security-training" element={<SecurityTraining />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
