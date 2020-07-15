let taskData = [];
const server = 'http://localhost:3000/tasks/';


function clearForm() {
    document.querySelector('#title').value = '';
    document.querySelector('#note').value = '';
    document.querySelector('#importance').value = '';
    document.querySelector('#date').value = '';
    document.querySelector('#update').style.display = 'none';
    document.querySelector('#save').style.display = 'block';
}

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
};

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
    let dDate = new Date(document.querySelector('#date').value);
    let day = dDate.getDate();
    let month = dDate.getMonth() + 1;
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
            "dueDate": document.querySelector('#date').value,
            "dueDateDay": day,
            "dueDateMonth": months[dDate.getMonth()],
            "dueDateYear": year,
            "created": today,
            "done": false
        })
    })
    setTimeout(getData, 10)
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
        const itemKey = event.target.parentElement.parentElement.parentElement.parentElement.id
        console.log(itemKey)
        const taskTitle = event.target.parentElement.parentElement.parentElement.children[0].innerText
        const taskNote = event.target.parentElement.parentElement.parentElement.children[1].innerText
        const taskImportance = event.target.parentElement.parentElement.parentElement.parentElement.classList[2]
        const taskDuedatee = event.target.parentElement.parentElement.parentElement.children[2].innerText
        console.log(taskDuedatee);
        document.querySelector('#modalForm').style.left = '0';
        document.querySelector('#save').style.display = 'none';
        document.querySelector('#update').style.display = 'block';
        document.querySelector('#title').value = taskTitle;
        document.querySelector('#note').value = taskNote;
        document.querySelector('#importance').value = taskImportance;
        document.querySelector('#key').value = itemKey;
        document.querySelector('#date').value = taskDuedatee;
    }
}

function updateTask() {
    const itemKey = document.querySelector('#key').value;
    const importanceValue = document.querySelector('#importance').value;
    const dDate = new Date(document.querySelector('#date').value);
    let day = dDate.getDate();
    let month = dDate.getMonth() + 1;
    let year = dDate.getFullYear();
    let today = day + '.' + month + '.' + year;
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    fetch(server + itemKey, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "title": document.querySelector('#title').value,
            "note": document.querySelector('#note').value,
            "importance": (() => {
                if (importanceValue === 'high') { return 3 + ' high' };
                if (importanceValue === 'medium') { return 2 + ' medium' };
                if (importanceValue === 'low') { return 1 + ' low' };
            })(),
            "dueDate": document.querySelector('#date').value,
            "dueDateDay": day,
            "dueDateMonth": months[dDate.getMonth()],
            "dueDateYear": year,
            "modified": today,
            "done": false
        }),
    });
    console.log(dDate);
    console.log(document.querySelector('#date').value);
    setTimeout(getData, 10)
}

// get single Task