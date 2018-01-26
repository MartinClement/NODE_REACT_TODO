import React from 'react';

import Task from '../components/Task';
import * as TaskActions from '../actions/TaskActions';
import TaskStore from '../stores/TaskStore';

export default class Tasks extends React.Component {

  constructor(props) {
    super(props);
    this.getTasks = this.getTasks.bind(this);
    this.state = {
      tasks: null
    };
  }

  componentWillMount() {

    //TaskStore.on("change", this.getTasks);
    this.getTasks();
  }

  componentWillUnmount() {

    //TaskStore.removeListener("change", this.getTasks);
  }

  getTasks() {

    TaskStore.getAll()
      .then((data) => {
        this.setState({

          tasks: data.data
        });
      })
      .catch((err) => {
        console.error('ERROR :', err);
      });
  }

  goToNewTask () {

    this.props.history.push('/new');
  }

  render() {

    const { tasks } = this.state;

    if (!tasks) {
      return (
        <div>
          <span class="waiting-tasks-spinner">Retrieve your tasks ...</span>
        </div>
      );

    } else {

      if (tasks.length === 0) {
        return (
          <div>
            <h1>Liste de vos tâches</h1>
            <p>Aucunes tâches</p>
          </div>
        );
      }

      const TaskComponents = tasks.map((task) => {
        task.history = this.props.history;
        return <Task key={task._id} {...task}/>;
      });

      return (
        <div>
          <h1>Liste de vos tâches</h1>
          <button type="button" class="btn-success btn-block" onClick={this.goToNewTask.bind(this)}>Nouvelle tâche</button>
          <div class="list-group">{TaskComponents}</div>
        </div>
      );
    }
  }
}
