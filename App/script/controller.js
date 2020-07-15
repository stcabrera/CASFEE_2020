let taskData = []
const server = 'http://localhost:3000/tasks/';

function getTemplate() {
    let storedTemplate = window.localStorage.getItem('Template');
    if (storedTemplate === 'all') {
        FinishDate();
    } else if (storedTemplate === 'finished') {
        justFinished();
    } else if (storedTemplate === 'pending') {
        justUndone();
    } else if (storedTemplate === 'ascending') {
        asc();
    } else if (storedTemplate === 'byFinishDate') {
        FinishDate();
    } else if (storedTemplate === 'byCreatedDate') {
        createdDate();
    } else {
        byImportance();
    }
}

function getData() {
    fetch(server)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            const tasks = { tasks: data };
            taskData = tasks.tasks;
            getTemplate();
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

function editTask(event) {
    if (event.target.classList.contains('edit')) {
        const itemKey = event.target.parentElement.parentElement.parentElement.id
        const taskTitle = event.target.parentElement.parentElement.parentElement.children[0].innerText
        const taskNote = event.target.parentElement.parentElement.parentElement.children[1].innerText
        const taskImportance = event.target.parentElement.parentElement.parentElement.parentElement.classList[2]
        document.querySelector('#modalForm').style.left = '250px';
        document.querySelector('#modalForm').style.width = '400px';
        document.querySelector('#save').style.display = 'none';
        document.querySelector('#update').style.display = 'block';
        document.querySelector('.closeForm').style.left = '370px';
        document.querySelector('#title').value = taskTitle;
        document.querySelector('#note').value = taskNote;
        document.querySelector('#importance').value = taskImportance;
    }
}


// get single Task