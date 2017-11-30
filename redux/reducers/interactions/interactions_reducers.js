import * as InteractionActionTypes from '../../actiontypes/interactions/interactions_actiontypes';
import {interactionsInitialState} from '../initial_states';

export default function InteractionsReducer(state=interactionsInitialState,action){
    switch(action.type){
        case InteractionActionTypes.INTERACTIONS_GET_ALL_FOR_CONTACT_BEGIN:{
            return{
                ...state,
                requestedId:action.id,
                interactionRequestStatus:'loading'
            }
        }
        case InteractionActionTypes.INTERACTIONS_GET_ALL_FOR_CONTACT_RECEIVE:{
            return{
                ...state,
                interactionRequestStatus:'ready',
                interactions:action.interactions,
                requestedId:null
            }
        }
        case InteractionActionTypes.INTERACTIONS_ERROR:{
            return{
                ...state,
                interactionError:action.error
            }
        }
        case InteractionActionTypes.INTERACTIONS_CREATE_BEGIN:{
            return{
                ...state,
                interactionRequestStatus:'loading'
            }
        }
        case InteractionActionTypes.INTERACTIONS_CREATE_RECEIVE:{
            return{
                ...state,
                interactionRequestStatus:'ready'
            }
        }
    }
}