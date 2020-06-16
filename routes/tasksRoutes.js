const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get Tasks
router.get('/', (req, res) => {
  res.send('Blubber');
});

router.post('/', (req,res) => {
  console.log(req.body.title);
  const task = new Task({
    title: req.body.title,
    note: req.body.note,
    importance: req.body.importance,
    dueDate: req.body.dueDate
  });

  task.save()
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    console.log('Error');
  })
});

module.exports = router;