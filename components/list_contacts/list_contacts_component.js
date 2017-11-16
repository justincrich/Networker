import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {colors,fonts} from '../../common_styles';
import defaultPic from '../../media/default_profile_img.png';
import ContactListRow from './list_row_component';
export default class ListContactComponent extends React.Component{
    constructor(props){
        super(props);
        this.styles = StyleSheet.create({
            view_text:{
                color:colors.textColorAlt,
                fontSize:fonts.sizes.h6
            },
            list_body:{
                paddingTop:80,
                height:'100%',
                backgroundColor:colors.background,
                
                
            }
        });
        this.state ={}
    }
    

    render(){
        return(
            <FlatList 
            style={this.styles.list_body}
            data={!this.props.contacts.length?[]:this.props.contacts}
            renderItem={
                ({item})=> <ContactListRow item={item} openContact={this.props.openContact}/>
            }
            
            />
        )
    }

    onPress(){
        console.log('hii')
    }

}

