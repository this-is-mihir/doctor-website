import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ArrowRight, CheckCircle, Quote } from 'lucide-react';
import { SITE, DOCTOR, TEAM } from '../config/site.config';
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const main = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .7, scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
      gsap.utils.toArray('.stagger-p').forEach(p => {
        gsap.fromTo(p.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .5, stagger: .1, scrollTrigger: { trigger: p, start: 'top 85%' } });
      });
    }, main);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={main}>
      {/* Header */}
      <section style={{ padding: '8rem 0 3rem', background: 'linear-gradient(135deg, var(--color-primary-50), #fff)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.4rem', fontSize: '.85rem', color: 'var(--color-g400)', marginBottom: '.5rem' }}>
            <Link to="/" style={{ color: 'var(--color-primary)' }}>Home</Link> / <span>About</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>About <span style={{ color: 'var(--color-primary)' }}>{SITE.name}</span></h1>
          <p style={{ color: 'var(--color-g500)', fontSize: '.95rem', maxWidth: 500, margin: '.5rem auto 0' }}>Our story, mission, and the team behind your healthcare</p>
        </div>
      </section>

      {/* Doctor */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', alignItems: 'center' }}>
          <div className="reveal">
            <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&h=600&fit=crop&crop=face" alt={DOCTOR.name} style={{ borderRadius: 20, width: '100%', objectFit: 'cover', boxShadow: '0 16px 40px rgba(0,0,0,.08)' }} />
          </div>
          <div className="reveal">
            <span className="section-badge"><Award size={13} /> Meet Our Doctor</span>
            <h2 className="section-title" style={{ marginTop: '.75rem' }}>{DOCTOR.name}</h2>
            <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '.95rem', marginBottom: '.75rem' }}>{DOCTOR.degree}</p>
            <p style={{ color: 'var(--color-g500)', lineHeight: 1.75, marginBottom: '1rem', fontSize: '.9rem' }}>{DOCTOR.bio}</p>
            <p style={{ color: 'var(--color-g500)', lineHeight: 1.75, marginBottom: '1.2rem', fontSize: '.9rem' }}>{DOCTOR.bioDetailed}</p>
            <blockquote style={{ borderLeft: '3px solid var(--color-primary)', padding: '.8rem 1.2rem', background: 'var(--color-primary-50)', borderRadius: '0 10px 10px 0', marginBottom: '1.5rem' }}>
              <p style={{ color: 'var(--color-dark)', fontStyle: 'italic', fontSize: '.92rem', lineHeight: 1.7 }}>
                <Quote size={16} style={{ color: 'var(--color-primary)', marginRight: '.3rem', display: 'inline' }} />
                {DOCTOR.philosophy}
              </p>
            </blockquote>
          </div>
        </div>
        <style>{`@media(max-width:768px){section:nth-of-type(2) .container{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* Awards */}
      <section style={{ padding: '4rem 0', background: 'var(--color-g50)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <span className="section-badge"><Award size={13} /> Achievements</span>
            <h2 className="section-title">Awards & Recognitions</h2>
          </div>
          <div className="stagger-p" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.2rem', marginTop: '2rem' }}>
            {DOCTOR.awards.map((a, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '1.5rem', border: '1px solid var(--color-g200)', display: 'flex', alignItems: 'flex-start', gap: '.8rem', transition: 'all .3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                <Award size={22} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <h4 style={{ fontSize: '.95rem', marginBottom: '.2rem' }}>{a.title}</h4>
                  <p style={{ fontSize: '.82rem', color: 'var(--color-g400)' }}>{a.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Story */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div className="reveal">
            <span className="section-badge">Our Story</span>
            <h2 className="section-title" style={{ marginTop: '.75rem' }}>A Legacy of <span style={{ color: 'var(--color-primary)' }}>Compassionate Care</span></h2>
            <p style={{ color: 'var(--color-g500)', lineHeight: 1.75, marginBottom: '1rem', fontSize: '.9rem' }}>Established in {SITE.established}, {SITE.name} started with a simple vision — to make quality healthcare accessible to everyone. Over the years, we've grown from a small practice into a fully equipped multi-specialty clinic.</p>
            <p style={{ color: 'var(--color-g500)', lineHeight: 1.75, marginBottom: '1.5rem', fontSize: '.9rem' }}>Today, we serve thousands of patients with state-of-the-art diagnostic equipment, a team of dedicated professionals, and a commitment to continuous improvement.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '1.2rem', background: 'var(--color-primary-50)', borderRadius: 14 }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>{SITE.established}</div>
                <div style={{ fontSize: '.82rem', color: 'var(--color-g500)' }}>Established</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1.2rem', background: 'var(--color-primary-50)', borderRadius: 14 }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>15,000+</div>
                <div style={{ fontSize: '.82rem', color: 'var(--color-g500)' }}>Lives Touched</div>
              </div>
            </div>
          </div>
          <div className="reveal">
            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=550&h=420&fit=crop" alt="Clinic" style={{ borderRadius: 20, width: '100%', objectFit: 'cover', boxShadow: '0 16px 40px rgba(0,0,0,.08)' }} />
          </div>
        </div>
        <style>{`@media(max-width:768px){section:nth-of-type(4) .container{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* Team */}
      <section style={{ padding: '4rem 0', background: 'var(--color-g50)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <span className="section-badge">Our Team</span>
            <h2 className="section-title">Meet Our Experts</h2>
            <p className="section-sub">A dedicated team of healthcare professionals</p>
          </div>
          <div className="stagger-p" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '1.5rem' }}>
            {TEAM.map((m, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--color-g200)', transition: 'all .3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                <img src={m.img} alt={m.name} style={{ width: '100%', height: 240, objectFit: 'cover' }} />
                <div style={{ padding: '1.2rem', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '.2rem' }}>{m.name}</h3>
                  <p style={{ color: 'var(--color-primary)', fontSize: '.82rem', fontWeight: 600 }}>{m.degree}</p>
                  <p style={{ color: 'var(--color-g400)', fontSize: '.82rem' }}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 0', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: '#fff', textAlign: 'center' }}>
        <div className="container reveal">
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '.75rem' }}>Experience Healthcare That Truly Cares</h2>
          <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '.92rem', marginBottom: '1.5rem' }}>Join thousands of satisfied patients. Book your appointment today.</p>
          <Link to="/book-appointment" className="btn btn-white">Book Appointment <ArrowRight size={15} /></Link>
        </div>
      </section>
    </main>
  );
}
