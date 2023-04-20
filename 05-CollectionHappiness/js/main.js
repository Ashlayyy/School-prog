class Header {
    headerElement = undefined;
    logoElement = undefined;
    logoTextElement = undefined;
    placeToRender = undefined;

    constructor(placeToRender) {
        this.placeToRender = placeToRender;

        this.headerElement = document.createElement('header');
        this.logoElement = document.createElement('i');
        this.logoTextElement = document.createElement('h2');

        this.headerElement.classList = 'header';
        this.logoElement.classList = 'header__logo fa-sharp fa-regular fa-face-smile';
        this.logoTextElement.classList = 'header__logoText';
        this.logoTextElement.innerText = 'Collection Of Happiness';

        this.render();
    }

    render = () => {
        this.placeToRender.appendChild(this.headerElement);
        this.headerElement.appendChild(this.logoElement);
        this.headerElement.appendChild(this.logoTextElement);
    }
}

class Footer {
    constructor() {

    }
}

class LeftPanel {
    constructor() {

    }
}

class DetailCard {
    constructor() {

    }
}

class RightPanel {
    DetailCard = undefined;
    
    constructor() {

    }
}

class GetData {
    url = undefined;
    data = undefined;

    constructor (url) {
        this.url = url;
    }

    fetchData = async () => {
        this.data = await (await fetch(this.url)).json();
    }
}

class App {
    //Undefined variables
    Header = undefined;
    Footer = undefined;
    LeftPanel = undefined;
    RightPanel = undefined;
    GetData = undefined;

    placeToRender = undefined;

    //Defined Variables
    url = 'data/data.json';

    constructor() {
        this.placeToRender = document.getElementsByTagName('body')[0];

        this.Header = new Header(this.placeToRender);
        this.Footer = new Footer(this.placeToRender);
        this.LeftPanel = new LeftPanel(this.placeToRender);
        this.RightPanel = new RightPanel(this.placeToRender);
        this.GetData = new GetData(this.url);

        this.GetData.fetchData();
    }
}

const app = new App();