import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, ArrowRight, X, Clock, MapPin, Globe, Camera, MessageCircle } from 'lucide-react';
import { SITE, NAV_LINKS, TIMINGS } from '../config/site.config';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); document.body.style.overflow = ''; }, [pathname]);

  // Auto-close on desktop resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768 && open) { setOpen(false); document.body.style.overflow = ''; } };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open]);

  const toggle = () => { setOpen(!open); document.body.style.overflow = open ? '' : 'hidden'; };
  const close = () => { setOpen(false); document.body.style.overflow = ''; };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <Link to="/" className="nav-logo">
            {SITE.name.split(' ')[0]}<span> {SITE.name.split(' ').slice(1).join(' ')}</span>
          </Link>
          <div className="nav-links-desktop">
            {NAV_LINKS.map(l => (
              <Link key={l.path} to={l.path} className={`nav-link ${pathname === l.path ? 'active' : ''}`}>{l.label}</Link>
            ))}
            <Link to="/book-appointment" className="btn btn-primary" style={{ padding: '.55rem 1.2rem', fontSize: '.8rem' }}>Book Appointment</Link>
          </div>
          <button className={`mobile-toggle ${open ? 'active' : ''}`} onClick={toggle} aria-label="Menu"><span /><span /><span /></button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-header">
            <span style={{ fontWeight: 600, fontSize: '.9rem', color: 'var(--color-g400)' }}>Menu</span>
            <button className="mobile-close" onClick={close} aria-label="Close"><X size={20} /></button>
          </div>

          {/* Links */}
          <div className="mobile-menu-links">
            {NAV_LINKS.map((l, i) => (
              <Link key={l.path} to={l.path} className={`mobile-link ${pathname === l.path ? 'active' : ''}`}
                onClick={close} style={{ animationDelay: `${i * .06}s` }}>
                <span className="mobile-link-text">{l.label}</span>
                <ArrowRight size={16} className="mobile-link-arrow" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mobile-menu-cta">
            <Link to="/book-appointment" className="btn btn-primary" onClick={close}
              style={{ width: '100%', justifyContent: 'center', padding: '.85rem', fontSize: '.9rem' }}>
              Book Appointment <ArrowRight size={16} />
            </Link>
          </div>

          {/* Timings Card */}
          <div style={{ marginTop: '1.2rem', padding: '1rem 1.2rem', background: 'var(--color-primary-50)', borderRadius: 12, border: '1px solid var(--color-primary-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', color: 'var(--color-primary)', fontSize: '.8rem', fontWeight: 600, marginBottom: '.5rem' }}>
              <Clock size={14} /> Clinic Hours
            </div>
            <div style={{ fontSize: '.76rem', color: 'var(--color-g500)', lineHeight: 1.7 }}>
              <div>Mon-Fri: {TIMINGS.weekdays.morning} | {TIMINGS.weekdays.evening}</div>
              <div>Sat: {TIMINGS.saturday.morning}</div>
              <div>Sun: {TIMINGS.sunday}</div>
            </div>
          </div>

          {/* Contact + Social */}
          <div className="mobile-menu-footer">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="mobile-footer-item"><Phone size={14} /><span>{SITE.phone}</span></a>
              <a href={`mailto:${SITE.email}`} className="mobile-footer-item"><Mail size={14} /><span>{SITE.email}</span></a>
              <div className="mobile-footer-item" style={{ cursor: 'default' }}><MapPin size={14} /><span style={{ fontSize: '.75rem' }}>{SITE.address}</span></div>
            </div>
            <div style={{ display: 'flex', gap: '.5rem', marginTop: '.8rem' }}>
              {[Globe, Camera, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--color-g100)', border: '1px solid var(--color-g200)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-g400)', transition: 'all .3s' }}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {open && <div className="nav-overlay show" onClick={close} />}
    </>
  );
}
