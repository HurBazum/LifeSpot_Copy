// Создадим объект
function Review() {
    this.userName = prompt("Как вас зовут?");
    this.comment = prompt("Напишите свой отзыв");
    this.date = new Date().toLocaleString();
}
/*
* Запросим пользовательский ввод
* и сохраним отзыв в объект
*
* */
function getReview() {

    const review = new Review();
    if (review.comment == "" || review.userName == "") {
        return;
    }

    let beRated = confirm('Хотите, что бы Ваш комментарий могли оценить другие пользователи?')
    if (beRated) {
        let ratedReview = Object.create(review);
        ratedReview.rate = 0;
        writeReview(ratedReview)
    }
    else {
        // Добавим на страницу
        writeReview(review)
    }
}

/*
* Запишем отзыв на страницу
*
* */
const writeReview = (a) => {
    if (a.hasOwnProperty('rate') == true) {
        let idP = Math.random(); //рейтинг +
        let idM = Math.random(); //рейтинг -
        let idReply = Math.random();
        document.getElementsByClassName('about_section')[0].innerHTML += '    <div class="review-text">\n' +
            `<p> <i> <b>${a['userName']}</b>  ${a['date']}</i></p>` + `<section><p class="rate">Рейтинг </p><button id="${idP}" class="rateButton" onclick="rateChange(this.id, true)">❤️</button>
            <p class="rate">${a['rate']}</p><button id="${idM}" class="rateButton" onclick="rateChange(this.id)">🖤</button></section>` +
            `<p>${a['comment']}</p>` + '</div>';
    }
    else {
        document.getElementsByClassName('about_section')[0].innerHTML += '    <div class="review-text">\n' +
            `<p> <i> <b>${a['userName']}</b>  ${a['date']}</i></p>` +
            `<p>${a['comment']}</p>` + '</div>';
    }
}

// находим элемент по айди, получаем review-text, который его содержит => 
// находим в нём параграф с классом rate, изменяем rate.textContent!
function rateChange(i, plusOrMinus) {
    let reviewsRate = document.getElementById(`${i}`).parentNode.getElementsByClassName('rate')[1];
    if (plusOrMinus === true) {
        reviewsRate.textContent = +reviewsRate.textContent + 1;
    }
    else {
        reviewsRate.textContent = +reviewsRate.textContent - 1;
    }
}

