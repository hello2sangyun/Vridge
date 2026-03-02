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

function App() {
  const [lang, setLang] = useState('EN');
  const t = i18n[lang];

  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <Problems t={t} />
        <Services t={t} />
        <WhyVridge t={t} />
        <Consultation t={t} lang={lang} />
      </main>
      <Footer t={t} />
    </>
  )
}

export default App
