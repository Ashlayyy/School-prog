class Cookie {
    name = '';
    htmlElement = undefined;
    score = undefined;
    factor = 1;
    ChocoBought = false;
    RedVelBought = false;

    constructor(name, htmlElement, score) {
        this.name = name;
        this.htmlElement = htmlElement;
        this.score = score;
        this.htmlElement.onclick = this.onCookieClick;
    }

    onCookieClick = () => {
        this.score.onCookieClick(this.factor);
    }

    onStyleChange = (style) => {
        if (style == 'black') {
            this.htmlElement.classList.add('cookie--chocolate');
            this.htmlElement.classList.remove('cookie--redVelvet');
        }
        if (style == 'red') {
            this.htmlElement.classList.remove('cookie--chocolate');
            this.htmlElement.classList.add('cookie--redVelvet');
        }
    }

    setFactor = (factor) => {
        this.factor = factor;
    }

    setBought = (ChocoOrRed) => {
        if (ChocoOrRed == 'Choco') {
            this.ChocoBought = true;
        }
        if (ChocoOrRed == 'RedVel') {
            this.RedVelBought = true;
        }
    }
}

class Score {
    score;
    name = '';
    htmlElement = undefined;

    constructor(score, name, htmlElement) {
        this.score = score;
        this.name = name;
        this.htmlElement = htmlElement;
        this.htmlElement.innerText = score;
    }

    onCookieClick = (factorFromCookie) => {
        this.score = this.score + factorFromCookie;
        this.htmlElement.innerText = this.score;
    }

    subtractScore = (minusScore) => {
        this.score = this.score - minusScore;
        this.htmlElement.innerText = this.score;
    }

    onAutoScoreClick = (interval) => {
        setInterval(() => {
            this.score = this.score + 500;
            this.htmlElement.innerText = this.score;
        }, interval)
    }

    addPoints = (points) => {
        this.score = this.score + points;
        this.htmlElement.innerText = this.score;
    }
}

class Multiplier {
    factor = 100;
    htmlElement = undefined;
    cookie = undefined;
    bought = false;

    constructor(factor, htmlElement, cookie) {
        this.htmlElement = htmlElement;
        this.factor = factor;
        this.cookie = cookie;

        this.htmlElement.onclick = this.onMultiplierClick;
    }

    onMultiplierClick = () => {
        if (this.bought == false) {
            if (this.cookie.score.score > 100) {
                this.bought = true;
                this.cookie.score.subtractScore(100);
                this.cookie.factor = this.factor;
            } else alert('Je hebt niet genoeg punten voor deze attribute!')
        }
    }
}

class AutoScore {
    htmlElement = undefined;
    score = undefined;
    bought = false;

    constructor(htmlElement, score) {
        this.htmlElement = htmlElement;
        this.score = score;
        this.htmlElement.onclick = this.onAutoScoreClick;
    }

    onAutoScoreClick = () => {
        if (this.bought == false) {
            if (this.score.score > 100) {
                this.bought = true;
                this.score.subtractScore(100);
                this.score.onAutoScoreClick(10000);
            } else alert('Je hebt niet genoeg punten voor deze attribute!')
        }
    }
}

class ChocolateCookie {
    htmlElement = undefined;
    bought = false;
    cookie = undefined;

    constructor(htmlElement, cookie) {
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onChocolateCookieClick;
    }

    onChocolateCookieClick = () => {
        if (this.bought == false) {
            if (this.cookie.score.score > 1000) {
                this.bought = true;
                this.cookie.score.subtractScore(1000)
                this.cookie.onStyleChange('black');
                this.cookie.score.addPoints(10000);
                this.cookie.setBought('Choco');
                console.log('Bought Black: ', this.bought)
            } else alert('Je hebt niet genoeg punten voor deze skin!')
        }
    }
}

class RedVelvetCookie {
    htmlElement = undefined;
    bought = false;
    cookie = undefined;

    constructor(htmlElement, cookie) {
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onRedvelvetCookieClick;
    }

    onRedvelvetCookieClick = () => {
        if (this.bought == false) {
            if (this.cookie.score.score > 1000) {
                this.bought = true;
                this.cookie.score.subtractScore(1000)
                this.cookie.onStyleChange('red');
                this.cookie.score.addPoints(10000);
                this.cookie.setBought('RedVel');
                console.log('Bought Red: ', this.bought)
            } else alert('Je hebt niet genoeg punten voor deze skin!')
        }
    }
}

class LocalStorage {
    saved = false;
    htmlElement = undefined;
    cookie = undefined;
    multiplier = undefined
    auto = undefined;
    chocolateCookie = undefined;
    redVelvetCookie = undefined;
    score = undefined;
    json = {};

    constructor(htmlElement, cookie, multiplier, auto, chocolateCookie, redVelvetCookie, score, json) {
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.multiplier = multiplier;
        this.auto = auto;
        this.chocolateCookie = chocolateCookie;
        this.redVelvetCookie = redVelvetCookie;
        this.score = score;
        this.json = json;

        this.htmlElement.onclick = this.onSaveClick;
        document.onload = this.loadProgress();
    }

    onSaveClick = () => {
        this.saveProgress();
    }

    saveProgress = () => {

        const stringObjectFromLocal = localStorage.getItem('CookieDough');
        if (stringObjectFromLocal != null) {
            const jsonObject = JSON.parse(stringObjectFromLocal);
        }
        const jsonObject = {
            'Cookie': this.cookie,
            'Multiplier': this.multiplier,
            'Autoscore': this.auto,
            'ChocoCookie': this.chocolateCookie,
            'RedVelvet': this.redVelvetCookie
        };

        console.log('JsonObject: ', jsonObject)

        const stringObject = JSON.stringify(jsonObject);
        localStorage.setItem('CookieDough', stringObject);
        alert('Alles is velig opgeslagen! Je kunt verder gaan waar je bent gebleven de volgende keer dat je online komt.')
    }

    loadProgress = () => {
        const stringObject = localStorage.getItem('CookieDough');
        if (stringObject != null) {
            const confirmation = confirm(`Er is een opgeslagen spel gevonden, wilt u deze laden of een nieuwe starten? Kies ja om hem te laden en nee om een nieuwe te starten en de oude te verwijderen.`)
            if (confirmation) {
                const jsonObject = JSON.parse(stringObject);

                /*
                const tempCookie = jsonObject.Cookie;
                tempCookie.htmlElement = document.getElementById(this.json.Cookies.Cookie.ElementID);
                tempCookie.score.htmlElement = document.getElementById(this.json.Scores.Default.ElementID);
                this.cookie = tempCookie;
                */

                this.cookie.htmlElement = document.getElementById(this.json.Cookies.Cookie.ElementID)
                this.cookie.score.htmlElement = document.getElementById(this.json.Scores.Default.ElementID);
                this.cookie.score.score = jsonObject.Cookie.score.score;
                this.cookie.score.htmlElement.innerText = this.cookie.score.score;
                this.cookie.ChocoBought = jsonObject.Cookie.ChocoBought;
                this.cookie.RedVelBought = jsonObject.Cookie.RedVelBought;

                this.multiplier.htmlElement = document.getElementById(this.json.Advanced.Multiplier.ElementID);
                this.multiplier.cookie = this.cookie;
                if (jsonObject.Multiplier.bought == true) {
                    this.multiplier.bought = true;
                    this.cookie.factor = this.multiplier.factor;
                    this.cookie.setFactor(this.multiplier.factor);
                }

                const tempAuto = jsonObject.Autoscore;
                tempAuto.htmlElement = document.getElementById(this.json.Advanced.AutoScore.ElementID);
                if (tempAuto.bought == true) {
                    this.score.onAutoScoreClick()
                };
                tempAuto.cookie = this.cookie;
                this.auto = tempAuto;

                const tempChocoCookie = jsonObject.ChocoCookie;
                tempChocoCookie.htmlElement = document.getElementById(this.json.Cookies.ChocoCookie.ElementID);
                tempChocoCookie.cookie = this.cookie;
                tempChocoCookie.bought = this.cookie.ChocoBought;
                this.chocolateCookie = tempChocoCookie;

                const tempRedvelvet = jsonObject.RedVelvet;
                tempRedvelvet.htmlElement = document.getElementById(this.json.Cookies.RedVelvetCookie.ElementID);
                tempRedvelvet.cookie = this.cookie;
                tempRedvelvet.bought = this.cookie.RedVelBought;
                this.redVelvetCookie = tempRedvelvet;

                if (tempChocoCookie.bought == true && tempRedvelvet.bought == false) {
                    this.cookie.onStyleChange('black');
                } else if (tempChocoCookie.bought == false && tempRedvelvet.bought == true) {
                    this.cookie.onStyleChange('red');
                } else if (tempChocoCookie.bought == true && tempRedvelvet.bought == true) {
                    this.cookie.onStyleChange('red');
                } else console.log(` Bought:
                TempChoco: ${tempChocoCookie.bought}
                TempRed: ${tempRedvelvet.bought}

                Choco: ${this.chocolateCookie.bought}
                Red: ${this.redVelvetCookie.bought}

                CookieChoco: ${this.cookie.ChocoBought}
                CookieRed: ${this.cookie.RedVelBought}
                `)

                this.cookie.score.htmlElement.innerText = this.cookie.score.score;
                this.score.score = this.cookie.score.score;

                alert('Alles is goed gezet!')
            }
        }
    }
}


class CookieFetch {
    fileName = undefined;
    result = undefined;

    fetchJSON = async (fileName) => {
        this.result = await fetch(fileName);
        this.result = await this.result.json();
        return this.result;
    }
}

class Setup {
    cookieFetch = undefined;
    json = {};
    mobile = false;

    cookie = undefined;
    score = undefined;

    multiplier = undefined;
    mobileMultiplier
    autoscore = undefined;
    mobileAutoScore = undefined;

    chocolateCookie = undefined;
    mobileChocolateCookie
    redVelvetCookie = undefined;
    mobileRedvelvetCookie = undefined;

    storage = undefined;

    constructor() {
        this.cookieFetch = new CookieFetch()
    }

    setJSON = async _ => {
        this.json = await this.cookieFetch.fetchJSON('json/info.json');
    }

    setScore = _ => {
        /*
        Requires:
            Default Score   ->  Score to start at
            Name            ->  Name
            ElementID       ->  HTMl Element
        */
        this.score = new Score(this.json.Scores.Default.Start, this.json.Scores.Default.Name, document.getElementById(this.json.Scores.Default.ElementID));
    }

    setCookie = _ => {
        /*
        Requires:
            Name            ->  Name
            ElementID       ->  HTML Element
            Score           ->  Class Score
        */

        this.cookie = new Cookie(this.json.Cookies.Cookie.Name, document.getElementById(this.json.Cookies.Cookie.ElementID), this.score);
    }

    setMultiplier = _ => {
        /*
        Requires:
            Factor          ->  Factor To Change To
            ElementID       ->  HTML Element
            Cookie          ->  Class Cookie
        */

        /* Desktop */
        this.multiplier = new Multiplier(this.json.Advanced.Multiplier.Factor, document.getElementById(this.json.Advanced.Multiplier.ElementID), this.cookie);

        /* Mobile */
        this.mobileMultiplier = new Multiplier(this.json.Advanced.Multiplier.Factor, document.getElementById(this.json.Advanced.Multiplier.MobileElementID), this.cookie);
    }

    setAutoScore = _ => {
        /*
        Requires:
            ElementID       ->  HTML Element
            Score           ->  Class Score
        */

        /* Desktop */
        this.autoscore = new AutoScore(document.getElementById(this.json.Advanced.AutoScore.ElementID), this.score)

        /* Mobile */
        this.mobileAutoScore = new AutoScore(document.getElementById(this.json.Advanced.AutoScore.MobileElementID), this.score)
    }

    setChocoCookie = _ => {
        /*
        Requires:
            ElementID       ->  HTML Element
            Cookie          ->  Class Cookie
        */

        /* Desktop */
        this.chocolateCookie = new ChocolateCookie(document.getElementById(this.json.Cookies.ChocoCookie.ElementID), this.cookie);

        /* Mobile */
        this.MobilechocolateCookie = new ChocolateCookie(document.getElementById(this.json.Cookies.ChocoCookie.MobileElementID), this.cookie);
    }

    setRedVelvetCookie = _ => {
        /*
        Requires:
            ElementID       ->  HTML Element
            Cookie          ->  Class Cookie
        */

        /* Desktop */
        this.redVelvetCookie = new RedVelvetCookie(document.getElementById(this.json.Cookies.RedVelvetCookie.ElementID), this.cookie);

        /* Mobile */
        this.mobileRedvelvetCookie = new RedVelvetCookie(document.getElementById(this.json.Cookies.RedVelvetCookie.MobileElementID), this.cookie);
    }

    setStorage = _ => {
        /*
        Requires:
            ElementID       ->  HTML Element
            Cookie          ->  Class Cookie
            Multiplier      ->  Class Multiplier
            AutoScore       ->  Class AutoScore
            ChocoCookie     ->  Class ChocolateCookie
            RedVelvetCookie ->  Class RedVelvetCookie
            Score           ->  Class Score
        */

        /* Desktop */
        this.storage = new LocalStorage(document.getElementById(this.json.Storage.ElementID), this.cookie, this.multiplier,
            this.autoscore, this.chocolateCookie, this.redVelvetCookie, this.score, this.json);

        /* Mobile yet to be inplemented */
    }

    setAll = async _ => {
        await this.setJSON();
        this.setScore();
        this.setCookie();
        this.setMultiplier();
        this.setAutoScore();
        this.setChocoCookie();
        this.setRedVelvetCookie();
        this.setStorage();
    }
}

let setup = new Setup();
setup.setAll();

/*
//Setup Cookie en Score
const score = new Score(0, 'Default Score', document.getElementById('js--score'));
const cookie = new Cookie('Default Cookie', document.getElementById('js--cookie'), score);

//Setup Desktop
const multiplier = new Multiplier(100, document.getElementById('js--multiplier'), cookie);
const auto = new AutoScore(document.getElementById('js--autoscore'), score);
const chocolateCookie = new ChocolateCookie(document.getElementById('js--chocolate'), cookie);
const redVelvetCookie = new RedVelvetCookie(document.getElementById('js--redVelvet'), cookie);

//Setup Mobile
const multiplierMobile = new Multiplier(100, document.getElementById('js--multiplier--mobile'), cookie);
const autoMobile = new AutoScore(document.getElementById('js--autoscore--mobile'), score);
const chocolateCookieMobile = new ChocolateCookie(document.getElementById('js--chocolate--mobile'), cookie);
const redVelvetCookieMobile = new RedVelvetCookie(document.getElementById('js--redVelvet--mobile'), cookie);

//Setup LocalStorage
const storage = new LocalStorage(document.getElementById('js--save'), cookie, multiplier, auto, chocolateCookie, redVelvetCookie, score);
*/