import React, { Component } from "react";
import "./AddUser.css";
import { UserConsumer } from "./UserContext";

class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
    };
  }

  addName = (e) => {
    this.setState({ name: e.target.value });
  };

  addEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  addUser = () => {
    let userObj = {
      name: this.state.name,
      email: this.state.email,
      address: {
        street: "Kulas Light",
        city: "Gwenborough",
        zipcode: "92998-3874",
      },
    };

    this.props.users.push(userObj);
  };

  render() {
    return (
      <div>
        <div className="titleAndDiv">Add New User</div>

        <div className="addUser">
          <div className="nameAndEmail">
            Name: <input type="text" onChange={this.addName} /> <br />
            Email: <input type="text" onChange={this.addEmail} />
          </div>

          <div className="addCancelBtns">
            <input
              type="button"
              value="Cancel"
              //   onClick={this.props.history.goBack()}
            />
            <input type="button" value="Add" onClick={this.addUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default AddUser;
