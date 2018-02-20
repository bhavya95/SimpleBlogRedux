import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost, deletePost } from "../actions";
import { Link } from "react-router-dom";

class PostsShow extends Component {
  componentDidMount() {
    //can also add if(!this.props.post) so as to prevent refetching data
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }
  onDelete() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }
  render() {
    const { post } = this.props;
    if (!post) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDelete.bind(this)}
        >
          Delete
        </button>
        <h3>{post.title}</h3>
        <h6>Categories : {post.categories}</h6>
        <p>{post.content}</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }
}
function mapStatetoProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStatetoProps, { fetchPost, deletePost })(PostsShow);
