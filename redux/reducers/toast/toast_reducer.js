import * as ActionTypes from '../../actiontypes/toast/toast_actiontypes';
import {toastInitialState} from '../initial_states';

export default function ToastReducer(state=toastInitialState,action){
    switch(action.type){
        case ActionTypes.TOAST_DISPLAY:{
            return{
                ...state,
                message:action.message
            }
        }
        case ActionTypes.CLEAR_MESSAGE:{
            return{
                ...state,
                message:null
            }
        }
        default:
            return state;
    }
}