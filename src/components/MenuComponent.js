import React  from 'react'
import {Card,CardTitle,CardImg,CardImgOverlay, Breadcrumb, BreadcrumbItem} from 'reactstrap'
import Dishdetail from './DishdetailComponent'
import { Link, withRouter } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../share/baseUrl';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeadBack } from '../redux/ActionCreator';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders,
      feadbacks : state.feadbacks
      
    }
  }
  
  const mapDispatcherToProps = (dispatch)=>({
  
    postomment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: ()=>{dispatch(fetchLeaders())},
    postFeadBack :(firstname,lastname,telnum,email,agre,contactType ,message)=>dispatch(postFeadBack(firstname,lastname,telnum,email,agre,contactType ,message))
    
    
  
  });
const RenderMenuItem = ({dish })=>{


    return (
        <Card className="col-12 col-md-5 m-1">
            <Link to={`/menu/${dish.id}`} >
                <CardImg width="100%" src={baseUrl +dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
} 
  

   
    


 const Menu=(props)=>{

    
     
        const menu = props.dishes.dishes.map((dish) => {
            
            return(
                  <RenderMenuItem dish={dish} ></RenderMenuItem>
            )
        })
        if (props.dishes.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.dishes.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.dishes.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row col-12">
                    {menu}
                </div>
            </div>




        );
    }
  

    



export default withRouter(connect(mapStateToProps,mapDispatcherToProps)(Menu));