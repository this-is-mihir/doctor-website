import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SITE, NAV_LINKS, TIMINGS } from '../config/site.config';

const Facebook = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const Twitter = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const Instagram = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const Linkedin = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;

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
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-g400)', transition: 'all .3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.06)'; e.currentTarget.style.color = 'var(--color-g400)'; }}>
                  <Icon />
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
