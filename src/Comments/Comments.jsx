import React, { Component } from 'react'
import Comment from './Comment.jsx'
import CommentInput from './CommentInput.jsx'
import db from '../db.js'

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      comments: []
    }
  }
  componentWillMount() {
    this.getComments();
  }
  getComments =()=>{
    db.executeTransaction(`SELECT * FROM comments WHERE image_id=${this.props.imageId}`).then((res) => {
      this.setState({ comments: res });
    });
  }
  addComment = () => {
    this.getComments();
  }
  render() {
    return (
      <div>
        {this.state.comments.map((comment) => {
          return <Comment key={comment.id} comment={comment.text} />
        })}
        <CommentInput imageId={this.props.imageId} addComment={this.addComment} />
      </div>
    )
  }
}
export default Comments