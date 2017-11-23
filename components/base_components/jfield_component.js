import React from 'react';
import {View,Text,TextInput,StyleSheet} from 'react-native';
import {colors,fonts} from '../../common_styles';

export default class JTextInput extends React.Component{
    constructor(props){
        super(props);
        this.state={}
        this.styles=StyleSheet.create({
            fieldStyling:{
                color:colors.textColor,
                fontSize:fonts.sizes.p,
                fontFamily: 'Montserrat-Regular',
                borderBottomWidth:1,
                borderColor:colors.fieldColor,
                overflow:'hidden',
            }
        });
    }
    render(){
        return(
            <TextInput
                underlineColorAndroid = {this.props.underlineColorAndroid?this.props.underlineColorAndroid:'rgba(0,0,0,0)'}
                style={[this.styles.fieldStyling,this.props.style? this.props.style:{}]}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChangeText={this.props.onChangeText}
                numberOfLines={this.props.numberOfLines}
                multiline={this.props.multiline}
                returnKeyType={this.props.returnKeyType}
                secureTextEntry={this.props.secureTextEntry}
            >
                {this.props.children}
            </TextInput>
        )
    }
}