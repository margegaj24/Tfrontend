import React from "react";
import { Card, Avatar, Comment, Button } from "antd";

const { Meta } = Card;

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      comments: [],
      commentsToShow: [],
      nextComment: 3,
      reached_end: false,
    };
  }

  setCommentsToShow = (array) => {
    this.setState({ commentsToShow: array });
  };

  handleShowMoreComments() {
    const slicedComments = this.state.comments.slice(
      this.state.nextComment,
      this.state.nextComment + 3
    );
    this.setState({ nextComment: this.state.nextComment + 3 });
    const arrayForHoldingComments = [
      ...this.state.commentsToShow,
      ...slicedComments,
    ];
    this.setCommentsToShow(arrayForHoldingComments);
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts/" + this.props.post_id)
      .then((response) => response.json())
      .then((data) => this.setState({ data: data }));
    fetch(
      "https://jsonplaceholder.typicode.com/posts/" +
        this.props.post_id +
        "/comments"
    )
      .then((response) => response.json())
      .then((data) => {
        //here we can choose 3 comments randomly but the short way is to choose the first 3 ones
        this.setState({ comments: data });
        this.setState({ commentsToShow: data.slice(0, 3) });
      });
  }

  render() {
    if (this.state.data === null || this.state.comments === null) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <Card style={{ marginTop: 5 }}>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            style={{ backgroundColor: "#AAFF80" }}
            title={this.state.data.title}
            description={this.state.data.body}
          />
          {this.state.commentsToShow.map((comment_obj) => (
            <Comment
              author={comment_obj.name}
              content={comment_obj.body}
            ></Comment>
          ))}

          <Button onClick={this.handleShowMoreComments.bind(this)}>
            Load more
          </Button>
        </Card>
      );
    }
  }
}
