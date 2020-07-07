(function getData() {
    fetch('http://localhost:3000/tasks')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const tasks = { tasks: data }
            console.log(tasks)
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