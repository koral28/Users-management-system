import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "./AllUsers.css";
import User from "./User";
import Utils from "./Utils";
import { UserProvider } from "./UserContext";
import Todos from "./Todos";
import Posts from "./Posts";
import AddUser from "./AddUser";

class AllUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      posts: [],
      todos: [],
      todosById: [],
      postsById: [],
      searchWord: "",
      searchOn: false,
      isVisible: false,
      isVisibleAddUser: false,
      userIdOnFocus: "",
      todosPostsIsClicked: false,
      userFinishId: "",
      finish: false,
    };
  }

  async componentDidMount() {
    let usersData = await Utils.getAllData(
      "https://jsonplaceholder.typicode.com/users"
    );
    this.setState({ users: usersData });
    let postsData = await Utils.getAllData(
      "https://jsonplaceholder.typicode.com/posts"
    );
    this.setState({ posts: postsData });
    let todosData = await Utils.getAllData(
      "https://jsonplaceholder.typicode.com/todos"
    );
    this.setState({ todos: todosData });
  }

  searchFilterResults = (e) => {
    this.setState({ searchOn: true, searchWord: e.target.value });
  };

  saveData = (id, updateUser) => {
    /*eslint-disable eqeqeq*/
    let users = [...this.state.users];
    let userIndex = users.findIndex((user) => user.id == id);
    if (updateUser.name != null) {
      users[userIndex].name = updateUser.name;
    }
    if (updateUser.email != null) {
      users[userIndex].email = updateUser.email;
    }

    // console.log(this.state.users[userIndex].name);
  };

  //need to be different keys in <User/> elements!
  deleteData = (id) => {
    this.setState({ users: this.state.users.filter((user) => user.id != id) });
  };

  showHideTodosPosts = (id) => {
    let userTodosById = [];
    this.state.todos.map((todo) => {
      if (id == todo.userId) {
        userTodosById.push(todo);
      }
    });
    let userPostsById = [];
    this.state.posts.map((post) => {
      if (id == post.userId) {
        userPostsById.push(post);
      }
    });
    this.setState({
      isVisible: !this.state.isVisible,
      userIdOnFocus: id,
      todosPostsIsClicked: !this.state.todosPostsIsClicked,
      finish: false,
      todosById: userTodosById,
      postsById: userPostsById,
    });
  };

  addUser = () => {
    this.setState({
      isVisibleAddUser: !this.state.isVisibleAddUser,
    });
  };

  update = (id) => {
    this.setState({
      userFinishId: id,
      finish: !this.state.finish,
    });
  };

  render() {
    let visibleStyle;
    if (this.state.isVisible) {
      visibleStyle = "visibleStyle";
    } else {
      visibleStyle = "hiddenStyle";
    }
    let visibleStyleAddUser;
    if (this.state.isVisibleAddUser) {
      visibleStyleAddUser = "visibleStyle";
    } else {
      visibleStyleAddUser = "hiddenStyle";
    }

    let allUsersFromWS = this.state.users.map((val, index) => {
      if (this.state.searchOn) {
        if (
          val.name.includes(this.state.searchWord) ||
          val.email.includes(this.state.searchWord)
        ) {
          return (
            <UserProvider
              key={index}
              value={{
                street: val.address.street,
                city: val.address.city,
                zipcode: val.address.zipcode,
              }}
            >
              <User
                key={val.email}
                name={val.name}
                email={val.email}
                id={val.id}
                idFinish={this.state.userFinishId}
                finish={this.state.finish}
                updateParentData={(id, user) => this.saveData(id, user)}
                deleteParentData={(id) => this.deleteData(id)}
                showHideTodosPosts={() => this.finishedTodos()}
                // street={val.address.street}
                // city={val.address.city}
                // zipcode={val.address.zipcode}
              />
            </UserProvider>
          );
        } else {
          return <div key={index} />;
        }
      }
      return (
        <UserProvider
          key={val.name}
          value={{
            street: val.address.street,
            city: val.address.city,
            zipcode: val.address.zipcode,
          }}
        >
          <User
            key={val.id}
            name={val.name}
            email={val.email}
            id={val.id}
            idFinish={this.state.userFinishId}
            finish={this.state.finish}
            updateParentData={(id, user) => this.saveData(id, user)}
            deleteParentData={(id) => this.deleteData(id)}
            showHideTodosPosts={(id) => this.showHideTodosPosts(id)}
            // street={val.address.street}
            // city={val.address.city}
            // zipcode={val.address.zipcode}
          />
        </UserProvider>
      );
    });

    //hide and show todos and posts

    return (
      <div>
        <div className={visibleStyle}>
          <Todos
            todosPostsIsClicked={this.state.todosPostsIsClicked}
            key={this.state.todos.title}
            todosArr={this.state.todosById}
            userId={this.state.userIdOnFocus}
            userTodosFinishedUpdateFather={(userTodosFinished) =>
              this.update(userTodosFinished)
            }
          />
          <Posts
            todosPostsIsClicked={this.state.todosPostsIsClicked}
            key={this.state.todos.userId}
            postsArr={this.state.postsById}
            userId={this.state.userIdOnFocus}
          />
        </div>

        <div className={visibleStyleAddUser}>
          <AddUser users={this.state.users} />
        </div>

        <div className="allUsers">
          <Scrollbars style={{ width: 400, height: 800 }}>
            <div className="searchAdd">
              Search
              <input
                style={{
                  display: "inline-block",
                  width: "100px",
                  height: "15px",
                }}
                type="text"
                onChange={this.searchFilterResults}
              />
              <input
                className="add"
                style={{ display: "inline-block" }}
                type="button"
                defaultValue="Add"
                onClick={this.addUser}
              />
              <br />
            </div>
            {allUsersFromWS}
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default AllUsers;
