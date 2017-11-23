import React from 'react';
import {View,StyleSheet,Text, Animated, TouchableOpacity,Linking} from 'react-native';
import { Icon } from 'react-native-elements';
import {colors,fonts} from '../../../common_styles';
import JText from '../../base_components/jtext_component';
import ContactInfoMoreOptions from './contact_info_more_options_component';
import * as communications from 'react-native-communications';

export default class ContactBar extends React.Component{
    constructor(props){
        super(props);
        
        this.styles = StyleSheet.create({
            body:{
                position:'relative',
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                maxWidth:400
            },
            icon:{
                padding:30,
                position:'relative',
                display:'flex',
                alignItems:'center'
            },
            icontxtcontainer:{
                position:'relative',
                display:'flex',
                flexDirection:'column'
            },
        })
        this.state={
            moreOpen:false
        }
        this.toggleMoreVisibility = this.toggleMoreVisibility.bind(this);
        this.getMoreOptions = this.getMoreOptions.bind(this);
    }

    render(){
        const {phoneNumber,email,social} = this.props.contact
        return(
            <View
                style={this.styles.body}
            >
                {
                    !phoneNumber?
                    <View/>
                    :
                    <TouchableOpacity
                        onPress={()=>communications.phonecall(phoneNumber,false)}
                        onLongPress={()=>this.props.showValue(`Phone Number: ${phoneNumber}`)}
                    >
                        <Icon
                            name='phone'
                            color={colors.accent}
                            size={30}
                            iconStyle={this.styles.icon}
                            
                        />
                    </TouchableOpacity>
                    
                }
                {
                    !phoneNumber?
                    <View/>
                    :
                    <TouchableOpacity
                    onPress={()=>communications.text(phoneNumber,'')}
                        onLongPress={()=>this.props.showValue(`Phone Number: ${phoneNumber}`)}
                    >
                        <Icon
                            name='textsms'
                            color={colors.accent}
                            size={30}
                            iconStyle={this.styles.icon}
                            onLongPress={()=>this.props.showValue(`Phone Number: ${phoneNumber}`)}
                        />
                    </TouchableOpacity>
                }
                {
                    !email?
                    <View/>
                    :
                    <TouchableOpacity
                        onPress={()=>{
                            let emailUrl = `mailto:${email}`;
                            Linking.openURL(emailUrl);
                        }}
                        onLongPress={()=>this.props.showValue(`Email: ${email}`)}
                        
                    >
                        <Icon
                            name='email'
                            color={colors.accent}
                            size={30}
                            iconStyle={this.styles.icon}
                        />
                    </TouchableOpacity>
                }
                {
                    !social?
                        <View/>
                    :
                        <TouchableOpacity
                            onPress={this.toggleMoreVisibility}
                        >
                            <Icon
                                type='material-community'
                                name='dots-horizontal'
                                color={colors.accent}
                                iconStyle={this.styles.icon}
                                size={30}
                            />
                        </TouchableOpacity>
                }
                {
                    this.state.moreOpen&&
                    this.getMoreOptions()
                }
            </View>
        )
    }


    getMoreOptions(){
        
        return(
            <ContactInfoMoreOptions social={social} closeView={this.toggleMoreVisibility}/>
        )

    }
    toggleMoreVisibility(){
        this.setState({moreOpen:!this.state.moreOpen})
    }


}