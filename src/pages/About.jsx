import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ArrowRight, CheckCircle, Quote } from 'lucide-react';
import { SITE, DOCTOR, TEAM } from '../config/site.config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
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
            <img src="/images/doc3.png" alt={DOCTOR.name} style={{ borderRadius: 20, width: '100%', objectFit: 'cover', objectPosition: 'top center', boxShadow: '0 16px 40px rgba(0,0,0,.08)' }} />
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
            <img src="/images/doc5.png" alt="Clinic Team" style={{ borderRadius: 20, width: '100%', objectFit: 'cover', objectPosition: 'top center', boxShadow: '0 16px 40px rgba(0,0,0,.08)' }} />
          </div>
        </div>
        <style>{`@media(max-width:768px){section:nth-of-type(4) .container{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* Team */}
      <section style={{ padding: '6rem 0', background: 'var(--color-g50)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-badge" style={{ background: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>Our Team</span>
            <h2 className="section-title" style={{ marginTop: '1rem', fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>Meet Our Experts</h2>
            <p className="section-sub" style={{ marginTop: '0.5rem', fontSize: '1rem', color: 'var(--color-g500)' }}>A dedicated team of highly qualified healthcare professionals</p>
          </div>
          
          <div className="reveal" style={{ paddingBottom: '3rem' }}>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 }
              }}
              style={{ paddingBottom: '4rem' }}
            >
              {TEAM.map((m, i) => (
                <SwiperSlide key={i}>
                  <div className="team-card" style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.04)', transition: 'all 0.4s ease', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
                    
                    {/* Robust Image Container - 1:1 Square Aspect Ratio */}
                    <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', position: 'relative', background: 'var(--color-g100)' }}>
                      <img 
                        src={m.img} 
                        alt={m.name} 
                        className="team-img" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} 
                      />
                      {/* Subtle inner gradient to make the image pop */}
                      <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(0,0,0,0.04)', borderRadius: '24px 24px 0 0', pointerEvents: 'none', zIndex: 1 }} />
                    </div>
                    
                    {/* Content Box */}
                    <div style={{ padding: '1.5rem', textAlign: 'center', background: '#fff', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-dark)', marginBottom: '0.3rem' }}>{m.name}</h3>
                      <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '0.2rem' }}>{m.degree}</p>
                      <p style={{ color: 'var(--color-g500)', fontSize: '0.85rem', margin: 0 }}>{m.role}</p>
                    </div>
                    
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <style>{`
            .team-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); border-color: rgba(8, 145, 178, 0.2); }
            .team-card:hover .team-img { transform: scale(1.08); }
          `}</style>
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
