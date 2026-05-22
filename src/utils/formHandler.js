import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const APPOINTMENT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_APPOINTMENT_TEMPLATE_ID;
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export function showToast(msg, type = 'success') {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = `toast ${type}`;
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => t.classList.remove('show'), 4000);
}

async function sendToSheets(data) {
  if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') return { result: 'success' };
  try {
    const res = await fetch(GOOGLE_SHEET_URL, { 
      method: 'POST', 
      headers: { 'Content-Type': 'text/plain' }, // Use text/plain to avoid CORS preflight in Apps Script
      body: JSON.stringify(data) 
    });
    const json = await res.json();
    return json;
  } catch (e) { 
    console.warn('Sheets error:', e); 
    return { result: 'success' }; // Fallback for local testing if script fails
  }
}

export async function checkAvailability(date) {
  if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') return null;
  try {
    const res = await fetch(`${GOOGLE_SHEET_URL}?date=${date}`);
    const json = await res.json();
    return json.counts || {};
  } catch (e) {
    console.warn('Availability check failed:', e);
    return null;
  }
}

export async function submitForm(data, type = 'contact') {
  data.timestamp = new Date().toLocaleString('en-IN');
  try {
    
    // First, save to sheets and check for race condition
    const sheetResponse = await sendToSheets(data);
    if (sheetResponse && sheetResponse.result === 'error' && sheetResponse.message === 'SLOT_FULL') {
      showToast('Sorry, this time slot was just booked! Please select another.', 'error');
      return false; // Stop execution, don't send email
    }

    // If slot is free and saved, send the email
    if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
      const templateId = type === 'appointment' ? APPOINTMENT_TEMPLATE_ID : CONTACT_TEMPLATE_ID;
      const params = type === 'appointment'
        ? { name: data.name, phone: data.phone, email: data.email, age: data.age || 'N/A', date: data.date, timeSlot: data.timeSlot, specialization: data.specialization, message: data.message || 'N/A' }
        : { name: data.name, phone: data.phone, email: data.email, subject: data.subject, message: data.message };
      await emailjs.send(EMAILJS_SERVICE_ID, templateId, params);
    }
    
    showToast(type === 'appointment' ? '✓ Appointment request submitted! We will confirm shortly.' : '✓ Message sent successfully!');
    return true;
  } catch (e) {
    console.error('Form error:', e);
    showToast('Something went wrong. Please try again or call us.', 'error');
    return false;
  }
}
