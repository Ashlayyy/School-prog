/* ColorList */
/* Maakt een class (blauwdruk) voor een ColorList*/
class ColorList {
    /* Zet de property id avaible via this.id */
    id;
    /* Zet de property htmlElement avaible via this.htmlElement */
    htmlElement;

    /* Maakt de constructor aan  die een value voor id krijgt*/
    constructor(id) {
        /* Zet this.id naar het id wat zojuist is binnengekomen */
        this.id = id;
        /* Zet this.htlElement naar een ul element wat gemaakt wordt */
        this.htmlElement = document.createElement('ul');
        /* Veranderd this.htmlElement's classlist naar colors */
        this.htmlElement.classList = 'colors';
        /* Zet de id van this.htmlElement naar het id wat binnengekomen is */
        this.htmlElement.id = this.id;
        /* Roept de render functie aan */
        this.render();
        /* Sluit de functie af */
    }

    /* Maakt een render functie aan in deze class */
    render = _ => {
        /* Pakt de body vanauit het document en voegt het ColorList element eraan toe */
        document.querySelector('body').appendChild(this.htmlElement);
        /* Sluit de functie af */
    }
    /* Sluit de functie af */
}


/* HSL Generator */
/* maakt een class aan voor de HSL Generator */
class HSLGenerator {
    /* Opent de property randomHue */
    randomHue;
    /* Opent de property randomSaturation */
    randomSaturation;
    /* Opent de property randomLightness */
    randomLightness;
    /* Opent de property hsl */
    hsl;

    /* Maakt de constructor aan, gaat af zodra je het new keyword gebruikt */
    constructor() {
        /* Roept de functie generateHSL aan */
        this.generateHSL();
        /* Sluit de functie af */
    }

    /* Maakt een functie aan genaamd generateHue */
    generateHue = _ => {
        /* Generate de hue gebaseerd op Math.random */
        this.randomHue = Math.round(Math.random() * (360 - 1) + 1);
        /* Sluit de functie af */
    }

    /* Maakt een functie aan genaamd generateSaturation */
    generateSaturation = _ => {
        /* Generate de saturation gebaseerd op Math.random */
        this.randomSaturation = Math.round(Math.random() * (79 - 11) + 11) + '%';
        /* Sluit de functie af */
    }

    /* Maakt een functie aan genaamd generateLightness */
    generateLightness = _ => {
        /* Generate de lightness gebaseerd op Math.random */
        this.randomLightness = Math.round(Math.random() * (100 - 11) + 11) + '%';
        /* Sluit de functie af */
    }
    /* Maakt een functie aan genaamd generateHSL */
    generateHSL = _ => {
        /* Roept de functie generateHue aan */
        this.generateHue();
        /* Roept de functie generateSaturation aan */
        this.generateSaturation();
        /* Roept de functie generateLightness aan */
        this.generateLightness();
        /* Veranderd de variable this.hsl in de hsl waarde die gemaakt wordt met de randomHue, randomSaturation en randomLightness */
        this.hsl = `hsl(${this.randomHue}, ${this.randomSaturation}, ${this.randomLightness})`;
        /* Returnt de hsl waarde die we zojuist hebben aangemaakt */
        return this.hsl;
        /* Sluit de functie af */
    }
    /* Sluit de functie af */
}

/* Color Card */
/* Maakt een class aan voor ColorCard */
class ColorCard {
    /* Maakt de property id aan */
    id;
    /* Maakt de property color aan */
    color;
    /* Maakt de property addToList aan, kan een betere naam */
    addToList;
    /* Maakt de property htmlElement aan */
    htmlElement;
    /* Maakt de property circle aan */
    circle;
    /* Maakt de property text aan */
    text;

    /* Maakt de constructor aan, wordt aangeroepen wanneer je new gebruikt, gebruikt de properties id, color en addToList */
    constructor(id, color, addToList) {
        /* Veranderd this.id naar de id die is binnen gekomen */
        this.is = id;
        /* Veranderd this.color naar de color die is binnen gekomen */
        this.color = color;
        /* Veranderd this.addToList naar de addToList die is binnen gekomen */
        this.addToList = addToList;

        /* Maakt een li element aan en stopt hem in this.htmlElement */
        this.htmlElement = document.createElement('li');
        /* Geeft een class aan dat element */
        this.htmlElement.classList = 'colors__color';

        /* Maakt een figure element aan en stopt die in this.cirlce */
        this.circle = document.createElement('figure');
        /* Voegt de class toe aan het element */
        this.circle.classList = 'colors__circle';
        /* En veranderd de color naar de color die is opgeslagen in this.color */
        this.circle.style.background = this.color;

        /* Maakt een p element aan en stopt het in this.text */
        this.text = document.createElement('p');
        /* Veranderd de classList naar colors__text */
        this.text.classList = 'colors__text';
        /* Voegt de text toe die er in moet staan */
        this.text.innerText = 'Copied';

        /* Voegt een onclick toe aan het htmlElement dat als eerste is aangemaakt */
        this.htmlElement.onclick = this.onHTMLElementClick;
        /* Roept de render functie aan */
        this.render();
        /* Sluit de functie af */
    }

    /* Maakt een render functie aan */
    render = _ => {
        /* Voegt this.cirlce's htmlelement toe aan this.htmlElement als kind*/
        this.htmlElement.appendChild(this.circle);
        /* Voegt de text toe aan de color card die we aanmaken */
        this.htmlElement.appendChild(this.text);
        /* Voegt de hele color card toe aan de lijst die alles omhult */
        this.addToList.appendChild(this.htmlElement);
        /* Sluit de functie af */
    }
    /* Maakt een functie genaamd onHTMLElementClick aan */
    onHTMLElementClick = _ => {
        /* Voegt toe of haalt weg de class colors__circle--selected wanneer je op de circle klikt */
        this.circle.classList.toggle('colors__circle--selected');
        /* Checkt om te kijken of er een specifieke waarde in de classlist zit van de circle */
        if (this.circle.classList.contains('colors__circle--selected')) {
            /* Veranderd de titel van het document naar de kleur */
            document.title = this.color;
            /* Tegelijkertijd vult hij de kleur waarde in HSL op je copy-paste, dus je kan hem makkelijk plakken ergens anders */
            window.navigator.clipboard.writeText(this.color);
            /* Sluit de if statement af */
        }
        /* Sluit de functie af */
    }
    /* Sluit de functie af */
}

/* App */
/* Maakt de app aan */
class App {
    /* Opent colorList variable */
    colorList;
    /* Opent HSLgenerator variable */
    HSLGenerator;
    /* Opent id variable */
    id;

    /* Maakt de constructor aan en hij krijgt een id */
    constructor(id) {
        /* Zet het id wat we net hebben gekregen in de variable id */
        this.id = id;
        /* Maakt een nieuwe ColorList aan, en geeft de id mee */
        this.colorList = new ColorList(this.id);
        /* maakt een nieuwe HSLGenerator aan */
        this.HSLGenerator = new HSLGenerator();
        /* Voert een functie uit genaamt generatorColorCards */
        this.generateColorCards();
        /* Sluit de functie af */
    }

    /* Maakt een functie genaamt generator ColorCards aan */
    generateColorCards = _ => {
        /* maakt een for loop aan die loopt van 1 tot 100 */
        for (let i = 1; i < 101; i++) {
            /* Maakt elke keer dat de for loop naar een nieuw nummer gaat een nieuwe ColorCard aan */
            /* Geeft een id, de color en het html element waarin hij moet komen te staan mee */
            new ColorCard(i, this.HSLGenerator.generateHSL(), this.colorList.htmlElement);
            /* Sluit de for loop af */
        }
        /* Sluit de functie af */
    }
    /* Sluit de functie af */
}

/* Client */
/* Maakt een nieuwe app aan, deze zorgt ervoor dat alles werkt in deze applicatie */
new App('js--app');