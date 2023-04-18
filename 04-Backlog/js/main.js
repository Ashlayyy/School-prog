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
        console.log(this.results[randomNumber]);
    }
}

class App {
    Api = undefined;
    filter = undefined;
    urlScraper = undefined;

    constructor() {
        this.Api = new Api();
        this.filter = new Filter();
        this.urlScraper = new UrlScraper();

        this.urlScraper.getDataFromUrl();
        this.Api.getData().then(() => {
            this.filter.filter(this.urlScraper.platform, this.Api.data)
            let randomResult = this.filter.randomFromResult();
            const articleToRender = document.createElement('article');
            
        });
    }
}

const app = new App();