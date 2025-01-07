

export default class Harvest {
  constructor(
    id,
    date,
    age,
    sex,
    points,
    weight,
    area,
    beamLength,
    outsideSpread,
    image = null
  ) {
    this.id = id;
    this.date = date;
    this.age = age;
    this.sex = sex;
    this.points = points;
    this.weight = weight;
    this.area = area;
    this.beamLength = beamLength;
    this.outsideSpread = outsideSpread;
    this.image = image;
  }

  formatSidedBar() {
    return `
    <p>Date: ${this.date}</p>
    <p>Sex: ${this.sex}</p>
    <p>Age: ${this.age}</p>
    <p>Weight: ${this.weight} lbs</p>
    ${this.points ? `<p>Points: ${this.points}</p>` : ""}
    ${this.beamLength ? `<p>Beam Length: ${this.beamLength} in</p>` : ""}
    ${
      this.outsideSpread
        ? `<p>Outside Spread: ${this.outsideSpread} in</p>`
        : ""
    }
    ${
      this.image
        ? `<img src="${this.image}" alt="Harvest Image" class="harvest-image" />`
        : ""
    }
  `;
  }
}


