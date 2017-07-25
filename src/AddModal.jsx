import React, { Component } from 'react'
import { Button, Modal, FormGroup, FormControl, ControlLabel, Image } from 'react-bootstrap'

class AddModal extends Component {
  constructor() {
    super()
    this.state = { image: '', description: '', btnDisabled: true };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ show: nextProps.show });
  }
  addImage = () => {
    if(!this.state.btnDisabled){
      this.props.addImage({ link: this.state.image, description: this.state.description });
      this.setState({ image: '', description: '' })
    }else{
      alert('Image isn\'t valid')
    }
  }
  imageInputChangeHandler = (e) => {
    e.preventDefault();
    this.setState({ image: e.target.value });
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
  makeButtonDisabled = (e) =>{
    this.setState({btnDisabled: true});
  }
  makeButtonActive = (e) => {
    this.setState({btnDisabled: false});
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
              <FormGroup controlId='image'>
                <ControlLabel>Image Link</ControlLabel>
                <FormControl autoFocus componentClass='input' placeholder='Image Link' value={this.state.image} onChange={this.imageInputChangeHandler} />
              </FormGroup>
              <FormGroup controlId="description">
                <ControlLabel>Description</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Description" value={this.state.description} onChange={this.descriptionInputChangeHandler} />
              </FormGroup>
              <Image src={this.state.image} onError={this.makeButtonDisabled} onLoad={this.makeButtonActive} responsive/>

            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.addImage} bsStyle="primary" disabled={this.state.btnDisabled}>Add</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default AddModal