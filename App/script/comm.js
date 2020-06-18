function getData() {
  fetch('http://localhost:3000/tasks')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      var list = document.querySelector('#list');
      var li = document.createElement('li');
          li.className = "listItem";
          li.innerHTML = data[i].title + '<br>' + data[i].note + '</br>' + data[i].importance + '<br>' + data[i].dueDate;
         
         list.appendChild(li);
    }
  })

  .catch(function(error) {
    console.error(error);
  });

  
}
getData();

