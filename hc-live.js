/* 실시간 반영: Firebase 의 live/ver(탭별 바뀐 번호)를 지켜보다가 바뀌면 화면에 알려 줌
 *  화면은 hcLive(function (바뀐탭목록) { ... }) 로 받아서 필요한 것만 서버에 다시 요청
 *  화면이 꺼져 있거나 다른 앱을 보는 동안은 지켜보지 않음 (사용량 절약 · 돌아오면 각 화면이 원래대로 새로 불러옴)
 */
(function () {
  var C = window.HC_CFG || {}, unsub = null, last = null, timer = null, pending = {}, subs = [], starting = false, SDK = "10.14.1";
  window.hcLive = function (cb) { subs.push(cb); start(); };
  window.hcLiveOn = function () { return !!(C.fb && C.api); };
  function fire() { var ch = Object.keys(pending); pending = {}; if (!ch.length) return; subs.forEach(function (f) { try { f(ch); } catch (e) {} }); }
  async function start() {
    if (!C.fb || !C.api || unsub || starting || document.hidden || !subs.length) return;
    starting = true;
    try {
      var app = await import("https://www.gstatic.com/firebasejs/" + SDK + "/firebase-app.js");
      var fs = await import("https://www.gstatic.com/firebasejs/" + SDK + "/firebase-firestore.js");
      var a = app.getApps().length ? app.getApp() : app.initializeApp(C.fb), db = fs.getFirestore(a);
      if (document.hidden) return;
      unsub = fs.onSnapshot(fs.doc(db, "live", "ver"), function (s) {
        var tabs = (s.data() || {}).tabs || {};
        if (last) { Object.keys(tabs).forEach(function (k) { if (tabs[k] !== last[k]) pending[k] = 1; }); if (Object.keys(pending).length) { clearTimeout(timer); timer = setTimeout(fire, 1200); } }
        last = tabs;
      }, function () { unsub = null; });
    } catch (e) {} finally { starting = false; }
  }
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { if (unsub) { try { unsub(); } catch (e) {} unsub = null; } last = null; }   // 돌아오면 처음 받은 값은 기준으로만 (돌아올 때 새로 불러오기는 각 화면이 함)
    else start();
  });
})();
