import React, { Component } from "react";
import "./User.css";
import OtherData from "./OtherData";

class User extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      otherContentFit: false,
      backgroundIdChange: false,
      user: {
        name: "",
        email: "",
        address: {
          street: "",
          city: "",
          zipcode: "",
        },
      },
    };
  }
  otherDataVisible = () => {
    if (!this.state.isVisible) {
      this.setState({ isVisible: !this.state.isVisible });
    }
    if (!this.state.otherContentFit) {
      this.setState({ otherContentFit: !this.state.otherContentFit });
    }
  };
  otherDataInvisible = () => {
    if (this.state.isVisible) {
      this.setState({ isVisible: !this.state.isVisible });
    }
    if (this.state.otherContentFit) {
      this.setState({ otherContentFit: !this.state.otherContentFit });
    }
  };

  updateName = (e) => {
    this.setState({ user: { name: e.target.value } });
  };

  updateEmail = (e) => {
    this.setState({ user: { email: e.target.value } });
  };

  updateUser = (id) => {
    // console.log("yes");
    this.props.updateParentData(id, this.state.user);
  };

  deleteUser = (id) => {
    this.props.deleteParentData(id);
  };

  openUserTodosPosts = (id) => {
    this.props.showHideTodosPosts(id);
    this.setState({ backgroundIdChange: !this.state.backgroundIdChange });
  };

  render() {
    /*eslint-disable eqeqeq*/
    let backgroundUserChangeIdPress;

    if (this.state.backgroundIdChange) {
      backgroundUserChangeIdPress = "coloredUserDiv";
    } else {
      backgroundUserChangeIdPress = "noColorUserDiv";
    }

    let visibleStyle;
    if (this.state.isVisible) {
      visibleStyle = "visibleStyle";
    } else {
      visibleStyle = "hiddenStyle";
    }
    let userOtherContentFit;
    if (this.state.otherContentFit) {
      userOtherContentFit = "User2";
    } else {
      userOtherContentFit = "User1";
      if (this.props.finish == true && this.props.idFinish == this.props.id) {
        userOtherContentFit = "User3";
      }
    }

    return (
      <div className={userOtherContentFit}>
        <div className={backgroundUserChangeIdPress}>
          ID:
          <input
            className="id"
            type="button"
            value={this.props.id}
            onClick={() => {
              this.openUserTodosPosts(this.props.id);
            }}
          />
          <br />
          <div className="userInputAndBtns">
            Name:
            <input
              type="text"
              defaultValue={this.props.name}
              onChange={this.updateName}
            />
            <br />
            Email:
            <input
              type="text"
              defaultValue={this.props.email}
              onChange={this.updateEmail}
            />
            <br />
            <input
              className="otherData"
              style={{
                display: "inline-block",
                width: "100px",
                height: "20px",
              }}
              type="button"
              defaultValue="Other Data"
              onMouseOver={this.otherDataVisible}
              onClick={this.otherDataInvisible}
            />
            <div className={visibleStyle}>
              <OtherData
              // street={this.props.street}
              // city={this.props.city}
              // zipcode={this.props.zipcode}
              />
            </div>
            <div className="updateDelete">
              <input
                style={{
                  display: "inline-block",
                  width: "100px",
                  height: "20px",
                }}
                type="button"
                defaultValue="Update"
                onClick={() => {
                  this.updateUser(this.props.id);
                }}
              />
              <input
                style={{
                  display: "inline-block",
                  width: "100px",
                  height: "20px",
                }}
                type="button"
                defaultValue="Delete"
                onClick={() => {
                  this.deleteUser(this.props.id);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
