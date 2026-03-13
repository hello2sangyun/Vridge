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

import { Routes, Route, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import TermsOfUse from './components/TermsOfUse'
import PrivacyPolicy from './components/PrivacyPolicy'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  const [lang, setLang] = useState('EN');
  const t = i18n[lang];
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Nav lang={lang} setLang={setLang} t={t} />}
      <Routes>
        <Route path="/" element={
          <main>
            <Helmet>
              <title>Vridge | 헝가리 비자 전문 에이전시</title>
              <meta name="description" content="헝가리 비자의 가장 확실한 연결고리, Vridge. 취업, 사업, 가족초청, 영주권까지 헝가리 현지 전문 에이전시가 책임집니다." />
            </Helmet>
            <Hero t={t} />
            <Problems t={t} />
            <Services t={t} />
            <WhyVridge t={t} />
            <Consultation t={t} lang={lang} />
          </main>
        } />
        <Route path="/terms" element={<TermsOfUse t={t} />} />
        <Route path="/privacy" element={<PrivacyPolicy t={t} />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {!isAdminRoute && <Footer t={t} />}
    </>
  )
}

export default App
