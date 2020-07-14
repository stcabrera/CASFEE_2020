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
            console.log(taskData)
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
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
            "dueDateMonth": months[dDate.getMonth()],
            "dueDateYear": year,
            "created": today,
            "done": false
        })
    })
    location.reload()
}

function deleteTask() {
    if (event.target.classList.contains('delete')) {
        let confirmDelete = confirm('Wollen Sie diesen Task wirklich löschen');
        if (confirmDelete == true) {
            const itemKey = event.target.parentElement.parentElement.parentElement.parentElement.id;
            fetch(server + itemKey, {
                method: 'DELETE'
            })
            setTimeout(getData, 10)
        }
    }
}

function checkTask(event) {
    if (event.target.classList.contains('check')) {
        const itemKey = event.target.parentElement.parentElement.parentElement.id
        if (event.target.classList.contains('false')) {
            fetch(server + itemKey, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "done": true }),
            })

            setTimeout(getData, 10)

        } else {
            fetch(server + itemKey, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "done": false }),
            })
            setTimeout(getData, 10)
        }
    }
};

// get single Task