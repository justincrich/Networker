import React from 'react';
import {View,TouchableOpacity,Animated,StyleSheet, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';
import {JTextInput,JText,JDivider} from '../../../base_components/JLibrary';
import {colors,fonts} from '../../../../common_styles';

export default class InteractionInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input_body_opacity_animated_value:new Animated.Value(1),
            typeSet:false,
            typesOpen:false,
            dateSet:false,
            dateOpen:false
        }
        this.styles= StyleSheet.create({
            inputInteractionBody:{
                marginBottom:10,
                display:'flex',
                flexDirection:'row',
                flex:1
            },
            addInteractionContainer:{
                flex:1,
                
            },
            addInteractionTextInputContainer:{
                marginBottom:10
            },
            addInteractionTextInputLabel:{
                fontSize:fonts.sizes.lil,
                fontWeight:'bold',
                color:colors.textColorLight
            },
            addInteractionTextInputInput:{
                
            },
            optionsContainer:{
                display:'flex',
                flexDirection:'row',
                justifyContent:'flex-end',
                
            },
            optionsButton:{
                height:40,
                borderRadius:20,
                backgroundColor:colors.accent,
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                
                justifyContent:'center',
                alignItems:'center'
            },
            optionsButtonText:{
                marginRight:5
            },
            saveContainer:{
                display:'flex',
                flexDirection:'column'
            },
            submitActionIcon:{
                padding:10
            }
        })
        this.getTypeOptions = this.getTypeOptions.bind(this);
        this.getDateOptions = this.getDateOptions.bind(this);

    }

    render(){
        return(
            <Animated.View style={[this.styles.inputInteractionBody,{opacity:this.state.input_body_opacity_animated_value}]}>
                <View style={this.styles.addInteractionContainer}>
                    <View style={this.styles.addInteractionTextInputContainer}>
                        <JText
                            style={this.styles.addInteractionTextInputLabel}
                        >Interaction Details</JText>
                        <JTextInput
                            style={this.styles.addInteractionTextInputInput}
                            multiline={true}
                        />
                    </View>
                    <View style={this.styles.optionsContainer}>
                        {
                            
                            this.getTypeOptions()
                        }
                        {
                            !this.state.typeOpen &&
                            this.getDateOptions()
                        }
                    </View>
                </View>
                <View style={this.styles.saveContainer}>
                    <TouchableOpacity
                    
                    >
                        <Icon
                            name={'check'}
                            iconStyle={this.styles.submitActionIcon}
                            color={colors.accent}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.toggleUI}
                    >
                        <Icon
                            name={'close'}
                            type={'material-community'}
                            iconStyle={this.styles.submitActionIcon}
                        />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }

    getTypeOptions(){
        let containerDynamicStyle = {};
        let iconColor;
        let iconDynamicStyle;
        let isDisabled;
        let iconName;
        let typeText={
            marginRight:20,
            color:colors.textColorDarkBkg,
            fontSize:fonts.sizes.lil
        };
        if(this.state.typeOpen){
            containerDynamicStyle ={
                width:'100%',
                justifyContent:'flex-end',
                paddingLeft:20,
                paddingRight:20
            }
            iconDynamicStyle = {marginLeft:'auto'}

            isDisabled = true;

            iconName = 'close';
            
        }else{
            containerDynamicStyle = {
                marginRight:10,
                width:40
            }
            isDisabled = false;
            iconName = 'forum';
        }

        if(this.state.typeSet){
            iconColor = colors.accent;
        }else{
            iconColor = '#fff';
        }

        return(
            <TouchableOpacity
                style={[this.styles.optionsButton,containerDynamicStyle]}
                disabled={isDisabled}
                onPress={()=>this.setState({typeOpen:true})}
            >
                {
                    this.state.typeOpen &&
                    <ScrollView
                        style={{
                            marginRight:'auto',
                            display:'flex',
                            flexDirection:'row',
                            
                        }}
                        horizontal={true}
                    >
                        <TouchableOpacity>
                            <JText
                                style={typeText}
                            >
                                Email
                            </JText>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <JText
                                style={typeText}
                            >
                                Phone Call
                            </JText>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <JText
                                    style={typeText}
                                >
                                    Text Message
                            </JText>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <JText
                                    style={typeText}
                                >
                                    In Person
                            </JText>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <JText
                                    style={typeText}
                                >
                                    Social Media
                            </JText>
                        </TouchableOpacity>
                    </ScrollView>
                }
                <TouchableOpacity
                    onPress={()=>this.setState({typeOpen:false})}
                    disabled={!isDisabled}
                >
                    <Icon
                        name={iconName}
                        color={iconColor}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    getDateOptions(){
        let dynamicStyling = {};
        let iconColor;
        if(this.state.dateSet){
            dynamicStyling ={
                backgroundColor:'transparent',
                borderWidth:2,
                borderColor:colors.accent,
                paddingLeft:10,
                paddingRight:10
            }
            iconColor = colors.accent
        }else{
            dynamicStyling = {
                width:40,
 
            }
            iconColor = '#fff';
        }
        return(
            <TouchableOpacity style={[this.styles.optionsButton,
                {...dynamicStyling}]}>
                    { this.state.dateSet &&
                        <JText
                            style={{color:colors.accent, marginRight:10}}
                        >3 Months Ago
                        </JText>
                    }
                    <Icon
                        name={'schedule'}
                        color={iconColor}
                    />
            </TouchableOpacity>
        )
    }


}