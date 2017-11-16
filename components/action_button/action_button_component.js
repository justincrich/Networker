import React from 'react';
import {View,TouchableWithoutFeedback,StyleSheet,Text} from 'react-native';
import { Icon } from 'react-native-elements'
import {colors} from '../../common_styles'

export default class ActionButton extends React.Component{

    constructor(props){
        super(props);
        this.styles = StyleSheet.create({
            icon_container:{
                position:'absolute',
                bottom:20,
                right:20,
                backgroundColor:colors.accent,
                width:60,
                height:60,
                zIndex:900,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:50
            }
        })
        this.state={

        }

    }

    render(){
        return(
        <TouchableWithoutFeedback
            onPress={this.props.onPress}
        >
            <View
                style={this.styles.icon_container}
            >
                <Icon
                    type="ionicon"
                    name="md-add"
                    color={colors.textColorDarkBkg}
                    size={30}
                />
            </View>
        </TouchableWithoutFeedback>
        );
    }

}

