function showBoard() {
  const mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = ''; // 기존 내용 초기화

  // 게시판에 대한 내용 표시
  mainContent.innerHTML = '<h2 id="boardTitle">여기는 게시판입니다.</h2><p>게시판 컨텐츠가 나타날 예정입니다.</p>';
  // 게시판에 대한 추가적인 내용 표시
  // ...

  // 현재 메뉴에 active 클래스 추가
  setActiveMenu('board');
}