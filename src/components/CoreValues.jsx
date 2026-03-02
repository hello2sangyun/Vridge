import React from 'react';

export default function CoreValues({ lang }) {
    const texts = {
        EN: {
            title: "Our Core Imperatives",
            sub: "More than an agency. We are your Mobility Strategy Hub.",
            val1Title: "Strategic Integration",
            val1Desc: "End-to-End solutions from candidate selection, visa processing, to final residence permit allocation and onboarding.",
            val2Title: "Legal Transparency",
            val2Desc: "Backed by official Hungarian government licenses and a solid 500,000 HUF guarantee deposit. Zero hidden fees.",
            val3Title: "Smart Connectivity",
            val3Desc: "Eliminating middlemen by directly connecting top Asian talent pools with the dynamic European business ecosystem."
        },
        KR: {
            title: "핵심 가치",
            sub: "단순 행정 대행을 넘어선 글로벌 모빌리티 전략 허브.",
            val1Title: "통합적 완결성",
            val1Desc: "채용 확정부터 C-타입 비자 발급, 거주증 전환, 그리고 사후 관리까지 이어지는 완벽한 엔드투엔드 솔루션.",
            val2Title: "신뢰 기반의 투명성",
            val2Desc: "50만 포린트 보증금 예치 등 헝가리 노동부 공식 면허 기반의 공신력. 불투명한 수수료를 철저히 배제합니다.",
            val3Title: "지능형 매칭",
            val3Desc: "인도, 필리핀 등 아시아의 검증된 전문 인재 풀과 유럽 비즈니스 생태계를 중간 브로커 없이 직접 연결합니다."
        },
        DE: {
            title: "Unsere Kernwerte",
            sub: "Mehr als eine Agentur. Wir sind Ihr Mobility Strategy Hub.",
            val1Title: "Strategische Integration",
            val1Desc: "End-to-End-Lösungen von der Kandidatenauswahl über die Visabearbeitung bis hin zur finalen Aufenthaltserlaubnis.",
            val2Title: "Rechtliche Transparenz",
            val2Desc: "Unterstützt durch offizielle ungarische Lizenzen und eine Kaution von 500.000 HUF. Keine versteckten Gebühren.",
            val3Title: "Intelligente Verbindungen",
            val3Desc: "Direkte Verbindung asiatischer Talentpools mit dem europäischen Geschäftsökosystem ohne Zwischenhändler."
        },
        HU: {
            title: "Alapvető Értékeink",
            sub: "Több, mint egy ügynökség. Mi vagyunk az Ön Mobilitási Stratégiai Központja.",
            val1Title: "Stratégiai Integráció",
            val1Desc: "Végponttól végpontig terjedő megoldások a jelöltek kiválasztásától a vízumügyintézésen át a végső tartózkodási engedélyig.",
            val2Title: "Jogi Átláthatóság",
            val2Desc: "Hivatalos magyar állami engedélyekkel és 500 000 HUF garancialetéttel támogatva. Nincsenek rejtett költségek.",
            val3Title: "Intelligens Kapcsolat",
            val3Desc: "A legjobb ázsiai tehetségek közvetlen összekapcsolása a dinamikus európai üzleti ökoszisztémával, közvetítők nélkül."
        }
    };

    const t = texts[lang] || texts['EN'];

    const values = [
        {
            title: t.val1Title, desc: t.val1Desc,
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>,
            color: "var(--accent-blue)"
        },
        {
            title: t.val2Title, desc: t.val2Desc,
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
            color: "#10b981" // Emerald
        },
        {
            title: t.val3Title, desc: t.val3Desc,
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
            color: "var(--accent-cyan)"
        }
    ];

    return (
        <section className="section container" style={{ padding: '4rem 1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t.title}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>{t.sub}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {values.map((val, idx) => (
                    <div key={idx} className="glass card-hover" style={{
                        padding: '2.5rem', borderRadius: '24px', position: 'relative', overflow: 'hidden',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}>
                        {/* Subtle background glow for each card based on its icon color */}
                        <div style={{
                            position: 'absolute', top: '-10%', right: '-10%', width: '150px', height: '150px',
                            background: val.color, filter: 'blur(80px)', opacity: 0.15, borderRadius: '50%'
                        }}></div>

                        <div style={{
                            width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
                            color: val.color, border: `1px solid rgba(255,255,255,0.1)`
                        }}>
                            {val.icon}
                        </div>

                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                            {val.title}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            {val.desc}
                        </p>
                    </div>
                ))}
            </div>

            <style>{`
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          border-color: rgba(255,255,255,0.15);
        }
      `}</style>
        </section>
    );
}
