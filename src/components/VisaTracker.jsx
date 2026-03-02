import React, { useState } from 'react';

export default function VisaTracker({ lang }) {
    const [activeStep, setActiveStep] = useState(0);

    const texts = {
        EN: {
            title: "Visa & Progress Tracker", sub: "End-to-End Transparency. 1,000 EUR + VAT total cost.",
            feeLabel: "Current Fee Structure", feeSub: "Milestone Based (50/50%)",
            payment: "💰 50% Payment Due",
            steps: [
                { title: "Document Review", detail: "Initial consultation and eligibility." },
                { title: "Counseling", detail: "In-depth case analysis and strategy planning." },
                { title: "Embassy Appointment", detail: "Scheduling at PH/IN Hungarian Embassy." },
                { title: "Type-C Visa Setup", detail: "Entry visa approved. 1st Milestone (50%)." },
                { title: "OIF Audit", detail: "Local review by Immigration Authority (~70 days)." },
                { title: "Residence Permit", detail: "Final approval & issuance. 2nd Milestone (50%)." }
            ]
        },
        KR: {
            title: "비자 및 수속 트래커", sub: "엔드투엔드 투명성 보장. 총 수수료 1,000 유로 + VAT",
            feeLabel: "청구 구조", feeSub: "마일스톤 기반 (50/50%)",
            payment: "💰 중도금 결제 발생",
            steps: [
                { title: "서류 검토", detail: "초기 상담 및 자격 요건 필터링." },
                { title: "심층 상담", detail: "케이스 분석 및 헝가리 비자 전략 수립." },
                { title: "대사관 예약", detail: "필리핀 또는 인도 주재 헝가리 대사관 일정 확보." },
                { title: "C-타입 비자 발급", detail: "입국 비자 승인. 1차 결제 발생 (50%)." },
                { title: "이민국(OIF) 심사", detail: "헝가리 이민국 최종 심사 (약 70일 소요)." },
                { title: "거주증 발급", detail: "최종 승인. 2차 잔금 결제 (50%)." }
            ]
        },
        DE: {
            title: "Visa & Fortschritts-Tracker", sub: "End-to-End-Transparenz. 1.000 EUR + MwSt. Gesamtkosten.",
            feeLabel: "Aktuelle Gebührenstruktur", feeSub: "Meilensteinbasiert (50/50%)",
            payment: "💰 50% Zahlung fällig",
            steps: [
                { title: "Dokumentenprüfung", detail: "Erstberatung und Eignung." },
                { title: "Beratung", detail: "Eingehende Fallanalyse und Strategieplanung." },
                { title: "Botschaftstermin", detail: "Terminvereinbarung in der zuständigen ungarischen Botschaft." },
                { title: "Typ-C-Visum", detail: "Einreisevisum genehmigt. 1. Meilenstein (50%)." },
                { title: "OIF-Prüfung", detail: "Lokale Prüfung durch die Einwanderungsbehörde (~70 Tage)." },
                { title: "Aufenthaltstitel", detail: "Endgültige Genehmigung. 2. Meilenstein (50%)." }
            ]
        },
        HU: {
            title: "Vízum és Folyamat Követő", sub: "Teljes átláthatóság. 1000 EUR + ÁFA teljes költség.",
            feeLabel: "Jelenlegi díjstruktúra", feeSub: "Mérföldkő alapú (50/50%)",
            payment: "💰 50% Fizetés esedékes",
            steps: [
                { title: "Dokumentumok ellenőrzése", detail: "Előzetes konzultáció és jogosultság." },
                { title: "Tanácsadás", detail: "Részletes esetelemzés és stratégiatervezés." },
                { title: "Nagykövetségi időpont", detail: "Időpontfoglalás a PH/IN magyar nagykövetségen." },
                { title: "C-típusú vízum", detail: "Beutazási vízum jóváhagyva. 1. mérföldkő (50%)." },
                { title: "OIF vizsgálat", detail: "Helyi felülvizsgálat a Bevándorlási Hivatal által (~70 nap)." },
                { title: "Tartózkodási engedély", detail: "Végső jóváhagyás. 2. mérföldkő (50%)." }
            ]
        }
    };

    const t = texts[lang] || texts['EN'];

    return (
        <section className="section container" style={{ padding: '4rem 1rem' }}>
            <div className="glass" style={{ padding: '3rem', borderRadius: '24px' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{t.title}</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>{t.sub}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{t.feeLabel}</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                            {t.feeSub}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                    <div style={{
                        position: 'absolute', top: 0, left: '24px', bottom: 0, width: '2px',
                        background: 'var(--border-color)', zIndex: 0
                    }}></div>

                    {t.steps.map((step, idx) => (
                        <div
                            key={idx}
                            onMouseEnter={() => setActiveStep(idx)}
                            style={{
                                display: 'flex', gap: '2rem', alignItems: 'center', position: 'relative', zIndex: 1,
                                padding: '1rem', borderRadius: '12px', transition: 'var(--transition-fast)',
                                background: activeStep === idx ? 'rgba(255,255,255,0.03)' : 'transparent',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
                                background: activeStep >= idx ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                                border: `2px solid ${activeStep >= idx ? 'var(--accent-cyan)' : 'var(--border-color)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
                                boxShadow: activeStep === idx ? '0 0 20px rgba(6,182,212,0.4)' : 'none',
                                transition: 'all var(--transition-normal)'
                            }}>
                                {idx + 1}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{
                                    fontSize: '1.25rem', marginBottom: '0.25rem',
                                    color: activeStep >= idx ? 'var(--text-primary)' : 'var(--text-secondary)'
                                }}>
                                    {step.title}
                                </h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{step.detail}</p>
                            </div>
                            {idx === 3 || idx === 5 ? (
                                <div style={{
                                    padding: '0.5rem 1rem', background: 'rgba(255, 255, 255, 0.05)', whiteSpace: 'nowrap',
                                    borderRadius: '100px', fontSize: '0.875rem', border: '1px solid var(--border-color)'
                                }}>
                                    {t.payment}
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
