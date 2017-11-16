import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';

//Containers
import ListContactContainer from './containers/list_contacts/list_contacts_container';
//Components


  export default class AppNavigator extends React.Component{
    constructor(props){
        super(props);
        this.ListContacts = ({navigation})=>(<ListContactContainer navigation={navigation} coreState={this.props.coreState}/>);
        this.nav = StackNavigator({
            ListContacts:{
              screen:this.ListContacts
            }
          },
          {
              initialRouteName:'ListContacts',
              headerMode:'none'
          }
        
        ).bind(this);
        
    }

    render(){
        return(<View style={{flex:1}}><this.nav/></View>)
    }

  };