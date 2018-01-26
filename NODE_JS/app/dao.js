// Task model
const Task = require('./models/task');
const Logger = require('./logger');


/* *** *** IMPORTS *** *** */

// Data Access Object
class DAO extends Logger {

  constructor() {
    super();
  }

  find() {
    return new Promise((resolve, reject) => {
      Task.find((err, tasks) => {
        if (err) {
          this.log(`FIND ERROR ${err}`);
          reject(err);
        };

        this.log(`FIND SUCESSFULLY`);
        resolve(tasks);
      });
    });
  }

  findOneById(id) {
    return new Promise((resolve, reject) => {
      Task.findById(id, (err, task) => {
        if(err) {
          this.log(`FIND ERROR ${err}`);
          reject(err);
        }

        this.log(`FIND SUCESSFULLY`);
        resolve(task);
      });
    });
  }

}

module.exports = new DAO();
