const colors = document.getElementsByClassName('colors__color');
for (let i = 0; i < colors.length; i++) {
    let randomHue = Math.round(Math.random() * (360 - 1) + 1);
    let randomSaturation = Math.round(Math.random() * (79 - 11) + 11) + '%';
    let randomLightness = Math.round(Math.random() * (100 - 11) + 11) + '%';
    colors[i].children[0].style.background = `hsl(${randomHue} ${randomSaturation} ${randomLightness})`;
    colors[i].onclick = () => {
        colors[i].children[0].classList.toggle('colors__circle--selected');
        navigator.clipboard.writeText(colors[i].children[0].style.background);
        document.title = colors[i].children[0].style.background;
    }
}