import { huntingAreas } from "./huntingAreas.js";
import { harvestByArea } from "./harvestData.js";
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

window.addEventListener('resize', () => {
  map.invalidateSize(); // Notifies Leaflet to resize the map
});


//display hunting area marker
huntingAreas.forEach((area) => {
  const marker = L.marker(area.coordinates).addTo(map).bindPopup(`Prepared Report for ${area.name}`);

  //click event to populate sidebar
  marker.on("click", () => {
    console.log(marker);
    //fly to animation for clicking specific marker
    map.flyTo(marker._latlng, 1, { duration: 1 });
    
    const areaData = harvestByArea(area.name);
    const harvestHTML = areaData.map((filteredArea) => {

      const imageHTML = filteredArea.image
      ? `<img src="${filteredArea.image}" alt="Harvest Image" class="harvest-image" />`
      : "";
      //changing the display of sex from D or B to Doe or Buck
      const sex =
        filteredArea.sex === "D"
          ? "Doe"
          : filteredArea.sex === "B"
          ? "Buck"
          : "Unkown";
      // Points, beamLenght, outsideSpread are specific to bucks. Removing them from doe display
      const points =
        filteredArea.points !== null ? `<br>Points: ${filteredArea.points}` : "";
      const beamLength =
        filteredArea.beamLength !== null
          ? `<br>Beam Length: ${filteredArea.beamLength} in`
          : "";
      const outsideSpread =
        filteredArea.outsideSpread !== null
          ? `<br>Outside Spread: ${filteredArea.outsideSpread} in`
          : "";

      return `<p class= "sidebar-harvest-content">
      <span>Date: ${filteredArea.date}</span><br>
      <span>Sex: ${sex}</span><br>
      <span>Age: ${filteredArea.age}</span><br>
      <span>Weight: ${filteredArea.weight}  lbs </span>
      <span>${points}</span>
      <span>${beamLength}</span>
      <span>${outsideSpread}</span>
      <span>${imageHTML}</span>
      </p>
      `;
    }).join("")//remove the comma between data sets
    ;
    sidebarContent.innerHTML = `
    <h2>AREA: ${area.name} </h2>
    <h3>TOTAL: ${areaData.length}</h3>
    <div>${harvestHTML}</div>
    `;
  });
});
