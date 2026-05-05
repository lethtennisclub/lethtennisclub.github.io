import { db, collection, getDocs } from './firebase.js';

async function loadEvents() {
  const snap = await getDocs(collection(db,"events"));

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

document.addEventListener("DOMContentLoaded", async () => {

  const calendar = new FullCalendar.Calendar(document.getElementById("calendar"), {

    initialView: "dayGridMonth",

    events: async (info, success) => {
      const events = await loadEvents();
      success(events);
    }

  });

  calendar.render();
});