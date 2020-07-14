class HttpService {
    ajax(method, data) {
        return fetch(server, {
            method: method,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)

        }).then(function(data) {
            const tasks = { tasks: data }
            taskData = tasks.tasks
            console.log(blub)
        });
    }
}


(function() {
    new HttpService('GET');
    //console.log(tasks)
})();