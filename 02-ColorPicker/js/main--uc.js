class ColorList {
  id;
  htmlElement;
  constructor(id) {
    this.id = id;
    this.htmlElement = document.createElement("ul");
    this.htmlElement.classList = "colors";
    this.htmlElement.id = this.id;
    this.render();
  }
  render = _ => {
    document.querySelector("body").appendChild(this.htmlElement);
  };
}

class HSLGenerator {
  randomHue;
  randomSaturation;
  randomLightness;
  hsl;
  constructor() {
    this.generateHSL();
  }
  generateHue = _ => {
    this.randomHue = Math.round(Math.random() * (360 - 1) + 1);
  };
  generateSaturation = _ => {
    this.randomSaturation = Math.round(Math.random() * (79 - 11) + 11) + "%";
  };
  generateLightness = _ => {
    this.randomLightness = Math.round(Math.random() * (100 - 11) + 11) + "%";
  };
  generateHSL = _ => {
    this.generateHue();
    this.generateSaturation();
    this.generateLightness();
    this.hsl = `hsl(${this.randomHue}, ${this.randomSaturation}, ${this.randomLightness})`;
    return this.hsl;
  };
}

class ColorCard {
  id;
  color;
  addToList;
  htmlElement;
  circle;
  text;
  constructor(id, color, addToList) {
    this.is = id;
    this.color = color;
    this.addToList = addToList;
    this.htmlElement = document.createElement("li");
    this.htmlElement.classList = "colors__color";
    this.circle = document.createElement("figure");
    this.circle.classList = "colors__circle";
    this.circle.style.background = this.color;
    this.text = document.createElement("p");
    this.text.classList = "colors__text";
    this.text.innerText = "Copied";
    this.htmlElement.onclick = this.onHTMLElementClick;
    this.render();
  }
  render = _ => {
    this.htmlElement.appendChild(this.circle);
    this.htmlElement.appendChild(this.text);
    this.addToList.appendChild(this.htmlElement);
  };
  onHTMLElementClick = _ => {
    this.circle.classList.toggle("colors__circle--selected");
    if (this.circle.classList.contains("colors__circle--selected")) {
      document.title = this.color;
      window.navigator.clipboard.writeText(this.color);
    }
  };
}

class App {
  colorList;
  HSLGenerator;
  id;
  constructor(id) {
    this.id = id;
    this.colorList = new ColorList(this.id);
    this.HSLGenerator = new HSLGenerator();
    this.generateColorCards();
  }
  generateColorCards = _ => {
    for (let i = 1; i < 101; i++) {
      new ColorCard(
        i,
        this.HSLGenerator.generateHSL(),
        this.colorList.htmlElement
      );
    }
  };
}
new App("js--app");