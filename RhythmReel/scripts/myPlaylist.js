// myPlaylist.js

function showMyPlaylist() {
    fetch('pages/myPlaylist.html')
        .then(response => response.text())
        .then(html => {
            const mainContent = document.getElementById('mainContent');
            mainContent.innerHTML = html;
            initializeMyPlaylist();
        });  
    setActiveMenu('myPlaylist');
}

function initializeMyPlaylist() {
    var yearButtons = document.querySelectorAll("#filter-year .filter-button");
    var genreButtons = document.querySelectorAll("#filter-genre .filter-button");
    var exploreButton = document.querySelector(".filter-result-button");

    yearButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            button.classList.add("selected");
        });
    });

    genreButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            button.classList.add("selected");
        });
    });

    // 탐색 버튼 클릭에 대한 이벤트 리스너 등록
    exploreButton.addEventListener("click", function () {
        displaySongInfo();
    });
}

function displaySongInfo() {
    var videoIframe = document.getElementById("videoIframe");
    var songInfoDiv = document.getElementById("songInfo");

    // 선택한 연도와 장르에 대한 처리 추가
    var selectedYear = getSelectedButtonValue(document.querySelectorAll("#filter-year .filter-button"));
    var selectedGenre = getSelectedButtonValue(document.querySelectorAll("#filter-genre .filter-button"));

    // 연도와 장르에 따라 노래 정보를 표시하는 로직 추가
    if (selectedYear && selectedGenre) {
        switch (selectedYear) {
            case "2017":
                switch (selectedGenre) {
                    case "케이팝":
                        videoIframe.src = "https://www.youtube.com/embed/ygxNb3y72es?si=dToIxGrmipQPPTEo";
                        songInfoDiv.innerHTML = `<p>선택한 연도: ${selectedYear}</p><p>선택한 장르: ${selectedGenre}</p><p>케이팝 노래 정보</p>`;
                        break;
                    // 다른 장르에 대한 처리도 추가 가능
                }
                break;
            // 다른 연도에 대한 처리도 추가 가능
        }
    } else {
        alert("연도와 장르를 선택하세요.");
    }
}

// 다른 함수들은 이전과 동일하게 유지됩니다.
function resetButtonStyles(buttons) {
    buttons.forEach(function (button) {
        button.classList.remove("selected");
    });
}

function getSelectedButtonValue(buttons) {
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains("selected")) {
            return buttons[i].textContent;
        }
    }
    return null;
}
