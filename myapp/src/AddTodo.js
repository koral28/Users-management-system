import React, { Component } from "react";
import "./AddTodo.css";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

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

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  render() {
    const { match, location, history } = this.props;
    return (
      <div className="allDivAddTodo">
        <div className="title">
          Title:{" "}
          <input className="titleTodo" type="text" onChange={this.saveData} />
        </div>
        <div className="addTodosBtns">
          <input type="button" value="Cancel" onClick={history.pathname} />
          <input type="button" value="Add" onClick={this.addTodo} />
        </div>
      </div>
    );
  }
}
const ShowTheLocationWithRouter = withRouter(AddTodo);

export default AddTodo;
