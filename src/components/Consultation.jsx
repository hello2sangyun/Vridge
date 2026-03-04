import React, { useEffect, useRef } from 'react';
import { IconCalendar, IconCheck, IconClock, IconGlobe, IconBellAlert, IconEnvelope } from './Icons';

// ✏️  여기에 본인의 Calendly URL을 입력하세요
const CALENDLY_URL = 'https://calendly.com/visa-vridge/hungary-visa-review';

const BENEFIT_ICONS = [IconCheck, IconClock, IconGlobe, IconBellAlert];

function CalendlyWidget({ url, lang }) {
    const containerRef = useRef(null);
    const scriptRef = useRef(null);

    // Calendly locale map: KO→ko, EN→en, HU→hu
    const localeMap = { KO: 'ko', EN: 'en', HU: 'hu' };
    const locale = localeMap[lang] || 'en';
    const fullUrl = `${url}?hide_gdpr_banner=1&hide_landing_page_details=1&primary_color=007A33&locale=${locale}`;

    useEffect(() => {
        // Load Calendly CSS once
        if (!document.getElementById('calendly-css')) {
            const link = document.createElement('link');
            link.id = 'calendly-css';
            link.rel = 'stylesheet';
            link.href = 'https://assets.calendly.com/assets/external/widget.css';
            document.head.appendChild(link);
        }

        // Load Calendly JS once
        const loadScript = () => {
            return new Promise((resolve) => {
                if (window.Calendly) { resolve(); return; }
                if (document.getElementById('calendly-js')) {
                    document.getElementById('calendly-js').addEventListener('load', resolve);
                    return;
                }
                const script = document.createElement('script');
                script.id = 'calendly-js';
                script.src = 'https://assets.calendly.com/assets/external/widget.js';
                script.async = true;
                script.onload = resolve;
                document.body.appendChild(script);
                scriptRef.current = script;
            });
        };

        loadScript().then(() => {
            if (containerRef.current && window.Calendly) {
                // Clear previous widget
                containerRef.current.innerHTML = '';
                window.Calendly.initInlineWidget({
                    url: fullUrl,
                    parentElement: containerRef.current,
                    prefill: {},
                    utm: {},
                });
            }
        });

        return () => {
            // Cleanup widget content on unmount
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [lang, fullUrl]);

    return (
        <div
            ref={containerRef}
            style={{ minWidth: '320px', height: '700px', borderRadius: '20px', overflow: 'hidden' }}
        />
    );
}

export default function Consultation({ t, lang }) {
    const { consult } = t;

    return (
        <section id="consultation" style={{ background: '#fff', padding: '96px 0' }}>
            <div className="container">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                    <div className="section-tag">
                        <IconCalendar size={14} color="#007A33" stroke={2} />
                        {consult.tag}
                    </div>
                    <h2 className="section-title" style={{ marginTop: '8px', whiteSpace: 'pre-line' }}>
                        {consult.title}
                    </h2>
                    <p className="section-sub" style={{ maxWidth: '520px', margin: '14px auto 0', whiteSpace: 'pre-line' }}>
                        {consult.sub}
                    </p>
                </div>

                {/* Benefit pills */}
                <div style={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px',
                    marginBottom: '48px',
                }}>
                    {consult.benefits.map((text, i) => {
                        const Icon = BENEFIT_ICONS[i];
                        return (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                padding: '10px 20px',
                                background: '#f9fafb', borderRadius: '100px',
                                border: '1px solid #e5e7eb',
                                fontSize: '0.875rem', fontWeight: 600, color: '#374151',
                            }}>
                                <div style={{ color: '#007A33' }}><Icon size={15} color="#007A33" stroke={2} /></div>
                                {text}
                            </div>
                        );
                    })}
                </div>

                {/* Calendly Widget */}
                <div style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                }}>
                    <CalendlyWidget url={CALENDLY_URL} lang={lang} />
                </div>

                {/* Email CTA strip */}
                <div style={{
                    marginTop: '40px', padding: '28px 36px',
                    background: '#111827', borderRadius: '20px',
                    display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                    justifyContent: 'space-between', gap: '20px',
                }}>
                    <div>
                        <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                            {consult.emailLabel}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)' }}>
                            {consult.emailSub}
                        </div>
                    </div>
                    <a href="mailto:visa@vridge.info" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '10px',
                        padding: '13px 28px', background: '#007A33', color: '#fff',
                        borderRadius: '100px', fontWeight: 700, fontSize: '0.9375rem',
                        transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#005a25'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#007A33'; }}
                    >
                        <IconEnvelope size={17} color="#fff" />
                        visa@vridge.info
                    </a>
                </div>
            </div>
        </section>
    );
}
