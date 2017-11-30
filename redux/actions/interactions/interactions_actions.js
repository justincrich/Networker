import * as InteractionActionTypes from '../../actiontypes/interactions/interactions_actiontypes';
import realm from '../../../data/realm';
import {ContactSchema} from '../../../data/schemas';

export function addInteraction(id,interaction){
    return function(dispatch){
        dispatch(beginAddInteraction())
        try{
            
            realm.write(()=>{
                let contact = getContact(id);
                
                let interaction = realm.create('Interaction',{
                    ...interaction,
                    contact:contact
                });
                contact.interactions.append(interaction);

                dispatch(receiveAddInteraction());
                dispatch(getAllInteractionsForContact(id));
            });
        }catch(e){
            dispatch(throwInteractionError(e));
        }
    }
}

function beginAddInteraction(){
    return{
        type:InteractionActionTypes.INTERACTIONS_CREATE_BEGIN
    }
}

function receiveAddInteraction(){
    return{
        type:InteractionActionTypes.INTERACTIONS_CREATE_RECEIVE
    }
}

export function getAllInteractionsForContact(id){
    return function(dispatch){
        dispatch(beginGetInteractionForContact(id));
        try{
            let query = `contact.id = ${id}`
            let interactions = realm.objects('Interaction').filtered(query);
            dispatch(receiveInteractionForContact(Object.assign({},interactions)))
        }catch(e){
            dispatch(throwInteractionError(e));
        }
    }
}

export function beginGetInteractionForContact(id){
    return{
        type:InteractionActionTypes.INTERACTIONS_GET_ALL_FOR_CONTACT_BEGIN,
        id:id
    }
}

export function receiveInteractionForContact(interactions){
    return{
        type:InteractionActionTypes.INTERACTIONS_GET_ALL_FOR_CONTACT_RECEIVE,
        interactions:interactions
    }
}

function throwInteractionError(e){
    return{
        type:InteractionActionTypes.INTERACTIONS_ERROR,
        error:e
    }
}

function getContact(id){
    let query = `id = ${id}`;
    return realm.objects('Contact').filtered(query)[0];
}