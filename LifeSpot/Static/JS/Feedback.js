// Создадим объект
let review = {}
/*
* Запросим пользовательский ввод
* и сохраним отзыв в объект
*
* */
function getReview(b) {
    

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

    // Добавим на страницу
    writeReview(review, b)
}

/*
* Запишем отзыв на страницу
*
* */
const writeReview = (review, b) => {
        document.getElementsByClassName('about_section')[0].innerHTML += '    <div class="review-text">\n' +
            `<p> <i> <b>${review['userName']}</b>  ${review['date']}</i></p>` +
            `<p>${review['comment']}</p>` + '</div>';
}