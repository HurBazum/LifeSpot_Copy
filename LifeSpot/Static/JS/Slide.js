// массив ссылок на картинки
const nameOfPictures = [
    "https://localhost:5001/Static/SlidePictures/spb.jpg",
    "https://localhost:5001/Static/SlidePictures/london.jpg",
    "https://localhost:5001/Static/SlidePictures/ny.jpg",
    "https://localhost:5001/Static/SlidePictures/tokyoCut.jpg"
];

// тест
// выравнивает div с кружками примерно по центру slider'а
function foo() {
    const sldr = document.getElementsByClassName('slider')[0];
    if (sldr == undefined) {
        console.log('error!');
    }
    else {
        foo1(sldr);
        let sliderWidth = +getComputedStyle(sldr).width.replace('px','');
        let trackerWidth = +getComputedStyle(sldr.children[1]).width.replace('px', '');
        console.log(sliderWidth);
        console.log(trackerWidth);
        let centerPosition = (trackerWidth / sliderWidth) * 50;
        console.log(centerPosition)
        sldr.children[1].style.left = +sldr.children[1].style.left.replace('%', '') - centerPosition + '%';
    }
}

//вывод ссылки на текущую картинку в консоль
function foo1(x) {
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
function changePicture(id) {
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
// getComputedStyle for compute btn.style.top!
function getSliderHeight() {
    let hWindow = window.innerHeight;
    hWindow = hWindow / 20 + 'px';
    let right = document.getElementById('btn-right');
    let left = document.getElementById('btn-left');

    right.style.top = hWindow;
    left.style.top = hWindow;

    console.log(hWindow);
}

// 
window.onload = function () {

    const sldr = document.getElementsByClassName('slider')[0];

    // скрыть кнопки на слайдере
    sldr.addEventListener("mouseout", function () {
        let x = document.getElementsByClassName('navigator');
        let o = sldr.getElementsByClassName('tracker')[0];
        for (let y of x) {
            y.style.display = '';
        }
        o.style.bottom = '';
        sldr.style.margin = '';
    });

    // показать кнопки на слайдере
    sldr.addEventListener("mouseover", function () {
        let x = document.getElementsByClassName('navigator');
        let o = sldr.getElementsByClassName('tracker')[0];
        for (let y of x) {
            y.style.display = 'inline-flex';
        }
        o.style.bottom = '3vh';
        sldr.style.margin = '0 0 -7vh 0';
    });


    // #d32d2d; - базовый цвет кружкка
    // #ae4c4c; - новый цвет
    // смена картинки в слайдере с помощью стрелок
    window.addEventListener("keydown", function (event) {
        let currenrPicture = document.getElementsByClassName('slider')[0].children[0].querySelector('img');
        let link = currenrPicture.src;
        let b = document.getElementsByClassName('bub');

        if (event.key === "ArrowRight") {
            if (link != nameOfPictures[nameOfPictures.length - 1]) {
                let newSrc = nameOfPictures.indexOf(link) + 1;
                link = nameOfPictures[newSrc];
                changeBubble(b, newSrc, true);
            }
            else {
                link = nameOfPictures[0];
                changeBubble(b, 0, true);
            }
            currenrPicture.src = link;
        }
        if (event.key === "ArrowLeft") {
            if (link != nameOfPictures[0]) {
                let newSrc = nameOfPictures.indexOf(link) - 1;
                link = nameOfPictures[newSrc];
                changeBubble(b, newSrc, false);
            }
            else {
                link = nameOfPictures[nameOfPictures.length - 1];
                changeBubble(b, nameOfPictures.length - 1, false);
            }
            currenrPicture.src = link;
        }
    });
}

// задаёт цвет для первого кружка, при загрузке страницы
function startBubble() {
    let currPic = document.querySelector('img').src;
    let indexCurrPic = nameOfPictures.indexOf(currPic);
    document.getElementsByClassName('bub')[indexCurrPic].style.backgroundColor = "#ae4c4c";
}
// создаЄт кружки под картинкой, кот. показывают общее кол-во картинок 
// и текущую картинку, чуть измен¤¤ свой цвет
function addBub(amount, parent) {
    for (let i = amount - 1; i > -1; i--) {
        parent.insertAdjacentHTML("afterbegin", '<div class="bub"><div>');
    }
}

// создаЄт коллекцию кружков под слайдером сразу после загрузки
document.addEventListener('DOMContentLoaded', addBub(nameOfPictures.length, document.getElementsByClassName('tracker')[0]));

// задаЄт цвет первого кружка под слайдером сразу после загрузки
document.addEventListener('DOMContentLoaded', startBubble);

// тест
document.addEventListener('DOMContentLoaded', foo);