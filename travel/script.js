// Sample dummy data (you can expand this)
const places = [
  { name: "Beach Paradise", type: "beach", img: "place.jpg", desc: "Relax on the sunny shores." },
  { name: "Mountain Trek", type: "adventure", img: "mountain.jpg", desc: "Enjoy thrilling mountain trails." },
  { name: "Heritage Fort", type: "heritage", img: "tour.jpg", desc: "Explore historic architecture." },
  { name: "Food Street", type: "food", img: "food.jpg", desc: "Taste delicious local foods." }
];

// 🧠 Save and show results
function planTrip() {
  const destination = document.getElementById("destination").value.trim();
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const interestElems = document.querySelectorAll('.interests input:checked');
  const interests = Array.from(interestElems).map(el => el.value);

  const resultSection = document.getElementById("results");
  resultSection.innerHTML = ""; // Clear previous results

  // Validate
  if (!destination || !startDate || !endDate || interests.length === 0) {
    alert("Please fill in all fields and select at least one interest.");
    return;
  }

  // Save to localStorage
  const tripData = { destination, startDate, endDate, interests };
  localStorage.setItem("tripData", JSON.stringify(tripData));

  // Filter places
  const filteredPlaces = places.filter(place => interests.includes(place.type));

  // Display cards
  filteredPlaces.forEach(place => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${place.img}" alt="${place.name}">
      <h3>${place.name}</h3>
      <p>${place.desc}</p>
    `;
    resultSection.appendChild(card);
  });

  // If no match
  if (filteredPlaces.length === 0) {
    resultSection.innerHTML = `<p>No places match your interests. Try other options!</p>`;
  }
}

// 🌙 Toggle dark mode
function toggleMode() {
  document.body.classList.toggle("dark-mode");
}

// 🔁 Load saved data on page load
window.onload = () => {
  const savedData = JSON.parse(localStorage.getItem("tripData"));
  if (savedData) {
    document.getElementById("destination").value = savedData.destination;
    document.getElementById("start-date").value = savedData.startDate;
    document.getElementById("end-date").value = savedData.endDate;

    savedData.interests.forEach(value => {
      const checkbox = document.querySelector(`.interests input[value="${value}"]`);
      if (checkbox) checkbox.checked = true;
    });

    // Auto plan trip again with saved data
    planTrip();
  }
};
