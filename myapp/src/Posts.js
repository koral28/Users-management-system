import React, { Component } from "react";
import "./Posts.css";
import AddPost from "./AddPost";
import { Scrollbars } from "react-custom-scrollbars";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      addTodoVisibleStyle: "invisiblePost",
      visible: false,
      visibleStyle: "",
      idClicked: false,
    };
  }

  addPost = () => {
    if (this.state.idClicked) {
      this.setState({
        visibleStyle: "invisiblePost",
      });
    }
    this.setState({ idClicked: !this.state.idClicked });
    this.setState({ visible: !this.state.visible });

    if (this.state.visible) {
      this.setState({
        addTodoVisibleStyle: "invisiblePost",
        visibleStyle: "visiblePost",
      });
    } else {
      this.setState({
        addTodoVisibleStyle: "visiblePost",
        visibleStyle: "invisiblePost",
      });
    }
  };

  render() {
    let invisible;
    let idIsClicked = this.props.todosPostsIsClicked;
    if (!idIsClicked) {
      invisible = "invisiblePost";
    }

    let posts = this.props.postsArr.map((post) => {
      return (
        <ul className="postElement" key={post.id}>
          <li key={post.body}>Title: {post.title}</li>
          <br />
          <li key={post.title}>Body: {post.body} </li>
        </ul>
      );
    });

    return (
      <div>
        <div className="postsAndBtnPost">
          <div className="postsTitle">Posts-User</div>
          <input
            className="addBtnPost"
            type="button"
            value="Add"
            onClick={() => {
              this.addPost();
            }}
          />
        </div>

        <div className="posts">
          <div className="addPosts">
            <div className={this.state.addTodoVisibleStyle}>
              <AddPost posts={this.props.postsArr} />
            </div>
          </div>

          <div className="postsList">
            <div className={this.state.visibleStyle}>
              <div className={invisible}>
                <Scrollbars style={{ width: 500, height: 500 }}>
                  {posts}
                </Scrollbars>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
