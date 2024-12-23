// 14 Räume definieren
const rooms = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  status: "frei", // Startstatus "frei"
  assignedTo: null, // Kein Mitarbeiter zugewiesen
  info: "", // Zusätzliche Informationen
  until: null, // Zeitangabe, bis wann der Raum belegt ist
}));

// Mitarbeiterliste – bitte die Namen anpassen
const employees = [
  "Kein Mitarbeiter", // Option für das Zurücksetzen des Raums
  "Anna Müller",
  "Ben Schneider",
  "Clara Fischer",
  "David Meier",
  "Eva Schmidt",
  "Felix Weber",
  "Gina Lehmann",
  "Hans Bauer",
  "Ines Koch",
  "Jan Wagner",
  "Klara Hoffmann",
  "Lukas Becker",
  "Mia Krüger",
  "Noah Braun",
  "Olivia Kaiser",
  "Paul Richter",
  "Quirin Schuster",
  "Rita Schwarz",
  "Simon Vogel",
  "Tina Fuchs",
  "Uwe Wolff",
  "Vera Brandt",
];

// Räume in der Ansicht anzeigen
function renderRooms() {
  const roomGrid = document.getElementById("roomGrid");
  roomGrid.innerHTML = ""; // Vorherigen Inhalt löschen
  rooms.forEach((room) => {
    const roomDiv = document.createElement("div");
    roomDiv.className = `room ${room.status === "frei" ? "free" : "occupied"}`; // "frei" oder "belegt"
    roomDiv.innerHTML = `
      <strong>Raum ${room.id}</strong><br>
      Status: ${room.status}<br>
      ${
        room.assignedTo && room.assignedTo !== "Kein Mitarbeiter"
          ? `Zugewiesen an: <em>${room.assignedTo}</em>`
          : "Kein Mitarbeiter"
      }
      <br>
      ${
        room.until
          ? `Belegt bis: <em>${room.until}</em>`
          : "Keine Zeitangabe"
      }
      <br>
      ${
        room.info
          ? `<div><strong>Info:</strong> ${room.info}</div>
             <button onclick="deleteInfo(${room.id})">Info löschen</button>`
          : "<div>Keine zusätzlichen Informationen</div>"
      }
      <select onchange="assignRoomDirect(${room.id}, this.value)">
        ${employees
          .map(
            (employee) =>
              `<option value="${employee}" ${
                employee === room.assignedTo ? "selected" : ""
              }>${employee}</option>`
          )
          .join("")}
      </select>
      <input type="time" id="timeInput${room.id}" />
      <button onclick="setRoomTime(${room.id})">Zeit speichern</button>
      <input type="text" placeholder="Info hinzufügen..." id="infoInput${room.id}" />
      <button onclick="addInfo(${room.id})">Info speichern</button>
    `;
    roomGrid.appendChild(roomDiv);
  });
}

// Raum direkt einem Mitarbeiter zuweisen
function assignRoomDirect(roomId, employee) {
  const room = rooms.find((r) => r.id === roomId);
  if (employee === "Kein Mitarbeiter") {
    room.status = "frei"; // Zurücksetzen auf "frei"
    room.assignedTo = null;
    room.until = null; // Zeit zurücksetzen
  } else {
    room.status = "belegt";
    room.assignedTo = employee;
  }
  renderRooms();
}

// Zeitangabe hinzufügen
function setRoomTime(roomId) {
  const timeInput = document.getElementById(`timeInput${roomId}`);
  const room = rooms.find((r) => r.id === roomId);
  if (timeInput.value) {
    room.until = timeInput.value; // Zeitangabe speichern
    alert(`Zeit für Raum ${room.id} auf ${room.until} gesetzt.`);
  } else {
    alert("Bitte geben Sie eine gültige Zeit ein.");
  }
  renderRooms();
}

// Zusätzliche Informationen hinzufügen
function addInfo(roomId) {
  const input = document.getElementById(`infoInput${roomId}`);
  const room = rooms.find((r) => r.id === roomId);
  if (input.value.trim() !== "") {
    room.info = input.value.trim(); // Speichern der Information
    input.value = ""; // Eingabefeld zurücksetzen
  } else {
    alert("Bitte geben Sie eine gültige Information ein.");
  }
  renderRooms();
}

// Zusätzliche Informationen löschen
function deleteInfo(roomId) {
  const room = rooms.find((r) => r.id === roomId);
  room.info = ""; // Info zurücksetzen
  renderRooms();
}

// Initiale Ansicht laden
document.addEventListener("DOMContentLoaded", () => {
  renderRooms();
});
