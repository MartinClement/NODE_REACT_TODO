// Task Model
const Task = require('../models/task');

const DAO = require('../dao');

/* *** *** IMPORTS *** *** */


function updateTask(req, res ) {

  console.log(req.params.id);
  DAO.findOneById(req.params.id)
    .then(task => {

      task.title       = req.body.title;
      task.description = req.body.description;
      task.updatedAt   = new Date();
      task.complete    = req.body.complete;

      task.save((err, result) => {
        if(err)
          return res.send(err);

        res.json({
          action: 'update',
          status: 'success',
          data: result
        });
      });

    })
    .catch(err => console.error('ERROR: ', err));
}

module.exports = {
  updateTask: updateTask
};
