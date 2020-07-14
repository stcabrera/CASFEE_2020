const container = document.querySelector('#container');
const source = document.querySelector('#task-list-template').innerHTML;
const template = Handlebars.compile(source);

function asc() {
    function renderTasksASC() {
        container.innerHTML = template(() => { return [...taskData].sort(compareTasks); });
    }

    function compareTasks(t1, t2) {
        if (t1.title < t2.title) { return -1 }
        if (t1.title > t2.title) { return 1 }
        return 0;
    }
    renderTasksASC()
}

function FinishDate() {
    function renderTasksFinishDate() {
        container.innerHTML = template(() => { return [...taskData].sort(compareTasks); });
    }

    function compareTasks(t1, t2) {
        if (t1.dueDate < t2.dueDate) { return -1 }
        if (t1.dueDate > t2.dueDate) { return 1 }
        return 0;
    }
    renderTasksFinishDate()
}

function byImportance() {
    function renderTasksASC() {
        container.innerHTML = template(() => { return [...taskData].sort(compareTasks); });
    }

    function compareTasks(t1, t2) {
        if (t1.importance > t2.importance) { return -1 }
        if (t1.importance < t2.importance) { return 1 }
        return 0;
    }
    renderTasksASC()
}

function createdDate() {
    function renderTaskscreatedDate() {
        container.innerHTML = template(() => { return [...taskData].sort(compareTasks); });
    }

    function compareTasks(t1, t2) {
        if (t1.title < t2.title) { return -1 }
        if (t1.title > t2.title) { return 1 }
        return 0;
    }
    renderTaskscreatedDate()
}

function justFinished() {
    console.log(taskData)
    for (let i = 0; i < taskData.length; i++) {
        if (taskData[i].done === 'done') {
            let result = template(taskData[i]);
            container.innerHTML = template(taskData[i])
                //console.log(result)
        }
    }
}