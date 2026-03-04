import './index.css'
import { useState } from 'react'
import { i18n } from './i18n'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Problems from './components/Problems'
import Services from './components/Services'
import WhyVridge from './components/WhyVridge'
import Consultation from './components/Consultation'
import Footer from './components/Footer'

import { Routes, Route } from 'react-router-dom'
import TermsOfUse from './components/TermsOfUse'
import PrivacyPolicy from './components/PrivacyPolicy'

function App() {
  const [lang, setLang] = useState('EN');
  const t = i18n[lang];

  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} />
      <Routes>
        <Route path="/" element={
          <main>
            <Hero t={t} />
            <Problems t={t} />
            <Services t={t} />
            <WhyVridge t={t} />
            <Consultation t={t} lang={lang} />
          </main>
        } />
        <Route path="/terms" element={<TermsOfUse t={t} />} />
        <Route path="/privacy" element={<PrivacyPolicy t={t} />} />
      </Routes>
      <Footer t={t} />
    </>
  )
}

export default App
