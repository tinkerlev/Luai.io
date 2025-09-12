import React from 'react';
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SpeedInsights } from '@vercel/speed-insights/react';
import DefaultSEO from './DefaultSEO';
import Landing from './pages/Landing';
import VulnerabilityAssessments from './pages/services/VulnerabilityAssessments';
import PenetrationTesting from './pages/services/PenetrationTesting';
import RedTeamOperations from './pages/services/RedTeamOperations';
import IncidentResponse from './pages/services/IncidentResponse';
import SecurityAudits from './pages/services/SecurityAudits';
import ComplianceConsulting from './pages/services/ComplianceConsulting';
import SecurityTraining from './pages/services/SecurityTraining';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import './index.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <DefaultSEO />
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/services/vulnerability-assessments" element={<VulnerabilityAssessments />} />
            <Route path="/services/penetration-testing" element={<PenetrationTesting />} />
            <Route path="/services/red-team-operations" element={<RedTeamOperations />} />
            <Route path="/services/incident-response" element={<IncidentResponse />} />
            <Route path="/services/security-audits" element={<SecurityAudits />} />
            <Route path="/services/compliance-consulting" element={<ComplianceConsulting />} />
            <Route path="/services/security-training" element={<SecurityTraining />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Analytics />
          <SpeedInsights />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;