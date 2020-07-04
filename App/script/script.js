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

function render() {list.innerHTML = '';}

//get Data from API
function getData() {
  fetch(server + 'tasks')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data)
    for (var i = 0; i < data.length; i++) {
      let dueDate = data[i].dueDate
      let newDate = new Date(dueDate)
      let day = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      let showDate = day + '.' + month + '.' + year;
      let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

      let li = document.createElement('li');
          li.className = "listItem";
          li.innerHTML = '<div class="listWrapper">' +
          '<div class="calendar">' +
          '<div class="calendarDay">' + day + '</div>' +
          '<div class="calendarMonth">' + months[newDate.getMonth()] + '</div>' +
          '<div class="calendarYear">' + year + '</div>' +
          '</div>' +
          '<div class= "check"></div>' +
          '<div class= "listTitle">' + data[i].title + '</div>' + 
          '<div class="listRight">' + 
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
            var check = confirm('Wollen Sie diesen Eintrag wirklich löschen?');
            if (check === false) {} else {
              fetch(server + 'tasks/' + taskId, {
                method: 'DELETE',
    })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res))

            render()
            getData()
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
            li.querySelector('.check').style.backgroundImage = 'url(../app/img/check.png)';
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
              render()
              getData()

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
              render()
              getData()
            }  
          })

          // Update Data
          li.querySelector('.edit').addEventListener('click', function () {
            document.querySelector('#modalForm').style.left = '0';
            document.querySelector('#save').style.display = 'none';
            document.querySelector('#update').style.display = 'block';
            document.querySelector('#title').value = taskTitle;
            document.querySelector('#note').value = taskText; 
            document.querySelector('#date').value = taskDueDate;
            let updateButton = document.querySelector('#update');
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

                  location.reload()
                }   
          })
        }
  })  
}
getData();

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

  render()
  getData()
}

//show finished Tasks
function getFinshedTasks() {
  fetch(server + 'tasks')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    data.forEach(function(task) {
      if (task.importance === 'done') {  
          const taskId = task._id;
          const taskTitle = task.title;
          const taskText = task.note;
          const importance = task.importance;
          const taskDueDate = task.dueDate
          let li = document.createElement('li');
                li.className = "listItem";
                li.innerHTML = '<div class="listWrapper">' +
                '<div class= "check"></div>' +
                '<div class= "listTitle">' + task.title + '</div>' + 
                '<div class="listRight">' +
                '</div>'+
                '<div class= "delete"></div>' +
                '</div>';
                list.appendChild(li);
      
                // Delete Task
                li.querySelector('.delete').addEventListener('click', function () {
                  var check = confirm('Wollen Sie diesen Eintrag wirklich löschen?');
                  if (check === false) {} else {
                    fetch(server + 'tasks/' + taskId, {
                      method: 'DELETE',
          })
                  .then(res => res.text()) // or res.json()
                  .then(res => console.log(res))
      
                  render()
                  getFinshedTasks()
                  } 
                });
      
                // Check for finished Tasks
                if (importance === 'done') {
                  li.querySelector('.check').style.backgroundImage = 'url(../app/img/check.png)';
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
                    render()
                    getFinshedTasks()
      
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
                    render()
                    getFinshedTasks()
                  }  
                })              
      }
    });  
  })  
}

let sortFinished = document.querySelector('.sortFinished');
    sortFinished.addEventListener('click', function() {
      render()
      getFinshedTasks()
    })

// show all Tasks
let sortAll = document.querySelector('.sortAll');
sortAll.addEventListener('click', function() {
  render()
  getData()
})

//show pending Tasks

function getPendingTasks() {
  fetch(server + 'tasks')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    data.forEach(function(task) {
      if (task.importance != 'done') {
          const taskId = task._id;
          const taskTitle = task.title;
          const taskText = task.note;
          const importance = task.importance;
          let dueDate = task.dueDate
          let newDate = new Date(dueDate)
          let day = newDate.getDate();
          let month = newDate.getMonth() + 1;
          let year = newDate.getFullYear();
          let showDate = day + '.' + month + '.' + year;
          let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
          let li = document.createElement('li');
                li.className = "listItem";
                li.innerHTML = '<div class="listWrapper">' +
                '<div class="calendar">' +
                '<div class="calendarDay">' + day + '</div>' +
                '<div class="calendarMonth">' + months[newDate.getMonth()] + '</div>' +
                '<div class="calendarYear">' + year + '</div>' +
      
                '</div>' +
                '<div class= "check"></div>' +
                '<div class= "listTitle">' + task.title + '</div>' + 
                '<div class="listRight">' +
          
                '</div>'+
                '<div class= "delete"></div>' +
                '</div>';
                list.appendChild(li);
                // Delete Task
                li.querySelector('.delete').addEventListener('click', function () {
                  var check = confirm('Wollen Sie diesen Eintrag wirklich löschen?');
                  if (check === false) {} else {
                    fetch(server + 'tasks/' + taskId, {
                      method: 'DELETE',
          })
                  .then(res => res.text()) // or res.json()
                  .then(res => console.log(res))
      
                  render()
                  getPendingTasks()
                  } 
                });
      
                // Check for finished Tasks
                if (importance === 'done') {
                  li.querySelector('.check').style.backgroundImage = 'url(../app/img/check.png)';
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
                    render()
                    getPendingTasks()
      
                  } else {
                    fetch(server + 'tasks/' + taskId, {
                      headers: { "Content-Type": "application/json; charset=utf-8" },
                        method: 'PATCH',
                        body: JSON.stringify({
                          "title": taskTitle,
                          "note": taskText,
                          "importance": 'done',
                          "dueDate": dueDate,
                        })     
            })
                    render()
                    getPendingTasks()
                  }  
                })           
      }
    });  
  })  
}

let sortPendeing = document.querySelector('.sortPending');
sortPendeing.addEventListener('click', function() {
      render()
      getPendingTasks()
    })