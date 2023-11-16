function showFoodDiary() {
  fetch('pages/foodDiary.html')
    .then(response => response.text())
    .then(html => {
      const mainContent = document.getElementById('mainContent');
      mainContent.innerHTML = html;
    });

  setActiveMenu('foodDiary'); 
}

document.addEventListener("DOMContentLoaded", function () {
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

  if (existingEntry) {
    showDiaryEntry(existingEntry);
  } else {
    showDiaryInput(date);
  }
}

function getDiaryEntry(date) {
  const diaryEntries = JSON.parse(localStorage.getItem("diaryEntries")) || {};
  return diaryEntries[date];
}

function showDiaryEntry(entry) {
  const diaryInfo = document.querySelector(".diary-info");

  if (entry) {
    const diaryText = document.createElement("div");
    diaryText.className = "diary-text";
    diaryText.textContent = `${entry.date}일 식단 작성: ${entry.text}`;

    diaryInfo.innerHTML = ""; // 기존에 있던 내용 비우기
    diaryInfo.appendChild(diaryText);
  } else {
    diaryInfo.innerHTML = `<div class="diary-text">${date}일에 작성한 식단이 없습니다.</div>`;
  }
}

function saveDiaryEntry(date, entry) {
  const diaryEntries = JSON.parse(localStorage.getItem("diaryEntries")) || {};
  diaryEntries[date] = entry;
  localStorage.setItem("diaryEntries", JSON.stringify(diaryEntries));
}

function showDiaryInput(date) {
  const userInput = prompt(`${date}일 식단 정보를 입력하세요:`);

  if (userInput !== null) {
    const entry = { date, text: userInput };

    // 식단 정보 저장 및 출력
    saveDiaryEntry(date, entry);
    showDiaryEntry(entry);
  }
}
