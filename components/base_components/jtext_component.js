import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {colors,fonts} from '../../common_styles';

export default function JText(props){
    this.styles=StyleSheet.create({
        txtStyling:{
            color:colors.textColor,
            fontSize:fonts.sizes.p,
            fontFamily: 'Montserrat-Regular',
        }
    });
    return(
        <Text
            style={[
                this.styles.txtStyling,
                props.style? props.style:{}
            ]}
        >
            {props.children}
        </Text>
    )
}