import ContactsReducer from '../reducers/contacts/contacts_reducer';
import { compose, createStore, applyMiddleware } from 'redux';
const thunk = require('redux-thunk').default; //allows you to write action creators that return a function instead of an action
import {createLogger} from 'redux-logger'; //logs out state in console




const logger = createLogger();
export const store = createStore(
    ContactsReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk,logger)
);

// export const store = createStore(
//     ContactsReducer,
//     composeWithDevTools(applyMiddleware(thunk,logger))
    
// );
// if(__DEV__){
//     store = createStore(
//         ContactsReducer,
//         composeWithDevTools(applyMiddleware(thunk,logger))
        
//     );
// }else{
//     store = createStore(
//         ContactsReducer,
//         applyMiddleware(thunk,logger)
        
//     );
// }


