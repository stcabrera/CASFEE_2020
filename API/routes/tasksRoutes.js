const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get Tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Create Task
router.post('/', (req,res) => {
  console.log(req.body);
  const task = new Task({
    title: req.body.title,
    note: req.body.note,
    importance: req.body.importance,
    dueDate: req.body.dueDate,
    done: req.body.done
    
  });

  task.save()
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    console.log('Error');
  })
});
// Specific Task
router.get('/:taskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    res.json(task);
  } catch (err) {
    console.log('error');
  }
})
// Delete Task
router.delete('/:taskId', async (req,res) => {
  try {
    const removedPost = await Task.remove({_id: req.params.taskId});
  }
  catch(err) {
    console.log('Error');
  }
});

module.exports = router;