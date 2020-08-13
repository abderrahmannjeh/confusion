import React  from 'react'
import {Card,CardTitle,CardImg,CardImgOverlay, Breadcrumb, BreadcrumbItem} from 'reactstrap'
import Dishdetail from './DishdetailComponent'
import { Link } from 'react-router-dom';


const RenderMenuItem = ({dish })=>{


    return (
        <Card className="col-12 col-md-5 m-1">
            <Link to={`/menu/${dish.id}`} >
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
} 
  

   
    


 const Menu=(props)=>{
        const menu = props.dishes.map((dish) => {
            return(
                  <RenderMenuItem dish={dish} ></RenderMenuItem>
            )
        })
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
  

    



export default Menu;