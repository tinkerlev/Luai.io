import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import Landing from './pages/Landing';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PenetrationTesting from './pages/services/PenetrationTesting';
import IncidentResponse from './pages/services/IncidentResponse';
import SecurityAudits from './pages/services/SecurityAudits';
import VulnerabilityAssessments from './pages/services/VulnerabilityAssessments';
import RedTeamOperations from './pages/services/RedTeamOperations';
import ComplianceConsulting from './pages/services/ComplianceConsulting';
import SecurityTraining from './pages/services/SecurityTraining';
import NotFound from './pages/NotFound';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
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
