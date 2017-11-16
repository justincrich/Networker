import 'react-native';
import React from 'react';
import ListContactComponent from './list_contacts_component'
import {shallow, configure} from 'enzyme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });


describe('Contact List Component',()=>{
    const fakeContactList = [
        {
            id:12345,
            firstName:'Justin',
            lastName:'Rich',
            pictureUri:'',
            email:'justinrich2008@gmail.com',
            phoneNumber:'(801) 636-6098',
            notes:'hi',
            jobTitle:'Product Manager',
            company:'Next'
        },
        {
            id:12345,
            firstName:'Ladd',
            lastName:'Rich',
            pictureUri:'',
            email:'justinrich2008@gmail.com',
            phoneNumber:'(801) 636-6098',
            notes:'hi',
            jobTitle:'Product Manager',
            company:'Next'
        }
    ]
    it('renders correctly',()=>{
        const wrapper = shallow(
            <ListContactComponent contacts={fakeContactList}/>
        );
        expect(wrapper).toMatchSnapshot();
    });
});