import * as ActionTypes from '../../actiontypes/actiontypes';
import {contactsInitialState} from '../initial_states';



export default function ContactsReducer(state=contactsInitialState,action){
    switch(action.type){
        case ActionTypes.CONTACT_REQUEST_ONE_BEGIN:{
            return{
                ...state,
                requestedId:action.id,
                status:'loading'
            }
        }
        case ActionTypes.CONTACT_REQUEST_ONE_RESOLVE:{
            return{
                ...state,
                status:'ready',
                requestedId:null,
                selectedContact:action.contact
            }
        }
        case ActionTypes.CONTACTLIST_BEGIN_GET_ALL:{
            return{
                ...state,
                status:'loading'
            }
        }
        case ActionTypes.CONTACTLIST_RECEIVE_ALL:{
            return{
                ...state,
                status:'complete',
                contacts:action.contacts
            }
        }
        case ActionTypes.CONTACT_REQUEST:{
            let selection = state.contacts[action.id];
            return {
                ...state,
                selectedContact:selection
            }
        }
        case ActionTypes.CONTACT_BEGIN_CREATE:{
            return {
                ...state,
                status:'loading'
            }
        }
        case ActionTypes.CONTACT_RESOLVE_CREATE:{
            return {
                ...state,
                status:'complete'
            }
        }
        case ActionTypes.CONTACT_REQUEST_UPDATE:{
            return{
                ...state,
                status:'loading'
            }
        }
        case ActionTypes.CONTACT_RESOLVE_UPDATE:{
            return {
                ...state,
                status:'complete',
                selectedContact:action.updatedContact
            }
        }
        case ActionTypes.CONTACT_REQUEST_DELETE:{
            return{
                ...state,
                status:'loading',
                requestDeleteId:action.id
            }
        }
        case ActionTypes.CONTACT_RESOLVE_DELETE:{
            return{
                ...state,
                status:'complete'
            }
        }
        case ActionTypes.CONTACT_THROW_ERROR:{
            return {
                ...state,
                error:action.error,
                status:'error'
            }
        }
        case ActionTypes.CONTACT_CLEAR_SELECTION:{
            return{
                ...state,
                selectedContact:null
            }
        }
        case ActionTypes.CONTACT_RESET_STATUS:{
            return{
                ...state,
                status:'ready'
            }
        }
        default:
            return state;
    }
}