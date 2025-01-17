import { createBrowserHistory } from "history";

import React, { Component } from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
import {DISHES} from '../share/dishes';
import { COMMENTS } from '../share/comments';
import { PROMOTIONS } from '../share/promotions';
import { LEADERS } from '../share/leaders';
import Dishdetail from './DishdetailComponent'
import Header from './HeaderComponent';
import Footer from './Footer';
import Home from './HomeComponent'
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeadBack } from '../redux/ActionCreator';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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

  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: ()=>{dispatch(fetchLeaders())},
  postFeadBack :(firstname,lastname,telnum,email,agre,contactType ,message)=>dispatch(postFeadBack(firstname,lastname,telnum,email,agre,contactType ,message))
  
  

});



class  Main extends Component {

  componentDidMount() {
    
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    console.log(this.props);
  }

 

  /*onDishSelect(dishId){
    this.setState({selectedDisheId : dishId });
   
    
}*/
  
  render(){
    const HomePage=()=>{
      
      return(
        <Home 
            dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
            promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
            promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
            leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
        />
    );
    }
    const DishWithId = ({match}) => {
      return(
        <Dishdetail  dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          postComment={this.props.postComment}
           />
    );
    };
  return (
    <div >
       
      <Header/>
      <TransitionGroup>
      <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>

   <Switch>
    <Route path='/home' component = {HomePage} ></Route>
    <Route exact path='/menu' component = {()=><Menu dishes={this.props.dishes} />} ></Route>
    <Route exact path="/contact" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeadBack ={this.props.postFeadBack} />}></Route>
    <Route exact path= '/menu/:dishId' component={DishWithId}></Route>
    <Route  path="/aboutus" component = {()=><About leaders={this.props.leaders.leaders} isLoading={this.props.leaders.isLoading}
          errMess={this.props.leaders.errMess} />}></Route>



   </Switch>
   </CSSTransition>
</TransitionGroup>
    <Footer></Footer>
      </div>
    
  );
}
}

export default withRouter(connect(mapStateToProps,mapDispatcherToProps)(Main));
