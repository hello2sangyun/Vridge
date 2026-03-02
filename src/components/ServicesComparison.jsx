import React from 'react';

export default function ServicesComparison({ lang }) {
    const texts = {
        EN: {
            title: "Strategic Choice", subtitle: "Choose the optimal staffing model for your Hungarian operation.",
            recruitment: "Recruitment (Direct Hire)", fee1: "1x Fee",
            r1: "✓ Internal Talent Integration", r2: "✓ Long-term Specialist Focus", r3: "- Employer bears social tax burden",
            recLabel: "RECOMMENDED FOR MANUFACTURING",
            leasing: "Leasing (Subcontracting)", fee2: "Hourly Rate",
            l1: "✓ No HR & Insurance Burden", l2: "✓ Vridge takes full legal risk", l3: "✓ Flexible workforce scaling"
        },
        KR: {
            title: "전략적 선택", subtitle: "헝가리 법인 운영에 최적화된 인력 모델을 선택하세요.",
            recruitment: "인력 중개 (직접 고용)", fee1: "1회성 성공 보수",
            r1: "✓ 내부 인재로 융화 가능", r2: "✓ 장기 전문 인력 확보", r3: "- 고용주가 사회보험료 부담",
            recLabel: "제조업 적극 권장",
            leasing: "인력 도급 (파견)", fee2: "시간당 수수료",
            l1: "✓ 인사/보험 관리 부담 제로", l2: "✓ 법적 리스크 Vridge 전담", l3: "✓ 유연한 인력 규모 조절"
        },
        DE: {
            title: "Strategische Wahl", subtitle: "Wählen Sie das optimale Personalmodell für Ihren ungarischen Betrieb.",
            recruitment: "Personalvermittlung", fee1: "Einmalige Gebühr",
            r1: "✓ Interne Talentintegration", r2: "✓ Langfristiger Spezialistenfokus", r3: "- Arbeitgeber trägt Sozialabgaben",
            recLabel: "FÜR DIE PRODUKTION EMPFOHLEN",
            leasing: "Personalleasing", fee2: "Stundensatz",
            l1: "✓ Keine HR- & Versicherungsverpflichtungen", l2: "✓ Vridge übernimmt volles rechtliches Risiko", l3: "✓ Flexible Personalskalierung"
        },
        HU: {
            title: "Stratégiai Választás", subtitle: "Válassza ki az optimális személyzeti modellt magyarországi működéséhez.",
            recruitment: "Munkaerő-közvetítés", fee1: "1x Díj",
            r1: "✓ Belső tehetségintegráció", r2: "✓ Hosszú távú fókusz", r3: "- A munkáltató viseli a szociális adókat",
            recLabel: "GYÁRTÁSHOZ AJÁNLOTT",
            leasing: "Munkaerő-kölcsönzés", fee2: "Órabér",
            l1: "✓ Nincs HR és biztosítási teher", l2: "✓ A Vridge vállalja a teljes jogi kockázatot", l3: "✓ Rugalmas munkaerő-méretezés"
        }
    };

    const t = texts[lang] || texts['EN'];

    return (
        <section className="section container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2>{t.title}</h2>
                <p style={{ color: 'var(--text-secondary)' }}>{t.subtitle}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                <div className="glass" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t.recruitment}</h3>
                    <div style={{
                        fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)',
                        marginBottom: '1rem', color: 'var(--text-primary)'
                    }}>
                        {t.fee1}
                    </div>
                    <ul style={{ listStyle: 'none', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{t.r1}</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{t.r2}</li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                            {t.r3}
                        </li>
                    </ul>
                </div>

                <div className="glass" style={{
                    padding: '2.5rem', position: 'relative', overflow: 'hidden',
                    borderImage: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue)) 1'
                }}>
                    <div style={{
                        position: 'absolute', top: '1rem', right: '1rem',
                        background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)',
                        padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700
                    }}>
                        {t.recLabel}
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-blue)' }}>{t.leasing}</h3>
                    <div style={{
                        fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)',
                        marginBottom: '1rem', color: 'var(--text-primary)'
                    }}>
                        {t.fee2}
                    </div>
                    <ul style={{ listStyle: 'none', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{t.l1}</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{t.l2}</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{t.l3}</li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
