import React, { Component } from "react";
import "./Todos.css";
import { Scrollbars } from "react-custom-scrollbars";
import AddTodo from "./AddTodo";

class Todos extends Component {
  constructor(props) {
    super();
    this.state = {
      todoId: "",
      visible: false,
      visibleStyled: "",
      addTodoVisibleStyle: "invisibleTodo",
      idClicked: false,
    };
  }

  markCompleted = (id) => {
    this.setState({
      todoId: id,
    });
    this.userTodosFinished();
  };

  userTodosFinished() {
    /*eslint-disable eqeqeq*/
    let numOfTodos = 0;
    let numOfFinish = 0;
    let numOfNotFinish = 0;

    this.props.todosArr.map((todo) => {
      if (this.props.userId == todo.userId) {
        numOfTodos++;
      }
    });

    this.props.todosArr.map((todo) => {
      if (this.props.userId == todo.userId) {
        if (!todo.completed) {
          numOfNotFinish++;
        }
      }
    });

    this.props.todosArr.map((todo) => {
      if (this.props.userId == todo.userId) {
        if (todo.completed) {
          numOfFinish++;
        }
      }
    });

    if (numOfFinish + 1 == numOfTodos) {
      this.props.userTodosFinishedUpdateFather(this.props.userId);
    }
  }

  addTodo = (idIsClicked) => {
    this.setState({ idClicked: !this.state.idClicked });
    this.setState({ visible: !this.state.visible });
    if (this.state.visible) {
      this.setState({ visibleStyled: "visibleTodo" });
      this.setState({ addTodoVisibleStyle: "invisibleTodo" });
    } else {
      this.setState({ visibleStyled: "invisibleTodo" });
      this.setState({ addTodoVisibleStyle: "visibleTodo" });
    }
  };

  render() {
    let visibleStyle;
    let completed = "";
    let idIsClicked = this.props.todosPostsIsClicked;

    let invisible;

    if (!idIsClicked) {
      invisible = "invisiblePost";
    }

    let todos = this.props.todosArr.map((todo, index) => {
      /*eslint eqeqeq: "off"*/
      if (todo.completed) {
        completed = "true";
        visibleStyle = "hideMarkCompleted";
      } else if (!todo.completed && todo.id == this.state.todoId) {
        completed = "true";
        visibleStyle = "hideMarkCompleted";
        todo.completed = true;
      } else {
        if (idIsClicked) {
          completed = "false";
          visibleStyle = "showMarkCompleted";
        }
      }

      if (this.state.idClicked) {
        visibleStyle = "hideMarkCompleted";
      }
      return (
        <ul className="todoElement" key={todo.id}>
          <li key={todo.title}>Todo Id: {todo.id}</li>
          <li key={todo.id}>Title: {todo.title}</li>
          <li key={todo.completed}>Completed: {completed} </li>
          <input
            className={visibleStyle}
            id={todo.id}
            type="button"
            value="Mark Completed"
            onClick={(e) => {
              this.markCompleted(e.target.id);
            }}
          />
        </ul>
      );
    });

    return (
      <div>
        <div className="todosAndBtnTodo">
          <p className="todosTitle">Todos-User</p>
          <input
            className="addBtnToDo"
            type="button"
            value="Add"
            onClick={() => {
              this.addTodo(idIsClicked);
            }}
          />
        </div>

        <div className="todos">
          <div className={this.state.addTodoVisibleStyle}>
            <div className={invisible}>
              <AddTodo todos={this.props.todosArr} />
            </div>
          </div>
          <div className={this.state.visibleStyled}>
            <div className={invisible}>
              <Scrollbars style={{ width: 500, height: 500 }}>
                {todos}
              </Scrollbars>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Todos;
