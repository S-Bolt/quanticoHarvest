import { huntingAreas } from "./huntingAreas.js";
import HarvestManager from "./harvestManager.js";
import MapManager from "./mapManager.js";
import { rawQuanticoHarvest, keys } from "./harvestData.js";

const sidebarContent = document.getElementById("sidebar-content");

// Create a HarvestManager instance
const harvestManager = new HarvestManager(rawQuanticoHarvest, keys);

harvestManager.addImageToSpecificId("147", "assets/images/9BBuck.jpg");
harvestManager.addImageToSpecificId("144", "assets/images/6CBuckDalton.jpg");
harvestManager.addImageToSpecificId("145", "assets/images/7ABuck.jpg");
harvestManager.addImageToSpecificId("110", "assets/images/6CMonster.jpg");
harvestManager.addImageToSpecificId("96", "assets/images/15BMaybeBuck.jpg");
harvestManager.addImageToSpecificId("86", "assets/images/7BBuck.jpg");
harvestManager.addImageToSpecificId("44", "assets/images/16EBuck.jpg");
harvestManager.addImageToSpecificId("94", "assets/images/9BBuck1.jpg");

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
