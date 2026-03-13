// ⚠️ [ACTION REQUIRED] ⚠️
// 이 파일은 Firebase 연동을 위한 설정 파일입니다.
// Firebase Console (console.firebase.google.com) 에서 새 프로젝트(웹)를 생성한 후,
// 발급받은 아래의 설정값들로 교체해 주셔야 실제 데이터베이스 연결이 정상 작동합니다.

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCi4UbS9r-1yLXu8r7FM7LHAGLMOKszTRM",
  authDomain: "vridge-78098.firebaseapp.com",
  projectId: "vridge-78098",
  storageBucket: "vridge-78098.firebasestorage.app",
  messagingSenderId: "1030661882951",
  appId: "1:1030661882951:web:61842d5fe3c267ba0cdd62",
  measurementId: "G-7DXC5BHWHX"
};

// 1. Firebase 앱 초기화
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase config is missing or invalid. Please update src/services/firebaseSetup.js");
}

// 2. 상담 신청 저장 함수 (Consultation.jsx 에서 호출)
export const saveConsultationRequest = async (requestData) => {
  if (!db) {
    console.error("Firebase db is not initialized.");
    return null;
  }
  
  try {
    console.log("Attempting to save to Firebase...", requestData);
    const docRef = await addDoc(collection(db, "consultations"), {
      ...requestData,
      status: "pending", // pending, approved, rejected, scheduled
      createdAt: serverTimestamp()
    });
    console.log("Successfully saved with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document to consultations collection: ", e.message, e);
    throw e;
  }
};

// 3. Admin 대시보드 데이터 불러오기 함수
export const fetchRequests = async () => {
  if (!db) return [];
  
  try {
    const querySnapshot = await getDocs(collection(db, "consultations"));
    const requests = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.status !== 'deleted') {
        requests.push({ id: doc.id, ...data });
      }
    });
    // 최신순 정렬 (createdAt이 없는 클라이언트 캐시 처리)
    return requests.sort((a, b) => {
      if (!a.createdAt) return -1;
      if (!b.createdAt) return 1;
      return b.createdAt.seconds - a.createdAt.seconds;
    });
  } catch (e) {
    console.error("Error fetching documents: ", e);
    return [];
  }
};

// 4. 상태 변경(승인/거절) 커밋 함수
export const updateRequestStatus = async (docId, newStatus, meetingTime = null) => {
  if (!db) return false;
  
  try {
    const requestRef = doc(db, "consultations", docId);
    let updatePayload = { status: newStatus };
    if (meetingTime) {
      updatePayload.scheduledTime = meetingTime;
    }
    await updateDoc(requestRef, updatePayload);
    return true;
  } catch (e) {
    console.error("Error updating document: ", e);
    return false;
  }
};
