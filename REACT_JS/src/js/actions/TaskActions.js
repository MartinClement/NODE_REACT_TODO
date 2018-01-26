import dispatcher from '../dispatcher';
import axios from 'axios';

export function createTask(task) {
  dispatcher.dispatch({
    type: "CREATE_TASK",
    task
  });
}

export function deleteTask(id) {
  dispatcher.dispatch({
    type: "DELETE_TASK",
    id
  });
}

export function updateTask(taskData) {
  dispatcher.dispatch({
    type: "UPDATE_TASK",
    data: taskData
  });
}
