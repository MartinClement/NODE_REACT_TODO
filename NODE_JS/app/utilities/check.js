// check
const check = require('check-types');
// Task model
const Task = require('../models/task');

/* *** *** IMPORTS *** *** */

function checkProperties(body) {
  const request = {
    title: body.title,
    description: body.description,
    deadLine: body.deadLine,
    complete: body.complete,
  };

  const checkTypes = {
    title: check.string,
    description: check.string,
    deadLine: check.date,
    complete: check.boolean,
  };

  const params = check.map(request, checkTypes);
  console.log(params);

  // Map the Object to Array of values ans Iterate over
  for( let param of Object.values(params))
    if(!param)
      return false;

    return true;
}

module.exports = {
  checkProperties: checkProperties
}
