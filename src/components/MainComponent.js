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
import {Switch , Router,Redirect, Route} from 'react-router-dom'
import Contact from "./ContactComponent";
import About from "./AboutComponent";

class  Main extends Component {


  constructor(props)
  {
    super(props);
    this.state ={
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }


  /*onDishSelect(dishId){
    this.setState({selectedDisheId : dishId });
   
    
}*/
  
  render(){
    const HomePage=()=>{

      return(<Home
        dish={this.state.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
        leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        
        />)
    }
    const DishWithId = ({match}) => {
      return(
          <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };
  return (
    <div >
      <Header/>
   <Switch>
    <Route path='/home' component = {HomePage} ></Route>
    <Route exact path='/menu' component = {()=><Menu dishes={this.state.dishes}/>} ></Route>
    <Route exact path="/contact" component= {Contact}></Route>
    <Route exact path= '/menu/:dishId' component={DishWithId}></Route>
    <Route  path="/aboutus" component = {()=><About leaders={this.state.leaders}/>}></Route>



   </Switch>

    <Footer></Footer>
      </div>
    
  );
}
}

export default Main;
