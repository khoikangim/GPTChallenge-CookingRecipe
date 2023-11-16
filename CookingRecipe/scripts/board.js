function showBoard() {
  fetch('pages/board.html')
      .then(response => response.text())
      .then(html => {
          const mainContent = document.getElementById('mainContent');
          mainContent.innerHTML = html;

          displayStoredPosts();
          displayStoredComments();
      });

  setActiveMenu('board');
}

function displayStoredPosts() {
  var storedPosts = JSON.parse(localStorage.getItem('posts')) || [];

  if (storedPosts.length > 0) {
      var postList = document.getElementById("post-list");

      storedPosts.forEach(postContent => {
          var newPost = document.createElement("div");
          newPost.className = "post";
          newPost.innerHTML = postContent;
          postList.appendChild(newPost);
      });
  }
}

function addPost() {
  var genre = document.getElementById("country").value;
  var foodName = document.getElementById("food-name").value;
  var author = document.getElementById("author").value;
  var postContent = document.getElementById("recipe-content").value;

  if (genre && foodName && author && postContent) {
      var postList = document.getElementById("post-list");
      var newPost = document.createElement("div");
      newPost.className = "post";

      var formattedContent = postContent.replace(/\n/g, '<br>');
      
      newPost.innerHTML = `<h3 class="return-foodName">${genre} - ${foodName}</h3><p>${author}</p><p>${formattedContent}</p>`;
      newPost.innerHTML += `<button class="delete-post-button" onclick="deletePost(this)">레시피 삭제</button>`;

      postList.appendChild(newPost);

      var storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
      storedPosts.push(newPost.innerHTML);
      localStorage.setItem('posts', JSON.stringify(storedPosts));

      document.getElementById("country").value = "";
      document.getElementById("food-name").value = "";
      document.getElementById("author").value = "";
      document.getElementById("recipe-content").value = "";
  } else {
      alert("모든 필드를 작성하세요.");
  }
}

function deletePost(button) {
  var postDiv = button.parentElement;
  postDiv.remove();

  // 로컬 스토리지에서 해당 게시글 삭제
  var storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
  var postIndex = Array.from(postDiv.parentNode.children).indexOf(postDiv);
  
  if (postIndex !== -1) {
      storedPosts.splice(postIndex, 1);
      localStorage.setItem('posts', JSON.stringify(storedPosts));
  }
}

function clearBoard() {
  localStorage.removeItem('posts');

  showBoard();
}

// 댓글 작성 함수
function addComment() {
  var commentContent = document.getElementById("comment-content").value;

  if (commentContent) {
      var commentList = document.getElementById("comment-list");

      var newComment = document.createElement("div");
      newComment.className = "comment";
      newComment.innerHTML = `<p>${commentContent}</p>`;
      newComment.innerHTML += `<button class="delete-comment-button" onclick="deleteComment(this)">댓글 삭제</button>`;

      commentList.appendChild(newComment);

      // 댓글을 로컬 스토리지에 저장
      var storedComments = JSON.parse(localStorage.getItem('comments')) || [];
      storedComments.push(newComment.innerHTML);
      localStorage.setItem('comments', JSON.stringify(storedComments));

      // 댓글 입력란 초기화
      document.getElementById("comment-content").value = "";
  } else {
      alert("댓글을 작성하세요.");
  }
}

function deleteComment(button) {
  var commentDiv = button.parentElement;
  commentDiv.remove();

  // 로컬 스토리지에서 해당 댓글 삭제
  var storedComments = JSON.parse(localStorage.getItem('comments')) || [];
  var commentIndex = Array.from(commentDiv.parentNode.children).indexOf(commentDiv);
  
  if (commentIndex !== -1) {
      storedComments.splice(commentIndex, 1);
      localStorage.setItem('comments', JSON.stringify(storedComments));
  }
}

function clearCurrentPosts() {
  var postList = document.getElementById("post-list");
  postList.innerHTML = ""; // 현재 표시되는 게시글 목록 비우기
  localStorage.setItem('posts', JSON.stringify([])); // 로컬 스토리지에 빈 배열로 저장
}
