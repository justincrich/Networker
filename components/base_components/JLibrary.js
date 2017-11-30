import React from 'react';
import {View, ScrollView, Text,TextInput,StyleSheet} from 'react-native';
import {colors, fonts} from '../../common_styles';
export class JDivider extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(
            <View 
                style={[{
                    height:1,
                    backgroundColor:colors.divider,
                    width:'90%'
                },
                this.props.style
            ]}
            />
        )
    }
    
}

export function JText(props){
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
            ellipsizeMode={props.ellipsizeMode}
            numberOfLines={props.numberOfLines}
        >
            {props.children}
        </Text>
    )
}

export class JTextInput extends React.Component{
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

export function JBody(props){
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