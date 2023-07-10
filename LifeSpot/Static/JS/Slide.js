// массив ссылок на картинки
const nameOfPictures = [
    "https://localhost:5001/Static/SlidePictures/spb.jpg",
    "https://localhost:5001/Static/SlidePictures/london.jpg",
    "https://localhost:5001/Static/SlidePictures/ny.jpg",
    "https://localhost:5001/Static/SlidePictures/tokyoCut.jpg"
];
let startW;
let startH;
// тест
// выравнивает div с кружками примерно по центру slider'а,
// задаёт startW - изначальная ширина слайдера, с которой
// потом сравнивается его же ширина после события resize,
// чтобы выполнилось изменение положения трекера moveTracker()
// также запоминает начальныt ширину и высоту window
function setTracker() {
    const sldr = document.getElementsByClassName('slider')[0];
    if (sldr == undefined) {
        console.log('error!');
    }
    else {
        foo(sldr);
        startW = window.innerWidth;
        startH = window.innerHeight;
        let sliderWidth = +getComputedStyle(sldr).width.replace('px', '');
        let trackerWidth = +getComputedStyle(sldr.children[1]).width.replace('px', '');
        sldr.children[1].style.marginLeft = (sliderWidth / 2) - (trackerWidth / 2) + 'px';
    }
}

// вывод ссылки на текущую картинку в консоль
function foo(x) {
    let g = new Array();
    for (let ch of Array.from(x.children)) {
        let v = ch.querySelector('img');
        if (v != null) {
            g.push(v.src);
        }
    }
    console.log(g)
}

// красит кружок соответствующий текущей картинке
// direction 'от первого к последнему' - true
// direction 'от последнего к первому' - false
function changeBubble(bubbles, index, direction) {
    if (direction == true) {
        if (index != 0) {
            bubbles[index].style.backgroundColor = "#ae4c4c";
            bubbles[index].previousElementSibling.style.backgroundColor = "#d32d2d";
        }
        else {
            bubbles[index].style.backgroundColor = "#ae4c4c";
            bubbles[bubbles.length - 1].style.backgroundColor = "#d32d2d";
        }
    }
    else {
        if (index != bubbles.length - 1) {
            bubbles[index].style.backgroundColor = "#ae4c4c";
            bubbles[index].nextElementSibling.style.backgroundColor = "#d32d2d";
        }
        else {
            bubbles[index].style.backgroundColor = "#ae4c4c";
            bubbles[0].style.backgroundColor = "#d32d2d";
        }
    }
}

// изменение текущей картинки, при помощи кнопок на слайдере
function browseImgByButtons(id) {
    let currenrPicture = document.getElementsByClassName('slider')[0].children[0].querySelector('img');
    let link = currenrPicture.src;
    let b = document.getElementsByClassName('bub');

    if (id == 'btn-right') {
        if (link != nameOfPictures[nameOfPictures.length - 1]) {
            let newSrc = nameOfPictures.indexOf(link) + 1;
            link = nameOfPictures[newSrc];
            changeBubble(b, newSrc, true);
        }
        else {
            link = nameOfPictures[0];
            changeBubble(b, 0, true);
        }
    }
    else {
        if (link != nameOfPictures[0]) {
            let newSrc = nameOfPictures.indexOf(link) - 1;
            link = nameOfPictures[newSrc];
            changeBubble(b, newSrc, false);
        }
        else {
            link = nameOfPictures[nameOfPictures.length - 1];
            changeBubble(b, nameOfPictures.length - 1, false);
        }
    }
    currenrPicture.src = link;
}

function getSliderHeight() {
    let hWindow = window.innerHeight;
    hWindow = hWindow / 20 + 'px';
    let right = document.getElementById('btn-right');
    let left = document.getElementById('btn-left');

    right.style.top = hWindow;
    left.style.top = hWindow;

    console.log(hWindow);
}

// #d32d2d; - базовый цвет кружкка
// #ae4c4c; - новый цвет
// смена картинки в слайдере с помощью стрелок
function browseImgByArrows(event) {
    let currenrPicture = document.getElementsByClassName('slider')[0].children[0].querySelector('img');
    let link = currenrPicture.src;
    let bubbles = document.getElementsByClassName('bub');

    if (event.key === "ArrowRight") {
        if (link != nameOfPictures[nameOfPictures.length - 1]) {
            let newSrc = nameOfPictures.indexOf(link) + 1;
            link = nameOfPictures[newSrc];
            changeBubble(bubbles, newSrc, true);
        }
        else {
            link = nameOfPictures[0];
            changeBubble(bubbles, 0, true);
        }
        currenrPicture.src = link;
    }
    if (event.key === "ArrowLeft") {
        if (link != nameOfPictures[0]) {
            let newSrc = nameOfPictures.indexOf(link) - 1;
            link = nameOfPictures[newSrc];
            changeBubble(bubbles, newSrc, false);
        }
        else {
            link = nameOfPictures[nameOfPictures.length - 1];
            changeBubble(bubbles, nameOfPictures.length - 1, false);
        }
        currenrPicture.src = link;
    }
}

function resizeWindow() {
    setInterval(() => {
        if (window.innerHeight != startH || window.innerWidth != startW) {
            const sldr = document.getElementsByClassName('slider')[0];
            document.getElementsByClassName('tracker')[0].style.marginLeft =
                +getComputedStyle(sldr).width.replace('px', '') / 2 - +getComputedStyle(sldr.children[1]).width.replace('px', '') / 2 + 'px';
            startW = window.innerWidth;
            startH = window.innerHeight;
        }
    }, 20);
}

// 
window.onload = function () {

    const sldr = document.getElementsByClassName('slider')[0];

    // скрыть кнопки на слайдере
    sldr.addEventListener("mouseout", function () {
        let nav = document.getElementsByClassName('navigator');
        let track = sldr.getElementsByClassName('tracker')[0];
        for (let elem of nav) {
            elem.style.display = '';
        }
        track.style.bottom = '';
        sldr.style.margin = '';
    });

    // показать кнопки на слайдере
    sldr.addEventListener("mouseover", function () {
        let nav = document.getElementsByClassName('navigator');
        let track = sldr.getElementsByClassName('tracker')[0];
        for (let elem of nav) {
            elem.style.display = 'inline-flex';
        }
        track.style.bottom = '3vh';
        sldr.style.margin = '0 0 -7vh 0';
    });
}

// задаёт цвет для первого кружка, при загрузке страницы
function drawStartBubble() {
    let currPic = document.querySelector('img').src;
    let indexCurrPic = nameOfPictures.indexOf(currPic);
    document.getElementsByClassName('bub')[indexCurrPic].style.backgroundColor = "#ae4c4c";
}

// создаЄт кружки под картинкой, кот. показывают общее кол-во картинок 
// и текущую картинку, чуть измен¤¤ свой цвет
function addBubbles(amount, parent) {
    for (let i = amount - 1; i > -1; i--) {
        parent.insertAdjacentHTML("afterbegin", '<div class="bub"><div>');
    }
}

// создаЄт коллекцию кружков под слайдером сразу после загрузки
document.addEventListener('DOMContentLoaded', addBubbles(nameOfPictures.length, document.getElementsByClassName('tracker')[0]));

// задаЄт цвет первого кружка под слайдером сразу после загрузки
document.addEventListener('DOMContentLoaded', drawStartBubble);

// тест
document.addEventListener('DOMContentLoaded', setTracker);

// проверяет текущий размер окна и двигает блок tracker, если нужно, 
// т.к.событие onresize срабатывает только, когда окно растягивается вручную
document.addEventListener('DOMContentLoaded', resizeWindow);

// картинки листаются с помощью стрелок, если предварительно кликнуть по картинке,
// если кликнуть в другом месте - листать с помощью стрелок уже будет нельзя!
window.onclick = function (event) {
    if (event.target == document.querySelector('img')) {
        window.addEventListener("keydown", browseImgByArrows);
    }
    else {
        window.removeEventListener("keydown", browseImgByArrows);
    }
}

// изменяет положение трекера, при событии resize
window.onresize = function (event) {
    const sldr = document.getElementsByClassName('slider')[0];
    if (startW != +getComputedStyle(sldr).width.replace('px', '')) {
        let timer = setTimeout(() => {
            document.getElementsByClassName('tracker')[0].style.marginLeft =
                +getComputedStyle(sldr).width.replace('px', '') / 2 - +getComputedStyle(sldr.children[1]).width.replace('px', '') / 2 + 'px';
        }, 20);
        startW = sldr.style.width;
    }
}