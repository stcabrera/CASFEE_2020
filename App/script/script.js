let button = document.querySelector('#add');
let closeButton = document.querySelector('.closeForm');
let list = document.querySelector('.list');
const server = 'http://localhost:3000/';
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let today = day + '.' + month + '.' + year

document.querySelector('.taskFullview').addEventListener('click', function() { location.reload() })

button.addEventListener("click", function() {
    document.querySelector('#modalForm').style.left = '250px';
    document.querySelector('#modalForm').style.width = '400px';
    document.querySelector('#save').style.display = 'block';
    document.querySelector('#update').style.display = 'none';
    document.querySelector('.closeForm').style.left = '370px';
    document.querySelector('#today').value = today;
});
closeButton.addEventListener("click", function() {
    document.querySelector('#modalForm').style.left = '50px';
    document.querySelector('#modalForm').style.width = '200px';
    document.querySelector('.closeForm').style.left = '160px';
});


(function getData() {
    fetch('http://localhost:3000/tasks')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const tasks = { tasks: data }
            renderTasks(tasks)
        });
})();

function renderTasks(tasks) {
    let source = document.querySelector('#task-list-template').innerHTML
    let template = Handlebars.compile(source);
    let result = template(tasks);
    let list = document.querySelector('#list')
    list.innerHTML = result
}

//Push Data to API
const saveButton = document.querySelector('#save');
saveButton.addEventListener('click', pushData);
saveButton.addEventListener("click", function() {
    document.querySelector('#modalForm').style.top = '-100vh';
});

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
}