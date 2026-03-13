import React, { useState } from 'react';
import { IconCalendar, IconCheck, IconClock, IconGlobe, IconBellAlert, IconEnvelope, IconChevronRight } from './Icons';
import { saveConsultationRequest } from '../services/firebaseSetup';

const BENEFIT_ICONS = [IconCheck, IconClock, IconGlobe, IconBellAlert];

export default function Consultation({ t, lang }) {
    const { consult } = t;
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [userInput, setUserInput] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const openModal = () => {
        setShowModal(true);
        setStep(1);
    };

    const closeModal = () => {
        if (isSubmitting) return;
        setShowModal(false);
        setStep(1);
        setUserInput('');
        setUserEmail('');
        setUserName('');
    };

    const handleNext = () => {
        if (userInput.trim().length < 10) {
            alert(lang === 'KO' ? '도움이 필요하신 내용을 조금 더 구체적으로 적어주세요.' : 'Please provide a bit more detail about your request.');
        } else {
            setStep(2);
        }
    };

    const handleSubmit = async () => {
        if (!userName.trim()) {
            alert(lang === 'KO' ? '성함을 입력해 주세요.' : 'Please enter your name.');
            return;
        }
        if (!userEmail.includes('@') || userEmail.length < 5) {
            alert(lang === 'KO' ? '올바른 이메일 주소를 입력해 주세요.' : 'Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);
        try {
            await saveConsultationRequest({
                name: userName,
                email: userEmail,
                message: userInput,
                lang: lang
            });
            setStep(3); // Thank You Step
        } catch (error) {
            alert(lang === 'KO' ? '오류가 발생했습니다. 나중에 다시 시도해 주세요.' : 'An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="consultation" style={{ background: '#fff', padding: '96px 0' }}>
            <div className="container">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                    <div className="section-tag">
                        <IconCalendar size={14} color="#007A33" stroke={2} />
                        {consult.tag}
                    </div>
                    <h2 className="section-title" style={{ marginTop: '8px', whiteSpace: 'pre-line' }}>
                        {consult.title}
                    </h2>
                    <p className="section-sub" style={{ maxWidth: '520px', margin: '14px auto 0', whiteSpace: 'pre-line' }}>
                        {consult.sub}
                    </p>
                </div>

                {/* Benefit pills */}
                <div style={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px',
                    marginBottom: '48px',
                }}>
                    {consult.benefits.map((text, i) => {
                        const Icon = BENEFIT_ICONS[i];
                        return (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                padding: '10px 20px',
                                background: '#f9fafb', borderRadius: '100px',
                                border: '1px solid #e5e7eb',
                                fontSize: '0.875rem', fontWeight: 600, color: '#374151',
                            }}>
                                <div style={{ color: '#007A33' }}><Icon size={15} color="#007A33" stroke={2} /></div>
                                {text}
                            </div>
                        );
                    })}
                </div>

                {/* CTA Button instead of inline widget */}
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <button
                        className="btn-primary"
                        style={{ padding: '20px 48px', fontSize: '1.125rem' }}
                        onClick={openModal}
                    >
                        {consult.cta}
                        <IconChevronRight size={20} color="#fff" stroke={3} />
                    </button>
                </div>

                {/* Email CTA strip */}
                <div style={{
                    marginTop: '40px', padding: '28px 36px',
                    background: '#111827', borderRadius: '20px',
                    display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                    justifyContent: 'space-between', gap: '20px',
                }}>
                    <div>
                        <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                            {consult.emailLabel}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)' }}>
                            {consult.emailSub}
                        </div>
                    </div>
                    <a href="mailto:visa@vridge.info" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '10px',
                        padding: '13px 28px', background: '#007A33', color: '#fff',
                        borderRadius: '100px', fontWeight: 700, fontSize: '0.9375rem',
                        transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#005a25'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#007A33'; }}
                    >
                        <IconEnvelope size={17} color="#fff" />
                        visa@vridge.info
                    </a>
                </div>
            </div>

            {/* Modal Logic */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className={`modal-container ${step === 3 ? 'success-modal' : ''}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h3 className="modal-title">
                                {step === 1 ? consult.modalStep1Title 
                                : step === 2 ? (lang === 'KO' ? '연락처 정보 입력' : 'Contact Information')
                                : (lang === 'KO' ? '신청이 완료되었습니다!' : 'Application Submitted!')}
                            </h3>
                            {step !== 3 && <button className="modal-close" onClick={closeModal}>✕</button>}
                        </div>

                        <div className="modal-body">
                            {step === 1 ? (
                                <div style={{ textAlign: 'center' }}>
                                    <textarea
                                        className="modal-input"
                                        rows="4"
                                        placeholder={consult.modalStep1Placeholder}
                                        value={userInput}
                                        onChange={e => setUserInput(e.target.value)}
                                        autoFocus
                                    />
                                    <div style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'left', background: '#fef2f2', padding: '16px', borderRadius: '8px', border: '1px solid #fee2e2' }}>
                                        <p style={{ color: '#dc2626', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>
                                            {lang === 'KO' 
                                                ? '* 노쇼(No-show) 방지 및 보다 정확한 상담 제공을 위해, 사전에 어떤 도움이 필요하신지 구체적으로 작성해 주시기 바랍니다.' 
                                                : lang === 'HU'
                                                ? '* A meg nem jelenések elkerülése és a minőségi szolgáltatás biztosítása érdekében kérjük, részletezze, hogyan segíthetünk, mielőtt időpontot foglalna.'
                                                : '* To prevent no-shows and ensure quality service, please provide a detailed description of how we can help before scheduling.'}
                                        </p>
                                        <p style={{ color: '#b91c1c', fontSize: '0.8125rem' }}>
                                            {lang === 'KO' 
                                                ? '※ 정보가 부족할 경우 상담 지원이 거절될 수 있습니다.' 
                                                : lang === 'HU'
                                                ? '※ A hiányos részletekkel rendelkező kéréseket elutasíthatjuk.'
                                                : '※ Requests with insufficient details may be declined.'}
                                        </p>
                                    </div>
                                    <button
                                        className="btn-primary"
                                        style={{ width: '100%', justifyContent: 'center' }}
                                        onClick={handleNext}
                                    >
                                        {lang === 'KO' ? '다음 단계로' : 'Next Step'}
                                        <IconChevronRight size={18} color="#fff" stroke={2} />
                                    </button>
                                </div>
                            ) : step === 2 ? (
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ marginBottom: '24px', color: '#4b5563', fontSize: '0.9375rem' }}>
                                        {lang === 'KO' 
                                            ? '이름과 이메일 주소를 입력해 주세요.' 
                                            : 'Please enter your name and email address.'}
                                    </p>
                                    <input
                                        type="text"
                                        className="modal-input"
                                        style={{ marginBottom: '12px', height: '52px' }}
                                        placeholder={lang === 'KO' ? "이름 (Name)" : "Name"}
                                        value={userName}
                                        onChange={e => setUserName(e.target.value)}
                                        autoFocus
                                    />
                                    <input
                                        type="email"
                                        className="modal-input"
                                        style={{ marginBottom: '20px', height: '52px' }}
                                        placeholder="example@email.com"
                                        value={userEmail}
                                        onChange={e => setUserEmail(e.target.value)}
                                    />
                                    <button
                                        className="btn-primary"
                                        style={{ width: '100%', justifyContent: 'center' }}
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : (lang === 'KO' ? '서류 심사 제출하기' : 'Submit for Review')}
                                    </button>
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                    <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '64px', height: '64px', borderRadius: '50%', background: '#d1fae5', color: '#059669', marginBottom: '20px' }}>
                                        <IconCheck size={32} stroke={3} />
                                    </div>
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
                                        {lang === 'KO' ? '신청해주셔서 감사합니다 💛' : 'Thank you for applying 💛'}
                                    </h4>
                                    <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '32px' }}>
                                        {lang === 'KO' 
                                            ? '작성해주신 내용을 바탕으로 Vridge의 담당자가 신속히 배정됩니다.\n담당자가 내용을 확인하고 승인하면, 입력하신 이메일로 미팅 스케줄을 잡을 수 있는 링크를 보내드립니다.' 
                                            : 'A Vridge representative will be assigned to review your request.\nOnce approved, we will send an email with a link to schedule your meeting.'}
                                    </p>
                                    <button
                                        className="btn-primary"
                                        style={{ width: '100%', justifyContent: 'center', background: '#f3f4f6', color: '#374151' }}
                                        onClick={closeModal}
                                    >
                                        {lang === 'KO' ? '돌아가기' : 'Close'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
