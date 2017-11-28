import React from 'react';
import { shallow,render } from 'enzyme';
import sinon from 'sinon';
import { NativeModules } from 'react-native';
import ViewContact from './view_contact_component';

const contact = {
            id:12345,
            firstName:'Justin',
            lastName:'Rich',
            pictureUri:'',
            email:'justinrich2008@gmail.com',
            phoneNumber:'(801) 636-6098',
            notes:'JUSTIN IS COOL',
            jobTitle:'Engineer',
            company:'Google',
            social:{
                facebook:{
                    url:'https://www.facebook.com/justincrich',
                    id:'17810103',
                    note:'entity_id holds the user id on the page'
                },
                linkedin:{
                    url:'https://www.linkedin.com/in/jcrich/',
                    id:'jrich'
                },
                twitter:{
                    username:'justincrich',
                    id:'34618102',
                    notes:'search the ttft_boot_data script on the profle page, will contain user_id'
                },
                pinterest:{
                    username:'justinrich'
                },
                snapchat:{
                    username:'nehowdy'
                },
                instagram:{
                    username:'justinrich'
                }
            }
        }

describe('View Contact',()=>{

    /* SETUP */
    const wrapper = shallow(
        <ViewContact contact={contact}/>
    )
    const render = wrapper.dive();

    it('should render',()=>{
        expect(render).toMatchSnapshot();
    })
})