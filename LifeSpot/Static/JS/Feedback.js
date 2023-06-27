// Создадим объект
let review = {}

/*
* Запросим пользовательский ввод
* и сохраним отзыв в объект
*
* */
function getReview() {
    

    // Сохраним свойство имени
    review["userName"] = prompt("Как вас зовут?")
    if (review["userName"] == null) {
        return
    }

    // Сохраним текст отзыва
    review["comment"] = prompt("Напишите свой отзыв")
    if (review["comment"] == null) {
        return
    }

    // Сохраним текущее время
    review["date"] = new Date().toLocaleString()

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
        document.getElementsByClassName('about_section')[0].innerHTML += '    <div class="review-text">\n' +
            `<p> <i> <b>${a['userName']}</b>  ${a['date']}</i></p>` + `<button id="${idP}" class="rateButton" onclick="rateChange(this.id, true)">❤️</button>
            <p class="rate">${a['rate']}</p><button id="${idM}" class="rateButton" onclick="rateChange(this.id)">🖤</button>` +
            `<p>${a['comment']}</p>` +  '</div>';
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
    let reviewsRate = document.getElementById(`${i}`).parentNode.getElementsByClassName('rate')[0];
    if (plusOrMinus === true) {
        reviewsRate.textContent = +reviewsRate.textContent + 1;
    }
    else {
        reviewsRate.textContent = +reviewsRate.textContent - 1;
    }
}