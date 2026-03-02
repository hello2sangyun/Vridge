import React from 'react';

export default function Footer({ lang }) {
    const texts = {
        EN: {
            desc: "Global Mobility & Workforce Integration Partner. Directly connecting international talent with European enterprise.",
            legalTitle: "Legal & License",
            l1: "HU Recruitment License: Aktív", l2: "Guarantee Deposit: 500,000 HUF", l3: "Registered Seat: Budapest, Hungary",
            trustTitle: "Trust Notice",
            trustText: '"Final decision on visa and residence permit issuance rests solely with the Hungarian immigration authorities (OIF)."',
            privacy: "Privacy Policy", terms: "Terms of Service"
        },
        KR: {
            desc: "글로벌 모빌리티 및 인력 통합 파트너. 다국적 인재와 유럽 기업을 직접 연결합니다.",
            legalTitle: "법적 면허 및 등록 정보",
            l1: "헝가리 인력 중개 면허: 활성 (Aktív)", l2: "보증금 예치: 50만 포린트 (HUF)", l3: "본점 소재지: 헝가리 부다페스트",
            trustTitle: "신뢰 및 면책 고지",
            trustText: '"비자 및 거주증 발급에 대한 최종 결정권은 전적으로 헝가리 이민국(OIF) 당국에 있습니다."',
            privacy: "개인정보 처리방침", terms: "이용 약관"
        },
        DE: {
            desc: "Partner für Global Mobility & Workforce Integration. Direkte Verbindung von internationalen Talenten mit europäischen Unternehmen.",
            legalTitle: "Rechtliches & Lizenzen",
            l1: "HU Personalvermittlungslizenz: Aktív", l2: "Garantiekaution: 500.000 HUF", l3: "Firmensitz: Budapest, Ungarn",
            trustTitle: "Vertrauenshinweis",
            trustText: '"Die endgültige Entscheidung über die Erteilung von Visa und Aufenthaltstiteln liegt ausschließlich bei den ungarischen Einwanderungsbehörden (OIF)."',
            privacy: "Datenschutzerklärung", terms: "Nutzungsbedingungen"
        },
        HU: {
            desc: "Globális Mobilitási és Munkaerő-integrációs Partner. Közvetlen kapcsolat a nemzetközi tehetségek és az európai vállalatok között.",
            legalTitle: "Jogi információk és engedélyek",
            l1: "HU Munkaerő-közvetítői engedély: Aktív", l2: "Garancia letét: 500 000 HUF", l3: "Székhely: Budapest, Magyarország",
            trustTitle: "Felelősségkizáró nyilatkozat",
            trustText: '"A vízum és a tartózkodási engedély kiadásáról a végső döntés kizárólag a magyar bevándorlási hatóságok (OIF) hatásköre."',
            privacy: "Adatvédelmi irányelvek", terms: "Felhasználási feltételek"
        }
    };

    const t = texts[lang] || texts['EN'];

    return (
        <footer style={{
            background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)',
            padding: '4rem 0 2rem 0', marginTop: 'auto'
        }}>
            <div className="container">

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

                    <div>
                        <div style={{ fontWeight: 700, fontSize: '1.5rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>
                            <span className="text-gradient">Vridge</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.8 }}>
                            {t.desc}
                        </p>
                    </div>

                    <div>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{t.legalTitle}</h4>
                        <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li>{t.l1}</li>
                            <li>{t.l2}</li>
                            <li>{t.l3}</li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{t.trustTitle}</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid var(--accent-cyan)' }}>
                            {t.trustText}
                        </p>
                    </div>

                </div>

                <div style={{
                    borderTop: '1px solid var(--border-color)', paddingTop: '2rem',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
                }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        &copy; {new Date().getFullYear()} Vridge (GR Bridge Solution Kft.) All rights reserved.
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{t.privacy}</a>
                        <a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{t.terms}</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
