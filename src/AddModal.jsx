import React, { Component } from 'react'
import { Button, Modal, FormGroup, FormControl, ControlLabel, Image } from 'react-bootstrap'

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
      this.props.addImage({ link: this.state.link, description: this.state.description });
      this.setState({ link: '', description: '' })
    } else {
      alert('Image isn\'t valid')
    }
  }
  linkInputChangeHandler = (e) => {
    e.preventDefault();
    this.linkInputValidator(e);
    this.setState({ link: e.target.value });
  }
  linkInputValidator = (e) =>{
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
                <FormControl maxLength={200} autoFocus componentClass='input' placeholder='Image Link' value={this.state.link} onChange={this.linkInputChangeHandler} required/>
              </FormGroup>
              <FormGroup controlId="description">
                <ControlLabel>Description</ControlLabel>
                <FormControl maxLength={200} componentClass="textarea" placeholder="Description" value={this.state.description} onChange={this.descriptionInputChangeHandler} />
              </FormGroup>
              <Image src={this.state.link} onError={this.makeButtonDisabled} onLoad={this.makeButtonActive} responsive hidden={this.state.isImageInvalid}/>
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

export default AddModal