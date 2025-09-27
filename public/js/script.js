
document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule');
  const searchInput = document.getElementById('searchInput');
  const speakerSearchInput = document.getElementById('speakerSearchInput');

  let talks = [];

  // Fetch talk data from the API
  function fetchTalks() {
    const category = searchInput.value.toLowerCase();
    const speaker = speakerSearchInput.value.toLowerCase();
    
    let url = '/api/talks';
    const params = new URLSearchParams();
    if (category) {
      // This will be filtered on the client side
    }
    if (speaker) {
      params.append('speaker', speaker);
    }
    
    if (speaker) {
        url += `?${params.toString()}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        talks = data;
        let filteredTalks = talks;
        if (category) {
            filteredTalks = filteredTalks.filter(talk => {
                return talk.category.some(cat => cat.toLowerCase().includes(category));
            });
        }
        renderSchedule(filteredTalks);
      });
  }

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
  searchInput.addEventListener('input', fetchTalks);
  speakerSearchInput.addEventListener('input', fetchTalks);

  // Helper function to format time
  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  fetchTalks();
});
