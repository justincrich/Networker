import React from 'react';
import {shallow} from 'enzyme';
import * as ContactActions from './contacts_actions';
import * as ActionTypes from '../../actiontypes/actiontypes';

const contact =     {
    id: 1511821971418,
    firstName: 'Luke',
    lastName: 'Skywalker',
    pictureUri: 'file:///storage/emulated/0/Android/data/com.networker/files/Pictures/image-fc525719-52d5-489a-98ac-fbd3118385c6.jpg',
    email: 'luke@force.net',
    phoneNumber: '(555) 555-5555',
    notes: 'Use the force',
    jobTitle: 'Jedi',
    company: 'Rebels'
  }

describe('Contacts Actions: getContact',()=>{
    it('Should begin requesting contact',()=>{
        const expectedAction = {
            type:ActionTypes.CONTACT_REQUEST_ONE_BEGIN,
            id:1511821971418
        }
        expect(ContactActions.beginGetContact(1511821971418))
        .toEqual(expectedAction)
    })
    
    it('Should return 1 contact',()=>{

    })

    it('Returned contact should match passed ID',()=>{
        
    })

    it('If no contact exists for the given ID error is thrown',()=>{
        
    })

    it('If no ID provided then error is thrown',()=>{
        
    })
})