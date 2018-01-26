// Check
const check = require('../utilities/check');
// Task model
const Task = require('../models/task');
const TaskMapper = require('../utilities/TaskMapper');

/* *** *** IMPORTS *** *** */

function post(req, res) {

  if(!check.checkProperties(req.body)) {
    return res.sendStatus(400);
  }

  const date = new Date();
  const task = new Task();
   task.title       = req.body.title;
   task.description = req.body.description;
   task.createdAt   = date;
   task.updatedAt   = date;
   task.deadLine    = req.body.deadLine;
   task.complete    = false;

   task.save((err, result) => {
     if (err) res.send(err);

     const mappedResult = TaskMapper(result);
     res.json(mappedResult);
   });
}

module.exports = post;
