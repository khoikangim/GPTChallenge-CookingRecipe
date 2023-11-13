
function showFoodDiary() {
  fetch('pages/foodDiary.html') // 수정된 경로
      .then(response => response.text())
      .then(html => {
          const mainContent = document.getElementById('mainContent');
          mainContent.innerHTML = html;
          // 여기에 상황별 플레이리스트를 렌더링하는 로직을 추가할 수 있음
      });

  setActiveMenu('foodDiary');
}

// foodDiary.js

document.addEventListener('DOMContentLoaded', function() {
  initCalendar();
});

function initCalendar() {
  $('#calendar').fullCalendar({
      // FullCalendar 옵션을 여기에 추가합니다.
      // 예: defaultView, events 등
      // 자세한 옵션은 FullCalendar 문서를 참조하세요: https://fullcalendar.io/docs
  });
}
