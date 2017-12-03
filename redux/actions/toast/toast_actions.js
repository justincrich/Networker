import * as ToastActionTypes from '../../actiontypes/toast/toast_actiontypes';

export function submitToastMessage(text){
    return{
        type:ToastActionTypes.TOAST_DISPLAY,
        message:text
    }
}

export function clearToastMessage(){
    return{
        type: ToastActionTypes.CLEAR_MESSAGE
    }
}