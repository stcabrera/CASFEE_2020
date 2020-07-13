function asc() {
    function renderTasksASC() {
        container.innerHTML = template(tasksSorted());
    }

    function compareTasks(t1, t2) {
        if (t1.title < t2.title) { return -1 }
        if (t1.title > t2.title) { return 1 }
        return 0;
    }

    function tasksSorted() {
        return [...taskData].sort(compareTasks);
    }
    renderTasksASC()
}

function FinishDate() {
    function renderTasksFinishDate() {
        container.innerHTML = template(tasksSorted());
    }

    function compareTasks(t1, t2) {
        if (t1.title > t2.title) { return -1 }
        if (t1.title < t2.title) { return 1 }
        return 0;
    }

    function tasksSorted() {
        return [...taskData].sort(compareTasks);
    }
    renderTasksFinishDate()
}

function byImportance() {
    function renderTasksASC() {
        container.innerHTML = template(tasksSorted());
    }

    function compareTasks(t1, t2) {
        if (t1.importance > t2.importance) { return -1 }
        if (t1.importance < t2.importance) { return 1 }
        return 0;
    }

    function tasksSorted() {
        return [...taskData].sort(compareTasks);
    }
    renderTasksASC()
}

function createdDate() {
    function renderTaskscreatedDate() {
        container.innerHTML = template(tasksSorted());
    }

    function compareTasks(t1, t2) {
        if (t1.title < t2.title) { return -1 }
        if (t1.title > t2.title) { return 1 }
        return 0;
    }

    function tasksSorted() {
        return [...taskData].sort(compareTasks);
    }
    renderTaskscreatedDate()
}

function justFinished() {
    function renderTasksjustFinished() {
        container.innerHTML = template(tasksSorted());
    }

    function compareTasks(t1, t2) {
        if (t1.title < t2.title) { return -1 }
        if (t1.title > t2.title) { return 1 }
        return 0;
    }

    function tasksSorted() {
        return [...taskData].sort(compareTasks);
    }
    renderTasksjustFinished()
}