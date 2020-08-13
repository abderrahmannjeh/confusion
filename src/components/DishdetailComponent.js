import React  from 'react'
import { Card, CardImg, CardBody, CardTitle, CardText, BreadcrumbItem, Breadcrumb } from 'reactstrap' 
import { Link } from 'react-router-dom'

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
        
        return(<Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>

</Card>)
    }

const Dishdetail=(props)=>
{
    
    console.log(props.dish);
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
                </div>
            </div>
            </div>
        );}
    else
    {return(<div></div>)}
}



export default Dishdetail;