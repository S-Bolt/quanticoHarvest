export default class MapManager {
  constructor(mapId, imagePath, bounds) {
    this.mapId = mapId;
    this.imagePath = imagePath;
    this.bounds = bounds;
    this.map = this.intializeMap();
  }

  intializeMap() {
    // Create the map object
    const map = L.map("map", {
      crs: L.CRS.Simple,
      minZoom: -2,
    });

    // Add the image overlay
    L.imageOverlay(this.imagePath, this.bounds).addTo(map);

    // Set the map's initial view to fit the image bounds
    map.fitBounds(this.bounds);

    window.addEventListener("resize", () => {
      map.invalidateSize(); // Notifies Leaflet to resize the map
    });

    return map;
  }

  addMarker(area, harvestManager, sidebarContent) {
    const marker = L.marker(area.coordinates)
      .addTo(this.map)
      .bindPopup(`Prepared Report for ${area.name}`);

    //click event to populate sidebar
    marker.on("click", () => {
      console.log(marker);
      //fly to animation for clicking specific marker
      this.map.flyTo(marker._latlng, 1, { duration: 1 });

      // Get harvest data for the selected area
      const areaData = harvestManager.harvestByArea(area.name);
      console.log("Harvests for area:", area.name, areaData);

      // Generate sidebar content
      const sidebarHTML = harvestManager.generateSidebarContent(
        areaData,
        area.name
      );
      sidebarContent.innerHTML = sidebarHTML;
    });
  }

  addMarkers(huntingAreas, harvestManager, sidebarContent) {
    huntingAreas.forEach((area) =>
      this.addMarker(area, harvestManager, sidebarContent)
    );
  }
}
