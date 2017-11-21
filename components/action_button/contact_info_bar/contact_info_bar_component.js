import React from 'react';
import {View,StyleSheet,Text, Animated, TouchableOpacity} from 'react-native';
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
        return(
            <View
                style={this.styles.body}
            >
                {
                    this.props.contact.phoneNumber &&
                    <TouchableOpacity
                        onPress={()=>communications.phonecall(this.props.contact.phoneNumber,false)}
                        onLongPress={()=>this.props.showValue(`Phone Number: ${this.props.contact.phoneNumber}`)}
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
                    this.props.contact.phoneNumber &&
                    <TouchableOpacity
                    onPress={()=>communications.text(this.props.contact.phoneNumber,'')}
                        onLongPress={()=>this.props.showValue(`Phone Number: ${this.props.contact.phoneNumber}`)}
                    >
                        <Icon
                            name='textsms'
                            color={colors.accent}
                            size={30}
                            iconStyle={this.styles.icon}
                            onLongPress={()=>console.log('hiii')}
                        />
                    </TouchableOpacity>
                }
                {
                    this.props.contact.email &&
                    <TouchableOpacity
                        onPress={()=>communications.email([`${this.props.contact.email}`],[''],[''],'','')}
                        
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
                    (Object.keys(this.props.contact.social).length>0) &&
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
            <ContactInfoMoreOptions contact={this.props.contact} closeView={this.toggleMoreVisibility}/>
        )

    }
    toggleMoreVisibility(){
        this.setState({moreOpen:!this.state.moreOpen})
    }


}