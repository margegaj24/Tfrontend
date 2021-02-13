import React from "react";
import Post from "./Post";

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => this.setState({ data: data }));
  }

  render() {
    if (this.state.data === null) {
      return <h1>Loading...</h1>;
    } else {
      return this.state.data.map((obj) => <Post post_id={obj.id} />);
    }
  }
}
