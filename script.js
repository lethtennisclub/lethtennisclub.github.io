import { db, collection, getDocs } from './firebase.js';

async function loadEvents() {
  const snap = await getDocs(collection(db, 'events'));

  const events = [];

  snap.forEach(doc => {
    const data = doc.data();

    events.push({
      id: doc.id,
      title: data.title,
      start: data.start,
      end: data.end
    });
  });

  return events;
}

document.addEventListener('DOMContentLoaded', async () => {

  const calendarEl = document.getElementById('calendar');

  const calendar = new FullCalendar.Calendar(calendarEl, {

    initialView: 'dayGridMonth',
    height: 650,

    events: async (info, success, failure) => {
      try {
        const events = await loadEvents();
        success(events);
      } catch (e) {
        console.error(e);
        failure(e);
      }
    }
  });

  calendar.render();
});