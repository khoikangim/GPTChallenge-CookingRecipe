function showCategoryFood() {
    fetch('pages/categoryFood.html')
        .then(response => response.text())
        .then(html => {
            const mainContent = document.getElementById('mainContent');
            mainContent.innerHTML = html;
            initializeMyPlaylist();
        });
}

function initializeMyPlaylist() {
    var categoryButtons = document.querySelectorAll("#filter-category .filter-button");
    var subcategoryButtons = document.querySelectorAll("#filter-subcategory .filter-button");
    var exploreButton = document.querySelector(".filter-result-button");

    if (categoryButtons.length > 0) {
        categoryButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                toggleCategoryButton(button);
                showSubcategories(button.textContent);
            });
        });
    }

    if (subcategoryButtons.length > 0) {
        subcategoryButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                toggleSubcategoryButton(button);
                displaySongInfo(getSelectedButtonValue(categoryButtons), button.textContent);
            });
        });
    }

    if (exploreButton) {
        exploreButton.addEventListener("click", function () {
            displaySongInfo(getSelectedButtonValue(categoryButtons), getSelectedButtonValue(subcategoryButtons));
        });
    }
}


function toggleCategoryButton(button) {
    var buttons = button.parentElement.getElementsByClassName("filter-button");
    for (var i = 0; i < buttons.length; i++) {

        buttons[i].classList.remove("selected");
        buttons[i].style.backgroundColor = "";
    }
    button.classList.add("selected"); // 선택한 버튼 표시
    button.style.backgroundColor = "#87CEEB"; // 선택한 버튼 배경색 변경
}

function toggleSubcategoryButton(button) {
    var buttons = button.parentElement.getElementsByClassName("filter-button");
    console.log("Buttons:", buttons);

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
        buttons[i].style.backgroundColor = ""; // 다른 버튼들의 배경색 초기화
    }

    button.classList.add("selected"); // 선택한 버튼 표시
    button.style.backgroundColor = "#87CEEB"; // 선택한 버튼 배경색 변경
    console.log("Selected Button:", button);
}

function showSubcategories(category) {
    var subcategoryContainer = document.getElementById('filter-subcategory');
    subcategoryContainer.innerHTML = "";

    var subcategories = getSubcategoriesForCategory(category);

    subcategories.forEach(function (subcategory) {
        var button = document.createElement('button');
        button.classList.add('filter-button');
        button.textContent = subcategory;
        button.onclick = function () {
            toggleSubcategoryButton(button);
            displaySongInfo(category, subcategory);
        };
        subcategoryContainer.appendChild(button);
    });
}

function getSubcategoriesForCategory(category) {
    // 각 카테고리에 맞는 서브 카테고리 배열 반환
    if (category === '한식') {
        return ['김치찌개', '된장찌개', '미역국', '불고기'];
    } else if (category === '중식') {
        return ['짜장면', '짬뽕', '탕수육', '토마토 달걀 볶음'];
    } else if (category === '일식') {
        return ['돈까스', '냉모밀', '돈코츠 라멘'];
    } else if (category === '양식') {
        return ['스테이크', '크림파스타', '알리오올리오'];
    } else if (category === '그외') {
        return ['쌀국수', '고기 카레', '랭쎕'];
    } else {
        return []; // 서브 카테고리가 없을 경우 빈 배열 반환
    }
}

function getSelectedButtonValue(buttons) {
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains("selected")) {
            return buttons[i].textContent;
        }
    }
    return null;
}

function getVideoUrl(categoryAndSubcategory) {
    var videoUrls = {
        '한식-김치찌개': 'https://www.youtube.com/embed/qWbHSOplcvY?si=64hjtnT6W8GP-jk-',
        '한식-된장찌개': 'https://www.youtube.com/embed/ffuakdFmuh4?si=KWrcgdMkH4NUo8tS',
        '한식-미역국': 'https://www.youtube.com/embed/uu8BqXy6lf4?si=7VewY5OiScbKZuQP',
        '한식-불고기': 'https://www.youtube.com/embed/p3IQTouKyH0?si=t-TEycXsnZ0F44iC',

        '중식-짜장면': 'https://www.youtube.com/embed/CdlGh52wBEo?si=4WcUenyN1lx-Pr1b',
        '중식-짬뽕': 'https://www.youtube.com/embed/F5gdgqc5bgU?si=0iO8gLQb2z5bGUel',
        '중식-탕수육': 'https://www.youtube.com/embed/WneiVYnZgHo?si=vDRpGkDZIV1Vi0d0',
        '중식-토마토 달걀 볶음': 'https://www.youtube.com/embed/pTvMsM2v1tg?si=a36vwz-zTqjK6PFV',
        
        '일식-돈까스': 'https://www.youtube.com/embed/037o6vxm0es?si=s2lv37P2wioUEl3B',
        '일식-냉모밀': 'https://www.youtube.com/embed/2y4Jvvmj7LY?si=98Y5QHmp4hU-zZWh',
        '일식-돈코츠 라멘': 'https://www.youtube.com/embed/ijl0WWry0l4?si=u7g10IuhfRL7X1R-',

        '양식-스테이크': 'https://www.youtube.com/embed/JxWbJX-UNwY?si=cjUvwPj7aifxrnLa',
        '양식-크림파스타': 'https://www.youtube.com/embed/0bnFoRQebq0?si=2Uv1MDs8xSE7wjZa',
        '양식-알리오올리오': 'https://www.youtube.com/embed/ohihzV6Z85k?si=IjbdGEg067nBWXwK',

        '그외-쌀국수':'https://www.youtube.com/embed/VnkFoQP0aGQ?si=khJ87GfYZEEXIpIe',
        '그외-고기 카레': 'https://www.youtube.com/embed/LTVxirHWvh8?si=aVdi_qdG9AQtZZ9h',
        '그외-랭쎕': 'https://www.youtube.com/embed/5ZuprV_oEHg?si=kULvmRZZknyzhDi2',
    };

    return videoUrls[categoryAndSubcategory] || null;
}

function displaySongInfo(category, subcategory) {
    var videoIframe = document.getElementById("videoIframe");
    var songInfoDiv = document.getElementById("songInfo");

    videoIframe.src = "";
    songInfoDiv.innerHTML = "";

    if (category && subcategory) {
        var videoUrl = getVideoUrl(category + '-' + subcategory);
        var ingredients = getIngredients(category + '-' + subcategory);

        if (videoUrl && ingredients) {
            videoIframe.src = videoUrl;
            songInfoDiv.innerHTML = 
                `<div class='food-result'>
                    <p class='subcategory-recipe'>${subcategory} 레시피</p>
                    <p class='food-materials'>준비 재료 <br/><br/>${ingredients.join('<br>')}</p>
                </div>`;
        } else {
            alert("선택한 카테고리와 음식에 맞는 영상이 없거나 재료 정보가 없습니다.");
        }
    } else {
        alert("카테고리와 음식을 선택하세요.");
    }
}

function getIngredients(categoryAndSubcategory) {
    var ingredientsList = {
        '한식-김치찌개': [
            '돼지고기,  신김치 3컵,  물 3컵,  청양고추 2개,  대파 약 2/3대\n,  간 마늘 1큰술', 
            '굵은 고춧가루 1큰술,  고운 고춧가루 ½큰술,  국간장 1큰술,  새우젓 1큰술', 
        ],
        '한식-된장찌개': [
            '된장 1/3컵,  물 약 4컵,  간마늘 1/2큰술,  육수용 멸치 10마리,  애호박 반 개,  양파 반 개', 
            '느타리버섯 1컵,  대파 2/3컵,  청양고추 2개,  두부 반 모', 
        ],
        '한식-미역국': [
            '소고기(양지) 반 컵,  자른미역 1/3컵\n,  참기름 2큰술,  국간장 3큰술',
            '물 약 7컵,  다진마늘 1큰술,  멸치액젓 1.5큰술'
        ],
        '한식-불고기': [
            '앙념장: 황설탕 2큰술,  물엿 1큰술,  간마늘 1큰술,  진간장 5큰술,  참기름 3큰술, 후추 약간',
            '불고기용 소고기,  양파 3/5개\n,  표고버섯 2개,  대패 1대,  홍고추 1개,  통깨 약간'
        ],

        '중식-짜장면': [
            '대파,  양배추,  양파,  돼지고기,  설탕 1/3컵\n',
            '춘장 1팩,  전분,  식용유  2컵'
        ],
        '중식-짬뽕': [
            '돼지고기,  굵은 고춧가루,  고운 고춧가루,  식용유,  후추,  굴소스',
            '호박,  양파,  대파,  양배추,  당근,  목이버섯,  중식면'
        ],
        '중식-탕수육': [
            '돼지고기 등심,  튀김가루,  식용유,  깐마늘,  진간장,  후추,  맛소금',
            '소스 재료: 황설탕,  식초,  진간장,  간생강,  오이,  당근,  양파,  물,  전분가루'
        ],
        '중식-토마토 달걀 볶음': [
            '토마토,  달걀 4개,  식용유 반 컵,  대파 반 컵,  진간장 1큰술',
            '굴소스 1큰술,  꽃소금 적당량, 후춧가루 적당량,  참기름 반 큰술'
        ],

        '일식-돈까스': [
            '돼지고기 등심,  밀가루,  달걀 2개,  빵가루,  튀김용 식용유',
            '소스 재료: 케첩,  황설탕,  진간장,  밀가루,  식초,  소고기 다시다'
        ],
        '일식-냉모밀': [
            '디포리 3마리,  국물용 멸치 15마리,  물 6컵,  양파,  대파 1대,  조각 다시마',
            '물 5컵,  무 80g,  진간장 2컵,  황설탕 1컵,  맛술 반 컵,  가다랑어 포 1컵'
        ],
        '일식-돈코츠 라멘': [
            '돼지 뼈,  삼겹살,  사케,  진간장,  미림,  자라메 설탕,  황설탕,  대파,  양파',
            '마늘,  진간장,  미림,  소금,  목이버섯,  참깨,  후추,  계란,  죽순'
        ],

        '양식-스테이크': [
            '돼지고기,  맛소금,  후추,  식용유,  새송이 버섯,  양파,  마늘,  케첩',
            '황설탕,  버터,  진간장,  통후추 약간,  파슬리 가루 약간'
        ],
        '양식-크림파스타': [
            '스파게티면,  꽃소금 1큰술,  올리브유,  베이컨,  양파 반 개,  양송이 버섯',
            '밀가루,  우유,  버터,  파마산 치즈,  후추,  파슬리가루'
        ],
        '양식-알리오올리오': [
            '스파게티면,  면수,  꽃소금 1큰술,  올리브유,  간마늘',
            '통마늘,  쪽파,  페퍼론치노 5개,  파마산 치즈 가루 '
        ],
        '그외-쌀국수': [
            '쌀국수 면,  한우 사태살,  사골,  양파,  생강',
            '각종 향신료,  설탕,  라임,  홍고추,  쪽파'
        ],
        '그외-고기 카레': [
            '밥,  돼지고기 뒷다리살,  양파 2개,  카레가루 1봉지,  당근',
            '케첩 2큰술,  식용유,  진간장 2큰술,  버터 2큰술'
        ],
        '그외-랭쎕': [
            '돼지 등뼈,  양파,  고수 뿌리,  마늘,  후추,  소금,  태국 간장',
            '피쉬소스,  라임즙,  태국 고추,  쿨란트로, 미원,  설탕'
        ]
    };

    return ingredientsList[categoryAndSubcategory] || null;
}




