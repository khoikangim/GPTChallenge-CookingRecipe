function removeActiveClass() {
  const activeMenu = document.querySelector('.nav-title.active');
  if (activeMenu) {
      activeMenu.classList.remove('active');
  }
}

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
  
  }

function showTimeFood() {
removeActiveClass();

const navTitle = document.querySelector('.nav-title.timeFood');
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

}


document.addEventListener('DOMContentLoaded', () => {
  loadPage('myPlaylist');
});


var state = {};

function setActiveMenu(menu) {
    state.activeMenu = menu;  // 현재 활성화된 메뉴를 상태에 저장
}

function showMyPlaylist() {
    setActiveMenu('myPlaylist');
}

function showTimeFood() {
    setActiveMenu('timeFood');
}

function showBoard() {
    setActiveMenu('board');
}

// active 클래스 제거 함수
function removeActiveClass() {
  const activeMenu = document.querySelector('.nav-title.active');
  if (activeMenu) {
      activeMenu.classList.remove('active');
  }
}


//  active 클래스 추가
function setActiveMenu(menuClass) {
  removeActiveClass();
  document.querySelector(`.nav-title.${menuClass}`).classList.add('active');
}