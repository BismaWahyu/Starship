import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export class DetailModal extends Component{
    
    constructor(props){
        super(props);
    }
    
    render(){
        return(
          <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Starship Detail
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{this.props.title}</h4>
              <p>
                The {this.props.title} starship is a {this.props.class_ship} class with a cargo capacity of up to {this.props.cargo} and a passenger capacity of {this.props.passenger} <br/>
                This starship is manufactured by {this.props.manufacture}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>  
        );
    }
    
}