import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, FormGroup, FormControl, ControlLabel, Image } from 'react-bootstrap'
import { addImage } from './actions/images'

class AddModal extends Component {
  constructor() {
    super()
    this.state = { link: '', description: '', isImageInvalid: true };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ show: nextProps.show });
  }
  addImage = () => {
    if (!this.state.isImageInvalid) {
      this.props.addImage(
        {
          link: this.state.link,
          description: this.state.description,
          date: Date.now(),
        }
      );
      this.setState({ link: '', description: '' })
      this.props.onClose();
    } else {
      alert('Image isn\'t valid')
    }
  }
  linkInputChangeHandler = (e) => {
    e.preventDefault();
    this.linkInputValidator(e);
    this.setState({ link: e.target.value });
  }
  linkInputValidator = (e) => {
    return this.state.isImageInvalid ? 'error' : 'success';
  }
  descriptionInputChangeHandler = (e) => {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }
  keyPressHandler = (event) => {
    if (event.key === 'Enter') {
      this.addImage();
    }
  }
  makeButtonDisabled = (e) => {
    this.setState({ isImageInvalid: true });
  }
  makeButtonActive = (e) => {
    this.setState({ isImageInvalid: false });
  }
  render() {
    return (
      <div className="modal-container" style={{ height: 200 }}>
        <Modal
          show={this.props.show}
          onHide={this.props.onClose}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Create post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onKeyPress={this.keyPressHandler}>
              <FormGroup controlId='image' validationState={this.linkInputValidator()}>
                <ControlLabel>Image Link*</ControlLabel>
                <FormControl
                  value={this.state.link}
                  onChange={this.linkInputChangeHandler}
                  componentClass='input'
                  autoFocus
                  placeholder='Image Link'
                  maxLength={200}
                  required />
              </FormGroup>
              <FormGroup controlId="description">
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  value={this.state.description}
                  onChange={this.descriptionInputChangeHandler}
                  maxLength={200}
                  componentClass="textarea"
                  placeholder="Description" />
              </FormGroup>
              <Image src={this.state.link} onError={this.makeButtonDisabled} onLoad={this.makeButtonActive} responsive hidden={this.state.isImageInvalid} />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.addImage} bsStyle="primary" disabled={this.state.isImageInvalid}>Add</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addImage: (image) => addImage(image)(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(AddModal)