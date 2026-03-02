import React from 'react';

export default function Hero({ content, lang }) {
    return (
        <section className="section container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div style={{ maxWidth: '800px' }}>
                <span className="animate-fade-in" style={{
                    display: 'inline-block', padding: '0.5rem 1rem',
                    background: 'rgba(6,182,212,0.1)', color: 'var(--accent-cyan)',
                    borderRadius: '100px', fontSize: '0.875rem', fontWeight: 600,
                    marginBottom: '2rem', border: '1px solid rgba(6,182,212,0.2)'
                }}>
                    {content.tag}
                </span>
                <h1 className="animate-fade-in" style={{
                    fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 800,
                    lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em'
                }}>
                    {content.title} <br />
                    <span className="text-gradient">{content.subtitle}</span>
                </h1>
                <p className="animate-fade-in" style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: 'var(--text-secondary)',
                    lineHeight: 1.6, marginBottom: '3rem', maxWidth: '600px'
                }}>
                    {content.description}
                </p>
                <div className="animate-fade-in" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <a href="#screening" className="btn btn-primary">{content.cta}</a>
                    <a href="#consultation" className="btn btn-secondary">
                        {lang === 'KR' ? '상담하기' : 'Get in Touch'}
                    </a>
                </div>
            </div>
        </section>
    );
}
