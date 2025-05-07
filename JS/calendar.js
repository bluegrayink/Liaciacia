const calendarGrid = document.getElementById('calendar-grid');
const eventList = document.getElementById('event-list');
const dayRow = document.getElementById('day-row');
const headerTitle = document.getElementById('header-title');

const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const monthNames = [
    "January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October",
    "November", "December"
];

// Update structure: Add `type` field
const events = {
    '2025-05-10': [
        {
            date: '10-11 Mei',
            name: 'Midori Festival',
            location: 'Green Pramuka Square',
            description: 'TBA',
            type: 'attendant'
        }
    ],
    '2025-05-11': [
        {
            date: '10-11 Mei',
            name: 'Midori Festival',
            location: 'Green Pramuka Square',
            description: 'TBA',
            type: 'attendant'
        }
    ],
    '2025-05-24': [
        {
            date: '24-25 Mei',
            name: 'Comifuro 20 (CFXX)',
            location: 'ICE BSD',
            description: 'Visiting',
            type: 'attendant'
        }
    ],
    '2025-05-25': [
        {
            date: '24-25 Mei',
            name: 'Comifuro 20 (CFXX)',
            location: 'ICE BSD',
            description: 'Visiting',
            type: 'attendant'
        }
    ],
    '2025-10-25': [
        {
            date: '25-26 Oktober',
            name: 'Inacon & ICC',
            location: 'JICC',
            description: 'TBA',
            type: 'attendant'
        }
    ],
    '2025-10-26': [
        {
            date: '25-26 Oktober',
            name: 'Inacon & ICC',
            location: 'JICC',
            description: 'TBA',
            type: 'attendant'
        }
    ],
    '2025-05-20': [
        {
            date: '20 Mei',
            name: 'Live Streaming TikTok',
            location: 'Jam 1 - 3 sore',
            description: 'Roblox - Grow a Garden',
            type: 'livestream'
        }
    ],
    '2025-05-21': [
        {
            date: '20 Mei',
            name: 'Live Streaming TikTok',
            location: 'Jam 8 - 11 malam',
            description: 'Roblox - Grow a Garden',
            type: 'livestream'
        }
    ]
};

function initDayNames() {
    dayRow.innerHTML = '';
    daysOfWeek.forEach((day, index) => {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-cell', 'day-header');
        dayCell.textContent = day;

        if (index === 6) {
            dayCell.style.color = 'red';
        }

        dayRow.appendChild(dayCell);
    });
}

function generateCalendar(year, month) {
    headerTitle.textContent = `${monthNames[month]} ${year}`;
    calendarGrid.innerHTML = '';

    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        calendarGrid.innerHTML += `<div class="calendar-cell empty"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const cell = document.createElement('div');
        cell.classList.add('calendar-cell');
        cell.textContent = day;

        const dayOfWeek = new Date(year, month, day).getDay();
        if (dayOfWeek === 0) {
            cell.classList.add('sunday');
        }

         if (events[date]) {
            const types = new Set(events[date].map(e => e.type));
            if (types.has('attendant')) {
                cell.classList.add('attendant-event');
            }
            if (types.has('livestream')) {
                cell.classList.add('livestream-event');
            }
        }
        
        const today = new Date();
        if (
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day
        ) {
            cell.classList.add('today');
            cell.style.backgroundColor = 'lightblue';
        }

        cell.dataset.date = date;
        cell.addEventListener('click', () => displayEventDetails(date));
        calendarGrid.appendChild(cell);
    }

    eventList.innerHTML = '<h2>Event Details</h2><div class="event-item">No events on this day.</div>';
}

function displayEventDetails(date) {
    eventList.innerHTML = '<h2>Event Details</h2>';
    const eventData = events[date];

    if (eventData) {
        eventData.forEach(event => {
            const eventBlock = document.createElement('div');
            eventBlock.classList.add('event-block');

            const eventDate = document.createElement('div');
            eventDate.textContent = event.date;
            eventDate.style.fontWeight = 'bold';

            const eventName = document.createElement('div');
            eventName.textContent = event.name;

            const eventLocation = document.createElement('div');
            eventLocation.textContent = event.location;

            const eventDescription = document.createElement('div');
            eventDescription.textContent = event.description;

            eventBlock.appendChild(eventDate);
            eventBlock.appendChild(eventName);
            eventBlock.appendChild(eventLocation);
            eventBlock.appendChild(eventDescription);

            // Optional: show link if exists
            if (event.info) {
                const eventInfo = document.createElement('a');
                eventInfo.href = event.info;
                eventInfo.textContent = 'More Info';
                eventInfo.target = '_blank';
                eventInfo.style.color = 'blue';
                eventBlock.appendChild(eventInfo);
            }

            eventList.appendChild(eventBlock);
        });
    } else {
        const noEventItem = document.createElement('div');
        noEventItem.classList.add('event-item');
        noEventItem.textContent = 'No events on this date.';
        eventList.appendChild(noEventItem);
    }
}

// Initialize
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

initDayNames();
generateCalendar(currentYear, currentMonth);

document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
    eventList.innerHTML = '<h2>Event Details</h2><div class="event-item">No events on this day.</div>';
});

document.getElementById('next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
    eventList.innerHTML = '<h2>Event Details</h2><div class="event-item">No events on this day.</div>';
});
