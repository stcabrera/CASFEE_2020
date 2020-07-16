let saveButton = document.querySelector('#save');
let updateButton = document.querySelector('#update');

container.addEventListener('click', checkTask);
container.addEventListener('click', deleteTask);
container.addEventListener('click', editTask);
container.addEventListener('click', getSingleTask);

saveButton.addEventListener("click", () => {
    document.querySelector('#modalForm').style.left = '-100%';
    pushData();
    clearForm();
});

updateButton.addEventListener('click', () => {
    document.querySelector('#modalForm').style.left = '-100%';
    updateTask();
    clearForm();
});

document.querySelector('#sortFinished').addEventListener('click', () => {
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        justFinished();
        container.removeAttribute('class', 'rotation')
    }, 300)
    window.localStorage.setItem('Template', 'finished');
});

document.querySelector('#sortPending').addEventListener('click', () => {
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        justUndone();
        container.removeAttribute('class', 'rotation')
    }, 300)
    window.localStorage.setItem('Template', 'pending');
});

document.querySelector('#sortASC').addEventListener('click', () => {
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        asc();
        container.removeAttribute('class', 'rotation')
    }, 300)
    window.localStorage.setItem('Template', 'ascending');
});
document.querySelector('#sortFinishDate').addEventListener('click', () => {
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        FinishDate();
        container.removeAttribute('class', 'rotation')
    }, 300)
    window.localStorage.setItem('Template', 'byFinishDate');
});
document.querySelector('#sortcreatedDate').addEventListener('click', () => {
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        createdDate();
        container.removeAttribute('class', 'rotation')
    }, 300)
    window.localStorage.setItem('Template', 'byCreatedDate');
});
document.querySelector('#sortIMP').addEventListener('click', () => {
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        byImportance();
        container.removeAttribute('class', 'rotation')
    }, 300)
    window.localStorage.setItem('Template', 'byImportance');
});

/*
(function displayDate() {
    let display = new Date().toLocaleDateString();
    let dateBox = document.querySelector('.date')
    dateBox.innerHTML = display;
})();

(function displayClock() {
    let display = new Date().toLocaleTimeString();
    let timeBox = document.querySelector('.time')
    timeBox.innerHTML = display;
    setTimeout(displayClock, 1000);
})(); 
*/