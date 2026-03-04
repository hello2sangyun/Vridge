import React from 'react';
import { IconArrowRight } from './Icons';

export default function Hero({ t }) {
    const { hero } = t;

    return (
        <section id="home" style={{
            position: 'relative', minHeight: '100vh',
            display: 'flex', alignItems: 'center', overflow: 'hidden',
        }}>
            {/* Background */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'url(/szechenyi-bridge.png)',
                backgroundSize: 'cover', backgroundPosition: 'center 40%',
                filter: 'brightness(0.52)', transform: 'scale(1.03)', zIndex: 0,
            }} />
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)',
                zIndex: 1,
            }} />

            {/* Content */}
            <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '80px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '680px' }}>
                    {/* Badge */}
                    <div className="anim-0" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '6px 16px', marginBottom: '28px',
                        background: 'rgba(0,122,51,0.85)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '100px', color: '#fff',
                        fontSize: '0.8125rem', fontWeight: 600,
                    }}>
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', flexShrink: 0 }} />
                        {hero.badge}
                    </div>

                    {/* Headline */}
                    <h1 className="anim-1" style={{
                        fontSize: 'clamp(2.5rem, 5.5vw, 3.75rem)', fontWeight: 900,
                        lineHeight: 1.1, letterSpacing: '-0.03em',
                        color: '#fff', marginBottom: '20px',
                    }}>
                        {hero.headline1}<br />
                        <span style={{ color: '#4ade80' }}>{hero.headline2}</span><br />
                        {hero.headline3}
                    </h1>

                    {/* Sub */}
                    <p className="anim-2" style={{
                        fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                        color: 'rgba(255,255,255,0.82)',
                        lineHeight: 1.75, marginBottom: '40px', maxWidth: '560px',
                        whiteSpace: 'pre-line',
                    }}>
                        {hero.sub}
                    </p>

                    {/* CTAs */}
                    <div className="anim-3" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                        <a href="#consultation" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '16px 36px', background: '#007A33', color: '#fff',
                            borderRadius: '100px', fontWeight: 700, fontSize: '1rem',
                            boxShadow: '0 8px 28px rgba(0,122,51,0.45)',
                            transition: 'all 0.22s ease',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#005a25'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#007A33'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            {hero.cta1}
                            <IconArrowRight size={16} color="#fff" />
                        </a>
                        <a href="#services" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '15px 32px',
                            background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)',
                            border: '1.5px solid rgba(255,255,255,0.35)',
                            color: '#fff', borderRadius: '100px', fontWeight: 600, fontSize: '1rem',
                            transition: 'all 0.22s ease',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
                        >
                            {hero.cta2}
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="anim-4" style={{ display: 'flex', gap: '0', marginTop: '60px' }}>
                        {hero.stats.map(({ num, label }, i) => (
                            <div key={label} style={{
                                paddingRight: '32px',
                                borderRight: i < hero.stats.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none',
                                marginRight: i < hero.stats.length - 1 ? '32px' : '0',
                            }}>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>{num}</div>
                                <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500, marginTop: '5px' }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div style={{
                position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
                zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            }}>
                <div style={{
                    width: '24px', height: '38px', border: '2px solid rgba(255,255,255,0.35)',
                    borderRadius: '12px', display: 'flex', justifyContent: 'center', paddingTop: '6px',
                }}>
                    <div style={{
                        width: '4px', height: '8px', background: 'rgba(255,255,255,0.6)',
                        borderRadius: '2px', animation: 'scrollDot 1.8s infinite ease',
                    }} />
                </div>
            </div>
            <style>{`@keyframes scrollDot{0%{transform:translateY(0);opacity:1}80%{transform:translateY(12px);opacity:0}100%{transform:translateY(0);opacity:0}}`}</style>
        </section>
    );
}
