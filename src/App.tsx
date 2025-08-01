import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProHomePage from './pages/ProHomePage';
import StudentRegistration from './pages/StudentRegistration';
import ProfessionalRegistration from './pages/ProfessionalRegistration';
import StageBooking from './pages/StageBooking';
import PaymentPage from './pages/PaymentPage';
import SuccessPage from './pages/SuccessPage';
import MyOSO from './pages/MyOSO';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FontDemo from './components/FontDemo';
import LogoTest from './components/LogoTest';
import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pro" element={<ProHomePage />} />
              <Route path="/register/student" element={<StudentRegistration />} />
              <Route path="/register/professional" element={<ProfessionalRegistration />} />
              <Route path="/book-stage" element={<StageBooking />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/my-oso" element={<MyOSO />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/test-fonts" element={<FontDemo />} />
              <Route path="/test-logo" element={<LogoTest />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 