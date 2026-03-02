import { useState, useEffect } from 'react'
import './App.css'
import Hero from './components/Hero'
import CoreValues from './components/CoreValues'
import VisaTracker from './components/VisaTracker'
import ServicesComparison from './components/ServicesComparison'
import BookConsultation from './components/BookConsultation'
import ScreeningForm from './components/ScreeningForm'
import Footer from './components/Footer'

function App() {
  const [lang, setLang] = useState('EN'); // EN, KR, DE, HU

  // Persona texts based on lang
  const heroContent = {
    KR: {
      tag: "한국 기업을 위한 완벽한 솔루션",
      title: "비자 리스크 제로",
      subtitle: "안정적 인력 관리",
      description: "전문 인력 도급을 통한 운영 최적화. 헝가리 비자 발급부터 사후 관리까지 책임집니다.",
      cta: "B2B 서비스 비교"
    },
    EN: {
      tag: "Zero Commission Policy",
      title: "European Career",
      subtitle: "Unleashed",
      description: "Free of charge for candidates. Trusted visa support and direct connection to European business ecosystem.",
      cta: "Start Screening"
    },
    DE: {
      tag: "Für DACH Unternehmen",
      title: "Rechtssicher",
      subtitle: "und Kosteneffizient",
      description: "Transparente Subunternehmer-Strukturen und rechtssichere Personalbeschaffung nach ungarischem Recht.",
      cta: "Lead Gen Formular"
    },
    HU: {
      tag: "Helyi Partnereknek",
      title: "Megbízható",
      subtitle: "Globális Partner",
      description: "Engedéllyel rendelkező, szabályozott munkaerő-közvetítő a magyar gazdaság szolgálatában.",
      cta: "Kapcsolat"
    }
  };

  const nav = (
    <nav className="glass" style={{
      position: 'fixed', top: '1rem', left: '50%', transform: 'translateX(-50%)',
      width: '90%', maxWidth: '1200px', zIndex: 100, display: 'flex',
      justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem'
    }}>
      <div className="logo" style={{ fontWeight: 700, fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>
        <span className="text-gradient">Vridge</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <a
          href="#consultation"
          style={{
            color: 'var(--accent-cyan)', fontSize: '0.875rem', fontWeight: 600,
            textDecoration: 'none', padding: '0.5rem 1rem',
            border: '1px solid rgba(6,182,212,0.3)', borderRadius: '8px',
            transition: 'var(--transition-fast)', whiteSpace: 'nowrap'
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(6,182,212,0.1)'}
          onMouseLeave={e => e.target.style.background = 'transparent'}
        >
          {lang === 'KR' ? '상담 예약' : lang === 'DE' ? 'Beratung' : lang === 'HU' ? 'Tanácsadás' : 'Book Call'}
        </a>
        <div className="lang-selector" style={{ display: 'flex', gap: '0.5rem' }}>
          {['EN', 'KR', 'DE', 'HU'].map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                background: lang === l ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: lang === l ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer',
                fontWeight: 600, transition: 'var(--transition-fast)'
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {nav}
      <main style={{ paddingTop: '5rem' }}>
        <Hero content={heroContent[lang]} lang={lang} />
        <CoreValues lang={lang} />
        {lang === 'KR' || lang === 'DE' ? <ServicesComparison lang={lang} /> : null}
        <VisaTracker lang={lang} />
        <BookConsultation lang={lang} />
        <ScreeningForm lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  )
}

export default App
