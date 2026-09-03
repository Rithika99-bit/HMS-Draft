/**
 * MediCare Hospital Management System - Core Interactivity
 * Production-ready vanilla JavaScript powering modals, booking wizard, filters, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // DOCTORS DATA
  // =========================================================================
  const doctorsData = [
    {
      id: 'dr-sarah',
      name: 'Dr. Sarah Mitchell, MD',
      specialty: 'Cardiology & Vascular Medicine',
      dept: 'Cardiology',
      experience: '16+ Years Experience',
      rating: 4.9,
      reviews: 148,
      status: 'Available Today',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
      education: 'Harvard Medical School • Johns Hopkins Fellowship',
      bio: 'Dr. Sarah Mitchell is a world-renowned board-certified cardiologist specializing in preventive cardiology, coronary interventions, and advanced cardiac diagnostics with over 1,500 successful procedures.',
      hours: 'Mon - Fri: 08:30 AM - 04:30 PM',
      fee: '$120 (Standard Consult)'
    },
    {
      id: 'dr-david',
      name: 'Dr. David Rodriguez, MD, PhD',
      specialty: 'Neurology & Neurosciences',
      dept: 'Neurology',
      experience: '14+ Years Experience',
      rating: 4.95,
      reviews: 112,
      status: 'Available Today',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
      education: 'Stanford University School of Medicine',
      bio: 'Dr. David Rodriguez leads the MediCare Comprehensive Stroke and Neuro-Rehabilitation Center. Specializes in neurodegenerative conditions, migraines, and cognitive therapies.',
      hours: 'Tue - Sat: 09:00 AM - 05:00 PM',
      fee: '$135 (Specialist Consult)'
    },
    {
      id: 'dr-priya',
      name: 'Dr. Priya Patel, MD',
      specialty: 'Pediatrics & Child Health',
      dept: 'Pediatrics',
      experience: '12+ Years Experience',
      rating: 4.9,
      reviews: 210,
      status: 'Available Today',
      image: 'https://images.unsplash.com/photo-1594824813597-28d842b08365?auto=format&fit=crop&q=80&w=600',
      education: 'Columbia University Vagelos College of Physicians and Surgeons',
      bio: 'Dr. Priya Patel is a compassionate pediatrician dedicated to developmental health, newborn intensive care, childhood allergies, and adolescent medicine in a warm, child-friendly environment.',
      hours: 'Mon - Fri: 08:00 AM - 03:30 PM',
      fee: '$95 (Pediatric Visit)'
    },
    {
      id: 'dr-marcus',
      name: 'Dr. Marcus Vance, MD, FAAOS',
      specialty: 'Orthopedic Surgery & Joint Health',
      dept: 'Orthopedics',
      experience: '18+ Years Experience',
      rating: 4.88,
      reviews: 175,
      status: 'Available Tomorrow',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
      education: 'Mayo Clinic College of Medicine and Science',
      bio: 'Dr. Marcus Vance specializes in minimally invasive joint replacement, sports injury rehabilitation, and complex arthroscopic surgery with a patient-first recovery approach.',
      hours: 'Mon, Wed, Fri: 09:00 AM - 04:00 PM',
      fee: '$140 (Surgical Consult)'
    }
  ];

  // =========================================================================
  // DOM ELEMENTS
  // =========================================================================
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  // Modals
  const bookingModal = document.getElementById('bookingModal');
  const doctorModal = document.getElementById('doctorModal');
  const emergencyModal = document.getElementById('emergencyModal');
  const loginModal = document.getElementById('loginModal');
  const allModals = [bookingModal, doctorModal, emergencyModal, loginModal];

  // =========================================================================
  // TOAST NOTIFICATION HELPER
  // =========================================================================
  let toastTimeout;
  function showToast(message, type = 'success') {
    if (!toastNotice || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotice.className = `toast-notice ${type} show`;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotice.className = 'toast-notice';
    }, 3800);
  }

  // =========================================================================
  // STICKY NAVBAR & MOBILE MENU
  // =========================================================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // =========================================================================
  // ACTIVE NAV LINK OBSERVER
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // =========================================================================
  // MODAL CONTROLLERS
  // =========================================================================
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function closeAllModals() {
    allModals.forEach(m => m && closeModal(m));
  }

  // Close buttons and overlay backdrop click
  document.querySelectorAll('.modal-close-btn, .modal-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el || el.classList.contains('modal-close-btn')) {
        closeAllModals();
      }
    });
  });

  document.querySelectorAll('.modal-dialog').forEach(dialog => {
    dialog.addEventListener('click', (e) => e.stopPropagation());
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // =========================================================================
  // EMERGENCY SPEED-DIAL DRAWER
  // =========================================================================
  const floatingEmergencyBtn = document.getElementById('floatingEmergencyBtn');
  const topEmergencyLink = document.getElementById('topEmergencyLink');

  if (floatingEmergencyBtn) {
    floatingEmergencyBtn.addEventListener('click', () => openModal(emergencyModal));
  }
  if (topEmergencyLink) {
    topEmergencyLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(emergencyModal);
    });
  }

  const dispatchAmbulanceBtn = document.getElementById('dispatchAmbulanceBtn');
  if (dispatchAmbulanceBtn) {
    dispatchAmbulanceBtn.addEventListener('click', () => {
      closeModal(emergencyModal);
      showToast('🚨 Emergency Response Unit dispatched to your current location GPS!', 'emergency');
    });
  }

  // =========================================================================
  // PATIENT / STAFF LOGIN MODAL & QUICK-FILL DEMO
  // =========================================================================
  const loginNavBtn = document.getElementById('loginNavBtn');
  if (loginNavBtn) {
    loginNavBtn.addEventListener('click', () => openModal(loginModal));
  }

  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const loginForm = document.getElementById('loginForm');
  const roleButtons = document.querySelectorAll('.role-select-btn');

  const demoAccounts = {
    doctor: { email: 'dr.sarah@medicare.health', pass: 'DocPass#2026', role: 'Doctor' },
    nurse: { email: 'nurse.chen@medicare.health', pass: 'NurseCare#2026', role: 'Clinical Staff' },
    admin: { email: 'admin@medicare.health', pass: 'AdminMaster#2026', role: 'Administrator' },
    patient: { email: 'patient.emily@gmail.com', pass: 'HealthCare#2026', role: 'Patient' }
  };

  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const roleKey = btn.dataset.role;
      if (demoAccounts[roleKey]) {
        loginEmail.value = demoAccounts[roleKey].email;
        loginPassword.value = demoAccounts[roleKey].pass;
      }
    });
  });

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginEmail.value;
      if (!email) {
        showToast('Please enter an email address', 'emergency');
        return;
      }
      closeModal(loginModal);
      showToast(`Welcome back! Logged into MediCare HMS Dashboard as ${email}`, 'success');
    });
  }

  // =========================================================================
  // DOCTOR PROFILE MODAL
  // =========================================================================
  const docProfileImg = document.getElementById('docProfileImg');
  const docProfileName = document.getElementById('docProfileName');
  const docProfileSpecialty = document.getElementById('docProfileSpecialty');
  const docProfileBio = document.getElementById('docProfileBio');
  const docProfileEducation = document.getElementById('docProfileEducation');
  const docProfileHours = document.getElementById('docProfileHours');
  const docProfileFee = document.getElementById('docProfileFee');
  const docProfileBookBtn = document.getElementById('docProfileBookBtn');

  let selectedDoctorForBooking = null;

  document.querySelectorAll('.view-doc-profile-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const docId = btn.dataset.docId;
      const doc = doctorsData.find(d => d.id === docId);
      if (!doc) return;

      selectedDoctorForBooking = doc;
      if (docProfileImg) docProfileImg.src = doc.image;
      if (docProfileName) docProfileName.textContent = doc.name;
      if (docProfileSpecialty) docProfileSpecialty.textContent = doc.specialty;
      if (docProfileBio) docProfileBio.textContent = doc.bio;
      if (docProfileEducation) docProfileEducation.textContent = doc.education;
      if (docProfileHours) docProfileHours.textContent = doc.hours;
      if (docProfileFee) docProfileFee.textContent = doc.fee;

      openModal(doctorModal);
    });
  });

  if (docProfileBookBtn) {
    docProfileBookBtn.addEventListener('click', () => {
      closeModal(doctorModal);
      initBookingWizardWithDoctor(selectedDoctorForBooking);
      openModal(bookingModal);
    });
  }

  // =========================================================================
  // MULTI-STEP APPOINTMENT BOOKING WIZARD
  // =========================================================================
  let currentBookingStep = 1;
  const bookingState = {
    dept: 'Cardiology',
    doctor: 'Dr. Sarah Mitchell, MD',
    date: new Date().toISOString().split('T')[0],
    slot: '10:30 AM',
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    refId: ''
  };

  const bookButtons = document.querySelectorAll('.open-booking-modal-btn');
  bookButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const docId = btn.dataset.docId;
      if (docId) {
        const doc = doctorsData.find(d => d.id === docId);
        initBookingWizardWithDoctor(doc);
      } else {
        resetBookingWizard();
      }
      openModal(bookingModal);
    });
  });

  function initBookingWizardWithDoctor(doc) {
    resetBookingWizard();
    if (doc) {
      bookingState.dept = doc.dept;
      bookingState.doctor = doc.name;
      const deptSelect = document.getElementById('wizardDeptSelect');
      const docSelect = document.getElementById('wizardDoctorSelect');
      if (deptSelect) deptSelect.value = doc.dept;
      if (docSelect) docSelect.value = doc.name;
    }
  }

  function resetBookingWizard() {
    currentBookingStep = 1;
    updateWizardUI();
  }

  function updateWizardUI() {
    // Step panels
    document.querySelectorAll('.wizard-step-panel').forEach(panel => {
      panel.style.display = 'none';
    });
    const activePanel = document.getElementById(`wizardStep${currentBookingStep}`);
    if (activePanel) activePanel.style.display = 'block';

    // Step indicators
    document.querySelectorAll('.wizard-step-node').forEach((node, idx) => {
      const stepNum = idx + 1;
      node.classList.remove('active', 'completed');
      if (stepNum === currentBookingStep) {
        node.classList.add('active');
      } else if (stepNum < currentBookingStep) {
        node.classList.add('completed');
      }
    });
  }

  // Slot pill selection
  document.querySelectorAll('.slot-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.slot-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      bookingState.slot = pill.dataset.time || pill.textContent.trim();
    });
  });

  // Wizard Navigation
  const wizardNextBtn1 = document.getElementById('wizardNext1');
  const wizardNextBtn2 = document.getElementById('wizardNext2');
  const wizardNextBtn3 = document.getElementById('wizardNext3');
  const wizardPrevBtn2 = document.getElementById('wizardPrev2');
  const wizardPrevBtn3 = document.getElementById('wizardPrev3');
  const wizardPrevBtn4 = document.getElementById('wizardPrev4');
  const wizardSubmitBtn = document.getElementById('wizardSubmit');

  if (wizardNextBtn1) {
    wizardNextBtn1.addEventListener('click', () => {
      const deptVal = document.getElementById('wizardDeptSelect')?.value;
      if (deptVal) bookingState.dept = deptVal;
      currentBookingStep = 2;
      updateWizardUI();
    });
  }

  if (wizardNextBtn2) {
    wizardNextBtn2.addEventListener('click', () => {
      const docVal = document.getElementById('wizardDoctorSelect')?.value;
      if (docVal) bookingState.doctor = docVal;
      currentBookingStep = 3;
      updateWizardUI();
    });
  }

  if (wizardNextBtn3) {
    wizardNextBtn3.addEventListener('click', () => {
      const dateVal = document.getElementById('wizardDatePicker')?.value;
      if (dateVal) bookingState.date = dateVal;
      currentBookingStep = 4;
      updateWizardUI();
    });
  }

  if (wizardPrevBtn2) wizardPrevBtn2.addEventListener('click', () => { currentBookingStep = 1; updateWizardUI(); });
  if (wizardPrevBtn3) wizardPrevBtn3.addEventListener('click', () => { currentBookingStep = 2; updateWizardUI(); });
  if (wizardPrevBtn4) wizardPrevBtn4.addEventListener('click', () => { currentBookingStep = 3; updateWizardUI(); });

  if (wizardSubmitBtn) {
    wizardSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const pName = document.getElementById('patientNameInput')?.value;
      const pPhone = document.getElementById('patientPhoneInput')?.value;
      const pEmail = document.getElementById('patientEmailInput')?.value;

      if (!pName || !pPhone) {
        showToast('Please enter patient name and contact number', 'emergency');
        return;
      }

      bookingState.patientName = pName;
      bookingState.patientPhone = pPhone;
      bookingState.patientEmail = pEmail;
      bookingState.refId = 'MC-' + Math.floor(100000 + Math.random() * 900000);

      // Render Confirmation Screen
      const confirmRef = document.getElementById('confirmRefId');
      const confirmDoc = document.getElementById('confirmDoctor');
      const confirmDept = document.getElementById('confirmDept');
      const confirmDateTime = document.getElementById('confirmDateTime');
      const confirmPatient = document.getElementById('confirmPatient');

      if (confirmRef) confirmRef.textContent = bookingState.refId;
      if (confirmDoc) confirmDoc.textContent = bookingState.doctor;
      if (confirmDept) confirmDept.textContent = bookingState.dept;
      if (confirmDateTime) confirmDateTime.textContent = `${bookingState.date} at ${bookingState.slot}`;
      if (confirmPatient) confirmPatient.textContent = `${bookingState.patientName} (${bookingState.patientPhone})`;

      currentBookingStep = 5;
      updateWizardUI();
      showToast(`Appointment confirmed! Booking Ref #${bookingState.refId}`, 'success');
    });
  }

  const closeConfirmBtn = document.getElementById('closeConfirmBtn');
  if (closeConfirmBtn) {
    closeConfirmBtn.addEventListener('click', () => {
      closeModal(bookingModal);
      resetBookingWizard();
    });
  }

  // =========================================================================
  // DEPARTMENT FILTER TABS
  // =========================================================================
  const deptTabs = document.querySelectorAll('.dept-tab-btn');
  const deptCards = document.querySelectorAll('.dept-card');

  deptTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      deptTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterCategory = tab.dataset.filter;
      deptCards.forEach(card => {
        if (filterCategory === 'all' || card.dataset.category === filterCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // STATS NUMBER COUNTER ANIMATION ON SCROLL
  // =========================================================================
  let counted = false;
  const counters = document.querySelectorAll('.counter-number');

  function animateCounters() {
    if (counted) return;
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      if (!target) return;
      const duration = 1800;
      const step = Math.ceil(target / (duration / 25));
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.innerHTML = current.toLocaleString() + (counter.dataset.suffix || '');
      }, 25);
    });
    counted = true;
  }

  const whySection = document.getElementById('why-us');
  if (whySection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
      }
    }, { threshold: 0.3 });
    observer.observe(whySection);
  }

  // =========================================================================
  // NEWSLETTER & CONTACT FORM
  // =========================================================================
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('Thank you for subscribing to MediCare Health Pulse!', 'success');
        input.value = '';
      }
    });
  }

  const quickContactBtn = document.getElementById('quickContactBtn');
  if (quickContactBtn) {
    quickContactBtn.addEventListener('click', () => {
      showToast('Our patient concierge will contact you within 15 minutes.', 'success');
    });
  }

  // =========================================================================
  // ACCESSIBILITY & KEYBOARD FOCUS OUTLINES
  // =========================================================================
  document.body.addEventListener('mousedown', () => {
    document.body.classList.add('using-mouse');
  });
  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.remove('using-mouse');
    }
  });
});
