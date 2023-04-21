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
        this.logoElement.classList = 'header__logo fa-sharp fa-regular fa-face-smile fa-2x';
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
    footerElement = undefined;
    textElement = undefined;
    placeToRender = undefined;

    constructor(placeToRender) {
        this.placeToRender = placeToRender;
        this.footerElement = document.createElement('footer');
        this.textElement = document.createElement('h6');

        this.footerElement.classList = 'footer';
        this.textElement.classList = 'footer__text';
        this.textElement.innerText = 'Gemaakt door - Ashlay Steur SD2C MediaCollege'

        this.render();
    }

    render = () => {
        this.placeToRender.appendChild(this.footerElement);
        this.footerElement.appendChild(this.textElement);
    }
}

class Card {
    constructor (placeToRender, data, number, LeftPanel) {
        this.placeToRender = placeToRender;
        this.data = data;
        this.number = number;
        this.LeftPanel = LeftPanel;

        this.wrapElement = document.createElement('section');
        this.backImageElement = document.createElement('div');
        this.dateElement = document.createElement('h4');
        this.titleElement = document.createElement('h4');

        this.wrapElement.classList = 'card';
        this.backImageElement.classList = 'card__backgroundImage';
        this.dateElement.classList = 'card__date';
        this.titleElement.classList = 'card__title';

        this.dateElement.innerText = this.data['date (dd-mm-yyyy)'];
        this.titleElement.innerText = this.data['title'];
        this.backImageElement.style.backgroundImage = `/img/picture-${number}.webp`;
        this.wrapElement.id = this.LeftPanel.podCasts[number];
        this.dateElement.id = this.LeftPanel.podCasts[number];
        this.titleElement.id = this.LeftPanel.podCasts[number];

        this.render();
        this.setClickListener();
    }
    
    render = () => {
        this.placeToRender.appendChild(this.wrapElement);
        this.wrapElement.appendChild(this.backImageElement);
        this.backImageElement.appendChild(this.dateElement);
        this.backImageElement.appendChild(this.titleElement);
    }

    setClickListener = () => {
        this.wrapElement.addEventListener('click', (event) => {
            this.LeftPanel.acceptCallFromCard(event);
        })
    }
}

class LeftPanel {
    sectionElement = undefined;
    placeToRender = undefined;
    data = undefined;
    app = undefined;
    podCasts = undefined;

    constructor(placeToRender, data, app, podCasts) {
        this.placeToRender = placeToRender;
        this.data = data;
        this.app = app;
        this.podCasts = podCasts;

        this.sectionElement = document.createElement('section');
        this.sectionElement.classList = 'LeftPanel';

        for(let i = 0; i < 4; i++) {
            this.sectionElement.appendChild(new Card(this.sectionElement, this.data[podCasts[i]], i, this).wrapElement);
        }

        this.render();
    }

    acceptCallFromCard = (event) => {   
        this.app.handleCallFromLeft(event);
    }

    render = () => {
        this.placeToRender.appendChild(this.sectionElement);
    }
}

class DetailCard {
    wrapElement = undefined;
    backImageElement = undefined;
    dateElement = undefined;
    titleElement = undefined;
    summaryElement = undefined;
    buttonWrapElement = undefined;
    buttonElement = undefined;
    audioElement = undefined;

    placeToRender = undefined;
    data = undefined;

    constructor(placeToRender, data) {
        this.placeToRender = placeToRender;
        this.data = data;

        this.wrapElement = document.createElement('section');
        this.backImageElement = document.createElement('div');
        this.dateElement = document.createElement('h4');
        this.titleElement = document.createElement('h4');
        this.summaryElement = document.createElement('p');
        this.buttonWrapElement = document.createElement('div');
        this.buttonElement = document.createElement('button');
        this.audioElement = document.createElement('audio');

        this.setClasses();
        this.setSpecialAtributes();
        this.render();
    }

    setClasses = () => {
        this.wrapElement.classList = 'detail';
        this.backImageElement.classList = 'detail__backgroundImage';
        this.dateElement.classList = 'detail__date';
        this.titleElement.classList = 'detail__title';
        this.summaryElement.classList = 'detail__summary';
        this.buttonWrapElement.classList = 'detail__wrap';
        this.buttonElement.classList = 'detail__button';
        this.audioElement.classList = 'detail__audio';
    }

    setSpecialAtributes = () => {
        this.dateElement.innerText = this.data['date (dd-mm-yyyy)'];
        this.titleElement.innerText = this.data['title'];
        this.summaryElement.innerText = this.data['summary'];
        this.buttonElement.href = this.data['url'];
        this.audioElement.src = this.data['audio'];
    }

    render = () => {
        this.placeToRender.appendChild(this.wrapElement);
        this.wrapElement.appendChild(this.backImageElement);
        this.backImageElement.appendChild(this.dateElement);
        this.backImageElement.appendChild(this.titleElement);
        this.wrapElement.appendChild(this.summaryElement);
        this.wrapElement.appendChild(this.buttonWrapElement);
        this.buttonWrapElement.appendChild(this.buttonElement);
        this.buttonWrapElement.appendChild(this.audioElement);
    }
}

class RightPanel {
    DetailCard = undefined;
    placeToRender = undefined;
    data = undefined;
    numArray = undefined;
    
    constructor(placeToRender, data, numArray) {
        this.placeToRender = placeToRender;
        this.data = data;
        this.numArray = numArray;

        this.sectionElement = document.createElement('section');
        this.sectionElement.classList = 'RightPanel';

        this.DetailCard = new DetailCard(this.sectionElement, this.data[this.numArray[0]]);

        this.render();
    }

    acceptCallFromApp = (data) => {
        this.sectionElement.innerHTML = '';
        this.DetailCard = new DetailCard(this.sectionElement, data);
    }

    render = () => {
        this.placeToRender.appendChild(this.sectionElement);
    }
}

class GetData {
    url = undefined;
    data = undefined;

    constructor (url) {
        this.url = url;
    }

    fetchData = async () => {
        this.data = await fetch(this.url);
        this.data = await this.data.json().then(data => {
            return data
        });
        return this.data;
    }
}

class RandomNumber {
    array;

    constructor(array) {
        this.array = array;

        this.i = this.array.length;
        this.j = 0;
        this.temp = [];
        while (this.i--) {
            this.j = Math.floor(Math.random() * (this.i + 1));
            this.temp = this.array[this.i];
            this.array[this.i] = this.array[this.j];
            this.array[this.j] = this.temp;
        }
    }
}

class RandomEpisodes {
    array = [];
    randomNum = [];

    constructor () {
        this.randomNum = new RandomNumber([0, 1, 2, 3, 4, 5, 6]).array;

        for(let i = 0; i < 4; i++) {
            this.array.push(this.randomNum[i]);
        }
        return this.array;
    }
}

class App {
    //Undefined variables
    Header = undefined;
    Footer = undefined;
    LeftPanel = undefined;
    RightPanel = undefined;
    GetData = undefined;
    RandomEpisodes = undefined;
    placeToRender = undefined;
    data = undefined;

    //Defined Variables
    url = 'data/data.json';

    constructor() {
        this.placeToRender = document.getElementsByTagName('body')[0];

        this.GetData = new GetData(this.url);
        this.GetData.fetchData().then((data) => {
            this.data = data.episodes;
            this.RandomEpisodes = new RandomEpisodes(this.data)
            this.Header = new Header(this.placeToRender);
            this.LeftPanel = new LeftPanel(this.placeToRender, this.data, this, this.RandomEpisodes);
            this.RightPanel = new RightPanel(this.placeToRender,this.data, this.RandomEpisodes);
            this.Footer = new Footer(this.placeToRender);
        });
    }

    handleCallFromLeft = (event) => [
        this.RightPanel.acceptCallFromApp(this.data[event.target.id])
    ]
}

const app = new App();