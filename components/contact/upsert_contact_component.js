import React from 'react';
import {View,ScrollView,Text, StyleSheet, TextInput} from 'react-native';
import {colors,fonts} from '../../common_styles';
import { Icon } from 'react-native-elements';
import { format, parse , isValidNumber} from 'libphonenumber-js';
import _ from 'lodash';
import JText from '../base_components/jtext_component';
import JTextInput from '../base_components/jfield_component';
//components
import Header from '../headers/header_container'
import ImageUpload from '../image_upload/image_upload_component'
//resources
import defaultPic from '../../media/default_profile_img.png';

export default class UpsertContact extends React.Component{
    constructor(props){
        super(props)
        this.styles = StyleSheet.create({
            body:{
                flex:1,
                backgroundColor:colors.body,
                
            },
            addContactContainer:{
                flex:1,
                marginTop:80,
                marginLeft:20,
                marginRight:20,
                display:'flex',
                flexDirection:'column'
            },
            imageContainer:{
                alignItems:'center',
                marginBottom:20,
       
            },
            fieldsContainer:{
                display:'flex',
                flexDirection:'column',
                // flex:2,
                marginRight:20
            },
            sectionContainer:{
                marginBottom:20,
                
                
            },
            textRowContainer:{
                display:'flex',
                flexDirection:'row',
                height:50,
                marginBottom:5

            },
            fieldIcon:{
                width:50,
                
            },
            textInputContainer:{
                display:'flex',
                flexDirection:'column',
                flex:1,
            },
            textInputNCT:{
                fontSize:fonts.sizes.h6,
                marginBottom:10,
                height:50,
            },
            textInputNotificationText:{
                position:'relative',
                fontSize:fonts.sizes.lil,
                top:-10,
                color:colors.red
            },
            multilineTextContainer:{
                borderBottomWidth:1,
                borderColor:colors.fieldColor,
                flex:1,
            },
            multilineTextInput:{
                flex:1,
                fontSize:15,
            },
            
        });
        this.state = {
            firstName:'',
            firstNameError:null,
            lastName:'',
            lastNameError:null,
            company:'',
            jobTitle:'',
            pictureUri:'',
            email:'',
            emailError:null,
            phoneNumber:'',
            phoneNumberError:null,
            notes:'',

        }
        
        this.formatPhoneNumber = this.formatPhoneNumber.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.setPicture = this.setPicture.bind(this);
    }
    
    componentWillMount(){
        this.setState({
            ...this.props.contact
        })
    }
    
    render(){
        let {contact} = this.props;
        return(
            <View style={this.styles.body}>
                <Header 
                    title={this.props.contact? 'Edit Contact':'New Contact'}
                    type='upsert'
                    saveContact = {this.saveContact}
                    goBack={this.props.goBack}
                    contact={this.props.contact}
                />
                <ScrollView 
                    keyboardShouldPersistTaps={'handled'}
                >
                    <View style={this.styles.addContactContainer}>
                        <View style={this.styles.imageContainer}>  
                            <ImageUpload 
                                type='user' 
                                setPicture={this.setPicture}
                                contactUri={this.state.contactUri}
                            />
                        </View>
                        {this.getFields()}
                    </View>
                </ScrollView>
            </View>
        )
    }



    setPicture(uri){
        this.setState({pictureUri:uri})
    }

    getFields(){
        return(<View style={this.styles.fieldsContainer}>
            <View style={this.styles.sectionContainer}>
                <View style={this.styles.textRowContainer}>
                    <Icon
                        name='person'
                        color={colors.fieldColor}
                        size={40}
                        iconStyle={this.styles.fieldIcon}
                    />
                    <View style={this.styles.textInputContainer}>
                        <JTextInput
                            style={this.styles.textInputNCT}
                            placeholder={'First Name'}
                            value={this.state.firstName}
                            onChangeText={(text)=>this.setState({firstName:text})}
                        />
                        <JText style={[
                            this.styles.textInputNotificationText,
                            {display:!this.state.firstNameError?'none':'flex'}
                            ]}
                        >
                            {this.state.firstNameError}
                        </JText>
                    </View>
                </View>
                <View style={this.styles.textRowContainer}>
                    <View style={[this.styles.fieldIcon]}/>
                    <View style={this.styles.textInputContainer}>
                        <JTextInput
                            style={this.styles.textInputNCT}
                            placeholder={'Last Name'}
                            value={this.state.lastName}
                            onChangeText={(text)=>this.setState({lastName:text})}
                        />
                        <JText style={
                            [
                                this.styles.textInputNotificationText,
                                {display:!this.state.lastNameError?
                                'none':'flex'}
                            ]
                            }>
                            {this.state.lastNameError}
                        </JText>
                    </View>
                </View>
            </View>
            <View style={this.styles.sectionContainer}>
                <View style={this.styles.textRowContainer}>
                    <Icon
                        name='domain'
                        type='material-community'
                        color={colors.fieldColor}
                        size={40}
                        iconStyle={this.styles.fieldIcon}
                    />
                    <View style={this.styles.textInputContainer}>
                    <JTextInput
                        underlineColorAndroid = 'rgba(0,0,0,0)'
                        style={this.styles.textInputNCT}
                        value={this.state.company}
                        placeholder={'Company'}
                        onChangeText={(text)=>this.setState({company:text})}
                    />
                    </View>
                </View>
                <View style={this.styles.textRowContainer}>
                    <Icon
                        name='briefcase'
                        type='material-community'
                        color={colors.fieldColor}
                        size={40}
                        iconStyle={this.styles.fieldIcon}
                    />
                    <View style={this.styles.textInputContainer}>
                        <JTextInput
                            underlineColorAndroid = 'rgba(0,0,0,0)'
                            style={this.styles.textInputNCT}
                            value={this.state.jobTitle}
                            placeholder={'Job Title'}
                            onChangeText={(text)=>this.setState({jobTitle:text})}
                        />
                    </View>
                </View>
            </View>
            <View style={this.styles.sectionContainer}>
                <View style={this.styles.textRowContainer}>
                    <Icon
                        name='mail'
                        color={colors.fieldColor}
                        size={40}
                        iconStyle={this.styles.fieldIcon}
                    />
                    <View style={this.styles.textInputContainer}>
                        <JTextInput
                            underlineColorAndroid = 'rgba(0,0,0,0)'
                            style={this.styles.textInputNCT}
                            value={this.state.email}
                            placeholder={'Email'}
                            keyboardType='email-address'
                            onChangeText={(text)=>this.setState({email:text})}
                        />
                        <JText style={
                            [this.styles.textInputNotificationText,
                            {display:!this.state.emailError?'none':'flex'}]
                            }>
                            {this.state.emailError}
                        </JText>
                    </View>
                </View>
            </View>
            <View style={this.styles.sectionContainer}>
                <View style={this.styles.textRowContainer}>
                    <Icon
                        name='phone'
                        color={colors.fieldColor}
                        size={40}
                        iconStyle={this.styles.fieldIcon}
                    />
                    <View style={this.styles.textInputContainer}>
                        <JTextInput
                            underlineColorAndroid = 'rgba(0,0,0,0)'
                            style={this.styles.textInputNCT}
                            value={this.state.phoneNumber}
                            placeholder={'Phone Number'}
                            onChangeText={this.formatPhoneNumber}
                            keyboardType='phone-pad'
                        />
                        <JText style={
                            [this.styles.textInputNotificationText,
                                {display:!this.state.phoneNumberError?'none':'flex'}]
                            }>
                            {this.state.phoneNumberError}
                        </JText>
                    </View>
                </View>
            </View>
            <View style={this.styles.sectionContainer}>
                <View style={this.styles.textRowContainer}>
                    <Icon
                        type='material-community'
                        name='file-document-box'
                        color={colors.fieldColor}
                        size={40}
                        iconStyle={this.styles.fieldIcon}
                    />
                    <View style={this.styles.multilineTextContainer}>
                        <JTextInput
                            underlineColorAndroid = 'rgba(0,0,0,0)'
                            multiline={true}
                            numberOfLines={4}
                            style={this.styles.multilineTextInputNCT}
                            value={this.state.notes}
                            placeholder={'Notes'}
                            onChangeText={(text)=>this.setState({notes:text})}
                        />
                    </View>
                </View>
            </View>
    </View>)
    }

    formatPhoneNumber(text){
        let pn = parse(text,'US');
        let formatted = format(pn,'National');
        let input = !formatted? text:formatted;
        this.setState({phoneNumber:input})
    }

    saveContact(){
        let inputs = _.pick(this.state,["firstName",
            "lastName","phoneNumber","email"]);
        let invalid = false;
        for(input in inputs){
            try{
                this.validate(input,inputs[input]);
                let errorKey = `${input}Error`;
                this.setState({[errorKey]:null});
            }catch(error){
                //catch input errors
                invalid = true;
                console.log(error.message)
                this.setState({
                    [error.name]:error.message
                })
            }
            
        }
        
        if(!invalid){
            
            let contact = _.pick(this.state,["firstName",
            "lastName","phoneNumber","email",'company','jobTitle','pictureUri']);
            this.props.saveContact(contact)
        }
        
        // if(invalid) return console.log('Console: Values missing, please fill in required fields')
        // this.setState({submitted:true});
        // newContact.picture = this.state.pictureUri===''? this.state.pictureUri:defaultPic;


    }

    validate(key,value){
            let emailRegularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let phoneRegEx =/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
            let keyError = `${key}Error`;
            let isEmpty =  !value || /^\s*$/.test(value);
            let validationError = new Error();
            validationError.name = keyError;

        if((key === 'firstName')&&(isEmpty)){
            validationError.message = `Please enter a first name`;
            throw validationError;
        }else if((key==='lastName')&&(isEmpty)){
            validationError.message = `Please enter a last name`;
            throw validationError;
        }
        else if((key==='email') && (!isEmpty && !emailRegularExpression.test(value))){
            validationError.message = `Please enter a properly formatted email address. Ex: example@example.com`;
            throw validationError;
        }else if ((key==='phoneNumber') && (!isEmpty && !phoneRegEx.test(value))){
            let val = `${value}`;
            validationError.message = `Please enter a properly formatted 10 digit phone number. Ex: (555) 555-5555`;
            throw validationError;
        }

    
    }





}