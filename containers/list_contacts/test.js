
import React from 'react';
import {shallow} from 'enzyme';
import ListContactContainer from './list_contacts_container';
const navMock = { 
                    navigate: jest.fn(),
                    state:{
                        routeName:"ListContacts"
                    }
                    
                    };

// //redux objects
import configureStore from 'redux-mock-store';
const thunk = require('redux-thunk').default;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
import {contactsInitialState} from '../../redux/reducers/initial_states';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('Contact List Container',()=>{
    beforeAll(()=>{
        contactsInitialState.contacts.push(
            
            {
            id: 1511821971418,
            firstName: 'Justin',
            lastName: 'Rich',
            pictureUri: 'file:///storage/emulated/0/Android/data/com.networker/files/Pictures/image-fc525719-52d5-489a-98ac-fbd3118385c6.jpg',
            email: 'J@j.com',
            phoneNumber: '(555) 555-5555',
            notes: 'Hi Justin',
            jobTitle: 'Developer',
            company: 'Hackerpug'
            },
            {
                id: 1511821971417,
                firstName: 'Sam',
                lastName: 'Joe',
                pictureUri: 'file:///storage/emulated/0/Android/data/com.networker/files/Pictures/image-fc525719-52d5-489a-98ac-fbd3118385c6.jpg',
                email: 's@s.com',
                phoneNumber: '(555) 555-5555',
                notes: 'Hi Sam',
                jobTitle: 'Product Manager',
                company: 'Hackerpug'
            }
        )
    })
    it('renders correctly', () => {
        const wrapper = shallow(
          <ListContactContainer/>,
          {context:{store:mockStore(contactsInitialState)}}
        );
        wrapper.setProps({navigation:navMock})
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('gets all contacts in database',()=>{

    });
})



// describe('Contact List Container',()=>{
//     it('renders correctly', () => {
//         const tree = renderer.create(
//           <ListContactContainer store={store} navigation={navigation}/>
//         ).toJSON();
//         expect(tree).toMatchSnapshot();
//     });
// })
// import * as ContactActionTypes from '../../redux/actiontypes/actiontypes';
// import * as ContactActions from '../../redux/actions/contacts_actions';
// import * as ContactReducer from '../../redux/reducers/contacts_reducer';