// board.js

function showBoard() {
  fetch('pages/board.html') // 수정된 경로
      .then(response => response.text())
      .then(html => {
          const mainContent = document.getElementById('mainContent');
          mainContent.innerHTML = html;
          // 여기에 상황별 플레이리스트를 렌더링하는 로직을 추가할 수 있음
      });

  setActiveMenu('board');
}
