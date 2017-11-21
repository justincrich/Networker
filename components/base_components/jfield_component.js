import React from 'react';
import {View,Text,TextInput,StyleSheet} from 'react-native';
import {colors,fonts} from '../../common_styles';

export default function JField(props){
    this.styles=StyleSheet.create({
        fieldStyling:{
            color:colors.textColor,
            fontSize:fonts.sizes.p,
            fontFamily: 'Montserrat-Regular',
        }
    });
    return(
        <TextInput
            underlineColorAndroid = 'rgba(0,0,0,0)'
            placeholder={props.placeholder}
            value={props.value}
            style={getStyle()}
            onChangeText = {this.onChangeText}
        >
            {props.children}
        </TextInput>
    )

    function getStyle(){
        if(typeof props.style ==='Array'){
            return [this.styles.fieldStyling,...props.style];
        }else{
            return [this.styles.fieldStyling, props.style];
        }
        
    }
}