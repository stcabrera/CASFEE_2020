let saveButton = document.querySelector('#save');

saveButton.addEventListener("click", () => { document.querySelector('#modalForm').style.top = '-100vh'; });
saveButton.addEventListener('click', pushData);
container.addEventListener('click', checkTask);
container.addEventListener('click', deleteTask);

document.querySelector('#all').addEventListener('click', () => {
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        asc();
        container.removeAttribute('class', 'rotation')
    }, 300)
});

document.querySelector('#finished').addEventListener('click', () => {
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        justFinished();
        container.removeAttribute('class', 'rotation')
    }, 300)
});

document.querySelector('#pending').addEventListener('click', () => {
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        justUndone();
        container.removeAttribute('class', 'rotation')
    }, 300)
});

document.querySelector('#sortASC').addEventListener('click', () => {
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        asc();
        container.removeAttribute('class', 'rotation')
    }, 300)
});
document.querySelector('#sortFinishDate').addEventListener('click', () => {
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        FinishDate();
        container.removeAttribute('class', 'rotation')
    }, 300)
});
document.querySelector('#sortcreatedDate').addEventListener('click', () => {
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        createdDate();
        container.removeAttribute('class', 'rotation')
    }, 300)
});
document.querySelector('#sortIMP').addEventListener('click', () => {
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        byImportance();
        container.removeAttribute('class', 'rotation')
    }, 300)
});

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