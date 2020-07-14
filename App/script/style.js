let styleButton = document.querySelector('#colorChanger');
styleButton.addEventListener('click', changeColor);
let button = document.querySelector('#add');
let closeButton = document.querySelector('.closeForm');

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
    let body = document.body;
    let top = document.querySelector('.top');
    let list = document.querySelector('.list');
    body.classList.toggle('darkMode');
    top.classList.toggle('darkModeTop');
    list.classList.toggle('darkModelist');
}