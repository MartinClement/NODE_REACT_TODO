import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import axios from 'axios';

class TaskStore extends EventEmitter {

  constructor(props) {
    super(props);
    this.tasks = null;
    this.APITasksUrl = "http://localhost:8081/api/v1/tasks";
    this.APITaskUrl  = "http://localhost:8081/api/v1/task/";
  }

  createTask(task) {

    console.log('task gonna be pushed');
    return axios.post(this.APITasksUrl, task)
      .then(result => {
        console.log(result);
        alert('task creation success');
      })
      .catch(err => console.error(err))

  }

  updateTask(data) {

    const taskData = {
      title: data.title,
      description: data.description,
      complete: data.complete
    };
    axios.put(this.APITaskUrl + data.id, taskData)
           .then(result => {
             console.log(result)
             alert('Votre tâche a bien été sauvegardée.');
           })
           .catch(err => console.error(err));
  }

  deleteTask(id) {

    console.log('task to be deleted : ' + id);
    axios.delete(this.APITaskUrl + id)
      .then(result => {
        console.log(result);
        this.emit('change');
      })
      .catch(err => console.error(err));
  }

  getTask(id) {

    return axios(this.APITaskUrl+id);

  }

  getAll() {

    return axios(this.APITasksUrl);

  }


  handleActions(action) {
    switch(action.type) {
      case "CREATE_TASK": {
        this.createTask(action.task);
        break;
      }
      case "RECEIVE_TASKS": {
        this.tasks = action.tasks;
        this.emit("change");
        break;
      }
      case "UPDATE_TASK": {
        this.updateTask(action.data)
        break;
      }
      case "DELETE_TASK": {
        this.deleteTask(action.id)
        break;
      }
    }
  }

}

const taskStore = new TaskStore;
dispatcher.register(taskStore.handleActions.bind(taskStore));

export default taskStore;
