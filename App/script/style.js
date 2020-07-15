let darkButton = document.querySelector('#colorChangerDark');
let lightButton = document.querySelector('#colorChangerLight');
let button = document.querySelector('#add');
let closeButton = document.querySelector('.closeForm');
let storedColorMode = window.localStorage.getItem('darkMode');

darkButton.addEventListener('click', () => {
    window.localStorage.setItem('darkMode', 'on');
    changeColor();
});
lightButton.addEventListener('click', () => {
    window.localStorage.setItem('darkMode', 'off');
    changeColor();
});

closeButton.addEventListener("click", function() {
    document.querySelector('#modalForm').style.left = '50px';
    document.querySelector('#modalForm').style.width = '200px';
    document.querySelector('.closeForm').style.left = '160px';
});

button.addEventListener("click", function() {
    document.querySelector('#modalForm').style.left = '250px';
    document.querySelector('#modalForm').style.width = '400px';
    document.querySelector('#save').style.display = 'block';
    document.querySelector('#update').style.display = 'none';
    document.querySelector('.closeForm').style.left = '370px';

});

function changeColor() {
    let storedColorMode = window.localStorage.getItem('darkMode');
    let body = document.body;
    let top = document.querySelector('.top');
    let form = document.querySelector('.modalFormInner')
    if (storedColorMode === 'on') {
        darkButton.style.display = 'none';
        lightButton.style.display = 'block';
        body.classList.toggle('darkMode');
        top.classList.toggle('darkModeTop');
        form.classList.toggle('formDark');
    } else {
        darkButton.style.display = 'block';
        lightButton.style.display = 'none';
        body.classList.remove('darkMode');
        top.classList.remove('darkModeTop');
        form.classList.remove('formDark')
    }
};
changeColor();