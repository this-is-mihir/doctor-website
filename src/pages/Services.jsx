import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Wind, Stethoscope, Bone, Brain, Smile, Baby, Eye, ArrowRight, CheckCircle } from 'lucide-react';
import { SERVICES } from '../config/site.config';
gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = { Heart, Wind, Stethoscope, Bone, Brain, Smile, Baby, Eye };
const IMAGES = [
  'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=350&fit=crop',
];

export default function Services() {
  const main = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .7, scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
    }, main);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={main}>
      <section style={{ padding: '8rem 0 3rem', background: 'linear-gradient(135deg, var(--color-primary-50), #fff)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.4rem', fontSize: '.85rem', color: 'var(--color-g400)', marginBottom: '.5rem' }}>
            <Link to="/" style={{ color: 'var(--color-primary)' }}>Home</Link> / <span>Services</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>Our <span style={{ color: 'var(--color-primary)' }}>Specializations</span></h1>
          <p style={{ color: 'var(--color-g500)', fontSize: '.95rem', maxWidth: 500, margin: '.5rem auto 0' }}>Comprehensive healthcare under one roof with expert care</p>
        </div>
      </section>

      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          {SERVICES.map((s, i) => {
            const Icon = ICON_MAP[s.icon] || Stethoscope;
            const isReversed = i % 2 !== 0;
            return (
              <div key={i} className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'center', marginBottom: '4rem', direction: isReversed ? 'rtl' : 'ltr' }}>
                <div style={{ direction: 'ltr' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--color-primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Icon size={22} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', marginBottom: '.5rem' }}>{s.title}</h2>
                  <p style={{ color: 'var(--color-g500)', lineHeight: 1.75, marginBottom: '1rem', fontSize: '.9rem' }}>{s.full}</p>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.2rem' }}>
                    {s.features.map((f, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '.4rem', padding: '.3rem 0', color: 'var(--color-g600)', fontSize: '.88rem' }}>
                        <CheckCircle size={15} style={{ color: 'var(--color-success)' }} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/book-appointment" className="btn btn-primary" style={{ fontSize: '.85rem' }}>Book Consultation <ArrowRight size={14} /></Link>
                </div>
                <div style={{ direction: 'ltr' }}>
                  <img src={IMAGES[i] || IMAGES[0]} alt={s.title} style={{ borderRadius: 18, width: '100%', objectFit: 'cover', boxShadow: '0 12px 35px rgba(0,0,0,.06)' }} />
                </div>
              </div>
            );
          })}
        </div>
        <style>{`@media(max-width:768px){section:nth-of-type(2) .container > div{grid-template-columns:1fr!important;direction:ltr!important}}`}</style>
      </section>

      <section style={{ padding: '4rem 0', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: '#fff', textAlign: 'center' }}>
        <div className="container reveal">
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '.75rem' }}>Need Expert Medical Advice?</h2>
          <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '.92rem', marginBottom: '1.5rem' }}>Our specialists are here to help. Book a consultation today.</p>
          <Link to="/book-appointment" className="btn btn-white">Book Appointment <ArrowRight size={15} /></Link>
        </div>
      </section>
    </main>
  );
}
