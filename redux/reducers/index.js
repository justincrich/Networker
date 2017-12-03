import { combineReducers } from 'redux';
import ContactsDataReducer from './contacts/contacts_reducer';
import InteractionsReducer from './interactions/interactions_reducer';
import ToastReducer from './toast/toast_reducer';
export default rootReducer = combineReducers({
    contacts:ContactsDataReducer,
    interactions:InteractionsReducer,
    toast:ToastReducer
});