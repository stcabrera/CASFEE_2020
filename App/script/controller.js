const server = 'http://localhost:3000/tasks/';

(function getData() {
    fetch(server)
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

function pushData() {
    fetch(server, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "title": document.querySelector('#title').value,
                "note": document.querySelector('#note').value,
                "importance": document.querySelector('#importance').value,
                "dueDate": document.querySelector('#date').value,
                "created": document.querySelector('#today').value,
                "done": 'undone'
            })
        })
        .catch(error => console.log('error', error));
    location.reload()
}

function deleteTask() {
    if (event.target.classList.contains('delete')) {
        const itemKey = event.target.parentElement.parentElement.parentElement.parentElement.id;
        console.log(itemKey)

        fetch(server + itemKey, {
            method: 'DELETE'
        })
        location.reload()
    }
}
// update Tasks

// get single Task