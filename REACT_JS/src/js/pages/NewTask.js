import React from 'react';
import * as TaskActions from '../actions/TaskActions';
import TaskStore from '../stores/TaskStore';

export default class Task extends React.Component {

  constructor(props) {

    super(props);
    this.title = null;
    this.description = null;
    this.complete = false;
    this.deadLine = null;
  }


  createTask(e) {

    e.preventDefault();
    const taskData = {
      title: this.title,
      description: this.description,
      complete: this.complete,
      deadLine: new Date(this.deadLine)
    }

    console.log(taskData);
    TaskActions.createTask(taskData);
  }

  handleTitleChange(e) {

    this.title = e.target.value;

  }

  handleDescriptionChange(e) {

    this.description = e.target.value

  }

  handleDeadLineChange(e) {

    this.deadLine = e.target.value;

  }

  goToHomePage() {
    this.props.history.push('/');
  }


  render () {
    return (
      <div class="container">
        <div class="return-button">
            <button type="button" class="btn btn-primary" onClick={ this.goToHomePage.bind(this) }>&lt;</button>
        </div>
        <div class="task-form">
          <form onSubmit={this.createTask.bind(this)}>
            <div class="form-group">
              <label for="task-title">Titre</label>
              <input type="text" class="form-control" id="task-title"
                     onChange={this.handleTitleChange.bind(this)}
              />
              <small id="emailHelp" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
              <label for="task-decription">Description</label>
              <textarea
                class="form-control" id="task-description" rows="3"
                onChange={this.handleDescriptionChange.bind(this)}>
              </textarea>
            </div>
            <div class="form-group">
            <label class="form-check-label" for="task-deadline" >Date : </label>
              <input
                type="datetime-local"
                class="form-check-input"
                id="task-deadline"
                onChange={this.handleDeadLineChange.bind(this)}
              />
            </div>
            <button type="submit" class="btn btn-success">Sauvegarder</button>
          </form>
        </div>
      </div>

    );
  }
}
