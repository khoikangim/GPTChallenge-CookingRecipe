// myPlaylist.js

function loadMyPlaylist() {
  fetch('pages/myPlaylist.html') // 수정된 경로
      .then(response => response.text())
      .then(html => {
          const mainContent = document.getElementById('mainContent');
          mainContent.innerHTML = html;
          initMyPlaylist(); // 함수명 수정
      });
}


// 페이지 로드 시 초기화 함수 호출
document.addEventListener('DOMContentLoaded', loadMyPlaylist);
