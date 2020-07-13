let taskData = [];
const buttonASC = document.querySelector('#sortASC');
const buttonDESC = document.querySelector('#sortDESC');
const container = document.querySelector('#container');
const source = document.querySelector('#task-list-template').innerHTML;
const template = Handlebars.compile(source);
buttonASC.addEventListener('click', function() {
    console.log('asc')
    asc()
})
buttonDESC.addEventListener('click', function() {
    console.log('desc')
    desc()
})



function asc() {
    function renderTasksASC() {
        container.innerHTML = template(tasksSorted());
    }

    function compareTasks(s1, s2) {
        return s2.title + s1.title;
    }

    function tasksSorted() {
        return [...taskData].sort(compareTasks);
    }
    renderTasksASC()
}

function desc() {
    function renderTasksASC() {
        container.innerHTML = template(tasksSorted());
    }

    function compareTasks(s1, s2) {
        return s2.title - s1.title;
    }

    function tasksSorted() {
        return [...taskData].sort(compareTasks);
    }
    renderTasksASC()
}



const server = 'http://localhost:3000/tasks/';
(function getData() {
    fetch(server)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            const tasks = { tasks: data }

            taskData = tasks.tasks
            console.log(taskData)
            desc()

        });

})();

/*
function renderTasks(tasks) {
    let source = document.querySelector('#task-list-template').innerHTML
    let template = Handlebars.compile(source);
    let result = template(tasks);
    let list = document.querySelector('#list')
    list.innerHTML = result
}
*/
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


}

function deleteTask() {
    if (event.target.classList.contains('delete')) {
        const itemKey = event.target.parentElement.parentElement.parentElement.parentElement.id;
        fetch(server + itemKey, {
            method: 'DELETE'
        })
        location.reload()
    }
}
// update Tasks

// get single Task