let styleButton = document.querySelector('#colorChanger');
styleButton.addEventListener('click', changeColor);

function changeColor() {
    let body = document.body;
    let top = document.querySelector('.top');
    let list = document.querySelector('.list');
    body.classList.toggle('darkMode');
    top.classList.toggle('darkModeTop');
    list.classList.toggle('darkModelist');
}