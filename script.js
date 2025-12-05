const monthName = document.getElementById("monthName");
const yearNum = document.getElementById("yearNum");
const daysContainer = document.getElementById("daysContainer");

const listView = document.getElementById("listView");

const calendarViewBtn = document.getElementById("calendarBtn");
const listViewBtn = document.getElementById("listBtn");

let date = new Date();

// 🗓️ Global events object (Populated by Firebase in the HTML file)
window.events = {}; 

function renderCalendar() {
  const month = date.getMonth();
  const year = date.getFullYear();

  monthName.textContent = date.toLocaleString('default', { month: 'long' });
  yearNum.textContent = year;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDay = firstDay.getDay();
  const totalDays = lastDay.getDate();

  daysContainer.innerHTML = "";

  // Empty slots before month starts
  for (let i = 0; i < startDay; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("empty");
    daysContainer.appendChild(emptyDiv);
  }

  // Days of the month
  for (let d = 1; d <= totalDays; d++) {
    const div = document.createElement("div");
    div.classList.add("day");

    let labelText = "";
    // Access the global window.events object
    const monthEvents = window.events[year]?.[month] || {};

    if (monthEvents.holidays && monthEvents.holidays[d]) {
      labelText = monthEvents.holidays[d];
      div.classList.add("holiday");
    } else if (monthEvents.academic && monthEvents.academic[d]) {
      labelText = monthEvents.academic[d];
      div.classList.add("academic");
    } else if (monthEvents.exam && monthEvents.exam[d]) {
      labelText = monthEvents.exam[d];
      div.classList.add("exam");
    } else if (monthEvents.break && monthEvents.break[d]) {
      labelText = monthEvents.break[d];
      div.classList.add("break");
    }

    div.innerHTML = `
      <div class="day-num">${d}</div>
      ${labelText ? `<div class="label">${labelText}</div>` : ""}
    `;

    daysContainer.appendChild(div);
  }
}

// Navigation Buttons
document.getElementById("prevMonth").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

calendarViewBtn.addEventListener("click", () => {
  calendarViewBtn.classList.add("active");
  listViewBtn.classList.remove("active");
  document.getElementById("calendarView").classList.remove("hidden");
  listView.classList.add("hidden");
  renderCalendar(); // Re-render to ensure updates show
});

listViewBtn.addEventListener("click", () => {
  listViewBtn.classList.add("active");
  calendarViewBtn.classList.remove("active");
  document.getElementById("calendarView").classList.add("hidden");
  listView.classList.remove("hidden");
});

// Initial render
renderCalendar();
