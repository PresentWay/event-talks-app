
document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule');
  const searchInput = document.getElementById('searchInput');
  const speakerSearchInput = document.getElementById('speakerSearchInput');
  const loadingIndicator = document.getElementById('loadingIndicator');

  let talks = [];

  // Fetch talk data from the API
  function fetchTalks() {
    loadingIndicator.style.display = 'block';
    scheduleContainer.innerHTML = '';

    const category = searchInput.value.toLowerCase();
    const speaker = speakerSearchInput.value.toLowerCase();
    
    const params = new URLSearchParams();
    if (category) {
      params.append('category', category);
    }
    if (speaker) {
      params.append('speaker', speaker);
    }
    
    fetch(`/api/talks?${params.toString()}`)
      .then(response => response.json())
      .then(data => {
        talks = data;
        renderSchedule(talks);
      });
  }

  // Render the schedule
  function renderSchedule(talksToRender) {
    loadingIndicator.style.display = 'none';
    scheduleContainer.innerHTML = '';
    let startTime = new Date();
    startTime.setHours(10, 0, 0, 0);

    const categorySearchTerm = searchInput.value.toLowerCase();
    const speakerSearchTerm = speakerSearchInput.value.toLowerCase();

    talksToRender.forEach((talk, index) => {
      const talkElement = document.createElement('div');
      talkElement.classList.add('talk');

      const endTime = new Date(startTime.getTime() + talk.duration * 60000);

      const speakers = talk.speakers.map(speaker => highlightText(speaker, speakerSearchTerm)).join(', ');
      const categories = talk.category.map(cat => `<span>${highlightText(cat, categorySearchTerm)}</span>`).join('');

      talkElement.innerHTML = `
        <div class="time">${formatTime(startTime)} - ${formatTime(endTime)}</div>
        <h2>${talk.title}</h2>
        <div class="speakers">By: ${speakers}</div>
        <div class="description">${talk.description}</div>
        <div class="category">
          ${categories}
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

  function highlightText(text, term) {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
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
