// timeFood.js

function showTimeFood() {
  fetch('pages/timeFood.html')
      .then(response => response.text())
      .then(html => {
          const mainContent = document.getElementById('mainContent');
          mainContent.innerHTML = html;
          initializeTimeFood();
      });

  setActiveMenu('timeFood');
}

function toggleTimeCategoryButton(button) {
  var buttons = button.parentElement.getElementsByClassName("filter-button");
  for (var i = 0; i < buttons.length; i++) {
    // 다른 버튼들의 선택 상태 해제
    buttons[i].classList.remove("selected");
  }
  button.classList.add("selected"); // 선택한 버튼 표시
}

function toggleTimeSubcategoryButton(button) {
  var buttons = button.parentElement.getElementsByClassName("filter-button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("selected");
  }
  button.classList.add("selected"); // 선택한 버튼 표시
}

function initializeTimeFood() {
  var categoryButtons = document.querySelectorAll("#timeFilter-category .filter-button");
  var subcategoryButtons = document.querySelectorAll("#timeFilter-subcategory .filter-button");
  var exploreButton = document.querySelector(".filter-result-button");

  if (categoryButtons.length > 0) {
      categoryButtons.forEach(function (button) {
          button.addEventListener("click", function () {
              toggleTimeCategoryButton(button);
              showTimeSubcategories(button.textContent);
          });
      });
  }

  if (subcategoryButtons.length > 0) {
      subcategoryButtons.forEach(function (button) {
          button.addEventListener("click", function () {
              toggleTimeSubcategoryButton(button);
              displayTimeFoodInfo(getTimeSelectedButtonValue(categoryButtons), button.textContent);
          });
      });
  }

  if (exploreButton) {
      exploreButton.addEventListener("click", function () {
          displayTimeFoodInfo(getTimeSelectedButtonValue(categoryButtons), getTimeSelectedButtonValue(subcategoryButtons));
      });
  }
}

function showTimeSubcategories(time) {
  var subcategoryContainer = document.getElementById('timeFilter-subcategory');
  subcategoryContainer.innerHTML = "";

  var subcategories = getTimeSubcategoriesForTime(time);

  subcategories.forEach(function (subcategory) {
      var button = document.createElement('button');
      button.classList.add('filter-button');
      button.textContent = subcategory;
      button.onclick = function () {
          toggleTimeSubcategoryButton(button);
          displayTimeFoodInfo(time, subcategory);
      };
      subcategoryContainer.appendChild(button);
  });
}

function getTimeSubcategoriesForTime(time) {
  if (time === '아침') {
      return ['프렌치 토스트', '감자 브런치', '에그 샌드위치'];
  } else if (time === '점심') {
      return ['오므라이스', '비빔밥', '김밥'];
  } else if (time === '저녁') {
      return ['닭볶음탕', '소고기 불고기', '된장찌개'];
  } else if (time === '간식') {
      return ['떡볶이', '라면땅', '허니버터브레드'];
  } else {
      return []; // 기타 시간대에 대한 서브 카테고리가 없을 경우 빈 배열 반환
  }
}

function displayTimeFoodInfo(time, subcategory) {
  var videoIframe = document.getElementById("videoIframe");
  var songInfoDiv = document.getElementById("songInfo");

  // 이전에 표시된 정보 초기화
  videoIframe.src = "";
  songInfoDiv.innerHTML = "";

  // 선택한 시간대와 음식에 대한 처리 추가
  if (time && subcategory) {
      var identifier = time + '-' + subcategory;
      var videoUrl = getTimeVideoUrl(identifier);

      if (videoUrl) {
          videoIframe.src = videoUrl;
          songInfoDiv.innerHTML = `<p>선택한 시간대: ${time}</p><p>선택한 음식: ${subcategory}</p><p>음식 정보</p>`;
      } else {
          alert("선택한 시간대와 음식에 맞는 영상이 없습니다.");
      }
  } else {
      alert("시간대와 음식을 선택하세요.");
  }
}

function getTimeVideoUrl(identifier) {
  var videoUrls = {
      '아침-프렌치 토스트': 'https://www.youtube.com/embed/-dBPLgpC-tk?si=YyefbsIjxeq1CyJN',
      '아침-감자 브런치': 'https://www.youtube.com/embed/K9XBQSQtti0?si=LjQ59TIwooWH3Bf_',
      '아침-에그 샌드위치': 'https://www.youtube.com/embed/YXMxnHx7yZQ?si=VmaaIp9fwen_LKzI',
      
      '간식-떡볶이': 'https://www.youtube.com/embed/t4Es8mwdYlE?si=t6fZJImjbZ5llt2u',
      '간식-라면땅': 'https://www.youtube.com/embed/CVtdTM6gJTY?si=aUrazOZe5iCpWIPG',
      '간식-허니버터브레드': 'https://www.youtube.com/embed/UArNVpF7PIY?si=8v2LkbhhXCV2HbGV',
  };

  return videoUrls[identifier] || null;
}
