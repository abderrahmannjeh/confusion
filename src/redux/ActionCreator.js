import * as ActionType from './actionTypes'
import { DISHES } from '../share/dishes';
import { baseUrl } from '../share/baseUrl';


export const addComment=(dishId, rating, author, comment)=>({
    type:ActionType.ADD_COMMENT,
    payload:{
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
})

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};


export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
    .then(response => {
        if(response.ok)
        return response
        else
        {
            var error = new Error('error' + response.status +' : ' +response.statusText);
            error.response = response ;
            throw error ;
        }
    
    
        },
        error=>{
            var errmess = new Error(error.message);
            throw errmess ;
        }
        
        
        )
        .then(response =>response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error=>dispatch(dishesFailed(error.message)));
}
export const dishesLoading = () => ({
    type: ActionType.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionType.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionType.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {    
    console.log("hello");

    return fetch(baseUrl + 'comments')
    .then(response => {
        if(response.ok)
        return response
        else
        {
            var error = new Error('error' + response.status +' : ' +response.statusText);
            error.response = response ;
            throw error ;
        }
    
    
        },
        error=>{
            var errmess = new Error(error.message);
            throw errmess ;
        }
        
        
        )
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error=>dispatch(commentsFailed(error.message)));
};
export const commentsFailed = (errmess) => ({
    type: ActionType.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionType.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if(response.ok)
        return response
        else
        {
            var error = new Error('error' + response.status +' : ' +response.statusText);
            error.response = response ;
            throw error ;
        }
    
    
        },
        error=>{
            var errmess = new Error(error.message);
            throw errmess ;
        }
        
        
        )
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error=>dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionType.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionType.PROMOS_FAILED,
    payload: errmess
});


export const addPromos = (promos) => ({
    type: ActionType.ADD_PROMOS,
    payload: promos
});



export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders')
    .then(response => {
        if(response.ok)
        return response
        else
        {
            var error = new Error('error' + response.status +' : ' +response.statusText);
            error.response = response ;
            throw error ;
        }
    
    
        },
        error=>{
            var errmess = new Error(error.message);
            throw errmess ;
        }
        
        
        )
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error=>dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionType.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionType.LEADERS_FAILED,
    payload: errmess
});


export const addLeaders  = (promos) => ({
    type: ActionType.ADD_LEADERS,
    payload: promos
});

export const addFeedback=(feadback ) =>({
    type:ActionType.ADD_FEADBACK,
    payload: feadback 

})

export const postFeadBack = (firstname,lastname,telnum,email,agre,contactType ,message) => (dispatch)=>{

  const   newFeadBack ={
        firstname : firstname
        ,lastname :lastname
        ,telnum:telnum
        ,email :email
        ,agre:agre
        ,contactType:contactType
         ,message:message
        }
        console.log(newFeadBack)
        return fetch(baseUrl +'feedback', {
            method: "POST",
            body: JSON.stringify(newFeadBack),
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
        .then(response => {
            if (response.ok) {
              return response;
            } else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
            }
          },
          error => {
                throw error;
          })
        .then(response => response.json())
        .then(response => {dispatch(addFeedback(response)); alert("thaks for your feadback " + JSON.stringify( response));} )
        .catch(error =>  { console.log('post feadback', error.message); alert('Your comment could not be posted\nError: '+error.message); });
    };   




