import * as ActionTypes from '../../actiontypes/actiontypes';
import {contactsInitialState} from '../initial_states';
import ContactsReducer from '../contacts/contacts_reducer';

describe('ContactsReducer',()=>{
    it('should return the initial state',()=>{
        expect(ContactsReducer(undefined,{}))
        .toEqual(contactsInitialState)
    })
    
});

describe('ContactsReducer: getContact',()=>{
    it('should begin processing',()=>{
        expect(
            ContactsReducer(
                contactsInitialState,
                {
                    type:ActionTypes.CONTACT_REQUEST_ONE_BEGIN,
                    id:1511821971418
                }
            )
        )
        .toEqual({
            ...contactsInitialState,
            requestedId:1511821971418,
            status:'loading'
        })
    })

    it('should receive requested contact',()=>{
        expect(
            ContactsReducer(
                {
                    ...contactsInitialState,
                    requestedId:1511821971418,
                    status:'loading'
                },{
                    type:ActionTypes.CONTACT_REQUEST_ONE_RESOLVE,
                    contact:{
                        id: 1511821971418,
                        firstName: 'Jed',
                        lastName: 'Smith',
                        pictureUri: 'file:///storage/emulated/0/Android/data/com.networker/files/Pictures/image-fc525719-52d5-489a-98ac-fbd3118385c6.jpg',
                        email: '',
                        phoneNumber: '',
                        notes: null,
                        jobTitle: '',
                        company: ''
                    }
                }
            )
        ).toEqual({
            ...contactsInitialState,
            requestedId:null,
            status:'ready',
            selectedContact:{
                id: 1511821971418,
                firstName: 'Jed',
                lastName: 'Smith',
                pictureUri: 'file:///storage/emulated/0/Android/data/com.networker/files/Pictures/image-fc525719-52d5-489a-98ac-fbd3118385c6.jpg',
                email: '',
                phoneNumber: '',
                notes: null,
                jobTitle: '',
                company: ''
            }
        })
    })
})