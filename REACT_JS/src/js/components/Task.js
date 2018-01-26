import React from 'react';
import Link from 'react-router';

export default class Task extends React.Component {

  constructor(props) {

    super(props);

  }

  goToTask() {
    const { _id } = this.props;
    console.log(this.props);
    this.props.history.push('/task/' + _id);

  }

  render() {

    const { complete, title, description, edit } = this.props;
    const icon = complete ? "\u2714" : "\u2716";

    if (edit) {

      return (
        <li>
          <input value={description} focus="focused"/>
        </li>
      );
    }

    return (
      <button type='button' class="list-group-item" onClick={this.goToTask.bind(this)}>
        <span>{title} : {description}</span>
        <span>{icon}</span>
      </button>
    );
  }
}
