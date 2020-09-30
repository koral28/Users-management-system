import React, { Component } from "react";
import "./AddPost.css";

class AddPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
    };
  }

  saveDataTitle = (e) => {
    this.setState({ title: e.target.value });
  };
  saveDataBody = (e) => {
    this.setState({ body: e.target.value });
  };

  addPost = () => {
    let postObj = {
      title: this.state.title,
      body: this.state.body,
    };
    this.props.posts.push(postObj);
  };

  render() {
    return (
      <div className="allPostAdd">
        <div className="titleAndBody">
          <div className="title">
            Title:
            <input
              className="titleTodo"
              type="text"
              onChange={this.saveDataTitle}
            />
          </div>
          <div className="body">
            Body:
            <input
              className="bodyTodo"
              type="text"
              onChange={this.saveDataBody}
            />
          </div>
        </div>

        <div className="addPostsBtns">
          <input
            type="button"
            value="Cancel"
            // onClick={this.props.history.goBack()}
          />
          <input type="button" value="Add" onClick={this.addPost} />
        </div>
      </div>
    );
  }
}

export default AddPost;
