import * as ActionTypes from '../actiontypes/actiontypes';
import realm from '../../data/realm';
import {ContactSchema} from '../../data/schemas';
// import {ContactSchema} from '../../data/schemas';
//const Realm = require('realm');
// const schema = {
//     name:'Contact',
//     properties:{
//         id:{type:'int',default:Date.now()},
//         firstName:'string',
//         lastName:'string',
//         pictureUri:{type:'string',default:''},
//         email:'string?',
//         phoneNumber:'string?',
//         notes:'string?',
//         jobTitle:'string?',
//         company:'string?',
//     }
// }
//Get Contact


export function getContact(id){
    return function (dispatch){
        dispatch(beginGetContact(id));
        try{
            const contact = realm.objectForPrimaryKey(ContactSchema,id);
            //console.log('IN ACTION',contact.value())
            dispatch(resolveGetContact(contact));
        }catch(e){
            dispatch(throwContactError(e))
        }
    }
}

function beginGetContact(id){
    return{
        type: ActionTypes.CONTACT_REQUEST_ONE_BEGIN,
        id:id
    }
}
function resolveGetContact(contact){
    return{
        type: ActionTypes.CONTACT_REQUEST_ONE_RESOLVE,
        contact:contact
    }
}

//Contact Create
export function requestContactCreate(contact){
    return function (dispatch){
        dispatch(beginContactCreate());
        try{
            
            realm.write(()=>{
                let myContact = realm.create('Contact',{
                   firstName:contact.firstName,
                   lastName:contact.lastName,
                   pictureUri: contact.pictureUri,
                   email:contact.email,
                   phoneNumber:contact.phoneNumber,
                   notes:contact.notes,
                   jobTitle:contact.jobTitle,
                   company:contact.company
               });
            });
            dispatch(resolveContactCreate())
            dispatch(getAllContacts());
        }catch(e){
            dispatch(throwContactError(e))
        }
    }
}

export function requestDeleteContact(id){
    return function (dispatch){
        dispatch(beginContactDelete(id))
        try{
            realm.write(()=>{
                realm.delete(realm.objectForPrimaryKey(ContactSchema,id));
                dispatch(resolveContactDelete());
                dispatch(clearSelectedContact());
                dispatch(getAllContacts());
            })
        }catch(e){
            dispatch(throwContactError(e));
        }
        
        
    }
}

export function requestUpdateContact(id,updates){
    return function (dispatch){
        dispatch(beginContactUpdate());
        try{
            realm.write(()=>{
                let contact = realm.create('Contact',{id:id,...updates},true);
                dispatch(resolveContactUpdate(contact));
            });
        }catch(e){
            dispatch(throwContactError(e));
        }
    }
}

//Contact List

export function getAllContacts(){
    return function (dispatch){
        dispatch(beginGetAllContacts());
        try{
            let contacts = realm.objects('Contact').sorted('lastName','firstName');
            dispatch(receiveAllContacts(Array.from(contacts.values())));
            
        }catch(e){
            dispatch(throwContactError(e))
        }
        
    }
}

export function resetContactStatus(){
    return{
        type:ActionTypes.CONTACT_RESET_STATUS,
    }
}

export function clearSelectedContact(){
    return{
        type:ActionTypes.CONTACT_CLEAR_SELECTION
    }
}

/*Status Changing Methods/PRIVATE*/

//CONTACT LIST
function beginGetAllContacts(){
    return{
        type:ActionTypes.CONTACTLIST_BEGIN_GET_ALL
    }
}
function receiveAllContacts(contacts){
    return{
        type: ActionTypes.CONTACTLIST_RECEIVE_ALL,
        contacts:contacts
    }
}

//CONTACT CREATE
function beginContactCreate(){
    return{
        type:ActionTypes.CONTACT_BEGIN_CREATE,
    }
}

function resolveContactCreate(){
    return{
        type: ActionTypes.CONTACT_RESOLVE_CREATE,
    }
}

//UPDATE CONTACT

function beginContactUpdate(){
    return{
        type:ActionTypes.CONTACT_REQUEST_UPDATE
    }
}

function resolveContactUpdate(contact){
    return{
        type:ActionTypes.CONTACT_RESOLVE_UPDATE,
        updatedContact:contact
    }
}

//DELETE CONTACT

function beginContactDelete(id){
    return{
        type:ActionTypes.CONTACT_REQUEST_DELETE,
        id:id
    }
}

function resolveContactDelete(){
    return{
        type:ActionTypes.CONTACT_RESOLVE_DELETE
    }
}


function throwContactError(e){
    return{
        type:ActionTypes.CONTACT_THROW_ERROR,
        error:e,
    }
}