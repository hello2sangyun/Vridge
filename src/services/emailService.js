// ⚠️ [ACTION REQUIRED] ⚠️
// 이 파일은 EmailJS 연동을 위한 설정 파일입니다.
// EmailJS 가입 (emailjs.com) 후 대시보드에서 발급받은 키와 템플릿 ID를 넣어주세요.

import emailjs from '@emailjs/browser';

const emailConfig = {
  serviceId: "service_h93hn8t",
  templateId: "template_3t72evq",
  publicKey: "XWYML9NVzpYPFTERZ"
};

// Admin 페이지에서 '승인(Approve)' 버튼 클릭시 고객에게 안내메일 발송
export const sendApprovalEmail = async (userEmail, userName, calendlyLink) => {
  try {
    const templateParams = {
      to_email: userEmail,
      to_name: userName || 'Customer', // 이름 정보가 없을시 기본값
      calendly_link: calendlyLink,
      message: 'Vridge 비자 상담 신청이 승인되었습니다! 아래 링크를 통해 스케줄을 예약해 주세요.'
    };

    const response = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      templateParams,
      emailConfig.publicKey
    );

    console.log('SUCCESS Email sent!', response.status, response.text);
    return true;
  } catch (error) {
    console.error('FAILED to send email...', error);
    return false;
  }
};

// Admin 페이지에서 단체 홍보(Promo) 메일 발송
export const sendPromoEmail = async (toEmail, subject, htmlContent) => {
  try {
    const templateParams = {
      to_email: toEmail,
      subject: subject,
      message: htmlContent // EmailJS 템플릿에 본문 변수가 {{{message}}}로 되어있어야 HTML이 렌더링 됩니다.
    };

    const response = await emailjs.send(
      emailConfig.serviceId,
      "YOUR_PROMO_TEMPLATE_ID_HERE", // ⚠️ EmailJS에서 새로운 템플릿 생성 후 여기에 ID를 입력하세요.
      templateParams,
      emailConfig.publicKey
    );

    return true;
  } catch (error) {
    console.error('PROMO Email send fail:', error);
    return false;
  }
};
