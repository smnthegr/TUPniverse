const monthName = document.getElementById("monthName");
const yearNum = document.getElementById("yearNum");
const daysContainer = document.getElementById("daysContainer");

let date = new Date();

// 🗓️ Store special days per month (0-based index)
const events = {
  2025: { 
    5: { // June
        holidays: { 12: "Independence Day" },
        academic: { 2: "Freshmen Enrollment" },
        exam: {},
        break: {}
    },
    6: { // July
        holidays: {},
        academic: {
        14: "Graduate Programs",
        21: "2nd - 5th Year and GP Enrollment",
        28: "Returning Students Enrollment | Adding / Changing of Subjects (irregular)"
        },
        exam: {},
        break: {}
    },
    7: { // August
        holidays: { 21: "Ninoy Aquino Day", 25: "National Heroes Day" },
        academic: {
        4: "Freshmen Orientation",
        11: "Start of Classes"
        },
        exam: {},
        break: {}
    },
    8: { // September
        holidays: {},
        academic: {},
        exam: { 16: "Preliminary Examination" },
        break: {}
    },
    9: { // October
        holidays: {},
        academic: { 27: "Deadline of Dropping Subjects" },
        exam: { 28: "Midterm Examination" },
        break: {}
    },
    10: { // November (0 = January)
        holidays: {1: "All Saint's Day", 30: "Bonifacio Day"},
        academic: {10: "Faculty Evaluation"},
        exam: {},
        break: {3: "Academic Break"}
    },
    11: { // December
            holidays: {
        8: "Feast of the Immaculate Conception of Mary",
        25: "Christmas Day",
        30: "Rizal Day",
        31: "Last Day of the Year"
        },
        academic: {
        4: "Application for Graduation",
        12: "Deadline for Submission of Grades (Graduating)",
        14: "End of 1st Semester",
        15: "ACSO Week",
        17: "TUP Foundation Day",
        21: "Deadline for Submission of Grades (Non-Graduating)"
        },
        exam: {
        2: "Final Examination (Graduating)",
        10: "Final Examination (Non-Graduating)"
        },
        break: {
        22: "Christmas Break Begins"
        }
    }
  },
  2026: {
    0: { // january
        holidays: {1: "New Year's Day"},
        academic: {
        5: "1st-5th Year and GP Enrollment",
        12: "Return of Faculty | Adding / Changing of Subjects (Irregular)", 
        13: "Academic Council Meeting",
        14: "Start of Classes for 2nd Semester",
        },
        exam: {},
        break: {}
    },
    1: { // February
        holidays: {
        10: "Chinese New Year",
        25: "EDSA People Power Revolution Anniversary"
      },
        academic: {},
        exam: {18: "Preliminary Examination"},
        break: {}
    },
    2: { // March
        holidays: {},
        academic: {25: "Deadline for Dropping Subjects"},
        exam: {},
        break: {26: "Midterm Examination"}
    },
    3: { // April
        holidays: {
        9: "Maundy Thursday | Araw ng Kagitingan",
        10: "Good Friday",
        11: "Black Saturday"
        },
        academic: {
        13: "Faculty Evaluation | Application for Graduation",
        15: "Cultural and Sports Week"
      },
        exam: {},
        break: {6: "Academic Break"}
    },
    4: { // May
        holidays: {1: "Labor Day"},
        academic: {
        9: "Moratorium for Final Defense",
        16: "Deadline of Submission of Grades (Graduating)",
        21: "End of 2nd Semester | Start of PVP",
        25: "1st to 5th Year and GP Enrollment (Midyear)",
        30: "Deadline of Submission of Grades (Non-Graduating)"
      },
        exam: {
        5: "Final Exam (Graduating)",
        18: "Final Exam (Non-Graduating)"
      },
        break: {}
    },
    5: { // June
        holidays: {12: "Independence Day"},
        academic: {
        1: "Start of Classes (Midyear)",
        2: "Deadline of Dropping Subjects (Midyear)",
        3: "Academic Council Meeting",
        22: "Application for Graduation (Midyear)"
      },
        exam: {},
        break: {}
    },
    6: { // July
        holidays: {},
        academic: {
        10: "Deadline for Submission of Grades for Midyear (Graduating)",
        11: "End of Midyear Classes",
        16: "Academic Council Meeting (Midyear)",
        20: "Deadline of Submission of Grades for Midyear (Non-Graduating)",
        27: "Return of Faculty",
        29: "Start of Classes (SY 2026-2027)"
      },
        exam: {
        1: "Final Examination For Midyear (Graduating)",
        9: "Final Examination For Midyear (Non-Graduating)"
      },
        break: {}
    },

  }
    
};

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
    const monthEvents = events[year]?.[month] || {};

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

renderCalendar();


