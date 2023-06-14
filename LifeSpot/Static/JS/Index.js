let map1 = new Map();

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

// получение пользовательских данных, при первом посещении
let getterData = function GetUserData() {
    let map = new Map()
    map.set("userArgent", window.navigator.userAgent);
    map.set("age", prompt('Введите свой возраст!'))
    if (map.get("age") >= 18) {
        let startDate = new Date().toLocaleString();
        alert('Приветствуем на Lifespot!' + '\nТекущая дата: ' + startDate);
        map.set("startDate", startDate);
    }
    else {
        redirectUser();
    }

    return map;
}


// сверка при повторных попытках входа, чтобы не отключать предыдущую функцию 
// и иметь возможность зайти впоследствии, если при первом входе возраст был меньше 18
var userData = function (map1) {
    if (localStorage.getItem("availableAge") == undefined) {
        map1 = getterData();
        localStorage.setItem("tryToEnterDate", new Date().toLocaleString());
        localStorage.setItem("availableAge", map1.get("age").toLocaleString());
    }
    if (+localStorage.getItem("availableAge") < 18) {
        // если с первой попытки несовершеннолетнего пользователя войти прошло не меньше лет,
        // чем ему было нужно, чтоб стать совершеннолетним - его пустит(вроде!)
        let ageNow = new Date().getUTCFullYear() - new Date(localStorage.getItem("tryToEnterDate").substring(0, 10).split(".").reverse().join(" ")).getUTCFullYear() + +localStorage.getItem("availableAge");

        if (ageNow < 18) {
            redirectUser(ageNow);
        }
        else {
            localStorage.setItem("availableAge", ageNow);
        }
    }
}

let contentFilter = function InputSearch(message)
{
    if (message != undefined) {
        //let searchName = document.getElementsByTagName('input')[0].value.toLowerCase();
        let elements = document.getElementsByClassName('box');
        for (let i = 0; i < elements.length; i++) {
            let title = elements[i].getElementsByClassName('video-title')[0].textContent.toLowerCase();
            if (title.includes(message)) {
                elements[i].style.display = 'inline-flex';
            }
            else {
                elements[i].style.display = 'none';
            }
        }
    }
}