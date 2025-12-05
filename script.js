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

    // Access the global window.events object
    const monthEvents = window.events[year]?.[month] || {};

    // ⭐️ START OF MERGING LOGIC ⭐️
    const dayEvents = [];
    
    // Check all event categories for the current day
    ['holidays', 'academic', 'exam', 'break'].forEach(catKey => {
        // Events are stored as an array of strings (from fetchEvents in HTML)
        const eventsForCat = monthEvents[catKey]?.[d];
        
        if (eventsForCat && eventsForCat.length > 0) {
            // Collect all events
            dayEvents.push(...eventsForCat);
            
            // Apply the category class to the day cell for coloring/styling
            // Replace 'holidays' with 'holiday' to match your CSS dot classes
            div.classList.add(catKey.replace('holidays', 'holiday')); 
        }
    });

    let labelText = "";
    
    if (dayEvents.length > 0) {
        // Create the tooltip (what you see on hover) by joining events with a newline
        const tooltipText = dayEvents.join('\n');
        div.setAttribute('title', tooltipText);
        div.classList.add('has-event'); // Add a general class for styling event days
        
        // 🔥🔥🔥 CRITICAL CHANGE: Join all events with a <br> for visible merging 🔥🔥🔥
        labelText = dayEvents.join('<br>');
    }
    // ⭐️ END OF MERGING LOGIC ⭐️

    div.innerHTML = `
      <div class="day-num">${d}</div>
      ${labelText ? `<div class="label">${labelText}</div>` : ""}
    `;

    daysContainer.appendChild(div);
  }
}
// ... rest of the script.js file ...



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
