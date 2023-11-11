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
            toggleButton(button);
        });
    });

    genreButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            toggleButton(button);
        });
    });

    // 탐색 버튼 클릭에 대한 이벤트 리스너 등록
    exploreButton.addEventListener("click", function () {
        displaySongInfo();
    });
}

function toggleButton(button) {
    // 이미 선택된 버튼인 경우 선택 취소
    if (button.classList.contains("selected")) {
        button.classList.remove("selected");
    } else {
        // 다른 버튼들의 선택 상태 해제
        var buttons = button.parentElement.getElementsByClassName("filter-button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("selected");
        }

        // 선택한 버튼 표시
        button.classList.add("selected");
    }
}

function displaySongInfo() {
    var videoIframe = document.getElementById("videoIframe");
    var songInfoDiv = document.getElementById("songInfo");

    // 이전에 표시된 정보 초기화
    videoIframe.src = "";
    songInfoDiv.innerHTML = "";

    // 선택한 연도와 장르에 대한 처리 추가
    var selectedYear = getSelectedButtonValue(document.querySelectorAll("#filter-year .filter-button"));
    var selectedGenre = getSelectedButtonValue(document.querySelectorAll("#filter-genre .filter-button"));

    // 연도와 장르에 따라 노래 정보를 표시하는 로직 추가
    if (selectedYear && selectedGenre) {
        var videoUrl = getVideoUrl(selectedYear, selectedGenre);

        if (videoUrl) {
            videoIframe.src = videoUrl;
            songInfoDiv.innerHTML = `<p>선택한 연도: ${selectedYear}</p><p>선택한 장르: ${selectedGenre}</p><p>노래 정보</p>`;
        } else {
            alert("선택한 연도와 장르에 맞는 영상이 없습니다.");
        }
    } else {
        alert("연도와 장르를 선택하세요.");
    }
}

// 연도와 장르에 따른 영상 URL을 반환하는 함수
function getVideoUrl(year, genre) {
    // 여기에 선택한 연도와 장르에 맞는 여러 영상 정보를 객체로 반환
    // 예시:
    var videoUrls = {
        '2017-케이팝': 'https://www.youtube.com/embed/V_Eax11EJ3M?si=P5BbCrjIR4BnYxXT&amp;controls=0',
        '2018-케이팝': 'https://www.youtube.com/embed/NBU5QHUTejk?si=OYQ_or4oJYS7pQt7&amp;controls=0',
        '2019-케이팝': 'https://www.youtube.com/embed/NYgZ_lbIpDo?si=hPLYJLQtr7iwKflI&amp;controls=0',
        '2020-케이팝': 'https://www.youtube.com/embed/cldRnF-EE1k?si=3fCdH2IzqVXx8WhP&amp;controls=0',
        '2021-케이팝': 'https://www.youtube.com/embed/_wYw0HDxaQ4?si=2EGdzNNqWEez5UBj&amp;controls=0',
        '2022-케이팝': 'https://www.youtube.com/embed/5WcVp77H0J4?si=E71JWIdmLnmDCoBZ&amp;controls=0',
        '2023-케이팝': '',
    };

    return videoUrls[year + '-' + genre] || null;
}

// 나머지 함수들은 이전과 동일하게 유지됩니다.
function getSelectedButtonValue(buttons) {
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains("selected")) {
            return buttons[i].textContent;
        }
    }
    return null;
}
