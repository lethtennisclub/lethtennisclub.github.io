import { db, collection, getDocs } from './firebase.js';

async function loadEvents() {
  const snap = await getDocs(collection(db, 'events'));

  const events = [];

  snap.forEach(d => {
    const data = d.data();

    if (!data.start || !data.end) return;

    events.push({
      id: d.id,
      title: data.title,
      start: new Date(data.start).toISOString(),
      end: new Date(data.end).toISOString()
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
      
      eventTimeFormat: {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
},

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