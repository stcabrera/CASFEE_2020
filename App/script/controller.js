let taskData = []
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

function pushData() {
    const importanceValue = document.querySelector('#importance').value;
    let dDate = new Date(document.querySelector('#date').value)
    let day = dDate.getDate()
    let month = dDate.getMonth() + 1
    let year = dDate.getFullYear();
    let today = day + '.' + month + '.' + year;

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

function checkTask(event) {
    if (event.target.classList.contains('check')) {
        const itemKey = event.target.parentElement.parentElement.parentElement.id
        if (event.target.classList.contains('undone')) {
            fetch(server + itemKey, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "done": 'done' }),
            })

            setTimeout(getData, 10)

        } else {
            fetch(server + itemKey, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "done": 'undone' }),
            })
            setTimeout(getData, 10)
        }
    }
};

// get single Task