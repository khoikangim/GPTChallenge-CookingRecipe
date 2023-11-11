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

function addPost() {
  var postContent = document.getElementById('post-content').value;
  
  if (postContent.trim() !== '') {
      var postList = document.getElementById('post-list');

      var postDiv = document.createElement('div');
      postDiv.className = 'post';
      postDiv.innerHTML = '<p>' + postContent + '</p><button onclick="deletePost(this)">삭제</button>';
      postDiv.innerHTML += '<div class="comments"><textarea class="comment-content" placeholder="댓글을 입력하세요"></textarea>';
      postDiv.innerHTML += '<button onclick="addComment(this)">댓글 작성</button></div>';

      postList.appendChild(postDiv);

      // 게시글 추가 후 입력창 초기화
      document.getElementById('post-content').value = '';
  } else {
      alert('노래 정보를 입력하세요.');
  }
}

function deletePost(button) {
  var postDiv = button.parentElement;
  postDiv.remove();
}

function addComment(button) {
  var commentContent = button.parentElement.querySelector('.comment-content').value;
  
  if (commentContent.trim() !== '') {
      var commentsDiv = button.parentElement.parentElement.querySelector('.comments');
      var commentDiv = document.createElement('div');
      commentDiv.innerHTML = '<p>' + commentContent + '</p><button onclick="deleteComment(this)">삭제</button>';
      commentsDiv.appendChild(commentDiv);

      // 댓글 추가 후 입력창 초기화
      button.parentElement.querySelector('.comment-content').value = '';
  } else {
      alert('댓글을 입력하세요.');
  }
}

function deleteComment(button) {
  var commentDiv = button.parentElement;
  commentDiv.remove();
}

// 이전에 사용하던 함수들과 함께
function addPost() {
  var genre = document.getElementById("genre").value;
  var songTitle = document.getElementById("song-title").value;
  var artist = document.getElementById("artist").value;
  var postContent = document.getElementById("post-content").value;

  if (genre && songTitle && artist && postContent) {
      var postList = document.getElementById("post-list");

      // 새로운 게시글을 생성하여 postList에 추가
      var newPost = document.createElement("div");
      newPost.className = "post";
      newPost.innerHTML = `<h3>${genre} - ${songTitle}</h3><p>${artist}</p><p>${postContent}</p>`;
      postList.appendChild(newPost);

      // 폼을 초기화
      document.getElementById("genre").value = "";
      document.getElementById("song-title").value = "";
      document.getElementById("artist").value = "";
      document.getElementById("post-content").value = "";
  } else {
      alert("모든 필드를 작성하세요.");
  }
}
