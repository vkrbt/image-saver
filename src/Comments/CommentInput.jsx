import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import db from '../db.js'

class CommentInput extends Component {
  constructor() {
    super();
    this.state = { comment: '', btnDisabled: true };
  }
  addComment = () => {
    db.executeTransaction(`INSERT INTO comments(image_id, text) VALUES(${this.props.imageId}, '${this.state.comment}')`)
      .then((res) => {
        this.props.addComment();
        this.setState({comment: '', btnDisabled: true})
      })
  }
  commentInputChangeHandler = (e) => {
    e.preventDefault();
    this.setState({ comment: e.target.value });
    if (e.target.value.length > 2) {
      this.setState({ btnDisabled: false })
    } else {
      this.setState({ btnDisabled: true })
    }
  }
  render() {
    return (
      <div>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Enter your comment here: </ControlLabel>
          <FormControl componentClass="textarea" placeholder="Comment text" value={this.state.comment} onChange={this.commentInputChangeHandler} maxLength={200} />
        </FormGroup>
        <Button bsStyle='primary' onClick={this.addComment} disabled={this.state.btnDisabled}>Add</Button>
      </div>
    )
  }
}

export default CommentInput