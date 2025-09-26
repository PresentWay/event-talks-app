
document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule');
  const searchInput = document.getElementById('searchInput');

  let talks = [];

  // Fetch talk data from the API
  fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talks = data;
      renderSchedule(talks);
    });

  // Render the schedule
  function renderSchedule(talksToRender) {
    scheduleContainer.innerHTML = '';
    let startTime = new Date();
    startTime.setHours(10, 0, 0, 0);

    talksToRender.forEach((talk, index) => {
      const talkElement = document.createElement('div');
      talkElement.classList.add('talk');

      const endTime = new Date(startTime.getTime() + talk.duration * 60000);

      talkElement.innerHTML = `
        <div class="time">${formatTime(startTime)} - ${formatTime(endTime)}</div>
        <h2>${talk.title}</h2>
        <div class="speakers">By: ${talk.speakers.join(', ')}</div>
        <div class="description">${talk.description}</div>
        <div class="category">
          ${talk.category.map(cat => `<span>${cat}</span>`).join('')}
        </div>
      `;

      scheduleContainer.appendChild(talkElement);

      // Add break after the 3rd talk
      if (index === 2) {
        const breakElement = document.createElement('div');
        breakElement.classList.add('break');
        breakElement.innerHTML = `
          <h3>Lunch Break</h3>
          <div class="time">${formatTime(endTime)} - ${formatTime(new Date(endTime.getTime() + 60 * 60000))}</div>
        `;
        scheduleContainer.appendChild(breakElement);
        startTime.setTime(endTime.getTime() + 60 * 60000);
      } else {
        startTime.setTime(endTime.getTime() + 10 * 60000); // 10-minute break
      }
    });
  }

  // Filter talks based on search input
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTalks = talks.filter(talk => {
      return talk.category.some(cat => cat.toLowerCase().includes(searchTerm));
    });
    renderSchedule(filteredTalks);
  });

  // Helper function to format time
  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
});
