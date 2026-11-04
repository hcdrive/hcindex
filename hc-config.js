/* 현창 운행도우미 · 서버 주소 설정 (비밀값 없음 · 공개 파일)
 *  api     : 비워 두면 지금 구글 서버(Apps Script)를 씀
 *            Firebase로 바꾸는 날 → "https://asia-northeast3-프로젝트ID.cloudfunctions.net/api"
 *            문제가 생기면 다시 비우기만 하면 바로 구글 서버로 돌아감
 *  fb      : Firebase 웹 앱 설정 (실시간 반영용) — Firebase 화면에서 복사한 firebaseConfig 를 그대로 넣음
 *  testApi / testFb : 바꾸기 전 시험용. 주소 뒤에 ?fbtest=1 을 붙여 한 번 열면 '그 폰(PC)만' Firebase 로 붙음 (?fbtest=0 이면 원래대로)
 *                     기사님들은 그대로 구글 서버를 씀
 */
window.HC_CFG = {
  api: "https://asia-northeast3-hcindex-7d2f1.cloudfunctions.net/api",
  fb: {
    apiKey: "AIzaSyBce5UMPIc2u2_mYtLH8DytgsHhkYnz46I",
    authDomain: "hcindex-7d2f1.firebaseapp.com",
    projectId: "hcindex-7d2f1",
    storageBucket: "hcindex-7d2f1.firebasestorage.app",
    messagingSenderId: "333779771082",
    appId: "1:333779771082:web:aaac0d81ed43bb5e155e33"
  },
  testApi: "https://asia-northeast3-hcindex-7d2f1.cloudfunctions.net/api",
  testFb: {
    apiKey: "AIzaSyBce5UMPIc2u2_mYtLH8DytgsHhkYnz46I",
    authDomain: "hcindex-7d2f1.firebaseapp.com",
    projectId: "hcindex-7d2f1",
    storageBucket: "hcindex-7d2f1.firebasestorage.app",
    messagingSenderId: "333779771082",
    appId: "1:333779771082:web:aaac0d81ed43bb5e155e33"
  }
};
(function () {
  try {
    var q = location.search;
    if (/[?&]fbtest=1/.test(q)) localStorage.setItem("hcFbTest", "1");
    if (/[?&]fbtest=0/.test(q)) localStorage.removeItem("hcFbTest");
    if (!HC_CFG.api && HC_CFG.testApi && localStorage.getItem("hcFbTest") === "1") {
      HC_CFG.api = HC_CFG.testApi; HC_CFG.fb = HC_CFG.testFb; HC_CFG.test = true;
      document.addEventListener("DOMContentLoaded", function () { if (window.parent !== window) return; var d = document.createElement("div");
        d.textContent = "Firebase 시험 중"; d.style.cssText = "position:fixed;left:8px;bottom:calc(76px + env(safe-area-inset-bottom));z-index:99999;background:#e8590c;color:#fff;font:700 12px/1 sans-serif;padding:6px 8px;border-radius:8px;pointer-events:none;opacity:.9";
        document.body.appendChild(d); });
    }
  } catch (e) {}
})();
