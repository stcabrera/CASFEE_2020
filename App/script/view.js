let list = document.querySelector('#list')

//Push Data to API
const saveButton = document.querySelector('#save')
saveButton.addEventListener('click', pushData)
saveButton.addEventListener("click", function() {
    document.querySelector('#modalForm').style.top = '-100vh'
});

// Check Task
list.addEventListener('click', event => {
    if (event.target.classList.contains('check')) {
        const itemKey = event.target.parentElement.parentElement.parentElement.id
        if (event.target.classList.contains('undone')) {
            fetch(server + itemKey, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "done": 'done' }),
            })

            location.reload()

        } else {
            fetch(server + itemKey, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "done": 'undone' }),
            })
            location.reload()
        }
    }
});

// delete Task
list.addEventListener('click', deleteTask)