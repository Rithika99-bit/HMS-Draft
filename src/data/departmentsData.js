/**
 * MediCare Hospital Management System - Departments Registry
 */

export const departmentCategories = [
  { id: 'all', label: 'All Departments' },
  { id: 'critical', label: 'Critical & Emergency' },
  { id: 'surgical', label: 'Surgical & Specialist' },
  { id: 'primary', label: 'Primary & Family' }
];

export const departmentsData = [
  {
    id: 'cardiology',
    name: 'Cardiology & Heart Care',
    category: 'surgical',
    categoryLabel: 'Surgical & Specialist',
    icon: 'HeartPulse',
    shortDesc: 'Comprehensive cardiac therapeutics, interventional cardiology, 3D echocardiography, and vascular disease management.',
    specialistsCount: 8,
    avgWait: '10 Mins',
    features: ['24/7 Cardiac Catheterization Lab', 'Coronary Angioplasty & Stenting', 'Advanced Pacemaker Implantation', 'Pediatric Heart Clinic'],
    color: '#0284c7',
    badge: 'Robotic Cath-Lab'
  },
  {
    id: 'neurology',
    name: 'Neurology & Neurosciences',
    category: 'surgical',
    categoryLabel: 'Surgical & Specialist',
    icon: 'Brain',
    shortDesc: 'Dedicated stroke center, neuro-oncology, epilepsy monitoring, and cognitive rehabilitation therapy.',
    specialistsCount: 6,
    avgWait: '15 Mins',
    features: ['Acute Stroke Rapid Response', 'Minimally Invasive Spine Surgery', 'Advanced EEG/EMG Diagnostics', 'Parkinson & Movement Disorders'],
    color: '#0d9488',
    badge: 'Level 1 Stroke Unit'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Joint Surgery',
    category: 'surgical',
    categoryLabel: 'Surgical & Specialist',
    icon: 'Bone',
    shortDesc: 'Pioneering robotic joint replacement, sports medicine, spinal alignment, and complex trauma reconstruction.',
    specialistsCount: 9,
    avgWait: '12 Mins',
    features: ['MAKO Robotic Joint Arthroplasty', 'Arthroscopic Sports Surgery', 'Hydrotherapy Rehab Center', '24/7 Fracture Emergency Unit'],
    color: '#3b82f6',
    badge: 'Robotic Arthroplasty'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Neonatology',
    category: 'primary',
    categoryLabel: 'Primary & Family',
    icon: 'Baby',
    shortDesc: 'Comprehensive healthcare for infants, children, and adolescents with Level III Neonatal Intensive Care (NICU).',
    specialistsCount: 7,
    avgWait: '5 Mins',
    features: ['Level III 24-Bed Neonatal ICU', 'Childhood Allergy & Asthma Clinic', 'Pediatric Surgery Suites', 'Routine Child Vaccination Hub'],
    color: '#ec4899',
    badge: 'Level III NICU'
  },
  {
    id: 'emergency',
    name: 'Emergency & Trauma Care',
    category: 'critical',
    categoryLabel: 'Critical & Emergency',
    icon: 'AlertCircle',
    shortDesc: '24/7 emergency care equipped with dedicated triage, immediate imaging, and instant surgical dispatch.',
    specialistsCount: 14,
    avgWait: 'Immediate',
    features: ['Helipad Trauma Air Transport', '12 Rapid Resuscitation Bays', 'Point-of-Care Blood Gas & CT', 'Paramedic Telemetry Link'],
    color: '#ef4444',
    badge: '24/7 Red Alert Ready'
  },
  {
    id: 'dermatology',
    name: 'Dermatology & Skin Center',
    category: 'primary',
    categoryLabel: 'Primary & Family',
    icon: 'Sparkles',
    shortDesc: 'Advanced medical dermatology, skin cancer screenings, laser treatments, and allergy patch testing.',
    specialistsCount: 5,
    avgWait: '15 Mins',
    features: ['Digital Dermatoscopy & Mole Mapping', 'Phototherapy Ultraviolet Suites', 'Mohs Micrographic Surgery', 'Laser Aesthetics & Scar Therapy'],
    color: '#f59e0b',
    badge: 'Laser Skin Center'
  },
  {
    id: 'gynecology',
    name: 'Obstetrics & Gynecology',
    category: 'primary',
    categoryLabel: 'Primary & Family',
    icon: 'Users',
    shortDesc: 'Holistic women’s health, high-risk prenatal care, private birthing suites, and fertility diagnostics.',
    specialistsCount: 8,
    avgWait: '10 Mins',
    features: ['Luxury Private Birthing Suites', 'High-Risk Pregnancy Monitoring', 'Fetal Echocardiography', 'Laparoscopic Pelvic Surgery'],
    color: '#8b5cf6',
    badge: 'Private Birthing Suites'
  },
  {
    id: 'general-medicine',
    name: 'General & Internal Medicine',
    category: 'primary',
    categoryLabel: 'Primary & Family',
    icon: 'Stethoscope',
    shortDesc: 'Preventive healthcare, chronic disease management (Diabetes, Hypertension), and comprehensive health checkups.',
    specialistsCount: 12,
    avgWait: '8 Mins',
    features: ['Executive Health Checkup Packages', 'Diabetes Lifestyle Program', 'Geriatric & Palliative Care', 'Inpatient Medical Ward Support'],
    color: '#10b981',
    badge: 'Executive Health Clinic'
  }
];
