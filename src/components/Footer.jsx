import { Link } from 'react-router-dom';
import { Globe, Camera, MessageCircle, Play, Phone, Mail, MapPin } from 'lucide-react';
import { SITE, NAV_LINKS, TIMINGS } from '../config/site.config';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-dark)', color: 'var(--color-g400)', padding: '4rem 0 1.5rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#fff', marginBottom: '.75rem' }}>
              {SITE.name.split(' ')[0]} <span style={{ color: 'var(--color-primary-light)' }}>{SITE.name.split(' ').slice(1).join(' ')}</span>
            </h3>
            <p style={{ lineHeight: 1.7, marginBottom: '1rem', fontSize: '.9rem' }}>Committed to providing quality healthcare with compassion and excellence.</p>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              {[Globe, Camera, MessageCircle, Play].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-g400)', transition: 'all .3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.06)'; e.currentTarget.style.color = 'var(--color-g400)'; }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Quick Links</h4>
            <ul>{NAV_LINKS.map(l => (
              <li key={l.path} style={{ marginBottom: '.5rem' }}>
                <Link to={l.path} style={{ color: 'var(--color-g400)', fontSize: '.88rem', transition: 'color .3s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary-light)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-g400)'}>{l.label}</Link>
              </li>
            ))}</ul>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Clinic Hours</h4>
            <ul style={{ fontSize: '.88rem', lineHeight: 1.8 }}>
              <li>Mon-Fri: {TIMINGS.weekdays.morning}</li>
              <li>Evening: {TIMINGS.weekdays.evening}</li>
              <li>Sat: {TIMINGS.saturday.morning}</li>
              <li>Sun: {TIMINGS.sunday}</li>
              <li style={{ color: 'var(--color-primary-light)', marginTop: '.4rem' }}>{TIMINGS.emergency}</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem', fontSize: '.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}><Phone size={15} style={{ color: 'var(--color-primary-light)', flexShrink: 0 }} />{SITE.phone}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}><Mail size={15} style={{ color: 'var(--color-primary-light)', flexShrink: 0 }} />{SITE.email}</div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem' }}><MapPin size={15} style={{ color: 'var(--color-primary-light)', flexShrink: 0, marginTop: 2 }} /><span>{SITE.address}</span></div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: '1.2rem', textAlign: 'center', fontSize: '.82rem' }}>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
