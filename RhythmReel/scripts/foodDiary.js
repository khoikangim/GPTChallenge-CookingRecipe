// 페이지 로딩 시 실행되는 함수
function showFoodDiary() {
  // foodDiary.html을 가져와서 메인 콘텐츠에 추가
  fetch('pages/foodDiary.html')
    .then(response => response.text())
    .then(html => {
      const mainContent = document.getElementById('mainContent');
      mainContent.innerHTML = html;
      // 여기에 상황별 플레이리스트를 렌더링하는 로직을 추가할 수 있음
    });

  setActiveMenu('foodDiary'); // 메뉴 활성화 함수 호출
}

document.addEventListener("DOMContentLoaded", function () {
  // 각 날짜 버튼에 대한 이벤트 리스너 등록
  const dateButtons = document.querySelectorAll(".dates button");
  dateButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      handleDateClick(button);
    });
  });
});

// 날짜 클릭 시 처리하는 함수
function handleDateClick(button) {
  const date = button.querySelector("time").innerText;
  const existingEntry = getDiaryEntry(date);

  // 기존에 입력된 정보가 있으면 해당 정보를 보여주고, 없으면 입력 폼 생성
  if (existingEntry) {
    showDiaryEntry(existingEntry);
  } else {
    showDiaryInput(date);
  }
}

// 날짜에 해당하는 식단 정보를 가져오는 함수
function getDiaryEntry(date) {
  // 실제로는 서버에서 해당 날짜의 데이터를 가져오는 로직이 들어갈 것입니다.
  // 이 예제에서는 간단히 localStorage를 사용하여 테스트합니다.
  const diaryEntries = JSON.parse(localStorage.getItem("diaryEntries")) || {};
  return diaryEntries[date];
}

// 식단 정보를 보여주는 함수
function showDiaryEntry(entry) {
  const diaryInfo = document.querySelector(".diary-info");

  // 이미 해당 날짜에 대한 정보가 있으면 HTML을 생성하여 추가
  if (entry) {
    const diaryText = document.createElement("div");
    diaryText.className = "diary-text";
    diaryText.textContent = `${entry.date}일 식단 작성: ${entry.text}`;

    diaryInfo.innerHTML = ""; // 기존에 있던 내용 비우기
    diaryInfo.appendChild(diaryText);
  } else {
    diaryInfo.innerHTML = `<div class="diary-text">${date}일에 작성한 식단이 없습니다.</div>`;
  }
  // 원하는 대로 화면에 표시하는 코드를 추가하세요.
}

// 식단 정보를 저장하는 함수
function saveDiaryEntry(date, entry) {
  const diaryEntries = JSON.parse(localStorage.getItem("diaryEntries")) || {};
  diaryEntries[date] = entry;
  localStorage.setItem("diaryEntries", JSON.stringify(diaryEntries));
}

// 사용자에게 입력 받은 후 식단 정보를 저장하고 보여주는 함수
function showDiaryInput(date) {
  // 사용자에게 입력 받기
  const userInput = prompt(`${date}일 식단 정보를 입력하세요:`);

  if (userInput !== null) {
    const entry = { date, text: userInput };

    // 식단 정보 저장 및 출력
    saveDiaryEntry(date, entry);
    showDiaryEntry(entry);
  }
}
