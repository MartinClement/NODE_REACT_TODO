import React from 'react';

export default class Header extends React.Component {
  constructor() {
    super();
  }


  render() {

    const text = "ToDoList";
    const subtext = "Don't forget anything !";

    return (
      <div class="page-header">
        <h1>{text}<small>{subtext}</small></h1>
      </div>
    );
  }
}
