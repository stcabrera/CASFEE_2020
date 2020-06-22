let button = document.querySelector('#add');
let closeButton = document.querySelector('.closeForm');
let list = document.querySelector('.list');

button.addEventListener("click", function(){document.querySelector('#modalForm').style.left = '0';});
closeButton.addEventListener("click", function(){document.querySelector('#modalForm').style.left = '-450px';});

//get Data from API
function getData() {
  fetch('http://localhost:3000/tasks')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    for (var i = 0; i < data.length; i++) {
      let li = document.createElement('li');
          li.className = "listItem";
          li.innerHTML = '<div class="listWrapper">' +
          '<div class= "check"></div>' +
          '<div class= "listLeft">' + 
          '<div class= "listTitle">' + data[i].title + '</div>' + 
          '<div class= "listNote">' + data[i].note + '</div>'  + 
          '</div>' +
          '<div class="listRight">' +
          data[i].dueDate +
          '</div>'+
          '<div class= "edit"></div>' +
          '<div class= "delete"></div>' +
          '</div>';
          list.appendChild(li)
    }
  })
  .catch(function(error) {
    console.error(error);
  });
}
getData();


//Push Data to API
const saveButton = document.querySelector('#save');
      saveButton.addEventListener('click', pushData);
      saveButton.addEventListener("click", function(){document.querySelector('#modalForm').style.left = '-450px';});

function pushData() {
  list.innerHTML = '';
  let li = document.createElement('li');
  li.className = "listItem";
  li.innerHTML = '';
  const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "title": document.querySelector('#title').value,
    "note": document.querySelector('#note').value,
    "importance": document.querySelector('#importance').value,
    "dueDate": document.querySelector('#date').value
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

setInterval(getData(), 3000);

}


