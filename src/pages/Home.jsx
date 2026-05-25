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
            <img src="/images/doc1.png" alt={DOCTOR.name} style={{ borderRadius: 24, width: '100%', maxHeight: '75vh', objectFit: 'cover', objectPosition: 'top center', boxShadow: '0 25px 60px rgba(8,145,178,.15)' }} />
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

      {/* ═══ WHY CHOOSE US — MODERN SPLIT ═══ */}
      <section style={{ padding: '5.5rem 0', overflow: 'hidden' }}>
        <div className="container">
          <div className="wcu-split" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '5rem', alignItems: 'center' }}>
            
            {/* Left Content */}
            <div className="rv">
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--color-dark)', marginBottom: '2rem', lineHeight: 1.15 }}>
                Why Patients Trust Us
              </h2>
              <div className="sg" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                {[
                  { icon: HeartPulse, title: 'Expert Doctors', desc: 'Board-certified specialists with years of clinical experience.' },
                  { icon: Shield, title: 'International Accreditation', desc: 'Strict infection control and globally recognized safety protocols.' },
                  { icon: Activity, title: 'Modern Equipment', desc: 'State-of-the-art diagnostic and treatment equipment.' },
                  { icon: Award, title: 'Award Winning Care', desc: 'Consistently recognized for excellence in patient satisfaction.' },
                ].map((item, i) => (
                  <div key={i} className="wcu-card" style={{ background: 'var(--color-primary-50)', padding: '1.6rem', borderRadius: '18px', transition: 'all 0.3s ease', cursor: 'default' }}>
                    <item.icon size={30} style={{ color: 'var(--color-primary)', marginBottom: '1.2rem' }} strokeWidth={1.8} />
                    <h3 style={{ fontSize: '.95rem', fontWeight: 700, color: 'var(--color-dark-2)', marginBottom: '.5rem', fontFamily: 'var(--font-heading)', letterSpacing: '.01em' }}>{item.title}</h3>
                    <p style={{ fontSize: '.8rem', color: 'var(--color-g600)', lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Images Composition */}
            <div className="rv wcu-images-wrap" style={{ position: 'relative', height: '100%', minHeight: '520px' }}>
              
              {/* Top/Back Image */}
              <div style={{ position: 'absolute', top: 0, right: '0%', width: '68%', height: '62%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
                <img src="/images/doc4.png" alt="Doctors Consult" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
              </div>
              
              {/* Bottom/Front Image */}
              <div style={{ position: 'absolute', bottom: '2%', left: '0%', width: '68%', height: '60%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.12)', border: '8px solid #fff' }}>
                <img src="/images/doc6.png" alt="Medical Team" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
              </div>

              {/* Floating Badge 1 - Top Right (Desktop) / Top Left (Mobile) */}
              <div className="wcu-badge-1" style={{ position: 'absolute', background: '#fff', borderRadius: '18px', boxShadow: '0 12px 35px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '.8rem', animation: 'floatY 4s ease-in-out infinite', zIndex: 5 }}>
                <div className="wcu-badge-icon" style={{ borderRadius: '50%', background: 'var(--color-primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award className="wcu-icon-svg" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <div className="wcu-badge-num" style={{ fontWeight: 800, color: 'var(--color-primary)' }}>25+</div>
                  <div className="wcu-badge-text" style={{ color: 'var(--color-g500)', fontWeight: 600 }}>Years of Excellence</div>
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Center (Desktop) / Bottom Right (Mobile) */}
              <div className="wcu-badge-2" style={{ position: 'absolute', background: '#fff', borderRadius: '18px', boxShadow: '0 12px 35px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '.8rem', animation: 'floatY 5s ease-in-out infinite 1s', zIndex: 10 }}>
                <div style={{ display: 'flex', marginLeft: '.4rem' }}>
                  <img src="/images/doc2.png" alt="Patient" className="wcu-badge-img" style={{ borderRadius: '50%', border: '2px solid #fff', marginLeft: '-.5rem', objectFit: 'cover', objectPosition: 'top center' }} />
                  <img src="/images/doc5.png" alt="Patient" className="wcu-badge-img" style={{ borderRadius: '50%', border: '2px solid #fff', marginLeft: '-.5rem', objectFit: 'cover', objectPosition: 'top center' }} />
                  <img src="/images/doc3.png" alt="Patient" className="wcu-badge-img" style={{ borderRadius: '50%', border: '2px solid #fff', marginLeft: '-.5rem', objectFit: 'cover', objectPosition: 'top center' }} />
                </div>
                <div>
                  <div className="wcu-badge-num" style={{ fontWeight: 800, color: 'var(--color-primary)' }}>20k+</div>
                  <div className="wcu-badge-text" style={{ color: 'var(--color-g500)', fontWeight: 600 }}>Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
          <style>{`
            .wcu-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(8, 145, 178, 0.12); }
            
            /* Desktop Badge Styles */
            .wcu-badge-1 { top: 5%; left: -5%; padding: 1rem 1.4rem; z-index: 10; }
            .wcu-badge-2 { bottom: 5%; right: -5%; padding: .8rem 1.2rem; }
            .wcu-badge-icon { width: 42px; height: 42px; }
            .wcu-icon-svg { width: 20px; height: 20px; }
            .wcu-badge-num { font-size: 1.2rem; }
            .wcu-badge-text { font-size: .72rem; }
            .wcu-badge-img { width: 34px; height: 34px; }

            @media(max-width: 1024px) {
              .wcu-split { grid-template-columns: 1fr !important; gap: 4rem !important; }
              .wcu-images-wrap { min-height: 450px !important; max-width: 600px; margin: 0 auto; width: 100%; }
              /* At tablet size, stop using negative right values so it doesn't overflow */
              .wcu-badge-1 { top: -2%; right: auto; left: 0%; z-index: 10; }
              .wcu-badge-2 { bottom: 2%; right: 5%; }
            }
            @media(max-width: 768px) {
              .wcu-badge-1 { padding: .6rem .8rem; top: -5%; left: 0%; }
              .wcu-badge-2 { padding: .5rem .8rem; bottom: 0%; right: 0%; }
              .wcu-badge-icon { width: 34px; height: 34px; }
              .wcu-icon-svg { width: 16px; height: 16px; }
              .wcu-badge-num { font-size: 1rem; }
              .wcu-badge-text { font-size: .65rem; }
              .wcu-badge-img { width: 28px; height: 28px; }
            }
            @media(max-width: 576px) {
              .wcu-split > div:first-child > .sg { grid-template-columns: 1fr !important; }
              .wcu-images-wrap { min-height: 400px !important; }
            }
          `}</style>
        </div>
      </section>



      {/* ═══ OUR SPECIALIZATIONS — STATIC ZIG-ZAG ═══ */}
      <section style={{ padding: '4rem 0 7rem 0', background: 'var(--color-g50)', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1150px' }}>
          <div className="rv" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-badge" style={{ background: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <Stethoscope size={14} style={{ color: 'var(--color-primary)' }} /> Departments
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--color-dark)', margin: '1rem 0' }}>
              Centers of Excellence
            </h2>
            <p style={{ color: 'var(--color-g500)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
              We bring together world-class specialists and cutting-edge technology to provide unparalleled medical care across these key departments.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
            {[
              { id: '01', icon: HeartPulse, title: 'Cardiology', desc: 'Advanced heart care, comprehensive diagnostics, and state-of-the-art cardiovascular surgical treatments delivered by top-tier specialists.', img: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop' },
              { id: '02', icon: Brain, title: 'Neurology', desc: 'Specialized care for brain, spine, and nervous system disorders. We utilize cutting-edge technology for both diagnosis and recovery.', img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop' },
              { id: '03', icon: Bone, title: 'Orthopedics', desc: 'Expert surgical and non-surgical treatments for bones, joints, and sports injuries to help you regain full mobility and strength.', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop' },
              { id: '04', icon: Baby, title: 'Pediatrics', desc: 'Gentle, specialized, and compassionate healthcare tailored specifically for the unique needs of infants, children, and adolescents.', img: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&h=600&fit=crop' },
            ].map((s, i) => {
              const isEven = i % 2 === 1;
              return (
                <div key={i} className={`svc-zz-row ${isEven ? 'row-reverse' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '5rem' }}>
                  
                  {/* Image Side */}
                  <div className="svc-zz-img-wrap" style={{ flex: '1', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: '-1.5rem', background: 'var(--color-primary-50)', borderRadius: '40px', transform: isEven ? 'rotate(3deg)' : 'rotate(-3deg)', zIndex: 0 }} />
                    <div style={{ position: 'relative', zIndex: 1, borderRadius: '30px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', height: '420px', background: '#fff' }}>
                      <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>

                  {/* Text Side */}
                  <div className="svc-zz-text-wrap" style={{ flex: '1' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', background: '#fff', padding: '0.5rem 1.2rem 0.5rem 0.5rem', borderRadius: '50px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                       <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                          <s.icon size={20} />
                       </div>
                       <span style={{ fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '1px' }}>DEPARTMENT {s.id}</span>
                    </div>
                    
                    <h3 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-heading)', color: 'var(--color-dark)', marginBottom: '1.2rem', lineHeight: 1.1 }}>{s.title}</h3>
                    <p style={{ color: 'var(--color-g600)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>{s.desc}</p>
                    
                    <Link to="/book-appointment" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1rem', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', gap: '0.8rem', boxShadow: '0 10px 25px rgba(8, 145, 178, 0.3)' }}>
                      Book Appointment <ArrowRight size={18} />
                    </Link>
                  </div>
                  
                </div>
              )
            })}
          </div>

          <style>{`
            .svc-zz-row.row-reverse { flex-direction: row-reverse; }
            
            @media(max-width: 992px) {
              .svc-zz-row { flex-direction: column !important; gap: 4rem !important; }
              .svc-zz-img-wrap { width: 100% !important; max-width: 500px; margin: 0 auto; }
              .svc-zz-text-wrap { width: 100% !important; text-align: center; display: flex; flex-direction: column; align-items: center; }
            }
            @media(max-width: 576px) {
              .svc-zz-img-wrap > div:first-child { display: none; /* Hide rotated background on very small screens to save space */ }
            }
          `}</style>
        </div>
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
