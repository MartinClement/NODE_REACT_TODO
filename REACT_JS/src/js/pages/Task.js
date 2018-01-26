import React from 'react';
import Link from 'react-router';
import * as TaskActions from '../actions/TaskActions';
import TaskStore from '../stores/TaskStore';

export default class Task extends React.Component {

  constructor(props) {
    super(props);
    this.getTask = this.getTask.bind(this);
    this.id = this.props.params.id;
    this.task = null;
    this.taskTitle = null;
    this.taskDescription = null;
    this.taskComplete = null;
    this.state = {
      task: null
    }
  }

  componentWillMount () {

    this.getTask();
    TaskStore.on("change", this.goToHomePage.bind(this));
  }

  getTask() {
    TaskStore.getTask(this.id)
      .then((data) => {
        this.setState({
          task: data.data,
        });
        this.taskTitle = data.data.title,
        this.taskDescription = data.data.description,
        this.taskComplete = data.data.complete
      })
      .catch((err) => {
        console.error('ERROR :', err);
      });
  }

  updateTask(e) {

    e.preventDefault();
    const taskData = {
      id: this.id,
      title: this.taskTitle,
      description: this.taskDescription,
      complete: this.taskComplete
    }

    TaskActions.updateTask(taskData);
  }

  removeTask() {

    confirm('Etes-vous sur de vouloir supprimer cette tache ?');
    TaskActions.deleteTask(this.id);
  }

  handleTitleChange(e) {

    this.taskTitle = e.target.value;

  }

  handleDescriptionChange(e) {

    this.taskDescription = e.target.value

  }

  handleCompleteChange(e) {

    this.taskComplete = e.target.checked;

  }

  goToHomePage() {
    this.props.history.push('/');
  }


  render () {

    const { task } = this.state;

    if (!task) {

      return (
        <div>
          <span class="waiting-tasks-spinner">Retrieve your task ...</span>
        </div>
      );
    }

    const { title, description, deadLine, complete } = task
    const icon = complete ? "\u2714" : "\u2716";

    return (
      <div class="container">
        <div class="return-button">
            <button type="button" class="btn btn-primary" onClick={ this.goToHomePage.bind(this) }>&lt;</button>
        </div>
        <div class="task-form">
          <form onSubmit={this.updateTask.bind(this)}>
            <div class="form-group">
              <label for="task-title">Titre</label>
              <input type="text"
                     class="form-control"
                     id="task-title"
                     defaultValue={title}
                     onChange={this.handleTitleChange.bind(this)}
              />
              <small id="emailHelp" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
              <label for="task-decription">Description</label>
              <textarea
                class="form-control"
                id="task-description"
                rows="3"
                defaultValue={description}
                onChange={this.handleDescriptionChange.bind(this)}>
              </textarea>
            </div>
            <div class="form-group">
              <input
                type="checkbox"
                class="form-check-input"
                id="task-complete"
                defaultChecked={complete}
                onChange={this.handleCompleteChange.bind(this)}
              />
              <label class="form-check-label" for="task-complete" >Tâche complétée </label>
            </div>
            <button type="submit" class="btn btn-success">Sauvegarder</button>
          </form>
          <button type="submit" class="btn btn-xs btn-danger" onClick={this.removeTask.bind(this)}>Supprimer</button>
        </div>
      </div>

    );
  }

}
