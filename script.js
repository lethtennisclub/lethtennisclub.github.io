import { db, collection, getDocs } from './firebase.js';

async function loadEvents() {
  const snap = await getDocs(collection(db, 'events'));

  const events = [];

  snap.forEach(d => {
    const data = d.data();

    events.push({
      id: d.id,
      title: data.title,
      start: data.start,
      end: data.end
    });
  });

  return events;
}

document.addEventListener('DOMContentLoaded', async () => {

  const calendar = new FullCalendar.Calendar(
    document.getElementById('calendar'),
    {
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
    }
  );

  calendar.render();
});