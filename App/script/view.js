let saveButton = document.querySelector('#save')

saveButton.addEventListener("click", () => { document.querySelector('#modalForm').style.top = '-100vh'; });
saveButton.addEventListener('click', pushData)
document.querySelector('#sortASC').addEventListener('click', () => {
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        asc();
        container.removeAttribute('class', 'rotation')
    }, 200)
})
document.querySelector('#sortFinishDate').addEventListener('click', () => {
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        FinishDate();
        container.removeAttribute('class', 'rotation')
    }, 200)
})
document.querySelector('#sortcreatedDate').addEventListener('click', () => {
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        createdDate();
        container.removeAttribute('class', 'rotation')
    }, 200)
})
document.querySelector('#sortIMP').addEventListener('click', () => {
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        byImportance();
        container.removeAttribute('class', 'rotation')
    }, 200)
})
document.querySelector('#finished').addEventListener('click', justFinished)
document.querySelector('#pending').addEventListener('click', () => { console.log('pending') })
document.querySelector('#all').addEventListener('click', () => { console.log('all') })

container.addEventListener('click', checkTask)
container.addEventListener('click', deleteTask)