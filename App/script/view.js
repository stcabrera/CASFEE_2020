//Push Data to API


saveButton.addEventListener("click", () => { document.querySelector('#modalForm').style.top = '-100vh'; });

document.querySelector('#sortASC').addEventListener('click', asc)
document.querySelector('#sortFinishDate').addEventListener('click', FinishDate)
document.querySelector('#sortcreatedDate').addEventListener('click', createdDate)
document.querySelector('#sortIMP').addEventListener('click', byImportance)
document.querySelector('#finished').addEventListener('click', justFinished)
document.querySelector('#pending').addEventListener('click', () => { console.log('pending') })
document.querySelector('#all').addEventListener('click', () => { console.log('all') })

// Check Task
container.addEventListener('click', event => {
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
});

// delete Task
container.addEventListener('click', deleteTask)