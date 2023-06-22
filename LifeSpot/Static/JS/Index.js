let map1 = new Map();
let session = new Map();
//localStorage.clear();

// перенаправление при недопустимом возрасте
let redirectUser = function Redirector(mes) {
    if (mes != undefined) {
        alert(`Наши трансляции не предназначены для лиц моложе 18 лет!\nВам сейчас только ${mes} лет\nВы будете перенаправлены на https://www.google.com/?hl=ru~`)
    }
    else {
        alert(`Наши трансляции не предназначены для лиц моложе 18 лет!\nВы будете перенаправлены на https://www.google.com/?hl=ru~`)
    }
    window.location.href = "https://www.google.com/?hl=ru";
}


//Приветствие
function Greetings() {
    let startDate = new Date().toLocaleString();
    alert('Приветствуем на Lifespot!' + '\nТекущая дата: ' + startDate);
    session.set("startDate", startDate);
}

// Проверка возраста
function CheckAge () {
    session.set("age", prompt('Введите свой возраст!'))

    if (session.get("age") >= 18) {
        Greetings()
    }
    else {
        redirectUser();
    }
}

// получение пользовательских данных, при первом посещении
function handleSession() {
    session.set("userArgent", window.navigator.userAgent);
}

let sessionLog = function logSession() {
    for (let result of session) {
        console.log(result);
    }
}

// сверка при повторных попытках входа, чтобы не отключать предыдущую функцию 
// и иметь возможность зайти впоследствии, если при первом входе возраст был меньше 18
var userData = function (map1) {
    if (localStorage.getItem("availableAge") == undefined) {
        map1 = handleSession();
        localStorage.setItem("tryToEnterDate", new Date().toLocaleString());
        localStorage.setItem("availableAge", map1.get("age").toLocaleString());
    }
    if (+localStorage.getItem("availableAge") < 18) {
        // если с первой попытки несовершеннолетнего пользователя войти прошло не меньше лет,
        // чем ему было нужно, чтоб стать совершеннолетним - его пустит(вроде!)
        let ageNow = new Date().getUTCFullYear()
            - new Date(localStorage.getItem("tryToEnterDate")
                .substring(0, 10).split(".").reverse().join(" ")).getUTCFullYear()
            + +localStorage.getItem("availableAge");

        if (CheckAge(ageNow) == false) {
            redirectUser(ageNow);
        }
        else {
            localStorage.setItem("availableAge", ageNow);
        }
    }
}
// фильтрация поиска
function filterContent()
{
    if (inputParseFunction() != undefined) {
        let elements = document.getElementsByClassName('box');
        for (let i = 0; i < elements.length; i++) {
            let title = elements[i].getElementsByClassName('video-title')[0].textContent.toLowerCase();
            if (title.includes(inputParseFunction())) {
                elements[i].style.display = 'inline-flex';
            }
            else {
                elements[i].style.display = 'none';
            }
        }
    }
}

function Subscribe() {
    setTimeout(() => alert('Подпишитесь на наши соцсети!'), 60000);
}