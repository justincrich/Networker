import * as ActionTypes from '../actiontypes/actiontypes';
// import {REHYDRATE} from 'redux-persist/constants';

const initialState={

    contacts:[],
    requestedId:null,
    selectedContact:{},
    status:'ready',
    error:null,
}

export default function ContactsReducer(state=initialState,action){
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
        case ActionTypes.CONTACT_THROW_ERROR:{
            return {
                ...state,
                error:action.error,
                status:'error'
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