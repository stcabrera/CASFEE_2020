let button = document.querySelector('#add');
let closeButton = document.querySelector('.closeForm');
let saveButton = document.querySelector('#save');

button.addEventListener("click", createNote);
closeButton.addEventListener("click", closeForm);
saveButton.addEventListener('click', getInput);

 function createNote() {
   document.querySelector('#modalForm').style.left = '0';
 }
 function closeForm() {
    document.querySelector('#modalForm').style.left = '-350px';
  }

  function getInput() {
    let title = 'Title: ' + document.querySelector('#title').value;
    let note = 'Note: ' + document.querySelector('#note').value;
    let importance = 'Importance: ' + document.querySelector('#importance').value;
    let date = 'Due date: ' + document.querySelector('#date').value;
    console.log(title + ' ' + note + ' ' + importance + ' ' + date);
  }

