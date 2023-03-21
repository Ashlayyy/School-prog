class Cookie {
    name = '';
    htmlElement = undefined;
    score = undefined;
    factor = 1;

    constructor(name, htmlElement, score) {
        this.name = name;
        this.htmlElement = htmlElement;
        this.htmlElement.onclick = this.onCookieClick;
        this.score = score;
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

    onAutoScoreClick = () => {
        setInterval(() => {
            this.score = this.score + 500;
            this.htmlElement.innerText = this.score;
        }, 10000)
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
                this.score.onAutoScoreClick();
            } else alert('Je hebt niet genoeg punten voor deze attribute!')
        }
    }
}

class ChocolateCookie {
    htmlElement = undefined;
    bought = false;
    cookie = undefined;

    constructor (htmlElement, cookie) {
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
            } else alert('Je hebt niet genoeg punten voor deze skin!')
        }
    }
}

class RedVelvetCookie {
    htmlElement = undefined;
    bought = false;
    cookie = undefined;

    constructor (htmlElement, cookie) {
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

    constructor (htmlElement, cookie, multiplier, auto, chocolateCookie, redVelvetCookie, score) {
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.multiplier = multiplier;
        this.auto = auto;
        this.chocolateCookie = chocolateCookie;
        this.redVelvetCookie = redVelvetCookie;

        this.score = score;

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
            'Cookie': cookie,
            'Multiplier': multiplier,
            'Autoscore': auto,
            'ChocoCookie': chocolateCookie,
            'RedVelvet': redVelvetCookie
        };



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

                const tempCookie = jsonObject.Cookie;
                tempCookie.htmlElement = document.getElementById('js--cookie');
                tempCookie.score.htmlElement = document.getElementById('js--score');
                this.cookie = tempCookie;

                const tempMultiplier = jsonObject.Multiplier;
                tempMultiplier.htmlElement = document.getElementById('js--multiplier');
                tempMultiplier.cookie = this.cookie;
                if (tempMultiplier.bought == true) {
                    this.cookie.factor = tempMultiplier.factor;
                    cookie.setFactor(tempMultiplier.factor);
                }
                this.multiplier = tempMultiplier;

                const tempAuto = jsonObject.Autoscore;
                tempAuto.htmlElement = document.getElementById('js--autoscore');
                if(tempAuto.bought == true) {
                    this.score.onAutoScoreClick()
                };
                tempAuto.cookie = this.cookie;
                this.auto = tempAuto;

                const tempChocoCookie = jsonObject.ChocoCookie;
                tempChocoCookie.htmlElement = document.getElementById('js--chocolate');
                tempChocoCookie.cookie = this.cookie;
                this.chocolateCookie = tempChocoCookie;

                const tempRedvelvet = jsonObject.ChocoCookie;
                tempRedvelvet.htmlElement = document.getElementById('js--redVelvet');
                tempRedvelvet.cookie = this.cookie;
                this.redVelvetCookie = tempRedvelvet;

                if (tempChocoCookie.bought == true && tempRedvelvet.bought == false) {
                    cookie.onStyleChange('black');
                } else if (tempChocoCookie.bought == false && tempRedvelvet.bought == true) {
                    cookie.onStyleChange('red');
                } else if (tempChocoCookie.bought == true && tempRedvelvet.bought == true) {
                    cookie.onStyleChange('red');
                } else console.log(tempChocoCookie.bought, tempRedvelvet.bought)

                this.cookie.score.htmlElement.innerText = this.cookie.score.score;
                this.score.score = this.cookie.score.score;

                alert('Alles is weer goed gezet!')
            }
        }
    }
}


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
