let taskData = []
let date = new Date()
let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()
let today = day + '.' + month + '.' + year;
const server = 'http://localhost:3000/tasks/';

function getData() {
    fetch(server)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            const tasks = { tasks: data }
            taskData = tasks.tasks
            asc()
        });
};
getData()

let saveButton = document.querySelector('#save')
saveButton.addEventListener('click', pushData)

function pushData() {
    const importanceValue = document.querySelector('#importance').value;
    const dueDateDay = document.querySelector('#date').value;
    let dDate = new Date(document.querySelector('#date').value)
    let day = dDate.getDate()
    let month = dDate.getMonth() + 1
    let year = dDate.getFullYear();

    fetch(server, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "title": document.querySelector('#title').value,
            "note": document.querySelector('#note').value,
            "importance": (() => {
                if (importanceValue === 'high') { return 3 + ' high' };
                if (importanceValue === 'medium') { return 2 + ' medium' };
                if (importanceValue === 'low') { return 1 + ' low' };
            })(),
            "dueDate": dDate,
            "dueDateDay": day,
            "dueDateMonth": month,
            "dueDateYear": year,
            "created": today,
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