let taskData = [];
const container = document.querySelector('#container');
const source = document.querySelector('#task-list-template').innerHTML;
const template = Handlebars.compile(source);


const server = 'http://localhost:3000/tasks/';
getData()

function getData() {
    fetch(server)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            const tasks = { tasks: data }

            taskData = tasks.tasks
            console.log(taskData)
            asc()
        });
};

/*
function renderTasks(tasks) {
    let source = document.querySelector('#task-list-template').innerHTML
    let template = Handlebars.compile(source);
    let result = template(tasks);
    let list = document.querySelector('#list')
    list.innerHTML = result
}
*/
let saveButton = document.querySelector('#save')
saveButton.addEventListener('click', pushData)

function pushData() {
    const importanceValue = document.querySelector('#importance').value;
    console.log(importanceValue)
    fetch(server, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "title": document.querySelector('#title').value,
            "note": document.querySelector('#note').value,
            "importance": (function convert() {
                if (importanceValue === 'high') { return 3 + ' high' };
                if (importanceValue === 'medium') { return 2 + ' medium' };
                if (importanceValue === 'low') { return 1 + ' low' };
            })(),
            "dueDate": document.querySelector('#date').value,
            "created": document.querySelector('#today').value,
            "done": 'undone'
        })
    })

    location.reload()
}

function deleteTask() {
    if (event.target.classList.contains('delete')) {
        const itemKey = event.target.parentElement.parentElement.parentElement.parentElement.id;
        fetch(server + itemKey, {
            method: 'DELETE'
        })
        setTimeout(getData, 10)
    }
}
// update Tasks

// get single Task