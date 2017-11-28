import * as ActionTypes from '../../actiontypes/actiontypes';
import realm from '../../../data/realm';
import {ContactSchema} from '../../../data/schemas';
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
            //let query = `id = ${id}`;
            //let contact = realm.objects('Contact').filtered(query);
            const contact = realm.objectForPrimaryKey(ContactSchema,id);
            //console.log('IN ACTION',Object.assign({},contact))
            dispatch(resolveGetContact(Object.assign({},contact)));
        }catch(e){
            dispatch(throwContactError(e))
        }
    }
}

export function beginGetContact(id){
    return{
        type: ActionTypes.CONTACT_REQUEST_ONE_BEGIN,
        id:id
    }
}
export function resolveGetContact(contact){
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
                let query = `id = ${id}`;
                let contact = realm.objects('Contact').filtered(query)[0];
                //let contact = realm.objectForPrimaryKey(ContactSchema,id);
                console.log('new contact delete!!!',contact.id)
                realm.delete(contact);
                dispatch(getAllContacts());
                dispatch(resolveContactDelete());
                dispatch(clearSelectedContact());
                
                
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
                dispatch(resolveContactUpdate(Object.assign({},contact)));
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
            let contactArr = contacts.map(contact=>{
                return Object.assign({},contact);
            });
            dispatch(receiveAllContacts(contactArr));
            
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
export function beginGetAllContacts(){
    return{
        type:ActionTypes.CONTACTLIST_BEGIN_GET_ALL
    }
}
export function receiveAllContacts(contacts){
    return{
        type: ActionTypes.CONTACTLIST_RECEIVE_ALL,
        contacts:contacts
    }
}

//CONTACT CREATE
export function beginContactCreate(){
    return{
        type:ActionTypes.CONTACT_BEGIN_CREATE,
    }
}

export function resolveContactCreate(){
    return{
        type: ActionTypes.CONTACT_RESOLVE_CREATE,
    }
}

//UPDATE CONTACT

export function beginContactUpdate(){
    return{
        type:ActionTypes.CONTACT_REQUEST_UPDATE
    }
}

export function resolveContactUpdate(contact){
    return{
        type:ActionTypes.CONTACT_RESOLVE_UPDATE,
        updatedContact:contact
    }
}

//DELETE CONTACT

export function beginContactDelete(id){
    return{
        type:ActionTypes.CONTACT_REQUEST_DELETE,
        id:id
    }
}

export function resolveContactDelete(){
    return{
        type:ActionTypes.CONTACT_RESOLVE_DELETE
    }
}


export function throwContactError(e){
    return{
        type:ActionTypes.CONTACT_THROW_ERROR,
        error:e,
    }
}