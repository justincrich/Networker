import React from 'react';
import {View,TouchableOpacity,Animated,StyleSheet, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';
import {JTextInput,JText,JDivider} from '../../../base_components/JLibrary';
import {colors,fonts} from '../../../../common_styles';
import InteractionTypeButton from './interaction_type_button';
import InteractionDate from './interaction_date_button';
export default class InteractionInput extends React.Component{
    constructor(props){
        super(props);
        this.typeAnimated = new Animated.Value();
        this.dateOpacityAnimated = new Animated.Value(1);
        this.dateWidthAnimated = new Animated.Value();
        this.state = {
            input_body_opacity_animated_value:new Animated.Value(1),
            optionsContainerWidth:0,
            typeOpen:false,
            dateValue:null,
            typeValue:null
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
            saveContainer:{
                display:'flex',
                flexDirection:'column',
                height:'100%',
                justifyContent:'space-around'

            },
            submitActionIcon:{
                padding:10
            },
            interactionTypeContainer:{
                height:40
            },
            button:{
                width:40,
                height:40
            }
        })

        this.toggleInteractionTypeOpen = this.toggleInteractionTypeOpen.bind(this);
        this.setTypeValue = this.setTypeValue.bind(this);
    }

    componentWillMount(){

    }

    render(){
        return(
            <Animated.View style={[this.styles.inputInteractionBody,{opacity:this.state.input_body_opacity_animated_value}]}>
                <View style={this.styles.addInteractionContainer}>
                    <View style={this.styles.addInteractionTextInputContainer}>
                        <JText
                            style={this.styles.addInteractionTextInputLabel}
                        >
                            New Interaction
                        </JText>
                        <JTextInput
                            style={this.styles.addInteractionTextInputInput}
                            multiline={true}
                            placeholder='Details ...'
                        />
                    </View>
                    <View style={this.styles.optionsContainer}
                          onLayout={(event) => {
                            var {x, y, width, height} = event.nativeEvent.layout;
                            this.setState({optionsContainerWidth:width})
                          }}
                    >
                            <Animated.View
                                style={[this.styles.interactionTypeContainer,{width:this.typeAnimated}]}
                            >
                                <InteractionTypeButton 
                                    style={this.styles.button}
                                    typeOpen={this.state.typeOpen}
                                    typeValue={this.state.typeValue}
                                    setTypeValue={(type)=>this.setTypeValue(type)}
                                    toggleOpen={this.toggleInteractionTypeOpen}
                                    containerWidth={this.state.optionsContainerWidth}
                                />
                            </Animated.View>
                            <Animated.View
                                style={{opacity:this.dateOpacityAnimated,width:this.dateWidthAnimated}}
                            >
                            {
                                !this.state.typeOpen &&
                                
                                    <InteractionDate 
                                        dateValue={this.state.dateValue} 
                                        setDate={(date)=>this.setState({dateValue:date})}
                                        style={this.styles.button}
                                    />
                            }
                            </Animated.View>
                    </View>
                </View>
                <View style={this.styles.saveContainer}>
                    <TouchableOpacity
                    
                    >
                        <Icon
                            name={'check'}
                            iconStyle={this.styles.submitActionIcon}
                            size={30}
                            color={colors.accent}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.toggleUI}
                    >
                        <Icon
                            name={'close'}
                            type={'material-community'}
                            size={30}
                            iconStyle={this.styles.submitActionIcon}
                        />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }

    toggleInteractionTypeOpen(){
        if(this.state.typeOpen){
            Animated.parallel([
                Animated.timing(this.dateWidthAnimated,{
                    toValue:null,
                    duration:250
                }),
                Animated.timing(this.typeAnimated,{
                    toValue:null,
                    duration:250
                }),
                Animated.timing(this.dateOpacityAnimated,{
                    toValue:1,
                    duration:75
                })
            ]).start(()=>{
                this.setState({typeOpen:false});
                
            });
             
        }else{
            Animated.parallel([
                Animated.timing(this.dateOpacityAnimated,{
                    toValue:0,
                    duration:75
                }),
                Animated.timing(this.dateWidthAnimated,{
                    toValue:0,
                    duration:250
                }),
                Animated.timing(this.typeAnimated,{
                    toValue:this.state.optionsContainerWidth,
                    duration:250
                })
            ]).start(()=>this.setState({typeOpen:true}))
        }
    }

    setTypeValue(type){
        console.log(type)
        this.setState({typeValue:type});
        this.toggleInteractionTypeOpen();
    }



}