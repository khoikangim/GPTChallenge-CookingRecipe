// active 클래스 제거 함수
function removeActiveClass() {
  const activeMenu = document.querySelector('.nav-title.active');
  if (activeMenu) {
      activeMenu.classList.remove('active');
  }
}

// 현재 페이지 메뉴에 active 클래스 추가
function setActiveMenu(menuClass) {
  removeActiveClass();
  document.querySelector(`.nav-title.${menuClass}`).classList.add('active');
}


// 나에게 맞는 플레이리스트 페이지 표시 함수
function showMyPlaylist() {
  removeActiveClass();
  
  const navTitle = document.querySelector('.nav-title.showMyPlaylist');
  navTitle.classList.add('active');
  
  const mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = '';
  
  const playlistTitle = document.createElement('h2');
  playlistTitle.id = 'playlistTitle';
  playlistTitle.textContent = '상황에 맞게 추천';
  mainContent.appendChild(playlistTitle);
  
  const playlist = document.createElement('div');
  playlist.classList.add('playlist');
  playlist.id = 'playlist';
  mainContent.appendChild(playlist);
  
  // 여기에 상황별 플레이리스트를 렌더링하는 로직을 추가할 수 있음
  }


// 상황별 플레이리스트 페이지 표시 함수
function showScenarioPlaylist() {
removeActiveClass();

const navTitle = document.querySelector('.nav-title.scenarioPlaylist');
navTitle.classList.add('active');

const mainContent = document.getElementById('mainContent');
mainContent.innerHTML = '';

const playlistTitle = document.createElement('h2');
playlistTitle.id = 'playlistTitle';
playlistTitle.textContent = '상황에 맞게 추천';
mainContent.appendChild(playlistTitle);

const playlist = document.createElement('div');
playlist.classList.add('playlist');
playlist.id = 'playlist';
mainContent.appendChild(playlist);
}

// 게시판 페이지 표시 함수
function showBoard() {
removeActiveClass();

const navTitle = document.querySelector('.nav-title.board');
navTitle.classList.add('active');

const mainContent = document.getElementById('mainContent');
mainContent.innerHTML = '';

const boardTitle = document.createElement('h2');
boardTitle.textContent = '게시판';
mainContent.appendChild(boardTitle);

const boardContent = document.createElement('p');
boardContent.textContent = '게시판 컨텐츠가 나타날 예정입니다.';
mainContent.appendChild(boardContent);

// 여기에 게시판을 렌더링하는 로직을 추가할 수 있음
}

// 초기 페이지 로드 시 첫 번째 페이지를 로드
document.addEventListener('DOMContentLoaded', () => {
  loadPage('myPlaylist');
});

