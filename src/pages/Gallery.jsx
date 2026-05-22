import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Play, X, ChevronLeft, ChevronRight, Maximize2, Images, Filter } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

const CATS = ['All', 'Clinic', 'Rooms', 'Equipment', 'Reception', 'Lab'];

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=450&fit=crop', title: 'Main Reception', cat: 'Reception', span: 'big' },
  { src: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=450&fit=crop', title: 'Consultation Room', cat: 'Rooms', span: '' },
  { src: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=450&fit=crop', title: 'Modern Interior', cat: 'Clinic', span: '' },
  { src: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=600&h=450&fit=crop', title: 'Advanced Equipment', cat: 'Equipment', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=450&fit=crop', title: 'Patient Room', cat: 'Rooms', span: '' },
  { src: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&h=450&fit=crop', title: 'Dental Suite', cat: 'Rooms', span: '' },
  { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=450&fit=crop', title: 'Lab Equipment', cat: 'Lab', span: 'big' },
  { src: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=600&h=450&fit=crop', title: 'ECG Machine', cat: 'Equipment', span: '' },
  { src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=450&fit=crop', title: 'Pharmacy Area', cat: 'Clinic', span: '' },
  { src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=450&fit=crop', title: 'Waiting Lounge', cat: 'Reception', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=450&fit=crop', title: 'Clinic Building', cat: 'Clinic', span: '' },
  { src: 'https://images.unsplash.com/photo-1583912267550-d6c2f89bea37?w=600&h=450&fit=crop', title: 'Laboratory', cat: 'Lab', span: '' },
];

const VIDEOS = [
  { thumb: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=300&fit=crop', title: 'Clinic Tour — Inside Our Facility', duration: '2:45' },
  { thumb: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=500&h=300&fit=crop', title: 'Meet Our Medical Team', duration: '3:12' },
  { thumb: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500&h=300&fit=crop', title: 'Equipment Walkthrough', duration: '1:58' },
];

export default function Gallery() {
  const mainRef = useRef(null);
  const gridRef = useRef(null);
  const [activeCat, setActiveCat] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeCat === 'All' ? PHOTOS : PHOTOS.filter(p => p.cat === activeCat);

  // GSAP reveal animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax text
      gsap.from('.g-hero-title', { opacity: 0, y: 50, duration: 1, delay: .3 });
      gsap.from('.g-hero-sub', { opacity: 0, y: 30, duration: .8, delay: .5 });
      gsap.from('.g-hero-badge', { opacity: 0, scale: .8, duration: .6, delay: .2 });

      // Section reveals
      gsap.utils.toArray('.g-rv').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .7, scrollTrigger: { trigger: el, start: 'top 88%' } });
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  // GSAP stagger animation on grid items when category changes
  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll('.g-item');
    gsap.fromTo(items,
      { opacity: 0, y: 30, scale: .95, filter: 'blur(8px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: .5, stagger: .06, ease: 'power2.out', clearProps: 'filter' }
    );
  }, [activeCat]);

  // 3D Tilt effect
  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - .5;
    const y = (e.clientY - rect.top) / rect.height - .5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  }, []);
  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.transform = '';
  }, []);

  // Lightbox nav
  const goNext = () => setLightbox(p => (p + 1) % filtered.length);
  const goPrev = () => setLightbox(p => (p - 1 + filtered.length) % filtered.length);

  useEffect(() => {
    if (lightbox !== null) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); if (e.key === 'ArrowRight') goNext(); if (e.key === 'ArrowLeft') goPrev(); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [lightbox, filtered.length]);

  return (
    <main ref={mainRef}>
      {/* ═══ HERO ═══ */}
      <section style={{ padding: '8rem 0 3rem', background: 'linear-gradient(135deg, var(--color-primary-50) 0%, #fff 60%, #F0FDFA 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'var(--color-primary-100)', opacity: .3 }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 140, height: 140, borderRadius: '50%', background: 'var(--color-primary-100)', opacity: .2 }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.4rem', fontSize: '.85rem', color: 'var(--color-g400)', marginBottom: '.5rem' }}>
            <Link to="/" style={{ color: 'var(--color-primary)' }}>Home</Link> / <span>Gallery</span>
          </div>
          <span className="g-hero-badge section-badge" style={{ marginBottom: '.8rem' }}><Images size={14} /> Visual Tour</span>
          <h1 className="g-hero-title" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', marginTop: '.6rem' }}>
            Our <span style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Gallery</span>
          </h1>
          <p className="g-hero-sub" style={{ color: 'var(--color-g500)', fontSize: '.95rem', maxWidth: 480, margin: '.5rem auto 0' }}>
            Take a virtual tour of our state-of-the-art facilities and modern infrastructure
          </p>
        </div>
      </section>

      {/* ═══ PHOTO GALLERY — BENTO GRID ═══ */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          {/* Filter Tabs */}
          <div className="g-rv" style={{ display: 'flex', gap: '.4rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', background: 'var(--color-g100)', borderRadius: 12, padding: '.3rem', gap: '.2rem' }}>
              {CATS.map(cat => (
                <button key={cat} onClick={() => setActiveCat(cat)}
                  style={{
                    padding: '.5rem 1.1rem', borderRadius: 10, border: 'none', fontSize: '.8rem', fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all .25s',
                    background: activeCat === cat ? '#fff' : 'transparent',
                    color: activeCat === cat ? 'var(--color-primary)' : 'var(--color-g500)',
                    boxShadow: activeCat === cat ? '0 2px 8px rgba(0,0,0,.06)' : 'none',
                  }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Grid */}
          <div ref={gridRef} className="bento-grid">
            {filtered.map((photo, i) => {
              const spanClass = photo.span === 'big' ? 'bento-big' : photo.span === 'tall' ? 'bento-tall' : '';
              return (
                <div key={`${activeCat}-${i}`}
                  className={`g-item ${spanClass}`}
                  onClick={() => setLightbox(i)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', transition: 'transform .3s ease' }}>
                  <img src={photo.src} alt={photo.title} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s ease' }} />
                  {/* Overlay */}
                  <div className="g-overlay">
                    <Maximize2 size={18} style={{ position: 'absolute', top: 14, right: 14, color: '#fff', opacity: .8 }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1rem 1rem', background: 'linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 100%)' }}>
                      <span style={{ color: '#fff', fontSize: '.85rem', fontWeight: 600, display: 'block' }}>{photo.title}</span>
                      <span style={{ color: 'var(--color-primary-light)', fontSize: '.72rem', fontWeight: 500 }}>{photo.cat}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ VIDEOS ═══ */}
      <section style={{ padding: '3.5rem 0', background: 'var(--color-g50)' }}>
        <div className="container">
          <div className="g-rv" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="section-badge"><Play size={13} /> Videos</span>
            <h2 className="section-title">Video Tour</h2>
            <p className="section-sub">Watch our facility walkthrough and meet the team</p>
          </div>
          <div className="g-rv vid-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
            {VIDEOS.map((v, i) => (
              <div key={i} className="card vid-card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                  <img src={v.thumb} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s' }} />
                  <div className="vid-play-overlay">
                    <div className="vid-play-btn">
                      <Play size={22} style={{ color: 'var(--color-primary)', marginLeft: 2 }} fill="var(--color-primary)" />
                    </div>
                  </div>
                  <span style={{ position: 'absolute', bottom: 8, right: 10, background: 'rgba(0,0,0,.75)', color: '#fff', padding: '.15rem .5rem', borderRadius: 6, fontSize: '.72rem', fontWeight: 600, backdropFilter: 'blur(4px)' }}>{v.duration}</span>
                </div>
                <div style={{ padding: '1rem 1.2rem' }}>
                  <h3 style={{ fontSize: '.88rem', marginBottom: '.15rem' }}>{v.title}</h3>
                  <p style={{ fontSize: '.76rem', color: 'var(--color-g400)' }}>HealthCare Clinic</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ padding: '3.5rem 0', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: '#fff', textAlign: 'center' }}>
        <div className="container g-rv">
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '.6rem' }}>Want to Visit Our Clinic?</h2>
          <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '.9rem', marginBottom: '1.2rem' }}>Book an appointment and experience our world-class facilities in person.</p>
          <Link to="/book-appointment" className="btn btn-white">Book Appointment <ChevronRight size={15} /></Link>
        </div>
      </section>

      {/* ═══ LIGHTBOX ═══ */}
      {lightbox !== null && (
        <div className="lightbox-backdrop" onClick={() => setLightbox(null)}>
          <button className="lb-btn lb-close" onClick={(e) => { e.stopPropagation(); setLightbox(null); }}><X size={20} /></button>
          <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); goPrev(); }}><ChevronLeft size={22} /></button>
          <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); goNext(); }}><ChevronRight size={22} /></button>
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '85vw', maxHeight: '85vh' }}>
            <img src={filtered[lightbox].src.replace('w=600&h=450', 'w=1200&h=900')} alt={filtered[lightbox].title}
              style={{ maxWidth: '85vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: 12, animation: 'lbIn .3s ease' }} />
            <div style={{ textAlign: 'center', marginTop: '.8rem' }}>
              <div style={{ color: '#fff', fontSize: '.95rem', fontWeight: 600 }}>{filtered[lightbox].title}</div>
              <div style={{ color: 'rgba(255,255,255,.5)', fontSize: '.78rem', marginTop: '.2rem' }}>{lightbox + 1} / {filtered.length}</div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ GALLERY STYLES ═══ */}
      <style>{`
        /* Bento Grid */
        .bento-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:220px;gap:.7rem}
        .bento-big{grid-column:span 2;grid-row:span 1}
        .bento-tall{grid-row:span 2}
        @media(max-width:1024px){.bento-grid{grid-template-columns:repeat(3,1fr);grid-auto-rows:200px}}
        @media(max-width:768px){.bento-grid{grid-template-columns:repeat(2,1fr);grid-auto-rows:180px} .bento-big,.bento-tall{grid-column:span 1;grid-row:span 1}}
        @media(max-width:480px){.bento-grid{grid-template-columns:1fr;grid-auto-rows:220px}}

        /* Gallery Item Hover */
        .g-item{will-change:transform}
        .g-item:hover img{transform:scale(1.08)}
        .g-overlay{position:absolute;inset:0;opacity:0;transition:opacity .35s ease}
        .g-item:hover .g-overlay{opacity:1}

        /* Video Hover */
        .vid-card:hover img{transform:scale(1.06)}
        .vid-play-overlay{position:absolute;inset:0;background:rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;transition:background .3s}
        .vid-card:hover .vid-play-overlay{background:rgba(0,0,0,.4)}
        .vid-play-btn{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.92);display:flex;align-items:center;justify-content:center;transition:transform .3s;box-shadow:0 4px 20px rgba(0,0,0,.15)}
        .vid-card:hover .vid-play-btn{transform:scale(1.1)}
        @media(max-width:768px){.vid-grid{grid-template-columns:1fr!important}}

        /* Lightbox */
        .lightbox-backdrop{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(12px);animation:lbFade .25s ease}
        .lb-btn{position:absolute;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:10px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;transition:all .25s;z-index:2}
        .lb-btn:hover{background:rgba(255,255,255,.18)}
        .lb-close{top:20px;right:20px}
        .lb-prev{left:20px;top:50%;transform:translateY(-50%)}
        .lb-next{right:20px;top:50%;transform:translateY(-50%)}
        @keyframes lbFade{from{opacity:0}to{opacity:1}}
        @keyframes lbIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
      `}</style>
    </main>
  );
}
