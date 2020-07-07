let button = document.querySelector('#add');
let closeButton = document.querySelector('.closeForm');
let list = document.querySelector('.list');
const server = 'http://localhost:3000/';
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let today = day + '.' + month + '.' + year

document.querySelector('.taskFullview').addEventListener('click', function(){location.reload()})

button.addEventListener("click", function(){
  document.querySelector('#modalForm').style.left = '0';
  document.querySelector('#save').style.display = 'block';
  document.querySelector('#update').style.display = 'none';
  document.querySelector('#today').value = today;
});
closeButton.addEventListener("click", function(){document.querySelector('#modalForm').style.left = '-450px';});


//get Data from API



//Push Data to API
const saveButton = document.querySelector('#save');
      saveButton.addEventListener('click', pushData);
      saveButton.addEventListener("click", function(){
        document.querySelector('#modalForm').style.left = '-450px';});

function pushData() {
  const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "title": document.querySelector('#title').value,
    "note": document.querySelector('#note').value,
    "importance": document.querySelector('#importance').value,
    "dueDate": document.querySelector('#date').value,
    "created": document.querySelector('#today').value
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch("http://localhost:3000/tasks", requestOptions)
  .then(response => response.text())
  .then(result => console.log('Task pushed'))
  .catch(error => console.log('error', error));

  getData()
}
