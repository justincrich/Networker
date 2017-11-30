import React from 'react';
import {View,TouchableOpacity,Animated,StyleSheet, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';
import {JTextInput,JText,JDivider} from '../../base_components/JLibrary';
import {colors,fonts} from '../../../common_styles';
import InteractionInput from './interaction_input/interaction_input_component';
export default class InteractionActionBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            body_height_animated_value:new Animated.Value(133),
            input_body_opacity_animated_value:new Animated.Value(1),
            title_body_opacity_animated_value:new Animated.Value(1),
            add:true,
            typeSet:false,
            typesOpen:false,
            dateSet:false,
            dateOpen:false
        }
        this.styles = StyleSheet.create({
            body:{
                display:'flex',
                flexDirection:'row',
                width:'100%',
                alignItems:'center',
                borderBottomWidth:1,
                borderBottomColor:colors.divider,
                zIndex:500,
                backgroundColor:colors.background,
                marginBottom:10,
            },
            titleHoldster:{
                width:'100%',
                display:'flex',
                flexDirection:'row',
            },
            interactionsSectionHeader:{
                fontSize:fonts.sizes.h4,
            }
        })
        this.toggleUI = this.toggleUI.bind(this);
        this.getHeader = this.getHeader.bind(this);

    }


    render(){
        return(
            <Animated.View style={[this.styles.body,{height:this.state.body_height_animated_value}]}>
                {!this.state.add?
                    this.getHeader()
                    :
                    <InteractionInput/>
                }
                
            </Animated.View>
        )
    }

    getHeader(){
        return(
            <Animated.View style={[{flex:1,opacity:this.state.title_body_opacity_animated_value},this.styles.titleHoldster]}>
                <JText
                    style={[
                        this.styles.interactionsSectionHeader,
                        {
                            opacity:1
                        }
                    ]}
                >Interactions</JText>
                <TouchableOpacity 
                    style={[{opacity:1,marginLeft:'auto'}]}
                    onPress={this.toggleUI}
                >
                    <Icon
                        name='plus'
                        type='material-community'
                        size={30}
                        color={colors.titleText}
                        
                    />
                </TouchableOpacity>
            </Animated.View>
        )
    }

    toggleUI(){
        let sequence1 = 100;
        const o1 = this.state.add? this.state.input_body_opacity_animated_value:this.state.title_body_opacity_animated_value;
        const o2 = this.state.add? this.state.title_body_opacity_animated_value:this.state.input_body_opacity_animated_value;
        const h = this.state.add? 33:130;
        Animated.timing(o1,{
            toValue:0,
            duration:sequence1
        }).start(()=>this.setState({add:!this.state.add}))
        Animated.sequence([
            Animated.delay(sequence1+1),
            Animated.timing(this.state.body_height_animated_value,{
                toValue:h,
                duration:sequence1
            }),
            Animated.timing(o2,{
                toValue:1,
                duration:sequence1
            })
        ]).start()
        
        
    }
}

