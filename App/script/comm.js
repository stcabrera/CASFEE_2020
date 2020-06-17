fetch('http://localhost:3000/tasks')
  .then(response => response.json())
  .then(data => console.log(data));