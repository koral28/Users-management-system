import React, { Component } from "react";
import "./AddTodo.css";

class AddTodo extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: "",
    };
  }

  saveData = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  addTodo = () => {
    this.props.todos.push(this.state.newTodo);
  };
  render() {
    return (
      <div className="allDivAddTodo">
        <div className="title">
          Title:{" "}
          <input className="titleTodo" type="text" onChange={this.saveData} />
        </div>
        <div className="addTodosBtns">
          <input
            type="button"
            value="Cancel"
            // onClick={this.props.history.goBack()}
          />
          <input type="button" value="Add" onClick={this.addTodo} />
        </div>
      </div>
    );
  }
}

export default AddTodo;
