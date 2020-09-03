import React , {Component} from 'react'
import { Modal, ModalHeader, Button, ModalBody, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
const minLength = (len) => (val) => val && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);

class CommentForm extends Component {

        constructor(props){

            super(props);

            this.state = {
                isModalOpen: false
              };

            this.toggleModal = this.toggleModal.bind(this);
        }
            
         toggleModal = ()=>{
            this.setState({isModalOpen : !this.state.isModalOpen});

        }
        submitForm(values){
            alert(JSON.stringify(values));
        }

        render(){


            return(
                <React.Fragment>
                <Button onClick={this.toggleModal} className="btn btn-light"><span className="fa fa-pencil"></span> Submite Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                <ModalHeader toggle={this.toggleModal}> 
                Submit Comment
                </ModalHeader>
                <ModalBody>
                <div  >

                    <LocalForm onSubmit={(values)=>this.submitForm(values)}>
                    <Row className="form-group">
                                <Label htmlFor="raiting" md={12}>Raiting</Label>
                                <Col md={12}>
                                    <Control.text type="number" model=".raiting" id="raiting" name="raiting"
                                        placeholder="Raiting"
                                        className="form-control"
                                        
                                         />
                                   
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text  model=".name" id="name" name="name"
                                        placeholder="Raiting"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 numbers',
                                            maxLength: 'Must be 15 numbers or less',

                                        }}></Errors>
                                   
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea  model=".comment" id="comment" name="comment"
                                        placeholder="Comment"
                                        className="form-control"
                                        
                                         />
                                   
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submite
                                    </Button>
                                </Col>
                            </Row>
                    </LocalForm>
                    </div>
                </ModalBody>

                   

            </Modal>
            </React.Fragment>
            )


        }

}
