import Harvest from "./harvest.js";
import { keys, rawQuanticoHarvest } from "./harvestData.js";

export default class HarvestManager {
  constructor(rawData, keys) {
    this.keys = keys;
    this.harvests = this.parseData(rawData);
  }

  parseData(rawData) {
    const rows = rawData.trim().split("\n");
    // console.log(rows);
    return rows.map((row) => {
      // Replace multiple spaces with a single tab for consistent splitting
      const cleanedRow = row.replace(/\s+/g, "\t").trim();
      const values = cleanedRow.split("\t");
      //Mapping keys to values
      const rowObject = {};
      this.keys.forEach((key, index) => {
        rowObject[key] =
          values[index]?.trim() !== "-" ? values[index]?.trim() : null;
      });

      // Return a new Harvest instance
      return new Harvest(
        rowObject.id,
        rowObject.date,
        rowObject.age,
        rowObject.sex,
        rowObject.points,
        rowObject.weight,
        rowObject.area,
        rowObject.beamLength,
        rowObject.outsideSpread
      );
    });
  }

  addImageToSpecificId(id, image) {
    const record = this.harvests.find((harvest) => harvest.id === id);
    if (record) {
      record.image = image;
    } else {
      `No record found for ${id}`;
    }
  }

  harvestByArea(x) {
    if (typeof x !== "string") {
      console.warn(`${x} is not a string. Expecting a string`);
    }

    const areaData = this.harvests.filter(
      (harvest) => harvest.area.toLowerCase() === x.toLowerCase()
    );

    if (areaData.length === 0) {
      console.warn(`Not data found for ${x}`);
    }
    console.log(areaData);
    return areaData;
  }

  generateSidebarContent(harvests, area) {
    const harvestHTML = harvests
      .map((filteredArea) => {
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
          filteredArea.points !== null
            ? `<br>Points: ${filteredArea.points}`
            : "";
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
      })
      .join(""); //remove the comma between data sets

    return `
      <h2>AREA: ${area} </h2>
      <h3>TOTAL: ${harvests.length}</h3>
      <div>${harvestHTML}</div>
      `;
  }
}
