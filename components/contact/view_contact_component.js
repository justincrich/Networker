import React from 'react';
import {View,ScrollView,Text, StyleSheet} from 'react-native';
import {colors,fonts} from '../../common_styles';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import Header from '../headers/header_container';

export default class ViewContact extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.styles = StyleSheet.create({});
        
    }

    render(){
        return(
            <View>
                <Header 
                    type='view'
                />
            </View>
        )
    }
}