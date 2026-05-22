import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Phone, Mail, Clock, Globe, Camera, MessageCircle } from 'lucide-react';
import { SITE, TIMINGS } from '../config/site.config';
import { submitForm, showToast } from '../utils/formHandler';
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const main = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach(el => gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .7, scrollTrigger: { trigger: el, start: 'top 85%' } }));
    }, main);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    
    if (!data.name || data.name.trim().length < 3) return showToast('Please enter a valid name (min 3 chars).', 'error');
    if (!data.phone || !/^[0-9]{10,12}$/.test(data.phone.trim())) return showToast('Please enter a valid 10-12 digit phone number.', 'error');
    if (!data.subject || data.subject.trim().length < 5) return showToast('Subject must be at least 5 characters long.', 'error');
    if (!data.message || data.message.trim().length < 5) return showToast('Please enter a descriptive message.', 'error');

    setLoading(true);
    data.type = 'contact';
    const ok = await submitForm(data, 'contact');
    setLoading(false);
    if (ok) e.target.reset();
  };

  return (
    <main ref={main}>
      <section style={{ padding: '8rem 0 3rem', background: 'linear-gradient(135deg, var(--color-primary-50), #fff)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.4rem', fontSize: '.85rem', color: 'var(--color-g400)', marginBottom: '.5rem' }}>
            <Link to="/" style={{ color: 'var(--color-primary)' }}>Home</Link> / <span>Contact</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>Contact <span style={{ color: 'var(--color-primary)' }}>Us</span></h1>
          <p style={{ color: 'var(--color-g500)', fontSize: '.95rem', maxWidth: 500, margin: '.5rem auto 0' }}>Have a question? We're here to help.</p>
        </div>
      </section>

      <section style={{ padding: '3.5rem 0 5rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2.5rem', alignItems: 'flex-start' }}>
          <div className="reveal">
            <div style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', borderRadius: 20, padding: '2rem', color: '#fff' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '1.5rem', color: '#fff' }}>Get In Touch</h3>
              {[
                { icon: MapPin, title: 'Visit Us', text: SITE.address },
                { icon: Phone, title: 'Call Us', text: `${SITE.phone}\n${SITE.phoneAlt}` },
                { icon: Mail, title: 'Email Us', text: `${SITE.email}\n${SITE.emailAppointment}` },
                { icon: Clock, title: 'Working Hours', text: `Mon-Fri: ${TIMINGS.weekdays.morning}, ${TIMINGS.weekdays.evening}\nSat: ${TIMINGS.saturday.morning}\nSun: ${TIMINGS.sunday}` },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={18} />
                  </div>
                  <div><strong style={{ fontSize: '.9rem' }}>{item.title}</strong><p style={{ fontSize: '.82rem', opacity: .85, whiteSpace: 'pre-line', marginTop: '.15rem', lineHeight: 1.6 }}>{item.text}</p></div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '.5rem', marginTop: '.5rem' }}>
                {[Globe, Camera, MessageCircle].map((Icon, i) => (
                  <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all .3s' }}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="reveal">
            <div style={{ background: '#fff', borderRadius: 20, padding: '2.5rem', boxShadow: '0 12px 40px rgba(0,0,0,.04)', border: '1px solid var(--color-g200)' }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '.4rem' }}>Send a Message</h2>
              <p style={{ color: 'var(--color-g500)', marginBottom: '1.5rem', fontSize: '.88rem' }}>We'll respond within 24 hours.</p>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group"><label>Name *</label><input name="name" required minLength="3" placeholder="Your name" title="Please enter at least 3 characters" /></div>
                  <div className="form-group"><label>Phone *</label><input name="phone" type="tel" required pattern="[0-9]{10,12}" placeholder="e.g. 9876543210" title="Please enter a valid 10-12 digit phone number" /></div>
                </div>
                <div className="form-group"><label>Email</label><input name="email" type="email" placeholder="your@email.com" /></div>
                <div className="form-group"><label>Subject *</label><input name="subject" required minLength="5" placeholder="What is this regarding?" title="Subject must be at least 5 characters long" /></div>
                <div className="form-group"><label>Message *</label><textarea name="message" rows="4" required placeholder="Your message..."></textarea></div>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '.85rem' }}>
                  {loading ? 'Sending...' : 'Send Message'} {!loading && <ArrowRight size={15} />}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="container reveal" style={{ marginTop: '3rem' }}>
          <div style={{ borderRadius: 18, overflow: 'hidden', height: 350, boxShadow: '0 8px 30px rgba(0,0,0,.06)' }}>
            <iframe src={SITE.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Clinic Location" />
          </div>
        </div>
        <style>{`@media(max-width:768px){section:nth-of-type(2) .container:first-child{grid-template-columns:1fr!important}}`}</style>
      </section>
    </main>
  );
}
