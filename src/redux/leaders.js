import * as ActionType from './actionTypes'
export const Leaders =(state = {
    leaders:[],
    errMess: null,
    isLoading: false

} , action)=>{

    switch(action.type){
        case ActionType.ADD_LEADERS:
      return {...state, errMess: null, isLoading : false , leaders: action.payload};

    case ActionType.LEADERS_FAILED:
      return {...state, errMess: action.payload};

    case ActionType.ADD_LEADER:
        {var leader = action.payload;

        
        return {...state,errMess: null,leaders: state.leaders.concat(leader)};
        }
      case ActionType.LEADERS_LOADING : 
      return {...state ,isLoading: true }



        default: return state;
    }
}