class Header {
    constructor() {

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

    //Defined Variables
    url = 'data/data.json';

    constructor() {
        this.Header = new Header();
        this.Footer = new Footer();
        this.LeftPanel = new LeftPanel();
        this.RightPanel = new RightPanel();
        this.GetData = new GetData(this.url);

        this.GetData.fetchData();
    }
}

const app = new App();