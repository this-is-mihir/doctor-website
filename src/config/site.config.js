// =============================================
// SITE CONFIGURATION — SINGLE SOURCE OF TRUTH
// =============================================

export const SITE = {
  name: "HealthCare Clinic",
  tagline: "Your Health, Our Priority",
  description: "Delivering comprehensive healthcare services through our state-of-the-art facility with compassionate care and cutting-edge medical technology.",
  established: 2010,
  address: "123 Medical Plaza, Healthcare Avenue, City - 380001",
  city: "City",
  state: "State",
  phone: "+91 98XXXXXXXX",
  phoneAlt: "+91 97XXXXXXXX",
  email: "info@healthcareclinic.com",
  emailAppointment: "appointments@healthcareclinic.com",
  whatsapp: "916354689922",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.0!2d72.5!3d23.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sClinic!5e0!3m2!1sen!2sin!4v1234567890",
  social: {
    facebook: "#", instagram: "#", twitter: "#", youtube: "#", linkedin: "#",
  },
};

export const DOCTOR = {
  name: "Dr. Rajesh Sharma",
  fullName: "Dr. Rajesh Kumar Sharma",
  degree: "MBBS, MD (Medicine), FCCP",
  specialization: "General Medicine & Cardiology",
  experience: 16,
  bio: "With over 16 years of dedicated medical practice, Dr. Rajesh Sharma has established himself as one of the most trusted physicians in the region. His patient-first approach combined with deep clinical expertise has helped thousands of patients recover and lead healthier lives.",
  bioDetailed: "Dr. Rajesh Sharma completed his MBBS from a prestigious medical college and went on to specialize in Internal Medicine. He further obtained his FCCP certification, enhancing his expertise in critical care and pulmonology.",
  philosophy: "\"I believe that healthcare should be accessible, compassionate, and comprehensive. Every patient deserves not just treatment, but genuine care and attention.\"",
  awards: [
    { title: "Best Doctor Award", org: "City Medical Association, 2022" },
    { title: "Excellence in Patient Care", org: "State Health Board, 2020" },
    { title: "Community Health Champion", org: "NGO Foundation, 2019" },
  ],
};

export const TEAM = [
  { name: "Dr. Priya Patel", degree: "BDS, MDS", role: "Dental Specialist", img: "/images/doc2.png" },
  { name: "Dr. Amit Mehta", degree: "MBBS, MS", role: "Orthopedic Consultant", img: "/images/doc1.png" },
  { name: "Nurse Kavita Singh", degree: "B.Sc Nursing", role: "Head Nurse", img: "/images/doc4.png" },
  { name: "Dr. Sameer Verma", degree: "MD, DM", role: "Neurologist", img: "/images/doc3.png" },
  { name: "Dr. Ananya Sharma", degree: "MBBS, MD", role: "Pediatrician", img: "/images/doc6.png" },
  { name: "Dr. Vikram Reddy", degree: "MD, FACC", role: "Cardiologist", img: "/images/doc5.png" },
];

export const STATS = [
  { number: 15000, suffix: "+", label: "Happy Patients" },
  { number: 16, suffix: "+", label: "Years Experience" },
  { number: 98, suffix: "%", label: "Patient Satisfaction" },
  { number: 25, suffix: "+", label: "Specializations" },
];

export const SERVICES = [
  { icon: "Heart", title: "Cardiology", short: "Comprehensive heart care including ECG, Echo, and cardiac consultations.", full: "Our cardiology department offers complete cardiac care from routine checkups to advanced diagnostics.", features: ["ECG & 2D Echo", "Holter Monitoring", "Cardiac Risk Assessment", "Preventive Cardiology"] },
  { icon: "Wind", title: "Pulmonology", short: "Expert respiratory care for asthma, COPD, and all lung conditions.", full: "Specialized respiratory care including diagnosis and treatment of asthma, COPD, pneumonia, and tuberculosis.", features: ["Pulmonary Function Test", "Asthma Management", "COPD Treatment", "Sleep Apnea Care"] },
  { icon: "Stethoscope", title: "General Medicine", short: "Complete primary healthcare for all ages with personalized treatment plans.", full: "Comprehensive general medicine services covering fever, diabetes, hypertension, thyroid, and infections.", features: ["Diabetes Management", "Hypertension Control", "Thyroid Care", "Routine Checkups"] },
  { icon: "Bone", title: "Orthopedics", short: "Advanced bone and joint care for pain-free movement and mobility.", full: "Expert orthopedic care including treatment of fractures, joint pain, arthritis, and sports injuries.", features: ["Joint Replacement", "Fracture Care", "Sports Medicine", "Spine Treatment"] },
  { icon: "Brain", title: "Neurology", short: "Specialized brain and nerve disorder diagnosis and treatment.", full: "Comprehensive neurological care for headaches, migraines, epilepsy, stroke, and neuropathy.", features: ["Migraine Treatment", "Epilepsy Management", "Stroke Care", "Nerve Disorders"] },
  { icon: "Smile", title: "Dental Care", short: "Complete dental solutions from cleaning to cosmetic dentistry.", full: "Full-service dental care including cleanings, root canals, orthodontics, and cosmetic dentistry.", features: ["Root Canal", "Dental Implants", "Orthodontics", "Cosmetic Dentistry"] },
  { icon: "Baby", title: "Pediatrics", short: "Specialized healthcare for infants, children, and adolescents.", full: "Complete pediatric care including vaccinations, growth monitoring, and childhood illness management.", features: ["Vaccinations", "Growth Monitoring", "Newborn Care", "Child Nutrition"] },
  { icon: "Eye", title: "Ophthalmology", short: "Comprehensive eye care and vision correction services.", full: "Expert eye care including vision testing, glaucoma treatment, cataract consultation, and eye health management.", features: ["Vision Testing", "Glaucoma Care", "Cataract Consultation", "Eye Health Checkup"] },
];

export const TESTIMONIALS = [
  { name: "Rahul Sharma", rating: 5, text: "Dr. Rajesh is incredibly knowledgeable and caring. He took the time to explain my condition thoroughly and the treatment plan was very effective. I recovered much faster than expected.", date: "March 2026", condition: "Cardiac Care" },
  { name: "Priya Patel", rating: 5, text: "The best medical experience I've ever had. The clinic is clean, modern, and well-equipped. The staff is very friendly and professional. Dr. Sharma's expertise is unmatched.", date: "February 2026", condition: "Pulmonology" },
  { name: "Amit Desai", rating: 5, text: "My father was suffering from severe joint pain for years. Dr. Sharma's treatment plan worked wonders. Within 3 months, my father is now walking without pain.", date: "January 2026", condition: "Orthopedics" },
  { name: "Meera Joshi", rating: 4, text: "Very professional clinic with modern facilities. The appointment process was smooth and I didn't have to wait long. Great experience overall!", date: "December 2025", condition: "General Medicine" },
  { name: "Vikram Singh", rating: 5, text: "I was diagnosed with diabetes and was very worried. Dr. Rajesh managed my condition effectively and educated me about lifestyle changes. My sugar levels are now controlled.", date: "November 2025", condition: "Diabetes Management" },
  { name: "Anita Verma", rating: 5, text: "My child had recurring fever and respiratory issues. Dr. Sharma diagnosed the underlying condition accurately. My child is now healthy and active. Forever grateful!", date: "October 2025", condition: "Pediatric Care" },
  { name: "Sneha Kapoor", rating: 5, text: "Extremely professional staff and the doctor really listens. The follow-up care was exceptional. I've never felt so well taken care of at any clinic before.", date: "September 2025", condition: "General Checkup" },
  { name: "Ravi Thakur", rating: 5, text: "After visiting multiple doctors, Dr. Sharma finally diagnosed my issue correctly. His attention to detail is remarkable. Highly recommended to everyone!", date: "August 2025", condition: "Cardiology" },
  { name: "Neha Agarwal", rating: 5, text: "The dental treatment I received here was painless and the results are amazing. Dr. Priya was gentle and explained every step. My smile has never looked better!", date: "July 2025", condition: "Dental Care" },
  { name: "Karan Mehta", rating: 4, text: "Came in for a routine eye checkup and was impressed by the advanced equipment they have. Very thorough examination and helpful advice on eye care.", date: "June 2025", condition: "Ophthalmology" },
  { name: "Sunita Reddy", rating: 5, text: "I had severe breathing difficulties for months. Dr. Sharma's treatment plan for my asthma has been life-changing. I can finally sleep peacefully at night.", date: "May 2025", condition: "Pulmonology" },
  { name: "Deepak Jain", rating: 5, text: "The whole family comes here for regular checkups. The doctors and staff know us personally and always provide personalized care. Feels like a second home.", date: "April 2025", condition: "Family Medicine" },
  { name: "Pooja Nair", rating: 5, text: "I was nervous about my pregnancy but Dr. Sharma and the team made the entire journey smooth and comfortable. Their care and attention was beyond expectations.", date: "March 2025", condition: "Maternity Care" },
  { name: "Arjun Malhotra", rating: 4, text: "Quick diagnosis and effective treatment for my sports injury. The physiotherapy sessions were excellent and I was back on the field in just 6 weeks.", date: "February 2025", condition: "Sports Medicine" },
  { name: "Kavita Shah", rating: 5, text: "My mother's thyroid condition has been managed beautifully here. Regular monitoring and medication adjustments have kept her levels perfectly stable.", date: "January 2025", condition: "Thyroid Care" },
  { name: "Rohit Gupta", rating: 5, text: "Best clinic in the city without a doubt. Modern facilities, zero waiting time, and a doctor who genuinely cares about his patients. Five stars all the way!", date: "December 2024", condition: "General Medicine" },
];

export const FAQS = [
  { q: "What are the clinic timings?", a: "Our clinic is open Monday to Saturday, 9:00 AM to 1:00 PM and 5:00 PM to 9:00 PM. Sunday consultations are available by prior appointment only." },
  { q: "Do I need an appointment or can I walk in?", a: "While walk-ins are welcome, we recommend booking an appointment to minimize your waiting time. You can book online through our website or call us directly." },
  { q: "What insurance plans do you accept?", a: "We accept most major insurance plans including Star Health, ICICI Lombard, New India Assurance, and others. Please call our reception to confirm your specific plan." },
  { q: "Is parking available at the clinic?", a: "Yes, we have ample parking space available for both two-wheelers and four-wheelers right in front of the clinic." },
  { q: "Do you offer emergency services?", a: "We provide urgent care during clinic hours. For after-hours emergencies, please call our emergency helpline number and we will guide you accordingly." },
  { q: "How can I get my reports/prescriptions online?", a: "We provide digital prescriptions and reports via email and WhatsApp. You can also request past records by contacting our reception." },
];

export const TIMINGS = {
  weekdays: { morning: "9:00 AM - 1:00 PM", evening: "5:00 PM - 9:00 PM" },
  saturday: { morning: "9:00 AM - 1:00 PM", evening: "5:00 PM - 7:00 PM" },
  sunday: "By Appointment Only",
  emergency: "24/7 Helpline Available",
};

export const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];
