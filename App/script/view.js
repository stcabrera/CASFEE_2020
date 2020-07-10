let list = document.querySelector('#list');

//Push Data to API
const saveButton = document.querySelector('#save');
saveButton.addEventListener('click', pushData);
saveButton.addEventListener("click", function() {
    document.querySelector('#modalForm').style.top = '-100vh';
});


// Check Task
list.addEventListener('click', event => {
    const myHeaders = new Headers();
    if (event.target.classList.contains('check')) {
        const itemKey = event.target.parentElement.parentElement.parentElement.id;
        if (event.target.classList.contains('undone')) {
            myHeaders.append("Content-Type", "application/json");
            const requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: JSON.stringify({ "done": 'done' }),
                redirect: 'follow'
            };

            fetch(server + itemKey, requestOptions)
            location.reload()

        } else {
            myHeaders.append("Content-Type", "application/json");
            const requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: JSON.stringify({ "done": 'undone' }),
                redirect: 'follow'
            };

            fetch(server + itemKey, requestOptions)
            location.reload()
        }
    }
});

// delete Task
list.addEventListener('click', deleteTask)