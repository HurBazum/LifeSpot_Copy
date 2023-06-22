let map = new Map();
// Создадим объект
let review = {}

let t = 0;
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

    map.set("id", t);
    map.set("comment", review['userName']);
    t++;
}

/*
* Запишем отзыв на страницу
*
* */
const writeReview = (review, b) => {
    if (b == true) {
        document.getElementsByClassName('about_section')[0].innerHTML += '    <div class="review-reply">\n' +
            `<p> <i> <b>${review['userName']}</b>  ${review['date']}</i></p>` +
            `<p>${review['comment']}</p>` + '<button class="reply" type="submit" onclick="getReview(true)">Ответить<button/>'
        '</div>';
    }
    else {
        document.getElementsByClassName('about_section')[0].innerHTML += '    <div class="review-text">\n' +
            `<p> <i> <b>${review['userName']}</b>  ${review['date']}</i></p>` +
            `<p>${review['comment']}</p>` + '<button class="reply" type="submit" onclick="getReview(true)">Ответить<button/>'
        '</div>';
    }
}

/*
* Ответим на комментарий
*
* */
function getIdForReply() {

}