import React, { useState, useEffect } from 'react';

const CALENDLY_URL = 'https://calendly.com/your-calendly-username'; // ← Calendly URL 교체 필요

export default function BookConsultation({ lang }) {
    const [activeService, setActiveService] = useState(0);
    const [calendlyLoaded, setCalendlyLoaded] = useState(false);
    const [showWidget, setShowWidget] = useState(false);

    const texts = {
        EN: {
            badge: "Free Initial Call",
            title: "Our Services",
            subtitle: "Tailored pathways for candidates, businesses, and global citizens.",
            bookTitle: "Book a Free Consultation",
            bookSub: "30-minute strategy call. No commitment.",
            bookBtn: "Schedule Now →",
            widgetTitle: "Choose Your Time",
            closeBtn: "Close",
            services: [
                {
                    icon: "✈️",
                    tag: "For Candidates",
                    title: "Zero-Fee Career Placement",
                    desc: "We connect skilled international professionals with verified European employers at absolutely zero cost to you. From document review to landing your first paycheck in Hungary — we handle it all.",
                    points: ["Free for all candidates", "Official work permit support", "Onboarding & settlement guidance", "Salary negotiation assistance"]
                },
                {
                    icon: "🏭",
                    tag: "For B2B / Corporates",
                    title: "Workforce Integration & Subcontracting",
                    desc: "Korean and European businesses trust Vridge to source, vet, and deploy blue-collar and mid-skill workforce under full legal compliance. We absorb HR, tax, and legal risk for you.",
                    points: ["Full legal & tax risk transfer", "500,000 HUF licensed & regulated", "Staffing from 1 to 100+ workers", "Flexible: direct hire or leasing model"]
                },
                {
                    icon: "🏛️",
                    tag: "Visa & Relocation",
                    title: "End-to-End Visa Management",
                    desc: "Our licensed professionals manage the entire Hungarian visa and residence permit process — from embassy appointment to OIF audit. Milestone-based billing means you only pay when results are delivered.",
                    points: ["Type-C visa + residence permit", "1,000 EUR total (VAT incl.)", "50/50 milestone payment", "~70 day average processing"]
                }
            ]
        },
        KR: {
            badge: "무료 초기 상담",
            title: "서비스 안내",
            subtitle: "구직자, 기업, 글로벌 이주자 모두를 위한 맞춤형 솔루션.",
            bookTitle: "무료 상담 예약",
            bookSub: "30분 전략 미팅. 부담 없이 먼저 물어보세요.",
            bookBtn: "지금 예약하기 →",
            widgetTitle: "원하는 시간을 선택하세요",
            closeBtn: "닫기",
            services: [
                {
                    icon: "✈️",
                    tag: "구직자",
                    title: "수수료 0원 취업 연결",
                    desc: "숙련된 해외 인재를 검증된 유럽 기업과 무료로 연결합니다. 서류 검토부터 헝가리 첫 월급까지 — 모든 과정을 함께합니다.",
                    points: ["구직자 완전 무료", "공식 취업 비자 지원", "정착 및 온보딩 안내", "급여 협상 지원"]
                },
                {
                    icon: "🏭",
                    tag: "B2B / 기업 고객",
                    title: "인력 도급 & 통합 솔루션",
                    desc: "한국 및 유럽 기업의 블루칼라·중급 인력을 완전한 법적 준수 하에 소싱, 검증, 배치합니다. 인사, 세금, 법적 리스크를 Vridge가 전담합니다.",
                    points: ["법적·세무 리스크 완전 이전", "헝가리 공인 인력 중개 면허 보유", "1명~100명+ 규모 유연 대응", "직접 고용 또는 도급 선택 가능"]
                },
                {
                    icon: "🏛️",
                    tag: "비자 & 리로케이션",
                    title: "비자 전 과정 통합 관리",
                    desc: "면허를 보유한 전문가가 대사관 예약부터 OIF 심사까지 헝가리 비자 및 거주 허가 전 과정을 관리합니다. 단계별 청구로 결과가 나와야만 비용을 지불하세요.",
                    points: ["C형 비자 + 거주증 발급", "총 1,000 EUR (VAT 포함)", "50/50 마일스톤 청구", "평균 처리 기간 약 70일"]
                }
            ]
        },
        DE: {
            badge: "Kostenloses Erstgespräch",
            title: "Unsere Leistungen",
            subtitle: "Maßgeschneiderte Lösungen für Kandidaten, Unternehmen und Expats.",
            bookTitle: "Kostenloses Beratungsgespräch",
            bookSub: "30-minütiger Strategiecall. Unverbindlich.",
            bookBtn: "Jetzt Termin buchen →",
            widgetTitle: "Wählen Sie Ihre Zeit",
            closeBtn: "Schließen",
            services: [
                {
                    icon: "✈️",
                    tag: "Für Kandidaten",
                    title: "Jobvermittlung ohne Gebühren",
                    desc: "Wir verbinden qualifizierte internationale Fachkräfte kostenlos mit verifizierten europäischen Arbeitgebern. Von der Dokumentenprüfung bis zum ersten Gehalt in Ungarn.",
                    points: ["100% kostenlos für Kandidaten", "Offizielle Arbeitserlaubnis", "Onboarding & Integration", "Gehaltsverhandlung inklusive"]
                },
                {
                    icon: "🏭",
                    tag: "B2B / Unternehmen",
                    title: "Personalleasing & Integration",
                    desc: "Koreanische und europäische Unternehmen vertrauen Vridge für rechtssichere Personalvermittlung. Wir übernehmen HR-, Steuer- und Rechtsrisiken vollständig.",
                    points: ["Vollständige Risikoübernahme", "Lizenzierter & regulierter Betrieb", "1 bis 100+ Mitarbeiter skalierbar", "Direktanstellung oder Leasing"]
                },
                {
                    icon: "🏛️",
                    tag: "Visum & Relocation",
                    title: "Komplette Visum-Verwaltung",
                    desc: "Unsere lizenzierten Experten managen den gesamten ungarischen Visum- und Aufenthaltstitel-Prozess. Meilensteinbasierte Abrechnung für maximale Sicherheit.",
                    points: ["Typ-C Visum + Aufenthaltstitel", "1.000 EUR gesamt (inkl. MwSt.)", "50/50 Meilensteinzahlung", "~70 Tage Bearbeitungszeit"]
                }
            ]
        },
        HU: {
            badge: "Ingyenes Konzultáció",
            title: "Szolgáltatásaink",
            subtitle: "Testreszabott megoldások jelölteknek, vállalatoknak és expat-oknak.",
            bookTitle: "Ingyenes tanácsadás foglalása",
            bookSub: "30 perces stratégiai hívás. Kötelezettség nélkül.",
            bookBtn: "Foglaljon most →",
            widgetTitle: "Válassza ki az időpontját",
            closeBtn: "Bezárás",
            services: [
                {
                    icon: "✈️",
                    tag: "Jelölteknek",
                    title: "Díjmentes Elhelyezés",
                    desc: "Minősített nemzetközi szakembereket ingyenesen kapcsolunk össze ellenőrzött európai munkáltatókkal. A dokumentum-ellenőrzéstől az első fizetésig.",
                    points: ["Teljesen ingyenes jelölteknek", "Hivatalos munkavállalási engedély", "Onboarding és beilleszkedés", "Bértárgyalási támogatás"]
                },
                {
                    icon: "🏭",
                    tag: "B2B / Vállalatok",
                    title: "Munkaerő-integráció",
                    desc: "Koreai és európai vállalatok bíznak a Vridge-ben a teljes jogi megfelelőség melletti munkaerő-biztosításhoz. Átvállaljuk a HR-, adó- és jogi kockázatokat.",
                    points: ["Teljes kockázatátvállalás", "Engedéllyel rendelkező közvetítő", "1-től 100+ főig rugalmas", "Közvetlen foglalkoztatás vagy kölcsönzés"]
                },
                {
                    icon: "🏛️",
                    tag: "Vízum & Relocation",
                    title: "Teljes Körű Vízumkezelés",
                    desc: "Engedéllyel rendelkező szakemberek kezelik a teljes vízum és tartózkodási engedély folyamatot. Mérföldkő alapú számlázás — csak eredmény esetén fizet.",
                    points: ["C típusú vízum + tartózkodási engedély", "1 000 EUR összesen (ÁFA-val)", "50/50 mérföldkő-fizetés", "~70 napos átlagos feldolgozás"]
                }
            ]
        }
    };

    const t = texts[lang] || texts['EN'];

    const openCalendly = () => {
        setShowWidget(true);
        // Load Calendly widget script if not already loaded
        if (!calendlyLoaded && !document.getElementById('calendly-script')) {
            const script = document.createElement('script');
            script.id = 'calendly-script';
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            document.head.appendChild(script);
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://assets.calendly.com/assets/external/widget.css';
            document.head.appendChild(link);
            script.onload = () => setCalendlyLoaded(true);
        }
    };

    const closeWidget = () => {
        setShowWidget(false);
    };

    useEffect(() => {
        if (showWidget && calendlyLoaded && window.Calendly) {
            window.Calendly.initInlineWidget({
                url: CALENDLY_URL,
                parentElement: document.getElementById('calendly-inline-container'),
                prefill: {},
                utm: {}
            });
        }
    }, [showWidget, calendlyLoaded]);

    return (
        <section id="consultation" className="section" style={{ padding: '6rem 1rem', position: 'relative', overflow: 'hidden' }}>
            {/* Background accent */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '60vw', height: '60vw', borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 70%)',
                pointerEvents: 'none', zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{
                        display: 'inline-block', padding: '0.35rem 1rem',
                        background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.3)',
                        borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700,
                        color: 'var(--accent-cyan)', letterSpacing: '0.08em',
                        textTransform: 'uppercase', marginBottom: '1.25rem'
                    }}>
                        {t.badge}
                    </span>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                        {t.title}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
                        {t.subtitle}
                    </p>
                </div>

                {/* Main layout: service cards + booking panel */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '2rem', alignItems: 'start' }}>

                    {/* Left: Services */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {t.services.map((svc, i) => (
                            <div
                                key={i}
                                onClick={() => setActiveService(i)}
                                style={{
                                    padding: '1.75rem 2rem',
                                    borderRadius: '16px',
                                    border: activeService === i
                                        ? '1px solid rgba(6,182,212,0.5)'
                                        : '1px solid var(--border-color)',
                                    background: activeService === i
                                        ? 'rgba(6,182,212,0.05)'
                                        : 'var(--bg-secondary)',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease',
                                    boxShadow: activeService === i ? '0 0 30px rgba(6,182,212,0.08)' : 'none'
                                }}
                            >
                                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '12px',
                                        background: 'rgba(255,255,255,0.05)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.5rem', flexShrink: 0
                                    }}>
                                        {svc.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em',
                                            color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '0.4rem'
                                        }}>
                                            {svc.tag}
                                        </div>
                                        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', fontWeight: 700 }}>
                                            {svc.title}
                                        </h3>
                                        <p style={{
                                            color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7,
                                            marginBottom: activeService === i ? '1.25rem' : 0,
                                            maxHeight: activeService === i ? '200px' : 0,
                                            overflow: 'hidden',
                                            transition: 'max-height 0.35s ease, margin-bottom 0.35s ease'
                                        }}>
                                            {svc.desc}
                                        </p>
                                        {activeService === i && (
                                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}>
                                                {svc.points.map((pt, j) => (
                                                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                                                        <span style={{ color: 'var(--accent-cyan)', fontSize: '1rem' }}>✓</span>
                                                        {pt}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div style={{
                                        width: '24px', height: '24px', borderRadius: '50%',
                                        border: `2px solid ${activeService === i ? 'var(--accent-cyan)' : 'var(--border-color)'}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0, marginTop: '4px',
                                        transition: 'border-color 0.25s'
                                    }}>
                                        {activeService === i && (
                                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Booking panel */}
                    <div style={{
                        position: 'sticky', top: '6rem',
                        padding: '2.5rem', borderRadius: '20px',
                        background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(59,130,246,0.06) 100%)',
                        border: '1px solid rgba(6,182,212,0.25)',
                        backdropFilter: 'blur(20px)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📅</div>
                        <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                            {t.bookTitle}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                            {t.bookSub}
                        </p>

                        {/* Trust signals */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem', textAlign: 'left' }}>
                            {[
                                { icon: '🔒', text: lang === 'KR' ? '100% 기밀 보장' : lang === 'DE' ? '100% vertraulich' : lang === 'HU' ? '100% bizalmas' : '100% confidential' },
                                { icon: '📍', text: lang === 'KR' ? '한국어/영어 상담 가능' : lang === 'DE' ? 'Auf Englisch oder Deutsch' : lang === 'HU' ? 'Magyar / Angol' : 'EN / KR / DE available' },
                                { icon: '⚡', text: lang === 'KR' ? '24시간 내 확인' : lang === 'DE' ? 'Bestätigung in 24h' : lang === 'HU' ? '24 órán belül visszajelzés' : 'Confirmed within 24h' }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <span>{item.icon}</span>
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={openCalendly}
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', fontSize: '1rem', borderRadius: '12px', fontWeight: 700 }}
                        >
                            {t.bookBtn}
                        </button>

                        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            Powered by Calendly
                        </p>
                    </div>
                </div>
            </div>

            {/* Calendly Modal Overlay */}
            {showWidget && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '1rem'
                }}
                    onClick={(e) => { if (e.target === e.currentTarget) closeWidget(); }}
                >
                    <div style={{
                        background: 'var(--bg-secondary)', borderRadius: '24px', overflow: 'hidden',
                        width: '100%', maxWidth: '900px', maxHeight: '90vh',
                        border: '1px solid var(--border-color)',
                        display: 'flex', flexDirection: 'column'
                    }}>
                        {/* Modal header */}
                        <div style={{
                            padding: '1.25rem 1.5rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            borderBottom: '1px solid var(--border-color)'
                        }}>
                            <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                                {t.widgetTitle}
                            </span>
                            <button
                                onClick={closeWidget}
                                style={{
                                    background: 'rgba(255,255,255,0.08)', border: 'none', color: 'var(--text-secondary)',
                                    width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer',
                                    fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.15)'}
                                onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.08)'}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Calendly Widget Content */}
                        <div style={{ flex: 1, overflow: 'auto' }}>
                            {calendlyLoaded ? (
                                <div
                                    id="calendly-inline-container"
                                    style={{ minWidth: '320px', height: '660px' }}
                                />
                            ) : (
                                <div
                                    className="calendly-inline-widget"
                                    data-url={CALENDLY_URL}
                                    style={{ minWidth: '320px', height: '660px' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @media (max-width: 900px) {
                    #consultation .container > div:last-child {
                        grid-template-columns: 1fr !important;
                    }
                    #consultation .container > div:last-child > div:last-child {
                        position: relative !important;
                        top: 0 !important;
                    }
                }
            `}</style>
        </section>
    );
}
