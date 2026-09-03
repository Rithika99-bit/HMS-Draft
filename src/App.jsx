import React, { useState, useEffect } from 'react';
import './styles/index.css';
import './styles/components.css';
import './styles/modals.css';
import { EmrProvider } from './context/EmrContext';
import { PharmacyProvider } from './context/PharmacyContext';
import { LabProvider } from './context/LabContext';

// Components
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import DepartmentsSection from './components/DepartmentsSection';
import DoctorsSection from './components/DoctorsSection';
import PatientJourneySection from './components/PatientJourneySection';
import WhyUsSection from './components/WhyUsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import HospitalLoginPage from './components/HospitalLoginPage';
import RoleDashboard from './components/RoleDashboard';

// Modals
import BookingModal from './components/modals/BookingModal';
import DoctorProfileModal from './components/modals/DoctorProfileModal';
import EmergencyModal from './components/modals/EmergencyModal';
import LoginModal from './components/modals/LoginModal';
import Toast from './components/modals/Toast';

export default function App() {
  // Current view: 'portal' | 'login' | 'dashboard'
  const [currentView, setCurrentView] = useState('portal');
  
  // User authentication session
  const [currentUser, setCurrentUser] = useState(null);

  // Modal visibility states
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingDept, setBookingDept] = useState('');
  const [bookingDoctor, setBookingDoctor] = useState('');

  const [doctorModalOpen, setDoctorModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [quickLoginOpen, setQuickLoginOpen] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => {
        setToast({ message: '', type: 'info' });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Booking Modal handlers
  const handleOpenBooking = (dept = '', doctor = '') => {
    setBookingDept(dept);
    setBookingDoctor(doctor);
    setBookingModalOpen(true);
  };

  // Doctor Profile Modal handler
  const handleOpenDoctorProfile = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctorModalOpen(true);
  };

  // Login & Dashboard Handlers
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setQuickLoginOpen(false);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('portal');
    showToast('Logged out successfully.', 'info');
  };

  const handleSwitchRole = (newRoleAccount) => {
    setCurrentUser(newRoleAccount);
    showToast(`Switched view to ${newRoleAccount.badge} (${newRoleAccount.name})`, 'info');
  };

  return (
    <EmrProvider>
      <PharmacyProvider>
        <LabProvider>
          <div className="medicare-app-root">
          {/* Toast Alert */}
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast({ message: '', type: 'info' })} 
          />

          {/* Global Modals */}
          <BookingModal 
            isOpen={bookingModalOpen}
            onClose={() => setBookingModalOpen(false)}
            initialDept={bookingDept}
            initialDoctor={bookingDoctor}
            onShowToast={showToast}
          />

          <DoctorProfileModal 
            isOpen={doctorModalOpen}
            doctor={selectedDoctor}
            onClose={() => setDoctorModalOpen(false)}
            onBookWithDoctor={(dept, doctorName) => handleOpenBooking(dept, doctorName)}
          />

          <EmergencyModal 
            isOpen={emergencyModalOpen}
            onClose={() => setEmergencyModalOpen(false)}
            onShowToast={showToast}
          />

          <LoginModal 
            isOpen={quickLoginOpen}
            onClose={() => setQuickLoginOpen(false)}
            onLoginSuccess={handleLoginSuccess}
            onOpenFullLogin={() => setCurrentView('login')}
            onShowToast={showToast}
          />

          {/* VIEW SWITCHING LOGIC */}
          {currentView === 'login' && (
            <HospitalLoginPage 
              onLoginSuccess={handleLoginSuccess}
              onBackToPortal={() => setCurrentView('portal')}
              onShowToast={showToast}
            />
          )}

          {currentView === 'dashboard' && (
            <RoleDashboard 
              currentUser={currentUser}
              onLogout={handleLogout}
              onSwitchRole={handleSwitchRole}
              onBackToPortal={() => setCurrentView('portal')}
              onShowToast={showToast}
            />
          )}

          {currentView === 'portal' && (
            <div className="portal-landing-wrapper">
              <TopBar onOpenEmergency={() => setEmergencyModalOpen(true)} />
              
              <Navbar 
                onOpenBooking={() => handleOpenBooking()}
                onOpenLogin={() => setQuickLoginOpen(true)}
                onSwitchToLogin={() => setCurrentView('login')}
                currentUser={currentUser}
                onOpenDashboard={() => setCurrentView('dashboard')}
                onLogout={handleLogout}
              />

              <main>
                <HeroSection 
                  onOpenBooking={() => handleOpenBooking()}
                  onOpenEmergency={() => setEmergencyModalOpen(true)}
                />

                <ServicesSection 
                  onOpenBooking={() => handleOpenBooking()}
                  onShowToast={showToast}
                />

                <DepartmentsSection 
                  onOpenBooking={(deptName) => handleOpenBooking(deptName)}
                />

                <DoctorsSection 
                  onOpenBooking={(dept, doctorName) => handleOpenBooking(dept, doctorName)}
                  onOpenDoctorProfile={handleOpenDoctorProfile}
                />

                <PatientJourneySection 
                  onOpenBooking={() => handleOpenBooking()}
                />

                <WhyUsSection />

                <TestimonialsSection />

                <CtaBanner 
                  onOpenBooking={() => handleOpenBooking()}
                  onOpenEmergency={() => setEmergencyModalOpen(true)}
                />
              </main>

              <Footer 
                onOpenEmergency={() => setEmergencyModalOpen(true)}
                onShowToast={showToast}
              />
            </div>
          )}
        </div>
        </LabProvider>
      </PharmacyProvider>
    </EmrProvider>
  );
}

