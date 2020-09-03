import * as ActionType from './actionTypes'

export const FeadBack = ( state={ isLoading: true,
    errMess: null,
    feadbacks:[]} , action)=>{
        switch(action.tye){

            case ActionType.ADD_FEADBACK:
               {
                var feadback = action.payload;
                return {...state,errMess: null,feedback: feadback};

               }


        }



    }