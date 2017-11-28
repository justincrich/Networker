import * as ActionTypes from '../../actiontypes/contacts/contacts_actiontypes';
import {contactsInitialState} from '../initial_states';
import ContactsReducer from '../contacts/contacts_reducer';

describe('ContactsReducer',()=>{
    it('should return the initial state',()=>{
        expect(ContactsReducer(undefined,{}))
        .toEqual(contactsInitialState)
    })

    describe('getContact',()=>{
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
    
    describe('get all contacts',()=>{
        it('should begin processing',()=>{
            expect(
                ContactsReducer(
                    contactsInitialState,
                    {
                        type:ActionTypes.CONTACTLIST_BEGIN_GET_ALL,
                    }
                )
            )
            .toEqual({
                ...contactsInitialState,
                status:'loading'
            })
        })
        it('should receive all contacts',()=>{
            expect(
                ContactsReducer(
                    {
                        ...contactsInitialState,
                        status:'loading'
                    },
                    {
                        type:ActionTypes.CONTACTLIST_RECEIVE_ALL,
                        contacts:[
                            {
                                id: 1511821971418,
                                firstName: 'Jed',
                                lastName: 'Smith',
                                pictureUri: 'file:///storage/emulated/0/Android/data/com.networker/files/Pictures/image-fc525719-52d5-489a-98ac-fbd3118385c6.jpg',
                                email: '',
                                phoneNumber: '',
                                notes: null,
                                jobTitle: '',
                                company: ''
                            },
                            {
                                id: 1511821971418,
                                firstName: 'Jeff',
                                lastName: 'Smith',
                                pictureUri: 'file:///storage/emulated/0/Android/data/com.networker/files/Pictures/image-fc525719-52d5-489a-98ac-fbd3118385c6.jpg',
                                email: 'j@j.com',
                                phoneNumber: '(111) 111-1111',
                                notes: null,
                                jobTitle: 'Developer',
                                company: '123'
                            }
                        ]
                    }
                )
            )
            .toEqual({
                ...contactsInitialState,
                status:'complete',
                contacts:[
                    {
                        id: 1511821971418,
                        firstName: 'Jed',
                        lastName: 'Smith',
                        pictureUri: 'file:///storage/emulated/0/Android/data/com.networker/files/Pictures/image-fc525719-52d5-489a-98ac-fbd3118385c6.jpg',
                        email: '',
                        phoneNumber: '',
                        notes: null,
                        jobTitle: '',
                        company: ''
                    },
                    {
                        id: 1511821971418,
                        firstName: 'Jeff',
                        lastName: 'Smith',
                        pictureUri: 'file:///storage/emulated/0/Android/data/com.networker/files/Pictures/image-fc525719-52d5-489a-98ac-fbd3118385c6.jpg',
                        email: 'j@j.com',
                        phoneNumber: '(111) 111-1111',
                        notes: null,
                        jobTitle: 'Developer',
                        company: '123'
                    }
                ]
            })
        })

    })


    describe('update contact',()=>{
        let defaultContact;
        beforeEach(()=>{
            defaultContact = {
                id: 1511821971418,
                firstName: 'Jeff',
                lastName: 'Smith',
                pictureUri: 'file:///storage/emulated/0/Android/data/com.networker/files/Pictures/image-fc525719-52d5-489a-98ac-fbd3118385c6.jpg',
                email: 'j@j.com',
                phoneNumber: '(111) 111-1111',
                notes: null,
                jobTitle: 'Developer',
                company: '123'
            }
        })
        it('should begin processing a request to update a contact',()=>{
            expect(
                ContactsReducer(
                    contactsInitialState,
                    {
                        type:ActionTypes.CONTACT_REQUEST_UPDATE
                    }
                )
            ).toEqual({
                ...contactsInitialState,
                status:'loading'
            })
        })

        it('should finish updating a contact',()=>{
            expect(
                ContactsReducer(
                    {
                        ...contactsInitialState,
                        status:'loading'
                    },
                    {
                        type:ActionTypes.CONTACT_RESOLVE_UPDATE,
                        updatedContact:defaultContact
                    }
                )
            ).toEqual({
                ...contactsInitialState,
                status:'complete',
                selectedContact:defaultContact
            })
        })
    })


    describe('delete contact',()=>{
        let defaultContact;
        beforeEach(()=>{
            defaultContact = {
                id: 1511821971418,
                firstName: 'Jeff',
                lastName: 'Smith',
                pictureUri: 'file:///storage/emulated/0/Android/data/com.networker/files/Pictures/image-fc525719-52d5-489a-98ac-fbd3118385c6.jpg',
                email: 'j@j.com',
                phoneNumber: '(111) 111-1111',
                notes: null,
                jobTitle: 'Developer',
                company: '123'
            }
        })
        it('should begin processing a request contact deletion',()=>{
            expect(
                ContactsReducer(
                    contactsInitialState,
                    {
                        type:ActionTypes.CONTACT_REQUEST_DELETE,
                        id:defaultContact.id
                    }
                )
            ).toEqual({
                ...contactsInitialState,
                status:'loading',
                requestDeleteId:defaultContact.id
            })
        })

        it('should resolve contact deletion',()=>{
            expect(
                ContactsReducer(
                    {
                        ...contactsInitialState,
                        status:'loading',
                        requestDeleteId:defaultContact.id
                    },
                    {
                        type:ActionTypes.CONTACT_RESOLVE_DELETE,
                    }
                )
            ).toEqual({
                ...contactsInitialState,
                status:'complete',
                requestDeleteId:null
            })
        })
    })


});

