const express = require('express');
const app = express();
const title = 'Title: ' + document.querySelector('#title').value;
const note = 'Note: ' + document.querySelector('#note').value;
const importance = 'Importance: ' + document.querySelector('#importance').value;
const dueDate = 'Due date: ' + document.querySelector('#date').value;
const tasks = [
  {
    "title":"Projekt 1",
    "note": "Projekt 1 fertigstellen",
    "importance": "high",
    "duedate": "today"
    }
]

//Body Parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Get Tasks
app.get('/api/tasks', function (req, res) {
  res.json(tasks);
});

// Create Task
app.post('/api/tasks', function (req, res) {
  const newTask = {
    title: req.body.title,
    description: req.body.description,
    duedate: req.body.duedate
  }
  tasks.push(newTask);
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});

