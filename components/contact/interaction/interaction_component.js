import React from 'react';
import {View,StyleSheet, TouchableOpacity} from 'react-native';
import {JText} from '../../base_components/JLibrary';
import {colors,fonts} from '../../../common_styles';
import { Icon } from 'react-native-elements';

export default class Interaction extends React.Component{
    constructor(props){
        super(props);
        this.styles = StyleSheet.create({

            interactionBody:{
                width:'100%',
                position:'relative',
                padding:20,
                display:'flex',
                backgroundColor:colors.divider,
                borderRadius:15,
                
            },
            interactionDetails:{
                maxHeight:100,
                overflow:'hidden',
                marginBottom:5
            },
            interactionMetaDataContainer:{
                display:'flex',
                flexDirection:'row',
                justifyContent:'flex-end'

            },
            interactionMetaText:{
                fontSize:fonts.sizes.lil,
            },
            date:{
                marginLeft:10
            }
        })
        this.state={

        }

    }
/* 
                    <View style={this.styles.interactionMetaDataContainer}>
                        <JText style={[this.styles.interactionMetaText]}>Email</JText>
                        <JText style={[this.styles.interactionMetaText,this.styles.date]}>3 days ago</JText>
                    </View>
*/
    render(){
        return(

                <TouchableOpacity style={this.styles.interactionBody}>

                    <JText
                    style={this.styles.interactionDetails}
                    ellipsizeMode='tail'
                    numberOfLines={5}
                    >Met with George, he was nice. He mentioned he had a wife and 5 kids. Love bass fishing.</JText>
                    <View style={this.styles.interactionMetaDataContainer}>
                        <JText style={[this.styles.interactionMetaText]}>Email</JText>
                        <JText style={[this.styles.interactionMetaText,this.styles.date]}>3 days ago</JText>
                    </View>
                </TouchableOpacity>

        )
    }
}
