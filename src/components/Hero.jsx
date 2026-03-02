import React from 'react';

export default function Hero({ content, lang }) {
    return (
        <section className="section" style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden', padding: '0 1rem'
        }}>

            {/* Dynamic Background Elements */}
            <div className="bg-shape shape-blue"></div>
            <div className="bg-shape shape-cyan"></div>
            <div className="bg-shape shape-emerald"></div>

            {/* Grid Pattern Overlay */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 0, opacity: 0.1, pointerEvents: 'none',
                backgroundImage: `linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)`,
                backgroundSize: '24px 24px', maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
            }}></div>

            <div className="container" style={{ textAlign: 'center', maxWidth: '850px', zIndex: 1, position: 'relative' }}>

                {/* Top Tagline */}
                <div className="animate-fade-in" style={{ animationDelay: '0.1s', marginBottom: '1.5rem' }}>
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1.25rem',
                        background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                        color: 'var(--text-primary)', borderRadius: '100px', fontSize: '0.875rem', fontWeight: 600,
                        letterSpacing: '0.05em', backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)', boxShadow: '0 0 10px var(--accent-cyan)' }}></span>
                        {content.tag}
                    </span>
                </div>

                {/* Main Title */}
                <h1 className="animate-fade-in hero-title" style={{
                    fontSize: 'clamp(3rem, 7vw, 5.5rem)', marginBottom: '1.5rem', animationDelay: '0.2s',
                    lineHeight: '1.1', letterSpacing: '-0.02em', textShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}>
                    {content.title} <br />
                    <span className="text-gradient hover-trigger" style={{ position: 'relative', display: 'inline-block' }}>
                        {content.subtitle}
                    </span>
                </h1>

                {/* Description */}
                <p className="animate-fade-in" style={{
                    fontSize: 'clamp(1.125rem, 2vw, 1.35rem)', color: 'var(--text-secondary)',
                    marginBottom: '3rem', animationDelay: '0.3s', maxWidth: '700px', margin: '0 auto 3rem auto', lineHeight: 1.8
                }}>
                    {content.description}
                </p>

                {/* Call To Actions */}
                <div className="animate-fade-in" style={{
                    display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animationDelay: '0.4s'
                }}>
                    <button className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1.2rem 2.5rem', borderRadius: '12px' }}>
                        {content.cta}
                    </button>

                    {lang === 'EN' && (
                        <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '12px' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                            Zero Fees Guaranteed
                        </button>
                    )}

                    {(lang === 'KR' || lang === 'DE') && (
                        <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '12px' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                            Global Presence
                        </button>
                    )}
                </div>
            </div>

            {/* Embedded CSS for complex animations */}
            <style>{`
        .bg-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
          z-index: 0;
          animation: float 20s infinite alternate ease-in-out;
        }
        .shape-blue {
          top: 10%; left: -10%; width: 50vw; height: 50vw; background: var(--accent-blue);
          animation-delay: 0s;
        }
        .shape-cyan {
          bottom: -10%; right: -10%; width: 40vw; height: 40vw; background: var(--accent-cyan);
          animation-delay: -5s;
        }
        .shape-emerald {
          top: 40%; left: 30%; width: 30vw; height: 30vw; background: #10b981;
          animation-delay: -10s; opacity: 0.1;
        }

        @keyframes float {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
          100% { transform: translateY(20px) scale(0.9); }
        }

        .hover-trigger {
          transition: transform 0.3s ease;
        }
        .hover-trigger:hover {
          transform: scale(1.02);
        }
        
        .hero-title {
          font-family: var(--font-display);
          font-weight: 800;
        }
      `}</style>
        </section>
    );
}
