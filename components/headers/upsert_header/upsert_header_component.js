import React from 'react';
import {
    View,
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Animated
    } from 'react-native';
import JText from '../../base_components/jtext_component';
import {colors,fonts} from '../../../common_styles';
import { Icon } from 'react-native-elements';

export default class UpsertHeader extends React.Component{
    constructor(props){
        super(props);
        this.styles = StyleSheet.create({
            container:{
                display:'flex',
                flexDirection:'row',
                zIndex:1000,
                flex:1,
                alignItems:'center',
                justifyContent:'space-between',
                flexBasis:'auto',
                backgroundColor:'transparent',
            },
            
            saveButtonContainer:{
                
                display:'flex',
                alignContent:'center',
                justifyContent:'center',
                height:'100%'
            },
            saveButtonText:{
                fontWeight:'500',
                fontSize:fonts.sizes.p,
                color:colors.textColor,
            },
            titleText:{
                color:colors.textColor,
                fontSize:fonts.sizes.h5,
            },
            // linearGradientAnimation:{
            //     position:'absolute',
            //     flex:1,
            //     width:'100%',
            //     height:'100%',
            //     zIndex:1900
            // },
            linearGradient:{
                width:'100%',
                height:'100%',
                flex:1,
                position:'absolute',

            }

        });
        this.state = {};

    }

    render(){
        return(
            <View style={this.styles.container}>
                <Icon
                    type='ionicon'
                    name='ios-close'
                    size={40}
                    color={colors.titleText}
                    onPress={()=>this.props.goBack()}
                />
                <View style={this.styles.titleTextContainer}>
                    <JText style={this.styles.titleText}>
                        {this.props.title}
                    </JText>
                </View>
                <TouchableOpacity
                    style={this.styles.saveButtonContainer}
                    onPress={this.props.saveContact}
                >
                    <JText style={this.styles.saveButtonText}>
                        Save
                    </JText>
                </TouchableOpacity>
            </View>
            
        )
    }
}
