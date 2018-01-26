// Task Model
const Task = require('../models/task');

const DAO = require('../dao');

/* *** *** IMPORTS *** *** */

function initMessage() {
  return { message: 'Welcom on the Todo API Service' };
}

function init(req, res) {
  const message = initMessage();
  res.json(message);
}


function getTasks(req, res) {
  DAO.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.send(err));
}

function getTask(req, res) {
  DAO.findOneById(req.params.id)
    .then(tasks => res.json(tasks))
    .catch(err => res.send(err));
}




module.exports = {
  init: init,
  initMessage: initMessage,
  getTasks: getTasks,
  getTask: getTask
};
