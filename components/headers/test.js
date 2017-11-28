import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { NativeModules } from 'react-native';

jest.mock('NativeModules',()=>{
    return{
        ViewContactActions:{
            goBack:jest.fn(),
            editContact:jest.fn(),
            deleteContact:jest.fn()
        }
    }
})

