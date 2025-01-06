import { huntingAreas } from "./huntingAreas.js";
const sidebarContent = document.getElementById("sidebar-content");
// Create the map object
const map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -2,
});

// Define the image dimensions
const bounds = [
  [0, 0],
  [1000, 1500],
];
const image = "assets/images/HuntMapFINAL.jpg";

// Add the image overlay
L.imageOverlay(image, bounds).addTo(map);

// Set the map's initial view to fit the image bounds
map.fitBounds(bounds);

//display hunting area marker
huntingAreas.forEach((area) => {
  const marker = L.marker(area.coordinates).addTo(map).bindPopup(area.name);

  //click event to populate sidebar
  marker.on("click", () => {
    sidebarContent.innerHTML = `
    <h3>${area.name}</h3
    <p>Date: 10/15/2024 Sex: Buck Weight: 150 Points: 8</P
    `;
  });
});
