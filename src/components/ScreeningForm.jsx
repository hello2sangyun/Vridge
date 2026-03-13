import React, { useState } from 'react';
import { sendTelegramNotification } from '../services/telegramService';

export default function ScreeningForm({ lang }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        nationality: '',
        purpose: 'employment',
        skills: '',
        passportExpiry: '',
        languageLevel: 'basic',
        checks: {
            passport: false,
            fitness: false,
            communication: false,
            experience: false,
            salaryInfo: false
        }
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const texts = {
        EN: {
            title: "Pre-Screening Portal", sub: "Filter your eligibility for European relocation.",
            stepTitle: "5-Step Eligibility Check",
            contactTitle: "Applicant Details",
            checks: [
                { id: 'passport', label: 'Passport Validity > 2 Years' },
                { id: 'fitness', label: 'Physical Fitness (Shift work ready)' },
                { id: 'communication', label: 'Basic English or Russian' },
                { id: 'experience', label: 'Previous overseas experience (e.g. Middle East)' },
                { id: 'salaryInfo', label: 'Accepts Hungarian salary conditions long-term' }
            ],
            name: "Full Name", email: "Email Address", whatsapp: "WhatsApp Number",
            nat: "Nationality & Current Location",
            empOptions: { emp: "Employment", self: "Self-Employment", relo: "Relocation" },
            skill: "Skillset (e.g. IT, Engineering)",
            passExp: "Passport Expiration",
            submit: "Submit Pre-Screening", noSubmit: "Complete Checklist First",
            loading: "Sending...",
            success: "Successfully Submitted! We will contact you via Email/WhatsApp within 24 hours.",
            error: "Something went wrong. Please try again.",
            notice: "* Data is processed securely for screening purposes only."
        },
        KR: {
            title: "사전 자격 심사 (Pre-Screening)", sub: "유럽 취업 및 이주를 위한 자격 요건을 진단합니다.",
            stepTitle: "5대 핵심 필수 체크리스트",
            contactTitle: "지원자 정보",
            checks: [
                { id: 'passport', label: '여권 유효기간 2년 이상 보유' },
                { id: 'fitness', label: '신체 적합성 (교대 근무 및 중량물 취급 가능)' },
                { id: 'communication', label: '기초 영어 또는 러시아어 구사 능력' },
                { id: 'experience', label: '해외 근무 경험 보유 (예: 중동 등)' },
                { id: 'salaryInfo', label: '헝가리 급여 수준 및 장기 근로 의지 동의' }
            ],
            name: "성명 (영문)", email: "이메일 주소", whatsapp: "WhatsApp 번호",
            nat: "국적 및 현재 거주지",
            empOptions: { emp: "취업 (Employment)", self: "자영업 (Selfbiz)", relo: "리로케이션 (Relocation)" },
            skill: "보유 기술 (예: IT, 엔지니어, 용접 등)",
            passExp: "여권 만료일",
            submit: "심사 신청하기", noSubmit: "체크리스트를 먼저 완료해주세요",
            loading: "전송 중...",
            success: "접수가 완료되었습니다! 24시간 이내에 이메일 또는 WhatsApp으로 연락드리겠습니다.",
            error: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
            notice: "* 수집된 데이터는 심사 목적으로만 안전하게 처리됩니다."
        },
        DE: {
            title: "Pre-Screening Portal", sub: "Prüfen Sie Ihre Eignung für einen Umzug nach Europa.",
            stepTitle: "5-Schritte-Eignungsprüfung",
            contactTitle: "Bewerberdetails",
            checks: [
                { id: 'passport', label: 'Gültigkeit des Reisepasses > 2 Jahre' },
                { id: 'fitness', label: 'Körperliche Fitness (Schichtarbeit möglich)' },
                { id: 'communication', label: 'Grundkenntnisse Englisch oder Russisch' },
                { id: 'experience', label: 'Bisherige Auslandserfahrung (z.B. im Nahen Osten)' },
                { id: 'salaryInfo', label: 'Akzeptiert ungarische Gehaltsbedingungen langfristig' }
            ],
            name: "Vollständiger Name", email: "E-Mail-Adresse", whatsapp: "WhatsApp-Nummer",
            nat: "Nationalität & aktueller Wohnort",
            empOptions: { emp: "Anstellung", self: "Selbstständigkeit", relo: "Umzug (Relocation)" },
            skill: "Fähigkeiten (z.B. IT, Ingenieurwesen)",
            passExp: "Ablaufdatum des Reisepasses",
            submit: "Pre-Screening einreichen", noSubmit: "Bitte zuerst die Checkliste ausfüllen",
            loading: "Wird gesendet...",
            success: "Erfolgreich übermittelt! Wir kontaktieren Sie innerhalb von 24 Stunden.",
            error: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
            notice: "* Daten werden sicher & nur für Überprüfungszwecke verarbeitet."
        },
        HU: {
            title: "Előszűrési Portál", sub: "Ellenőrizze jogosultságát az európai áthelyezésre.",
            stepTitle: "5 Lépéses Jogosultsági Ellenőrzés",
            contactTitle: "Jelentkező adatai",
            checks: [
                { id: 'passport', label: 'Útlevél érvényessége > 2 év' },
                { id: 'fitness', label: 'Fizikai alkalmasság (Műszakos munkára kész)' },
                { id: 'communication', label: 'Alapfokú angol vagy orosz nyelvtudás' },
                { id: 'experience', label: 'Korábbi tengerentúli tapasztalat (pl. Közel-Kelet)' },
                { id: 'salaryInfo', label: 'Elfogadja a magyar fizetési feltételeket hosszú távon' }
            ],
            name: "Teljes név", email: "E-mail cím", whatsapp: "WhatsApp szám",
            nat: "Nemzetiség és jelenlegi hely",
            empOptions: { emp: "Foglalkoztatás", self: "Önfoglalkoztatás", relo: "Áthelyezés" },
            skill: "Készségek (pl. IT, Mérnöki)",
            passExp: "Útlevél lejárati dátuma",
            submit: "Előszűrés beküldése", noSubmit: "Kérjük, előbb töltse ki az ellenőrzőlistát",
            loading: "Küldés...",
            success: "Sikeresen elküldve! 24 órán belül felvesszük Önnel a kapcsolatot.",
            error: "Valami hiba történt. Kérjük, próbálja újra.",
            notice: "* Az adatokat biztonságosan és csak szűrési célokra kezeljük."
        }
    };

    const t = texts[lang] || texts['EN'];

    const handleCheck = (key) => {
        setFormData(prev => ({
            ...prev, checks: { ...prev.checks, [key]: !prev.checks[key] }
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const checksAllowed = Object.values(formData.checks).every(Boolean);
    const isFormValid = checksAllowed && formData.name && formData.email && formData.whatsapp;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;
        setStatus('loading');

        const leadMessage = `
📌 [New Applicant Lead]
Name: ${formData.name}
Email: ${formData.email}
WhatsApp: ${formData.whatsapp}
Nationality: ${formData.nationality}
Purpose: ${formData.purpose}
Skills: ${formData.skills}
Passport Expiry: ${formData.passportExpiry}
    `;

        try {
            // 1. Send via Email (Web3Forms)
            const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY_HERE"; // Replace with real key
            if (WEB3FORMS_ACCESS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
                await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify({
                        access_key: WEB3FORMS_ACCESS_KEY,
                        subject: `New Vridge Application: ${formData.name}`,
                        name: formData.name,
                        email: formData.email,
                        message: leadMessage
                    })
                });
            }

            // 2. Send via Telegram Bot
            await sendTelegramNotification(formData, 'screening');

            // Simulate network request if keys are not set yet
            if (WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
                await new Promise(res => setTimeout(res, 1500));
            }

            setStatus('success');
            setFormData(prev => ({ ...prev, name: '', email: '', whatsapp: '', nationality: '', skills: '', passportExpiry: '' })); // reset
        } catch (error) {
            console.error("Submission failed", error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <section className="section container" style={{ padding: '4rem 1rem' }}>
                <div className="glass" style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center', borderRadius: '24px' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>{t.success}</h2>
                </div>
            </section>
        );
    }

    return (
        <section className="section container" style={{ padding: '4rem 1rem' }}>
            <div className="glass" style={{
                maxWidth: '1000px', margin: '0 auto', padding: '3rem',
                borderRadius: '24px', background: 'var(--bg-secondary)'
            }}>

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{t.title}</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>{t.sub}</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>

                    <div style={{ background: 'var(--bg-primary)', padding: '2.5rem', borderRadius: '16px' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', color: 'var(--accent-blue)' }}>1. {t.stepTitle}</h3>

                        {t.checks.map(({ id, label }) => (
                            <label
                                key={id}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                    padding: '1rem', borderBottom: '1px solid var(--border-color)',
                                    cursor: 'pointer'
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={formData.checks[id]}
                                    onChange={() => handleCheck(id)}
                                    style={{ width: '20px', height: '20px', accentColor: 'var(--accent-cyan)' }}
                                />
                                <span style={{ color: formData.checks[id] ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                    {label}
                                </span>
                            </label>
                        ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'var(--accent-cyan)' }}>2. {t.contactTitle}</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder={t.name} className="input-field" required />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder={t.email} className="input-field" required />
                                <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder={t.whatsapp} className="input-field" required />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                            <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} placeholder={t.nat} className="input-field" />
                            <select name="purpose" value={formData.purpose} onChange={handleInputChange} className="input-field">
                                <option value="employment">{t.empOptions.emp}</option>
                                <option value="self">{t.empOptions.self}</option>
                                <option value="relocation">{t.empOptions.relo}</option>
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <input type="text" name="skills" value={formData.skills} onChange={handleInputChange} placeholder={t.skill} className="input-field" />
                            <input type="date" name="passportExpiry" value={formData.passportExpiry} onChange={handleInputChange} placeholder={t.passExp} className="input-field" />
                        </div>

                        {status === 'error' && <div style={{ color: '#ef4444', fontSize: '0.875rem' }}>{t.error}</div>}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!isFormValid || status === 'loading'}
                            style={{
                                marginTop: '1.5rem', padding: '1.25rem', width: '100%', fontSize: '1.1rem',
                                opacity: isFormValid ? 1 : 0.5, cursor: isFormValid ? 'pointer' : 'not-allowed'
                            }}
                        >
                            {status === 'loading' ? t.loading : (checksAllowed ? t.submit : t.noSubmit)}
                        </button>
                        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                            {t.notice}
                        </p>
                    </div>

                </form>

            </div>

            <style>{`
        .input-field {
          width: 100%;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
          font-family: var(--font-primary);
          outline: none;
          transition: var(--transition-fast);
        }
        .input-field:focus {
          border-color: var(--accent-cyan);
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
        </section>
    );
}
