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
      return ['오므라이스', '비빔국수', '김밥'];
  } else if (time === '저녁') {
      return ['닭볶음탕', '부대찌개', '삼계탕'];
  } else if (time === '간식') {
      return ['떡볶이', '라면땅', '허니버터브레드'];
  } else {
      return []; //서브 카테고리가 없을 경우 빈 배열 반환
  }
}

function displayTimeFoodInfo(time, subcategory) {
    var videoIframe = document.getElementById("videoIframe");
    var songInfoDiv = document.getElementById("songInfo");
  
    videoIframe.src = "";
    songInfoDiv.innerHTML = "";
  
    // 선택한 시간대와 음식에 대한 처리 추가
    if (time && subcategory) {
        var identifier = time + '-' + subcategory;
        var videoUrl = getTimeVideoUrl(identifier);
        var ingredients = getTimeIngredients(identifier);  // 수정된 부분
  
        if (videoUrl && ingredients) {
            videoIframe.src = videoUrl;
            songInfoDiv.innerHTML = 
              `<div class='food-result'>
                  <p class='subcategory-recipe'>${subcategory} 레시피</p>
                  <p class='food-materials'>준비 재료 <br/><br/>${ingredients.join('<br>')}</p>
              </div>`;
        } else {
            alert("선택한 시간대와 음식에 맞는 영상이 없거나 재료 정보가 없습니다.");
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
  
        '점심-오므라이스': 'https://www.youtube.com/embed/AlK2Gl6kHZI?si=SM0h7GveMEOqtxtg',
        '점심-비빔국수': 'https://www.youtube.com/embed/iWWQBoS3SL4?si=577VCiDddtJmSZ24',
        '점심-김밥': 'https://www.youtube.com/embed/10fl2mebYHs?si=dhiBkAs9Y1k4eZjk',
  
        '저녁-닭볶음탕': 'https://www.youtube.com/embed/-EwR5eshbPE?si=fZlebjHNFdBh9iUr',
        '저녁-부대찌개': 'https://www.youtube.com/embed/-MvfUUPB5-Y?si=Z-qPPK3T95JqLqa8',
        '저녁-삼계탕': 'https://www.youtube.com/embed/7Ez066LV76U?si=svHX2NCWVEXyzQCr',
        
        '간식-떡볶이': 'https://www.youtube.com/embed/t4Es8mwdYlE?si=t6fZJImjbZ5llt2u',
        '간식-라면땅': 'https://www.youtube.com/embed/CVtdTM6gJTY?si=aUrazOZe5iCpWIPG',
        '간식-허니버터브레드': 'https://www.youtube.com/embed/UArNVpF7PIY?si=8v2LkbhhXCV2HbGV',
    };
  
    return videoUrls[identifier] || null;
  }
  
  function getTimeIngredients(identifier) {
      var ingredientsList = {
          '아침-프렌치 토스트': [
              '식빵 3장,  달걀 2개,  우유 약2/3컵 (110g),  황설탕 1큰술',
              '꽃소금 2꼬집,  식용유 적당량,  버터 적당량,  사과잼 적당량'
          ],
          '아침-감자 브런치': [
              '감자, 계란, 소금, 식용유',
          ],
          '아침-에그 샌드위치': [
              '달걀 6개,  식빵 4장,  슬라이스치즈 2장,  베이컨 3장(48g)',
              '스틱버터 적당량,  마요소스 적당량,  쓰리라차 마요 소스'
          ],
          '점심-오므라이스': [
              '소스: 밀가루,   식용유,   케첩,   간장 ,   황설탕,   식초 ,   물 1컵,   소고기다시다',
              '볶음밥: 양파 ,   당근 ,   밥 1공기,   간장,   식용유 2큰술',
              '달걀옷: 달걀 3개,   식용유 적당량',
          ],
          '점심-비빔국수': [
              '양념장: 고추장 ,   양조식초,   황설탕,   진간장,   고운 고춧가루,   간마늘',
              '소면,   깨소금 6큰술,   양념장 적당량,   참기름 적당량'
          ],
          '점심-김밥': [
              '김 1팩,   시금치 1단,   달걀,   당근 1개,   맛소금,   밥,   참기름,   황설탕',
              '단무지,   우엉조림,   게맛살,   오이,   참기름 적당량,   식용유 적당량'
          ],
          '저녁-닭볶음탕': [
              '토막닭,   황설탕,   간 마늘,   진간장,   굵은 고춧가루,   고운 고춧가루,   감자,   당근',
              '양파,   대파,   청양고추,   홍고추,   새송이,   표고버섯,   후춧가루,   물 600ml'
          ],
          '저녁-부대찌개': [
              '양념장: 간마늘,   국간장,  재래식 된장,   굵은 고춧가루,   고추장,   후춧가루',
              '대파,   통조림햄,   소세지,   양파,   신김치,   베이크드빈스,   체다치즈'
          ],
          '저녁-삼계탕': [
              '양념장: 굵은 고춧가루,   물(육수),   다진 마늘,   다진 대파,   연겨자,   진간장,   식초,   설탕',
              '닭 1마리,   대파 2뿌리,   부추 1줌,   마늘,   생강,   양파,   물,   소금,   후추'
          ],
          '간식-떡볶이': [
              '쌀떡 4컵,  밀가루떡 4컵,  사각어묵 4장,  양배추 2컵',
              '대파 3컵,  물 1L,  삶은달걀 3개'
          ],
          '간식-라면땅': [ 
              '라면 1봉지,  라면수프 적당량',
              '마요네즈 3큰술(48g),  황설탕 2큰술(24g)'
          ],
          '간식-허니버터브레드': [
              '통식빵 1/4개\n,   물엿 약1/5컵\n,   황설탕 1/7컵\n,   생크림 적당량',
              '스틱버터 1/2개\n,  바닐라아이스크림 적당량'
          ],
      };
  
      return ingredientsList[identifier] || null;
  }
  

function TimeInfo(category, subcategory) {
    var videoIframe = document.getElementById("videoIframe");
    var songInfoDiv = document.getElementById("timeInfo");

    videoIframe.src = "";
    songInfoDiv.innerHTML = "";

    if (time && subcategory) {
        var videoUrl = getVideoUrl(time + '-' + subcategory);
        var ingredients = getIngredients(time + '-' + subcategory);

        if (videoUrl && timeingredients) {
            videoIframe.src = videoUrl;
            songInfoDiv.innerHTML = 
                `<div class='food-result'>
                    <p class='subcategory-recipe'>${subcategory} 레시피</p>
                    <p class='food-materials'>준비 재료 <br/><br/>${timeingredients.join('<br>')}</p>
                </div>`;
        } else {
            alert("선택한 카테고리와 음식에 맞는 영상이 없거나 재료 정보가 없습니다.");
        }
    } else {
        alert("카테고리와 음식을 선택하세요.");
    }
}
