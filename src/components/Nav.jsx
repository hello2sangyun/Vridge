import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconArrowRight } from './Icons';
import VridgeLogo from './VridgeLogo';

const LANGS = [
    { code: 'KO', label: '한국어' },
    { code: 'EN', label: 'English' },
    { code: 'HU', label: 'Magyar' },
];

export default function Nav({ lang, setLang, t }) {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close menu on link click
    const closeMenu = () => setMenuOpen(false);

    const getLinkHref = (hash) => isHome ? hash : `/${hash}`;

    const navLinks = [
        { label: t.nav.services, href: getLinkHref('#services') },
        { label: t.nav.why, href: getLinkHref('#why') },
        { label: t.nav.consultation, href: getLinkHref('#consultation') },
    ];

    const linkColor = scrolled || !isHome ? '#374151' : 'rgba(255,255,255,0.9)';

    return (
        <>
            <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-desktop { display: flex !important; }
          .nav-hamburger { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                background: scrolled || menuOpen || !isHome ? 'rgba(255,255,255,0.97)' : 'transparent',
                backdropFilter: scrolled || menuOpen || !isHome ? 'blur(14px)' : 'none',
                borderBottom: scrolled || menuOpen || !isHome ? '1px solid #e5e7eb' : '1px solid transparent',
                transition: 'all 0.3s ease',
            }}>
                <div style={{
                    maxWidth: '1320px', margin: '0 auto', padding: '0 20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    height: '68px',
                }}>
                    {/* Logo */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <VridgeLogo
                            height={42}
                            color={scrolled || menuOpen || !isHome ? '#007A33' : '#ffffff'}
                            textColor={scrolled || menuOpen || !isHome ? '#111827' : '#ffffff'}
                            showText={true}
                        />
                    </Link>
                    {/* ===== DESKTOP NAV ===== */}
                    <div className="nav-desktop" style={{ alignItems: 'center', gap: '24px' }}>
                        <div style={{ display: 'flex', gap: '22px', alignItems: 'center' }}>
                            {navLinks.map(({ label, href }) => (
                                <a key={href} href={href} style={{
                                    fontSize: '0.9375rem', fontWeight: 600, color: linkColor,
                                    transition: 'color 0.2s', whiteSpace: 'nowrap', textDecoration: 'none',
                                }}
                                    onMouseEnter={e => e.target.style.color = '#007A33'}
                                    onMouseLeave={e => e.target.style.color = linkColor}
                                >{label}</a>
                            ))}
                        </div>

                        {/* Lang Switcher */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '2px',
                            background: scrolled ? '#f3f4f6' : 'rgba(255,255,255,0.12)',
                            borderRadius: '100px', padding: '3px',
                            border: scrolled ? '1px solid #e5e7eb' : '1px solid rgba(255,255,255,0.2)',
                            transition: 'all 0.3s',
                        }}>
                            {LANGS.map(({ code, label }) => (
                                <button key={code} onClick={() => setLang(code)} title={label} style={{
                                    padding: '5px 11px', borderRadius: '100px', fontSize: '0.8125rem', fontWeight: 700,
                                    cursor: 'pointer', transition: 'all 0.2s ease',
                                    background: lang === code ? '#007A33' : 'transparent',
                                    color: lang === code ? '#fff' : (scrolled ? '#6b7280' : 'rgba(255,255,255,0.75)'),
                                    boxShadow: lang === code ? '0 2px 8px rgba(0,122,51,0.3)' : 'none', border: 'none',
                                }}>{code}</button>
                            ))}
                        </div>

                        {/* CTA */}
                        <a href="#consultation" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            padding: '10px 20px', background: '#007A33', color: '#fff',
                            borderRadius: '100px', fontWeight: 700, fontSize: '0.875rem',
                            boxShadow: '0 4px 14px rgba(0,122,51,0.3)', whiteSpace: 'nowrap',
                            transition: 'all 0.2s ease', textDecoration: 'none',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#005a25'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#007A33'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            {t.nav.cta}
                            <IconArrowRight size={14} color="#fff" />
                        </a>
                    </div>

                    {/* ===== MOBILE: Lang + Hamburger ===== */}
                    <div className="nav-hamburger" style={{ alignItems: 'center', gap: '10px' }}>
                        {/* Mobile lang switcher (compact) */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '1px',
                            background: scrolled ? '#f3f4f6' : 'rgba(255,255,255,0.14)',
                            borderRadius: '100px', padding: '3px',
                            border: scrolled ? '1px solid #e5e7eb' : '1px solid rgba(255,255,255,0.2)',
                        }}>
                            {LANGS.map(({ code }) => (
                                <button key={code} onClick={() => setLang(code)} style={{
                                    padding: '4px 9px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700,
                                    cursor: 'pointer', transition: 'all 0.2s ease',
                                    background: lang === code ? '#007A33' : 'transparent',
                                    color: lang === code ? '#fff' : (scrolled ? '#6b7280' : 'rgba(255,255,255,0.8)'),
                                    border: 'none',
                                }}>{code}</button>
                            ))}
                        </div>

                        {/* Hamburger button */}
                        <button onClick={() => setMenuOpen(o => !o)} style={{
                            width: '40px', height: '40px', borderRadius: '10px', border: 'none',
                            background: scrolled ? '#f3f4f6' : 'rgba(255,255,255,0.15)',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            gap: '5px', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0,
                        }}>
                            {[0, 1, 2].map(i => (
                                <span key={i} style={{
                                    display: 'block', width: '18px', height: '2px', borderRadius: '1px',
                                    background: scrolled ? '#374151' : '#fff',
                                    transition: 'all 0.25s ease',
                                    transform: menuOpen
                                        ? (i === 0 ? 'translateY(7px) rotate(45deg)' : i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'scaleX(0)')
                                        : 'none',
                                    opacity: menuOpen && i === 1 ? 0 : 1,
                                }} />
                            ))}
                        </button>
                    </div>
                </div>

                {/* ===== MOBILE MENU DROPDOWN ===== */}
                <div className="mobile-menu" style={{
                    maxHeight: menuOpen ? '400px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
                    background: 'rgba(255,255,255,0.98)',
                    borderTop: menuOpen ? '1px solid #e5e7eb' : 'none',
                }}>
                    <div style={{ padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {navLinks.map(({ label, href }) => (
                            <a key={href} href={href} onClick={closeMenu} style={{
                                display: 'block', padding: '12px 16px', borderRadius: '10px',
                                fontSize: '1rem', fontWeight: 600, color: '#374151',
                                transition: 'background 0.15s', textDecoration: 'none',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#f0fdf4'; e.currentTarget.style.color = '#007A33'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#374151'; }}
                            >{label}</a>
                        ))}
                        <a href="#consultation" onClick={closeMenu} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            marginTop: '12px', padding: '14px', background: '#007A33', color: '#fff',
                            borderRadius: '12px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
                        }}>
                            {t.nav.cta}
                            <IconArrowRight size={15} color="#fff" />
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}
