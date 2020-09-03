import { PROMOTIONS } from '../share/promotions';
import * as ActionType from './actionTypes';


export const Promotions =(state = {
    
    promotions:[],
    errMess:null,
    isLoading:false

} , action)=>{

    switch (action.type) {
        case ActionType.ADD_PROMOS:
        return {...state, isLoading: false, errMess: null, promotions: action.payload};

        case ActionType.PROMOS_LOADING:
            return {...state, isLoading: true, errMess: null, promotions: []}

        case ActionType.PROMOS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
}