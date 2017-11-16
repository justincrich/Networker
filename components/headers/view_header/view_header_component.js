import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors,fonts} from '../../../common_styles';
import { Icon } from 'react-native-elements';

export default class ViewHeader extends React.Component{
    constructor(props){
        super(props);
        this.styles = StyleSheet.create({
            container:{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                flex:1,
                width:'100%',
                zIndex:100
            },
            actionContainer:{
                display:'flex',
                flexDirection:'row'
            },

            
        });
        this.state = {};

    }

    render(){
        return(
            <View style={this.styles.container}>
                <Icon
                    name='arrow-back'
                    size={30}
                    color={colors.titleText}
                    onPress={()=>this.props.goBack()}
                />
                <View style={this.styles.actionContainer}>
                    <Icon
                        name='edit'
                        size={30}
                        color={colors.titleText}
                        onPress={()=>this.props.goBack()}
                    />
                    <Icon
                        name='delete'
                        size={30}
                        iconStyle={{marginLeft:30}}
                        color={colors.titleText}
                        onPress={()=>this.props.goBack()}
                    />
                </View>
            </View>
        );
    }
}