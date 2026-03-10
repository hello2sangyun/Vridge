import React, { useEffect, useRef, useState } from 'react';
import { IconCalendar, IconCheck, IconClock, IconGlobe, IconBellAlert, IconEnvelope, IconChevronRight } from './Icons';

// ✏️  여기에 본인의 Calendly URL을 입력하세요
const CALENDLY_URL = 'https://calendly.com/visa-vridge/60min';

const BENEFIT_ICONS = [IconCheck, IconClock, IconGlobe, IconBellAlert];

function CalendlyWidget({ url, lang, userInput }) {
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
                    prefill: {
                        customAnswers: {
                            a1: userInput
                        }
                    },
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
    }, [lang, fullUrl, userInput]);

    return (
        <div
            ref={containerRef}
            style={{ minWidth: '320px', height: '700px', borderRadius: '20px', overflow: 'hidden' }}
        />
    );
}

export default function Consultation({ t, lang }) {
    const { consult } = t;
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [userInput, setUserInput] = useState('');

    const openModal = () => {
        setShowModal(true);
        setStep(1);
    };

    const closeModal = () => {
        setShowModal(false);
        setStep(1);
        setUserInput('');
    };

    const handleNext = () => {
        if (userInput.trim()) {
            setStep(2);
        } else {
            alert(consult.modalStep1Placeholder);
        }
    };

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

                {/* CTA Button instead of inline widget */}
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <button
                        className="btn-primary"
                        style={{ padding: '20px 48px', fontSize: '1.125rem' }}
                        onClick={openModal}
                    >
                        {consult.cta}
                        <IconChevronRight size={20} color="#fff" stroke={3} />
                    </button>
                    <p style={{ marginTop: '20px', color: '#6b7280', fontSize: '0.9375rem' }}>
                        {lang === 'KO' ? '* 상담 요청 전 간단한 확인 절차가 있습니다.' : '* Quick info check before scheduling.'}
                    </p>
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

            {/* Modal Logic */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className={`modal-container ${step === 2 ? 'large' : ''}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h3 className="modal-title">
                                {step === 1 ? consult.modalStep1Title : consult.modalStep2Title}
                            </h3>
                            <button className="modal-close" onClick={closeModal}>✕</button>
                        </div>

                        <div className="modal-body">
                            {step === 1 ? (
                                <div style={{ textAlign: 'center' }}>
                                    <textarea
                                        className="modal-input"
                                        rows="4"
                                        placeholder={consult.modalStep1Placeholder}
                                        value={userInput}
                                        onChange={e => setUserInput(e.target.value)}
                                        autoFocus
                                    />
                                    <button
                                        className="btn-primary"
                                        style={{ width: '100%', justifyContent: 'center' }}
                                        onClick={handleNext}
                                    >
                                        {lang === 'KO' ? '다음 단계로' : 'Next Step'}
                                        <IconChevronRight size={18} color="#fff" stroke={2} />
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p style={{ marginBottom: '24px', color: '#4b5563', fontSize: '0.9375rem', textAlign: 'center' }}>
                                        {consult.modalStep2Sub}
                                    </p>
                                    <div style={{
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        border: '1px solid #e5e7eb',
                                    }}>
                                        <CalendlyWidget url={CALENDLY_URL} lang={lang} userInput={userInput} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
