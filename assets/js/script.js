import { huntingAreas } from "./huntingAreas.js";
import HarvestManager from "./harvestManager.js";
import MapManager from "./mapManager.js";
import { rawQuanticoHarvest, keys } from "./harvestData.js";
import { images } from "./images.js";

const sidebarContent = document.getElementById("sidebar-content");

// Create a HarvestManager instance
const harvestManager = new HarvestManager(rawQuanticoHarvest, keys);

//iterate through images and add them to each id
images.forEach(img => {
  const [key, value] = Object.entries(img)[0];
  console.log("Test", key,value);
  harvestManager.addImageToSpecificId(key, value)
})

// Initialize the map using MapManager
const mapManager = new MapManager(
  "map", 
  "assets/images/HuntMapFINAL.jpg", 
  [
    [0, 0],
    [1000, 1500],
  ] 
);

// Add markers to the map
mapManager.addMarkers(huntingAreas, harvestManager, sidebarContent);
