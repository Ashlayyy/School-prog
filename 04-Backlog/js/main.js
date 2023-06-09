class Api {
    data = undefined;

    getData = async () => {
        await fetch('./data/games.json').then(async res => {
            return await res.json();
        }).then(data => {
            this.data = data.games;
        })
        return;
    }
}

class UrlScraper {
    currentUrl;
    platform;
    Pretty;

    constructor() {
        this.currentUrl = window.location.href;
    }

    getDataFromUrl = () => {
        this.platform = this.currentUrl.split('platform=')[1];
        this.Pretty = new PrettyPlatform(this.platform);
        this.platform = this.Pretty.platform;
    }
}

class PrettyPlatform {
    platform;
    constructor (platform) {
        this.platform = platform;
        this.toUperCase();
        this.removeWhiteSpace();
    }

    toUperCase = () => {
        this.platform = this.platform.toUpperCase();
    }

    removeWhiteSpace = () => {
        this.platform = this.platform.replaceAll(' ', '');
        this.platform = this.platform.replaceAll('%20', '')
    }
}

class Filter {
    results = [];

    filter = (platform, data) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].platform == platform) {
                this.results.push(data[i]);
            }
        }
    }

    randomFromResult = () => {
        let randomNumber = Math.floor(Math.random() * this.results.length);
        return this.results[randomNumber];
    }
}

class Render {
    render = (randomResult) => {
        this.body = document.getElementsByTagName('body')[0];
        this.articleToRender = document.createElement('article');
        this.headingToRender = document.createElement('h1');

        this.articleToRender.classList = 'card';
        this.headingToRender.classList = 'card__heading';
        this.headingToRender.innerText = randomResult.titel;

        this.body.appendChild(this.articleToRender);
        this.articleToRender.appendChild(this.headingToRender);
    }
}

class App {
    Api = undefined;
    filter = undefined;
    urlScraper = undefined;
    render = undefined;

    constructor() {
        this.Api = new Api();
        this.filter = new Filter();
        this.urlScraper = new UrlScraper();

        this.urlScraper.getDataFromUrl();
        this.Api.getData().then(() => {
            this.filter.filter(this.urlScraper.platform, this.Api.data)
            this.render = new Render().render(this.filter.randomFromResult());
        });
    }
}

const app = new App();