// board.js

function showBoard() {
  fetch('pages/board.html')
      .then(response => response.text())
      .then(html => {
          const mainContent = document.getElementById('mainContent');
          mainContent.innerHTML = html;

          displayStoredPosts();
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
          newPost.innerHTML += '<button onclick="deletePost(this)">삭제</button>';
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

      // 새로운 게시글을 생성하여 postList에 추가
      var newPost = document.createElement("div");
      newPost.className = "post";

      // 엔터를 <br>로 변환하여 출력
      var formattedContent = postContent.replace(/\n/g, '<br>');
      
      newPost.innerHTML = `<h3 class="return-foodName">${genre} - ${foodName}</h3><p>${author}</p><p>${formattedContent}</p>`;
    newPost.innerHTML += `<button class="delete-post-button" onclick="deletePost(this)">레시피 삭제</button>`;

      postList.appendChild(newPost);

      // 로컬 스토리지에 게시글 저장
      var storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
      storedPosts.push(newPost.innerHTML);
      localStorage.setItem('posts', JSON.stringify(storedPosts));

      // 폼을 초기화
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
}

function clearBoard() {
  // 로컬 스토리지에서 저장된 게시글 초기화
  localStorage.removeItem('posts');


  showBoard();
}
