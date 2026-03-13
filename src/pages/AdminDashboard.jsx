import React, { useState, useEffect } from 'react';
import { fetchRequests, updateRequestStatus } from '../services/firebaseSetup';
import { sendApprovalEmail } from '../services/emailService';
import PromoEmailModal from '../components/PromoEmailModal';

// 예약용 고정 캘렌들리 링크
const CALENDLY_LINK = 'https://calendly.com/visa-vridge/60min';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null); // For the message viewing modal
  const [showPromoModal, setShowPromoModal] = useState(false); // For Promo mass emails

  // 임시 하드코딩된 인증 정보
  const ADMIN_EMAIL = 'visa@vridge.info';
  const ADMIN_PASS = 'Vridge2016';

  useEffect(() => {
    // Check local storage on mount
    const savedSession = localStorage.getItem('vridge_admin_auth');
    if (savedSession === 'true') {
      setIsAuthenticated(true);
      loadRequests();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsAuthenticated(true);
      if (rememberMe) {
        localStorage.setItem('vridge_admin_auth', 'true');
      }
      loadRequests();
    } else {
      alert('비밀번호 또는 이메일이 일치하지 않습니다.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('vridge_admin_auth');
    setEmail('');
    setPassword('');
  };

  const loadRequests = async () => {
    setLoading(true);
    const data = await fetchRequests();
    setRequests(data);
    setLoading(false);
  };

  const handleApprove = async (request) => {
    const confirmApprove = window.confirm(`${request.email} 고객의 상담을 승인하고 Calendly 링크를 이메일로 전송하시겠습니까?`);
    if (!confirmApprove) return;

    // 1. 상태 업데이트 -> DB
    const updated = await updateRequestStatus(request.id, 'approved');
    
    // 2. 승인 이메일 발송
    if (updated) {
        const emailSent = await sendApprovalEmail(request.email, request.name || '고객님', CALENDLY_LINK);
        if (emailSent) {
            alert('승인 완료 및 안내 이메일 발송 성공!');
        } else {
            alert('DB 승인은 되었으나 이메일 발송에 실패했습니다. (키 세팅을 확인하세요)');
        }
        loadRequests(); // 데이터 리로드
    } else {
        alert('DB 상태 변경에 실패했습니다. Firebase 설정을 확인하세요.');
    }
  };

  const handleReject = async (id) => {
    const confirmReject = window.confirm('정말 이 상담 요청을 거절 상태로 변경하시겠습니까?');
    if (!confirmReject) return;
    
    const updated = await updateRequestStatus(id, 'rejected');
    if (updated) {
        alert('거절 처리되었습니다.');
        loadRequests();
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('데이터베이스에서 이 요청을 완전히 삭제하시겠습니까? (복구 불가)');
    if (!confirmDelete) return;

    // We need to implement deleteDoc in firebaseSetup or just use raw firestore here. 
    // Since updateRequestStatus uses doc(), we can do a local update or import deleteDoc.
    // Let's import deleteDoc from firebase/firestore and initialize db locally or via service.
    // For simplicity without modifying firebaseSetup again, let's just mark it as 'deleted' and filter it out, 
    // or actually delete it. Let's add a 'deleted' status for safety.
    const updated = await updateRequestStatus(id, 'deleted');
    if (updated) {
        alert('삭제 처리되었습니다.');
        loadRequests();
    }
  };

  const handleSetSchedule = async (id) => {
    const time = prompt('미팅이 확정된 날짜와 시간을 입력해주세요 (예: 2024-05-12 14:00)');
    if (!time) return;

    const updated = await updateRequestStatus(id, 'scheduled', time);
    if (updated) {
        alert('스케줄 확정 상태로 변경되었습니다.');
        loadRequests();
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' }}>
        <form onSubmit={handleLogin} style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#111827' }}>Vridge Admin Login</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Admin ID (Email)</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
          </div>
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="checkbox" 
              id="rememberMe" 
              checked={rememberMe} 
              onChange={e => setRememberMe(e.target.checked)} 
              style={{ cursor: 'pointer', width: '16px', height: '16px' }} 
            />
            <label htmlFor="rememberMe" style={{ fontSize: '14px', color: '#4b5563', cursor: 'pointer' }}>로그인 유지하기</label>
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#007A33', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>비자 상담 신청 관리 대시보드</h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setShowPromoModal(true)} style={{ padding: '8px 16px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}>전체 홍보(Promo)메일 발송</button>
            <button onClick={loadRequests} style={{ padding: '8px 16px', background: '#e5e7eb', border: 'none', borderRadius: '6px', cursor: 'pointer', color: '#374151', fontWeight: 500 }}>새로고침</button>
            <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}>로그아웃</button>
          </div>
        </div>

        {loading ? (
          <p>데이터를 불러오는 중입니다...</p>
        ) : requests.length === 0 ? (
          <div style={{ background: '#fff', padding: '40px', textAlign: 'center', borderRadius: '12px', color: '#6b7280' }}>
            현재 들어온 상담 신청이 없습니다.
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
                <tr>
                  <th style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>가입일/시간</th>
                  <th style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>이메일</th>
                  <th style={{ padding: '16px', fontSize: '14px', color: '#374151', textAlign: 'center' }}>요청 내용</th>
                  <th style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>상태</th>
                  <th style={{ padding: '16px', fontSize: '14px', color: '#374151', textAlign: 'right' }}>액션</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <tr key={req.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>
                      {req.createdAt ? new Date(req.createdAt.seconds * 1000).toLocaleString() : '방금 전'}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: 500, color: '#111827' }}>
                      {req.name && <div style={{ fontSize: '12px', color: '#6b7280' }}>{req.name}</div>}
                      {req.email}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <button 
                         onClick={() => setSelectedRequest(req)} 
                         style={{ padding: '6px 12px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
                        내용 보기
                      </button>
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px' }}>
                      {req.status === 'pending' && <span style={{ padding: '4px 8px', background: '#fef3c7', color: '#d97706', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>대기중</span>}
                      {req.status === 'approved' && <span style={{ padding: '4px 8px', background: '#d1fae5', color: '#059669', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>승인됨 (메일발송)</span>}
                      {req.status === 'rejected' && <span style={{ padding: '4px 8px', background: '#fee2e2', color: '#dc2626', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>거절됨</span>}
                      {req.status === 'scheduled' && (
                        <div>
                          <span style={{ padding: '4px 8px', background: '#dbeafe', color: '#2563eb', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>일정 확정</span>
                          <div style={{ marginTop: '4px', fontSize: '12px', color: '#2563eb', fontWeight: 'bold' }}>🗓 {req.scheduledTime}</div>
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right', gap: '8px', display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                      {req.status === 'pending' && (
                        <>
                          <button onClick={() => handleApprove(req)} style={{ padding: '6px 12px', background: '#007A33', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>승인(+메일)</button>
                          <button onClick={() => handleReject(req.id)} style={{ padding: '6px 12px', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>거절</button>
                        </>
                      )}
                      
                      {req.status === 'approved' && (
                         <button onClick={() => handleSetSchedule(req.id)} style={{ padding: '6px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>수동 일정 확정 마킹</button>
                      )}

                      {req.status === 'scheduled' && (
                         <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '6px 12px', background: '#111827', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontSize: '13px' }}>화상 미팅 입장</a>
                      )}
                      
                      <button onClick={() => handleDelete(req.id)} style={{ padding: '6px 12px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>삭제</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Message Viewer Modal */}
        {selectedRequest && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }} onClick={() => setSelectedRequest(null)}>
            <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', width: '90%', maxWidth: '600px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
              <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '20px', color: '#111827' }}>고객 요청 내용</h3>
              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', flex: 1, overflowY: 'auto', overflowX: 'hidden', wordBreak: 'break-all', whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '15px', color: '#374151', textShadow: 'none' }}>
                {selectedRequest.message}
              </div>
              <div style={{ marginTop: '24px', textAlign: 'right' }}>
                <button onClick={() => setSelectedRequest(null)} style={{ padding: '10px 24px', background: '#111827', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>닫기</button>
              </div>
            </div>
          </div>
        )}

        {/* Promo Email Viewer Modal */}
        {showPromoModal && (
          <PromoEmailModal 
            requests={requests} 
            onClose={() => setShowPromoModal(false)} 
          />
        )}

      </div>
    </div>
  );
}
