function countElements() {
    let name = prompt('Пожалуйста, введите своё имя!');
    alert(`Приветствуем, ${name}!\nВ вашем имени ${name.length} букв!`);
    const tags = document.getElementsByTagName('*');
    alert(`Количество элементов на странице - ${tags.length}`);
}

const a = function saveEnter() {
    let currEnter = document.getElementsByTagName('input')[0].value.toLocaleLowerCase();
    alert(`input is ${this.lastInput}`);
    this.lastInput = currEnter;
}