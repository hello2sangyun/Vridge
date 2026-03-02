import React from 'react';
import { IconEnvelope, IconMapPin } from './Icons';
import VridgeLogo from './VridgeLogo';

export default function Footer({ t }) {
    const { footer } = t;

    return (
        <footer style={{ background: '#0f1923', color: '#fff', padding: '72px 0 0' }}>
            <div className="container">

                {/* ===== TOP GRID ===== */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '48px 40px',
                    paddingBottom: '56px',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    marginBottom: '0',
                }}>

                    {/* Brand Column */}
                    <div style={{ gridColumn: 'span 1' }}>
                        {/* Logo */}
                        <div style={{ marginBottom: '14px' }}>
                            <VridgeLogo
                                height={48}
                                color="#ffffff"
                                textColor="rgba(255,255,255,0.9)"
                                showText={true}
                            />
                        </div>

                        {/* Tagline */}
                        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.75', marginBottom: '4px' }}>
                            {footer.tagline}
                        </p>

                        {/* Company legal name */}
                        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', lineHeight: '1.6', marginBottom: '20px' }}>
                            {footer.companyName}
                        </p>

                        {/* Language badges */}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {footer.langs.map(lang => (
                                <span key={lang} style={{
                                    padding: '4px 10px',
                                    background: 'rgba(0,122,51,0.2)',
                                    border: '1px solid rgba(0,122,51,0.4)',
                                    borderRadius: '100px', fontSize: '0.75rem', color: '#4ade80', fontWeight: 600,
                                }}>{lang}</span>
                            ))}
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 style={{
                            fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em',
                            textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '20px',
                        }}>{footer.services}</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '13px' }}>
                            {t.services.items.map(({ title }) => (
                                <li key={title}>
                                    <a href="#services" style={{
                                        fontSize: '0.875rem', color: 'rgba(255,255,255,0.62)', transition: 'color 0.18s',
                                        textDecoration: 'none',
                                    }}
                                        onMouseEnter={e => e.target.style.color = '#4ade80'}
                                        onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.62)'}
                                    >{title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 style={{
                            fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em',
                            textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '20px',
                        }}>{footer.contact}</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <a href="mailto:visa@vridge.info" style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                fontSize: '0.875rem', color: 'rgba(255,255,255,0.62)', transition: 'color 0.18s',
                                textDecoration: 'none',
                            }}
                                onMouseEnter={e => e.currentTarget.style.color = '#4ade80'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.62)'}
                            >
                                <IconEnvelope size={15} color="rgba(255,255,255,0.45)" />
                                visa@vridge.info
                            </a>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: 'rgba(255,255,255,0.62)' }}>
                                <IconMapPin size={15} color="rgba(255,255,255,0.45)" />
                                Budapest, Hungary
                            </div>
                        </div>

                        {/* Divider */}
                        <div style={{ margin: '24px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }} />

                        {/* Quick CTA */}
                        <a href="#consultation" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '11px 20px', background: '#007A33', color: '#fff',
                            borderRadius: '100px', fontWeight: 700, fontSize: '0.875rem',
                            transition: 'background 0.2s', textDecoration: 'none',
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = '#005a25'}
                            onMouseLeave={e => e.currentTarget.style.background = '#007A33'}
                        >
                            {footer.ctaLabel}
                        </a>
                    </div>
                </div>

                {/* ===== BOTTOM BAR ===== */}
                <div style={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
                    alignItems: 'center', gap: '12px', padding: '24px 0',
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)' }}>
                            {footer.copyright}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)' }}>
                            {footer.companyLegal}
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        {footer.links.map(item => (
                            <a key={item} href="#" style={{
                                fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)', transition: 'color 0.18s', textDecoration: 'none',
                            }}
                                onMouseEnter={e => e.target.style.color = '#fff'}
                                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
                            >{item}</a>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}
