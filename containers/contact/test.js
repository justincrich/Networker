import 'react-native';
import React from 'react';
import ListContactContainer from './contact_container';

//redux objects
import configureStore from 'redux-mock-store'
import * as ContactActionTypes from '../../redux/actiontypes/actiontypes';
import * as ContactActions from '../../redux/actions/contacts_actions';
import * as ContactReducer from '../../redux/reducers/contacts_reducer';
import store from '../../redux/store/store';
const navigation = { navigate: jest.fn() };

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Contact List Container',()=>{
    it('renders correctly', () => {
        const tree = renderer.create(
          <ListContactContainer store={store} navigation={navigation}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
})