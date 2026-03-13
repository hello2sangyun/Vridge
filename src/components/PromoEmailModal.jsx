import React, { useState, useEffect } from 'react';
import { sendPromoEmail } from '../services/emailService';

export default function PromoEmailModal({ requests, onClose }) {
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('Vridge 서비스 업데이트 안내');
  const [bodyText, setBodyText] = useState('안녕하세요!\n\n최근 Vridge 서비스에 문의해주셔서 감사합니다.\n유럽 이주 및 헝가리 취업과 관련하여 새롭고 유익한 소식을 전해드립니다.\n\n궁금하신 점이 있다면 언제든지 회신해 주세요!');
  
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sendResult, setSendResult] = useState(null);
  
  // Extract unique valid email addresses
  const uniqueEmails = Array.from(new Set(
    requests
      .filter(req => req.email && req.email.includes('@'))
      .map(req => req.email)
  ));

  const getHtmlTemplate = (mailTitle, mailBodyText) => {
    const formattedBody = mailBodyText.replace(/\n/g, '<br />');

    return `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f3f4f6;">
        <div style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);">
          
          <!-- Header (Gradient) -->
          <div style="background: linear-gradient(135deg, #111827, #007A33); padding: 48px 32px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px;">Vridge</h1>
            <p style="color: rgba(255,255,255,0.8); font-size: 16px; margin-top: 8px; margin-bottom: 0; font-weight: 500;">
              Hungary Global Talent Platform
            </p>
          </div>
          
          <!-- Body Content -->
          <div style="padding: 48px 32px; color: #374151; font-size: 16px; line-height: 1.7;">
            <h2 style="color: #111827; font-size: 24px; font-weight: 700; margin-top: 0; margin-bottom: 24px; letter-spacing: -0.5px;">
              ${mailTitle || '제목을 입력하세요'}
            </h2>
            
            <div style="margin-bottom: 40px; color: #4b5563;">
              ${formattedBody || '<p>이곳에 메일 본문을 작성해주세요.</p>'}
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin-top: 48px;">
              <a href="https://vridge.info" 
                 style="display: inline-block; padding: 16px 32px; background-color: #007A33; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; transition: background-color 0.2s;">
                Vridge 홈페이지 방문하기
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f9fafb; border-top: 1px solid #f3f4f6; padding: 24px 32px; text-align: center; font-size: 13px; color: #9ca3af; line-height: 1.5;">
            <p style="margin: 0;">이 메일은 Vridge 서비스에 상담 문의를 남겨주신 고객님들께 발송됩니다.</p>
            <p style="margin-top: 8px;">© 2026 Vridge. All rights reserved.</p>
            <p style="margin-top: 8px;">Contact: visa@vridge.info</p>
          </div>
          
        </div>
      </div>
    `;
  };

  const htmlPreview = getHtmlTemplate(title, bodyText);

  const startMassDelivery = async () => {
    if (!subject) {
      alert('이메일 제목을 입력해주세요.');
      return;
    }

    const confirmSend = window.confirm(`총 ${uniqueEmails.length}명의 고객에게 홍보메일을 일괄 발송하시겠습니까?\n발송 중 페이지를 닫지 마세요.`);
    if (!confirmSend) return;

    setIsSending(true);
    setProgress(0);
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < uniqueEmails.length; i++) {
      const email = uniqueEmails[i];
      const htmlContent = getHtmlTemplate(title, bodyText);
      
      const success = await sendPromoEmail(email, subject, htmlContent);
      if (success) successCount++;
      else failCount++;

      setProgress(i + 1);
      
      // Add slight delay to prevent strict rate-limiting (EmailJS often allows 10-20 requests/sec, but safe is better)
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setIsSending(false);
    setSendResult({ success: successCount, fail: failCount });
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(17, 24, 39, 0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px'
    }}>
      <div style={{
        background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '1200px',
        maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
      }}>
        
        {/* Header */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', color: '#111827', fontWeight: 'bold' }}>전체 고객 대상 홍보(Promo) 메일 발송</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#6b7280' }}>
              Pending, Rejected 등을 포함한 모든 고유 이메일({uniqueEmails.length}명)에게 일괄 발송합니다.
            </p>
          </div>
          {!isSending && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#9ca3af' }}>&times;</button>
          )}
        </div>

        {/* Content Body */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
          {/* Left Panel: Editor */}
          <div style={{ flex: '1', padding: '32px', borderRight: '1px solid #e5e7eb', overflowY: 'auto' }}>
            
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
              <p style={{ margin: 0, color: '#1e40af', fontSize: '13px', lineHeight: '1.5' }}>
                💡 <b>EmailJS 템플릿 안내:</b> 정상적인 HTML 렌더링을 위해서는 EmailJS 대시보드(emailjs.com)에 로그인 후, 새 템플릿을 생성하고 <b>{"{{{message}}}"}</b> (중괄호 3개)로 본문을 설정해야 HTML 태그가 적용됩니다. 이후 <code style={{background: 'rgba(0,0,0,0.05)', padding: '2px 4px', borderRadius: '4px'}}>src/services/emailService.js</code>의 Promo 템플릿 ID를 교체해주세요.
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>메일 제목 (Subject)</label>
              <input 
                type="text" 
                value={subject} 
                onChange={e => setSubject(e.target.value)}
                placeholder="받는 사람의 메일함에 표시될 제목입니다."
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>본문 내 헤드라인 타이틀</label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>메일 본문 내용</label>
              <textarea 
                value={bodyText} 
                onChange={e => setBodyText(e.target.value)}
                rows={10}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>

            {/* Status & Actions */}
            {sendResult ? (
              <div style={{ padding: '24px', background: '#d1fae5', border: '1px solid #34d399', borderRadius: '12px', textAlign: 'center' }}>
                <h3 style={{ color: '#065f46', margin: '0 0 8px 0', fontSize: '18px' }}>✅ 메일 전송 완료</h3>
                <p style={{ margin: 0, color: '#047857' }}>성공: <b>{sendResult.success}</b>건 / 실패: <b>{sendResult.fail}</b>건</p>
                <div style={{ marginTop: '16px' }}>
                  <button onClick={onClose} style={{ padding: '8px 24px', background: '#059669', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>닫기</button>
                </div>
              </div>
            ) : isSending ? (
              <div style={{ padding: '24px', background: '#f3f4f6', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '15px', color: '#374151', fontWeight: 600, marginBottom: '12px' }}>
                  발송 진행 중... ({progress} / {uniqueEmails.length})
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(progress / uniqueEmails.length) * 100}%`, height: '100%', background: '#3b82f6', transition: 'width 0.3s ease' }}></div>
                </div>
                <p style={{ marginTop: '12px', fontSize: '12px', color: '#6b7280', margin: '12px 0 0 0' }}>창을 닫거나 새로고침하지 마세요.</p>
              </div>
            ) : (
              <button 
                onClick={startMassDelivery} 
                disabled={uniqueEmails.length === 0}
                style={{ 
                  width: '100%', padding: '16px', background: '#007A33', color: '#fff', border: 'none', 
                  borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: uniqueEmails.length > 0 ? 'pointer' : 'not-allowed',
                  opacity: uniqueEmails.length > 0 ? 1 : 0.5,
                  boxShadow: '0 4px 6px -1px rgba(0, 122, 51, 0.2)'
                }}
              >
                {uniqueEmails.length}명에게 일괄 발송 시작하기🚀
              </button>
            )}

          </div>

          {/* Right Panel: HTML Preview Live */}
          <div style={{ flex: '1', padding: '0', background: '#f3f4f6', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>💌 실시간 미리보기 (Desktop)</span>
            </div>
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
              {/* Inject the live HTML */}
              <div dangerouslySetInnerHTML={{ __html: htmlPreview }} style={{ border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
