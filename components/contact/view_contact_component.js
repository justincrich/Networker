import React from 'react';
import {View,ScrollView, StyleSheet,Text,Image} from 'react-native';
import JBody from '../base_components/body';
import JText from '../base_components/jtext_component';
import {colors,fonts} from '../../common_styles';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import Header from '../headers/header_container';
import defaultImg from '../../media/profileimg.png';
import ContactBar from '../action_button/contact_info_bar/contact_info_bar_component';
import Toast from '../toast/toast_component';

export default class ViewContact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            message:''
        };
        this.styles = StyleSheet.create({
            body:{
                flex:1,
                width:'100%',
            },
            header:{
                flex:1,
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
            },
            imgContainer:{
                width:100,
                height:100,
                borderRadius:50,
                borderWidth:2,
                alignItems:'center',
                justifyContent:'center',
                overflow:'hidden',
                borderColor:colors.fieldColor,
            },
            image:{
                position:'absolute',
                width:'100%',
                height:'100%',
                top:0,
                borderRadius:50,
            },
            personInfoContainer:{
                marginTop:20,
                display:'flex',
                flexDirection:"column",
                justifyContent:'center',
                alignItems:'center'
            },
            firstLastName:{
                fontWeight:'bold',
                fontSize:fonts.sizes.h4
            },
            profileInfo:{
                fontSize:fonts.sizes.h3
            },
            contactInfo:{
                position:'relative',
                display:'flex',
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                width:'100%'
            },

        });
        this.showContactToast = this.showContactToast.bind(this);
        this.removeContactToast = this.removeContactToast.bind(this);
        this.getCompanyAndTitle = this.getCompanyAndTitle.bind(this);
    }

    render(){
        console.log('VIEW COMPONENT',this.props)
        return(
            <View style={this.styles.body}>
                <Header 
                    type='view'
                />
                <JBody style={{flex:1,width:'100%'}}>
                    <View style={this.styles.header}>
                        <View style={this.styles.imgContainer}>
                            <Image
                                source={defaultImg}
                                style={this.styles.image}
                            />
                        </View>
                        <View
                            style={this.styles.personInfoContainer}
                        >
                            <JText style={this.styles.firstLastName}>
                                {`${this.props.contact.firstName} ${this.props.contact.lastName}`}
                            </JText>
                            <JText style={this.styles.companyTitle}>
                                {this.getCompanyAndTitle()}
                            </JText>
                        </View>
                    </View>
                    <View 
                        style={this.styles.contactInfo}
                    >
                        <ContactBar
                            contact={this.props.contact}
                            showValue={this.showContactToast}
                        />
                    </View>
                    
                </JBody>
                {
                    this.state.message != '' &&
                    <Toast 
                        message={this.state.message} 
                        displayTime={3000}
                        removeToast={this.removeContactToast}
                    />
                }
            </View>
        )
    }
    getCompanyAndTitle(){
        let divider = '-';
        let job = this.props.contact.jobTitle? this.props.contact.jobTitle: '';
        let company = this.props.contact.company? this.props.contact.company:'';
        
        if(!job || !company){
            divider = '';
            let output = `${job} ${divider} ${company}`;
            return output.trim();
        }else{
            return `${job} ${divider} ${company}`;
        }
    }
    showContactToast(message){
        if(this.state.message === ''){
            this.setState({message:message});
        }
    }
    removeContactToast(){
        this.setState({message:''})
    }
}