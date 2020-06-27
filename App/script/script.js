let button = document.querySelector('#add');
let closeButton = document.querySelector('.closeForm');
let list = document.querySelector('.list');
const server = 'http://localhost:3000/';

document.querySelector('.taskFullview').addEventListener('click', function(){location.reload()})

button.addEventListener("click", function(){document.querySelector('#modalForm').style.left = '0';});
closeButton.addEventListener("click", function(){document.querySelector('#modalForm').style.left = '-450px';});

//get Data from API
function getData() {
  fetch(server + 'tasks')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data)
    for (var i = 0; i < data.length; i++) {
      let li = document.createElement('li');
          li.className = "listItem";
          li.innerHTML = '<div class="listWrapper">' +
          '<div class= "check"></div>' +
          '<div class= "listTitle">' + data[i].title + '</div>' + 
          '<div class="listRight">' +
          data[i].dueDate +
          '</div>'+
          '<div class= "edit"></div>' +
          '<div class= "delete"></div>' +
          '</div>';
          list.appendChild(li);
  
   const taskId = data[i]._id;
   const taskTitle = data[i].title;
   const taskText = data[i].note;
   const importance = data[i].importance;
   const taskDueDate = data[i].dueDate

          // Delete Task
          li.querySelector('.delete').addEventListener('click', function () {
            var check = confirm('Wollen diesen Eintrag wirklich löschen?');
            if (check === false) {} else {
              fetch(server + 'tasks/' + taskId, {
                method: 'DELETE',
    })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res))

            ////////////////////////////////////////////Provisorisch
            location.reload()
            ////////////////////////////////////////////

            } 
          });

          // See Task in Fullview
          li.querySelector('.listTitle').addEventListener('click', function () {
            console.log('Fullview for Task No: ' + taskId)
            document.querySelector('.taskFullview').style.display = 'flex';
            let taskDetail = document.querySelector('.taskFullview__box');
            let taskDetailList = document.createElement('li');
                taskDetailList.className = "taskDetailList";
                taskDetailList.innerHTML = '';
                taskDetailList.innerHTML = '<div class="taskFullview__Title">' + taskTitle + '</div>' + taskText;
              taskDetail.appendChild(taskDetailList);
          })

          // Check for finished Tasks
          if (importance === 'done') {
            li.querySelector('.check').style.background = 'green'
          }
        
          // make Task checked
          li.querySelector('.check').addEventListener('click', function () {
            if (importance === 'done') {
              fetch(server + 'tasks/' + taskId, {
                headers: { "Content-Type": "application/json; charset=utf-8" },
                  method: 'PATCH',
                  body: JSON.stringify({
                    "title": taskTitle,
                    "note": taskText,
                    "importance": 'high',
                    "dueDate": taskDueDate,
                  })     
      })
              .then(res => res.text()) // or res.json()
              .then(res => console.log(res))

              ////////////////////////////////////////////Provisorisch
              location.reload()
              ////////////////////////////////////////////


            } else {
              fetch(server + 'tasks/' + taskId, {
                headers: { "Content-Type": "application/json; charset=utf-8" },
                  method: 'PATCH',
                  body: JSON.stringify({
                    "title": taskTitle,
                    "note": taskText,
                    "importance": 'done',
                    "dueDate": taskDueDate,
                  })     
      })
              .then(res => res.text()) // or res.json()
              .then(res => console.log(res))

              ////////////////////////////////////////////Provisorisch
              location.reload()
              ////////////////////////////////////////////

            }  
          })

          // Update Data
          li.querySelector('.edit').addEventListener('click', function () {
            document.querySelector('#modalForm').style.left = '0';
            let updateButton = document.querySelector('#save');
            updateButton.addEventListener('click', updateData);
            updateButton.addEventListener("click", function(){document.querySelector('#modalForm').style.left = '-450px';});
  
                function updateData() {
                  fetch(server + 'tasks/' + taskId, {
                    headers: { "Content-Type": "application/json; charset=utf-8" },
                      method: 'PATCH',
                      body: JSON.stringify({
                      "title": document.querySelector('#title').value,
                      "note": document.querySelector('#note').value,
                      "importance": document.querySelector('#importance').value,
                      "dueDate": document.querySelector('#date').value,
                      })     
          })
                  .then(res => res.text()) // or res.json()
                  .then(res => console.log(res))

                }
              

              ////////////////////////////////////////////Provisorisch
             
              ////////////////////////////////////////////


             
          })

          ////////////////////
        }
  })  
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
    "dueDate": document.querySelector('#date').value,
  
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

  ////////////////////////////////////////////Provisorisch
  location.reload()
  ////////////////////////////////////////////

}



