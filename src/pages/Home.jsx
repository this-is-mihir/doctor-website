import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Clock, Users, Award, CheckCircle, Star, Heart, Wind, Stethoscope, Bone, Brain, Smile, Baby, Eye, Phone, ChevronDown, Activity, Zap, HeartPulse, Quote, UserCheck, BadgeCheck, Sparkles } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { SITE, DOCTOR, STATS, SERVICES, TESTIMONIALS, FAQS } from '../config/site.config';

gsap.registerPlugin(ScrollTrigger);
const ICON_MAP = { Heart, Wind, Stethoscope, Bone, Brain, Smile, Baby, Eye };
const STAT_ICONS = [UserCheck, Award, BadgeCheck, Sparkles];
const SVC_IMAGES = [
  'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=350&fit=crop',
];

function Counter({ target, suffix }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.fromTo(el, { innerText: 0 }, {
          innerText: target, duration: 2, ease: 'power2.out', snap: { innerText: 1 },
          onUpdate() { el.textContent = Math.floor(parseFloat(el.textContent)) + suffix; }
        });
      }
    });
  }, [target, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-badge-anim', { opacity: 0, y: 20, duration: .6, delay: .2 });
      gsap.from('.hero-h1-anim', { opacity: 0, y: 30, duration: .8, delay: .4 });
      gsap.from('.hero-p-anim', { opacity: 0, y: 20, duration: .6, delay: .6 });
      gsap.from('.hero-btns-anim', { opacity: 0, y: 20, duration: .6, delay: .8 });
      gsap.from('.hero-img-anim', { opacity: 0, x: 40, scale: .95, duration: 1, delay: .5 });
      gsap.from('.hero-float', { opacity: 0, scale: .8, duration: .6, stagger: .2, delay: 1 });
      gsap.utils.toArray('.rv').forEach(el => gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .7, scrollTrigger: { trigger: el, start: 'top 88%' } }));
      gsap.utils.toArray('.sg').forEach(p => gsap.fromTo(p.children, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: .5, stagger: .08, scrollTrigger: { trigger: p, start: 'top 88%' } }));
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef}>

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, var(--color-primary-50) 0%, #fff 50%, #F0FDFA 100%)', padding: '6rem 0 3rem', overflow: 'hidden' }}>
        <div className="container hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div className="hero-badge-anim section-badge" style={{ marginBottom: '1rem' }}><Shield size={14} /> #1 Trusted Healthcare Provider</div>
            <h1 className="hero-h1-anim" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', lineHeight: 1.08, marginBottom: '1.2rem' }}>
              Bringing Quality<br /><span style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Healthcare Services</span><br />to You
            </h1>
            <p className="hero-p-anim" style={{ color: 'var(--color-g500)', fontSize: '1rem', maxWidth: 540, lineHeight: 1.75, marginBottom: '1.8rem' }}>
              Delivering comprehensive healthcare through our state-of-the-art facility. Expert doctors, modern equipment, and compassionate care — all under one roof.
            </p>
            <div className="hero-btns-anim" style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
              <Link to="/book-appointment" className="btn btn-primary">Book Appointment <ArrowRight size={16} /></Link>
              <Link to="/gallery" className="btn btn-outline">Our Gallery</Link>
            </div>
            <div className="hero-btns-anim" style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              {[{ icon: CheckCircle, t: 'Verified Doctors' }, { icon: Clock, t: 'Quick Response' }, { icon: Shield, t: '100% Safe' }].map((x, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.35rem', fontSize: '.82rem', color: 'var(--color-g500)' }}><x.icon size={14} style={{ color: 'var(--color-success)' }} /> {x.t}</div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }} className="hero-img-anim">
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&h=780&fit=crop&crop=face" alt={DOCTOR.name} style={{ borderRadius: 24, width: '100%', maxHeight: '75vh', objectFit: 'cover', boxShadow: '0 25px 60px rgba(8,145,178,.15)' }} />
            <div className="hero-float" style={{ position: 'absolute', top: '8%', right: -10, background: '#fff', borderRadius: 14, padding: '.75rem 1.1rem', boxShadow: '0 8px 30px rgba(0,0,0,.07)', display: 'flex', alignItems: 'center', gap: '.6rem', animation: 'floatY 3s ease-in-out infinite' }}>
              <Award size={20} style={{ color: 'var(--color-accent)' }} /><div><strong style={{ fontSize: '.95rem' }}>15,000+</strong><div style={{ fontSize: '.72rem', color: 'var(--color-g400)' }}>Happy Patients</div></div>
            </div>
            <div className="hero-float" style={{ position: 'absolute', bottom: '12%', left: -10, background: '#fff', borderRadius: 14, padding: '.75rem 1.1rem', boxShadow: '0 8px 30px rgba(0,0,0,.07)', display: 'flex', alignItems: 'center', gap: '.6rem', animation: 'floatY 3s ease-in-out infinite .5s' }}>
              <Star size={20} style={{ color: 'var(--color-accent)' }} /><div><strong style={{ fontSize: '.95rem' }}>4.9/5</strong><div style={{ fontSize: '.72rem', color: 'var(--color-g400)' }}>Patient Rating</div></div>
            </div>
          </div>
        </div>
        <style>{`@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}} @media(max-width:1024px){.hero-grid{grid-template-columns:1fr!important;text-align:center;gap:2rem!important} .hero-float{display:none!important} .hero-btns-anim{justify-content:center}}`}</style>
      </section>

      {/* ═══ STATS — equal cards ═══ */}
      <section style={{ padding: '0', marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="sg stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
            {STATS.map((s, i) => {
              const Icon = STAT_ICONS[i];
              return (
                <div key={i} className="card" style={{ textAlign: 'center', padding: '1.3rem 1rem' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--color-primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto .6rem' }}>
                    <Icon size={18} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    <Counter target={s.number} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: '.78rem', color: 'var(--color-g500)', fontWeight: 500 }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
        <style>{`@media(max-width:768px){.stat-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section style={{ padding: '4.5rem 0 3.5rem' }}>
        <div className="container">
          <div className="rv" style={{ textAlign: 'center' }}>
            <span className="section-badge"><Zap size={13} /> Why Choose Us</span>
            <h2 className="section-title">Why Patients Trust Us</h2>
            <p className="section-sub">Medical expertise with genuine compassion</p>
          </div>
          <div className="sg wcu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
            {[
              { icon: HeartPulse, title: 'Expert Doctors', desc: 'Board-certified specialists with years of clinical experience.' },
              { icon: Activity, title: 'Modern Equipment', desc: 'State-of-the-art diagnostic and treatment equipment.' },
              { icon: Clock, title: 'Quick Response', desc: 'Minimal wait times with efficient scheduling.' },
              { icon: Shield, title: 'Safe & Hygienic', desc: 'Strict infection control protocols for safety.' },
              { icon: Users, title: 'Friendly Staff', desc: 'Warm team dedicated to your comfort.' },
              { icon: Award, title: 'Award Winning', desc: 'Recognized for excellence in patient care.' },
            ].map((item, i) => (
              <div key={i} className="card-alt">
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--color-primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '.7rem' }}>
                  <item.icon size={18} style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 style={{ fontSize: '.95rem', marginBottom: '.25rem' }}>{item.title}</h3>
                <p style={{ fontSize: '.82rem', color: 'var(--color-g500)', lineHeight: 1.55 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:768px){.wcu-grid{grid-template-columns:1fr 1fr!important}} @media(max-width:480px){.wcu-grid{grid-template-columns:1fr!important}}`}</style>
        </div>
      </section>

      {/* ═══ SERVICES — DETAILED ═══ */}
      <section style={{ padding: '3.5rem 0', background: 'var(--color-g50)' }}>
        <div className="container">
          <div className="rv" style={{ textAlign: 'center' }}>
            <span className="section-badge"><Stethoscope size={13} /> Our Services</span>
            <h2 className="section-title">Our Specializations</h2>
            <p className="section-sub">Comprehensive healthcare under one roof with expert care</p>
          </div>
          {SERVICES.map((s, i) => {
            const Icon = ICON_MAP[s.icon] || Stethoscope;
            const isReversed = i % 2 !== 0;
            return (
              <div key={i} className="rv svc-detail" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'stretch', marginBottom: '3rem', direction: isReversed ? 'rtl' : 'ltr' }}>
                <div style={{ direction: 'ltr' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--color-primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '.8rem' }}>
                    <Icon size={20} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '.4rem' }}>{s.title}</h3>
                  <p style={{ color: 'var(--color-g500)', lineHeight: 1.7, marginBottom: '.8rem', fontSize: '.88rem' }}>{s.full}</p>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem' }}>
                    {s.features.map((f, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '.4rem', padding: '.2rem 0', color: 'var(--color-g600)', fontSize: '.84rem' }}>
                        <CheckCircle size={14} style={{ color: 'var(--color-success)', flexShrink: 0 }} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/book-appointment" className="btn btn-primary" style={{ fontSize: '.82rem', padding: '.6rem 1.3rem' }}>Book Consultation <ArrowRight size={14} /></Link>
                </div>
                <div style={{ direction: 'ltr', borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,.06)' }}>
                  <img src={SVC_IMAGES[i] || SVC_IMAGES[0]} alt={s.title} style={{ width: '100%', height: '100%', minHeight: 240, objectFit: 'cover', display: 'block' }} />
                </div>
              </div>
            );
          })}
        </div>
        <style>{`@media(max-width:768px){.svc-detail{grid-template-columns:1fr!important;direction:ltr!important}}`}</style>
      </section>

      {/* ═══ ABOUT PREVIEW ═══ */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '3.5rem', alignItems: 'center' }}>
          <div className="rv">
            <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=450&fit=crop" alt="Clinic" style={{ borderRadius: 20, width: '100%', objectFit: 'cover', boxShadow: '0 16px 40px rgba(0,0,0,.08)' }} />
          </div>
          <div className="rv">
            <span className="section-badge"><Award size={13} /> About Us</span>
            <h2 className="section-title" style={{ marginTop: '.75rem' }}>Why Choose<br /><span style={{ color: 'var(--color-primary)' }}>{SITE.name}?</span></h2>
            <p style={{ color: 'var(--color-g500)', lineHeight: 1.75, marginBottom: '1rem', fontSize: '.9rem' }}>
              With over {DOCTOR.experience} years of dedicated practice, our state-of-the-art facility and experienced doctors ensure the best care possible.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.4rem', marginBottom: '1.5rem' }}>
              {['Expert Doctors', 'Modern Equipment', 'Affordable Pricing', '24/7 Emergency', 'Lab Services', 'Pharmacy'].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.35rem', fontSize: '.84rem' }}><CheckCircle size={14} style={{ color: 'var(--color-success)' }} /> {t}</div>
              ))}
            </div>
            <Link to="/about" className="btn btn-primary" style={{ fontSize: '.85rem' }}>Learn More <ArrowRight size={14} /></Link>
          </div>
        </div>
        <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ padding: '3.5rem 0', background: 'var(--color-g50)' }}>
        <div className="container">
          <div className="rv" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span className="section-badge"><Star size={13} /> Testimonials</span>
            <h2 className="section-title">What Our Patients Say</h2>
          </div>
          <div className="rv">
            <Swiper modules={[Autoplay, Pagination]} slidesPerView={1} spaceBetween={16} loop autoplay={{ delay: 4500, disableOnInteraction: false }} pagination={{ clickable: true }}
              breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} style={{ paddingBottom: '2.5rem' }}>
              {TESTIMONIALS.map((t, i) => (
                <SwiperSlide key={i}>
                  <div className="card" style={{ height: '100%', borderTop: '3px solid var(--color-primary)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    <Quote size={24} style={{ color: 'var(--color-primary-200)', position: 'absolute', top: 14, right: 14 }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.8rem' }}>
                      <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '.8rem', flexShrink: 0 }}>
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '.85rem' }}>{t.name}</div>
                        <div style={{ fontSize: '.72rem', color: 'var(--color-g400)' }}>{t.condition}</div>
                      </div>
                    </div>
                    <div style={{ color: 'var(--color-accent)', fontSize: '.8rem', marginBottom: '.4rem', letterSpacing: 1 }}>{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                    <p style={{ color: 'var(--color-g600)', fontSize: '.82rem', lineHeight: 1.6, flex: 1, margin: 0 }}>"{t.text}"</p>
                    <div style={{ fontSize: '.72rem', color: 'var(--color-g400)', marginTop: '.6rem', borderTop: '1px solid var(--color-g200)', paddingTop: '.5rem' }}>{t.date}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ═══ FAQ + CTA — SIDE BY SIDE, ALIGNED ═══ */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container faq-cta-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', alignItems: 'start' }}>
          <div className="rv">
            <span className="section-badge" style={{ marginBottom: '.6rem', display: 'inline-flex' }}><ChevronDown size={13} /> FAQ</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', margin: '.5rem 0 1rem' }}>Common Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
              {FAQS.map((f, i) => (
                <div key={i} style={{ background: openFaq === i ? 'var(--color-primary-50)' : '#fff', borderRadius: 10, border: `1.5px solid ${openFaq === i ? 'var(--color-primary-200)' : 'var(--color-g200)'}`, overflow: 'hidden', transition: 'all .25s' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', padding: '.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '.84rem', fontFamily: 'var(--font-body)', textAlign: 'left', color: openFaq === i ? 'var(--color-primary)' : 'var(--color-dark)', gap: '.5rem' }}>
                    <span>{f.q}</span>
                    <ChevronDown size={15} style={{ color: 'var(--color-primary)', transition: 'transform .25s', transform: openFaq === i ? 'rotate(180deg)' : '', flexShrink: 0 }} />
                  </button>
                  <div style={{ maxHeight: openFaq === i ? 160 : 0, overflow: 'hidden', transition: 'max-height .3s ease' }}>
                    <div style={{ padding: '0 1rem .75rem', color: 'var(--color-g500)', fontSize: '.8rem', lineHeight: 1.6 }}>{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rv" style={{ position: 'sticky', top: '6rem' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', borderRadius: 20, padding: '2rem 1.8rem', color: '#fff', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '.5rem', color: '#fff', position: 'relative' }}>Ready for Better Health?</h3>
              <p style={{ fontSize: '.85rem', opacity: .85, lineHeight: 1.65, marginBottom: '1.2rem', position: 'relative' }}>Book your appointment today and experience healthcare that truly cares.</p>
              <Link to="/book-appointment" className="btn btn-white" style={{ position: 'relative', fontSize: '.85rem' }}>Book Appointment <ArrowRight size={14} /></Link>
              <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,.15)', position: 'relative', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.85rem' }}><Phone size={15} /> {SITE.phone}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.85rem' }}><Clock size={15} /> Mon-Sat: 9AM-9PM</div>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.faq-cta-grid{grid-template-columns:1fr!important}}`}</style>
      </section>
    </main>
  );
}
