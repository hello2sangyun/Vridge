// ⚠️ 보안 경고 ⚠️
// 프론트엔드 앱 내에 텔레그램 봇 토큰을 포함하는 것은 보안상 완벽하지 않습니다.
// 누군가 악의적으로 봇을 조작할 가능성이 있기 때문입니다.
// 완벽한 보안을 원하신다면 Firebase Cloud Functions 와 같은 백엔드에서 전송해야 하지만, 
// 현재 MVP 단계에서는 빠르게 연동하기 위해 이 파일을 사용합니다.

// .env 파일에 아래 변수들을 설정하거나, 아래 따옴표 안에 직접 입력하셔도 작동합니다.
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const escapeHtml = (unsafe) => {
  if (unsafe === null || unsafe === undefined) return "";
  return unsafe.toString()
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
};

export const sendTelegramNotification = async (requestData, type = 'consultation') => {
  // 토큰이나 ID가 없으면 실행하지 않음
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID || TELEGRAM_BOT_TOKEN === "여기에_봇_토큰을_입력하세요") {
    console.warn("Telegram Bot Token 및 Chat ID가 설정되지 않아 알림이 전송되지 않습니다.");
    return false;
  }

  let text = "";

  if (type === 'screening') {
    text = `
🚨 <b>새로운 사전 심사(Pre-Screening) 신청 접수!</b> 🚨

👤 <b>이름:</b> ${escapeHtml(requestData.name)}
📧 <b>이메일:</b> ${escapeHtml(requestData.email)}
📞 <b>WhatsApp:</b> ${escapeHtml(requestData.whatsapp)}
🌍 <b>국적/현재거주지:</b> ${escapeHtml(requestData.nationality)}
🎯 <b>목적:</b> ${escapeHtml(requestData.purpose)}
🛠 <b>보유 기술:</b> ${escapeHtml(requestData.skills)}
🛂 <b>여권 만료일:</b> ${escapeHtml(requestData.passportExpiry)}
    `;
  } else {
    // 기본상담
    text = `
🚨 <b>새로운 상담 신청이 접수되었습니다!</b> 🚨

👤 <b>이름:</b> ${escapeHtml(requestData.name)}
📧 <b>이메일:</b> ${escapeHtml(requestData.email)}
🌐 <b>언어:</b> ${escapeHtml(requestData.lang)}

📝 <b>문의 내용:</b>
${escapeHtml(requestData.message)}
    `;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      console.error("텔레그램 알림 전송 실패:", await response.text());
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("텔레그램 알림 전송 중 에러 발생:", error);
    return false;
  }
};
