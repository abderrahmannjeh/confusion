import React ,{Component} from 'react'
import { ModalHeader, Col, Row ,Label,Card, CardImg, CardBody, CardTitle, CardText, BreadcrumbItem, Breadcrumb, Button, Modal, ModalBody } from 'reactstrap' 
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent';
import { baseUrl } from '../share/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

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
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);        }
        
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
                  <Label htmlFor="rating" md={12}>Rating</Label>
                  <Col md={{size: 12}}>
                      <Control.select model=".rating" name="rating"
                          className="form-control">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                      </Control.select>
                  </Col>
              </Row>

                            <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text  model=".author" id="name" name="author"
                                        placeholder="Raiting"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".author"
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

  const  RenderComments =({comments})=>
    {
        if(comments!=null)
       return( 
           <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">

        {comments.map((comment)=>{
            return(
                <div key={comment.id}>
                <li>
                    {comment.comment}
                    
                </li>
                <li>
                    --{comment.author , comment.date}
                </li>
                </div>
            )


        })}
       
       </ul>
       </div>
       )
        return(<div></div>)
    }

    const RenderDish=({dish})=>{
        
        return(
            <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
        <Card>
            <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
            </Card>
            </FadeTransform>)
    }

const Dishdetail=(props)=>
{       

    if (props.isLoading) {
        
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }

    if(props.dish!=null)
    {
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                    <CommentForm postComment={props.postComment} 
                    dishId={props.dish.id}
                    ></CommentForm>

                </div>
            </div>
            </div>
            
        );}
    else
    {return(<div></div>)}
}



export default Dishdetail;