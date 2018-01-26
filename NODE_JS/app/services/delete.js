// Task Model
const Task = require('../models/task');

//const DAO = require('../dao');

/* *** *** IMPORTS *** *** */


function deleteTask(req, res) {
  Task.findByIdAndRemove(req.params.id, err => {
    if(err) res.send(err);

    res.json({ message: 'Successfully deleted' });
  });
}

module.exports = {

  deleteTask: deleteTask
}
