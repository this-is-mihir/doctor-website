import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, Phone, CalendarCheck } from 'lucide-react';
import { SITE, SERVICES, TIME_SLOTS, TIMINGS } from '../config/site.config';
import { submitForm, checkAvailability, showToast } from '../utils/formHandler';
import CustomSelect from '../components/CustomSelect';
import CustomDatePicker from '../components/CustomDatePicker';
gsap.registerPlugin(ScrollTrigger);

export default function BookAppointment() {
  const main = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach(el => gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .7, scrollTrigger: { trigger: el, start: 'top 85%' } }));
    }, main);
    return () => ctx.revert();
  }, []);

  const [formData, setFormData] = useState({ date: '', timeSlot: '', specialization: '' });
  const [slotCounts, setSlotCounts] = useState({});
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (formData.date) {
      setLoadingSlots(true);
      setFormData(prev => ({ ...prev, timeSlot: '' })); // reset time on date change
      checkAvailability(formData.date).then(counts => {
        if (counts) setSlotCounts(counts);
        setLoadingSlots(false);
      });
    }
  }, [formData.date]);

  const handleSelectChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    
    if (!data.name || data.name.trim().length < 3) return showToast('Please enter a valid name (min 3 chars).', 'error');
    if (!data.phone || !/^[0-9]{10,12}$/.test(data.phone.trim())) return showToast('Please enter a valid 10-12 digit phone number.', 'error');
    if (!data.date) return showToast('Please select a preferred date.', 'error');
    if (!data.timeSlot || data.timeSlot.includes('Pick a date')) return showToast('Please select a valid time slot.', 'error');
    if (!data.specialization) return showToast('Please select a specialization.', 'error');

    setLoading(true);
    data.type = 'appointment';
    const ok = await submitForm(data, 'appointment');
    setLoading(false);
    if (ok) {
      e.target.reset();
      setFormData({ date: '', timeSlot: '', specialization: '' });
    }
  };

  return (
    <main ref={main}>
      <section style={{ padding: '8rem 0 3rem', background: 'linear-gradient(135deg, var(--color-primary-50), #fff)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.4rem', fontSize: '.85rem', color: 'var(--color-g400)', marginBottom: '.5rem' }}>
            <Link to="/" style={{ color: 'var(--color-primary)' }}>Home</Link> / <span>Book Appointment</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>Book Your <span style={{ color: 'var(--color-primary)' }}>Appointment</span></h1>
          <p style={{ color: 'var(--color-g500)', fontSize: '.95rem', maxWidth: 500, margin: '.5rem auto 0' }}>Schedule your visit in just a few clicks</p>
        </div>
      </section>

      <section style={{ padding: '3.5rem 0 5rem', background: 'var(--color-g50)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2.5rem', alignItems: 'flex-start' }}>
          <div className="reveal">
            <div style={{ background: '#fff', borderRadius: 20, padding: '2.5rem', boxShadow: '0 12px 40px rgba(0,0,0,.04)', border: '1px solid var(--color-g200)' }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '.4rem' }}>Schedule Appointment</h2>
              <p style={{ color: 'var(--color-g500)', marginBottom: '1.5rem', fontSize: '.88rem' }}>Fill in details below. We'll confirm within 30 minutes.</p>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group"><label>Full Name *</label><input name="name" required minLength="3" placeholder="Your full name" title="Please enter at least 3 characters" /></div>
                  <div className="form-group"><label>Phone *</label><input name="phone" type="tel" required pattern="[0-9]{10,12}" placeholder="e.g. 9876543210" title="Please enter a valid 10-12 digit phone number" /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group"><label>Email</label><input name="email" type="email" placeholder="your@email.com" /></div>
                  <div className="form-group"><label>Age</label><input name="age" type="number" placeholder="Age" min="1" max="120" /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group"><label>Preferred Date *</label>
                    <CustomDatePicker 
                      name="date" 
                      value={formData.date} 
                      onChange={handleSelectChange} 
                      placeholder="Select Date"
                      required 
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="form-group"><label>Time Slot * {loadingSlots && <span style={{ fontSize: '.75rem', color: 'var(--color-primary)', marginLeft: '5px' }}>(Loading...)</span>}</label>
                    <CustomSelect 
                      name="timeSlot" 
                      value={formData.timeSlot} 
                      onChange={handleSelectChange} 
                      options={TIME_SLOTS.map(t => ({ 
                        label: `${t} ${(slotCounts[t] >= 20) ? '(Full)' : ''}`, 
                        value: t,
                        disabled: slotCounts[t] >= 20 
                      }))} 
                      placeholder={loadingSlots ? "Loading slots..." : (formData.date ? "Select Time" : "Pick a date first")} 
                      required 
                    />
                  </div>
                </div>
                <div className="form-group"><label>Specialization *</label>
                  <CustomSelect 
                    name="specialization" 
                    value={formData.specialization} 
                    onChange={handleSelectChange} 
                    options={SERVICES.map(s => ({ label: s.title, value: s.title }))} 
                    placeholder="Select Specialization" 
                    required 
                  />
                </div>
                <div className="form-group"><label>Additional Message</label><textarea name="message" rows="3" placeholder="Describe symptoms or concerns..."></textarea></div>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '.85rem' }}>
                  {loading ? 'Submitting...' : 'Book Appointment'} {!loading && <ArrowRight size={15} />}
                </button>
              </form>
            </div>
          </div>

          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', borderRadius: 20, padding: '2rem', color: '#fff' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '1.2rem', color: '#fff' }}><CalendarCheck size={18} style={{ display: 'inline', marginRight: '.4rem' }} />How It Works</h3>
              {[{ n: '1', t: 'Fill the Form', d: 'Enter your details and preferred time' }, { n: '2', t: 'Get Confirmation', d: "We'll confirm via call/email within 30 min" }, { n: '3', t: 'Visit the Clinic', d: 'Come at your scheduled time — no waiting' }].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '.75rem', marginBottom: i < 2 ? '1rem' : 0 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '.85rem', flexShrink: 0 }}>{s.n}</div>
                  <div><strong style={{ fontSize: '.9rem' }}>{s.t}</strong><p style={{ fontSize: '.8rem', opacity: .8 }}>{s.d}</p></div>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', borderRadius: 18, padding: '1.5rem', border: '1px solid var(--color-g200)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '.75rem' }}><Clock size={16} style={{ display: 'inline', marginRight: '.3rem' }} />Clinic Timings</h3>
              <div style={{ fontSize: '.85rem', color: 'var(--color-g500)', lineHeight: 1.8 }}>
                <div><strong>Mon-Fri:</strong> {TIMINGS.weekdays.morning} | {TIMINGS.weekdays.evening}</div>
                <div><strong>Saturday:</strong> {TIMINGS.saturday.morning} | {TIMINGS.saturday.evening}</div>
                <div><strong>Sunday:</strong> {TIMINGS.sunday}</div>
              </div>
              <div style={{ marginTop: '1rem', padding: '.75rem', background: 'var(--color-primary-50)', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '.85rem' }}><Phone size={14} style={{ display: 'inline', marginRight: '.3rem' }} />Emergency</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '.2rem' }}>{SITE.phone}</div>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){section:nth-of-type(2) .container{grid-template-columns:1fr!important}}`}</style>
      </section>
    </main>
  );
}
