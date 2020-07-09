let list = document.querySelector('#list');
const server = 'http://localhost:3000/';
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let today = day + '.' + month + '.' + year;

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
    console.log(tasks)
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
        "created": document.querySelector('#today').value,
        "done": 'undone'
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/tasks", requestOptions)
        .then(response => response.text())
        .then(result => console.log('Task pushed' + raw))
        .catch(error => console.log('error', error));
}


// Check Task

list.addEventListener('click', event => {
    const myHeaders = new Headers();
    if (event.target.classList.contains('check')) {
        const itemKey = event.target.parentElement.parentElement.parentElement.id;

        if (event.target.classList.contains('undone')) {
            myHeaders.append("Content-Type", "application/json");
            const requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: JSON.stringify({ "done": 'done' }),
                redirect: 'follow'
            };

            fetch("http://localhost:3000/tasks/" + itemKey, requestOptions)
            location.reload()

        } else {
            myHeaders.append("Content-Type", "application/json");
            const requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: JSON.stringify({ "done": 'undone' }),
                redirect: 'follow'
            };

            fetch("http://localhost:3000/tasks/" + itemKey, requestOptions)
            location.reload()

        }

    }
});