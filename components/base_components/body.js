import React from 'react';
import {ScrollView,StyleSheet} from 'react-native';
//a body element that holds all the app content
// to be used outside of a header
export default function JBody(props){
    return(
        <ScrollView style={[props.styles,{
            position:'relative',
            paddingLeft:20,
            paddingRight:20,
            paddingTop:80, 
            flex:1, 
            display:'flex',
            flexDirection:'column',
            
            }]}>
            {props.children}
        </ScrollView>
    )
}