// массив ссылок на картинки. нужен, т.к. есть только один div с img
// посредством него осуществяется 
const nameOfPictures = [
    "https://localhost:5001/Static/SlidePictures/spb.jpg",
    "https://localhost:5001/Static/SlidePictures/london.jpg",
    "https://localhost:5001/Static/SlidePictures/ny.jpg",
    "https://localhost:5001/Static/SlidePictures/tokyoCut.jpg"
];
//получение объекта слайдер
function foo() {
    const sldr = document.getElementsByClassName('slider')[0];
    if (sldr == undefined) {
        console.log('error!');
    }
    else {
        foo1(sldr);
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

// изменение текущей картинки 
function changePicture(id) {
    let currenrPicture = document.getElementsByClassName('slider')[0].children[0].querySelector('img');
    let link = currenrPicture.src;
    if (id == 'btn-right') {
        if (link != nameOfPictures[nameOfPictures.length - 1]) {
            let newSrc = nameOfPictures.indexOf(link) + 1;
            link = nameOfPictures[newSrc];
        }
        else {
            link = nameOfPictures[0];
        }
    }
    else {
        if (link != nameOfPictures[0]) {
            let newSrc = nameOfPictures.indexOf(link) - 1;
            link = nameOfPictures[newSrc];
        }
        else {
            link = nameOfPictures[nameOfPictures.length - 1];
        }
    }
    currenrPicture.src = link;
}

// 
document.addEventListener('DOMContentLoaded', foo());