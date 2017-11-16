import React from 'react';
import {View,
        Text,
        TextInput,
        TouchableWithoutFeedback,
        Animated,
        StyleSheet,
        Dimensions} from 'react-native';
import { Icon } from 'react-native-elements';
import {colors} from '../../../common_styles';

export default class SearchInput extends React.Component{
    constructor(props){
        super(props);
        this.search_icon_animation_value;
        this.search_field_width_animation;
        this.search_field_opacity_animation;
        this.widthInterpolation;
        this.search_field_close_icon_value;
        this.state={}
        this.styles = new StyleSheet.create({
            search_container:{
                position:"relative",
                display:"flex",
                flexDirection:'row',
                flex:1,
                right:0,
                justifyContent:'flex-end',
                alignItems:'center',
                height:40
            },
            search_icon:{
                position:"absolute",
                
            },
            close_button_container:{
                display:"flex",
                alignItems:"center",
                justifyContent:"center"
            },
            input_container:{
                position:"absolute",
                right:0
            },
            search_field:{
                height:40,
                flex:1,
                borderBottomWidth:1,
                borderBottomColor:colors.textColor,
                paddingLeft:40,
                paddingRight:40,
                zIndex:500,
                
            },
            field_close_icon:{
                position:'relative',
                right:0,
                zIndex:500
                
                
            }
        })

        this.generateAnimatedSearchButton = this.generateAnimatedSearchButton.bind(this);
        this.toggleSearchField = this.toggleSearchField.bind(this);
        this.animateSearchFieldOpen = this.animateSearchFieldOpen.bind(this);
        this.animateSearchFieldClosed = this.animateSearchFieldClosed.bind(this);
    }

    componentWillMount(){
        this.search_icon_animation_value = new Animated.Value(0);
        this.search_field_width_animation = new Animated.Value(0);
        this.search_field_opacity_animation = new Animated.Value(0);
        this.search_field_animated_width = this.search_field_width_animation.interpolate({
            inputRange:[0,1],
            outputRange:["0%","100%"],
            extrapolate:"clamp"
        });
        this.search_field_close_icon_value = new Animated.Value(.3);
    }

    render(){
        return(
            <View style={this.styles.search_container}
            >
                {this.generateSearchButton()}
                {this.generateSearchField()}
                {this.generateCloseButton()}
            </View>
        )
    }

    generateSearchButton(){
        return(
                <TouchableWithoutFeedback
                    onPress={this.toggleSearchField}
                >
                    {this.generateAnimatedSearchButton()}
                </TouchableWithoutFeedback>
        )
    }
    toggleSearchField(event){
        this.animateSearchFieldOpen();
        this.props.toggleInput();
    }
    animateSearchFieldOpen(){
        
                Animated.parallel(
                    [
                        Animated.timing(this.search_icon_animation_value,{
                            toValue:Dimensions.get('screen').width-70,
                            duration:250
                        }),
                        Animated.timing(this.search_field_width_animation,{
                            toValue:1,
                            duration:250
                        }),
                        Animated.timing(this.search_field_opacity_animation,{
                            toValue:1,
                            duration:250
                        }),
                        Animated.timing(this.search_field_close_icon_value,{
                            toValue:1,
                            duration:100
                         })
                    ]
                ).start();
        
    
    }


    generateAnimatedSearchButton(){
        return(
            <Animated.View
            
                style={[this.styles.search_icon,
                    {right:this.search_icon_animation_value}]}
            >
                <Icon
                    name='search'
                    color={colors.textColor}
                    size={30}
                    
                />
            </Animated.View>
        )
    }

    
    generateSearchField(){
        return(
            <Animated.View 
            style={[this.styles.input_container,{width:this.search_field_animated_width,opacity:this.search_field_opacity_animation}]}
            >
                {
                    this.props.visible &&
                    <TextInput 
                            underlineColorAndroid='transparent'
                            style={this.styles.search_field}
                    />
                }
            </Animated.View>
        )
    }
    generateCloseButton(){
        return(
            <Animated.View
            style={[{opacity:this.search_field_close_icon_value}]}
            >
                {
                    this.props.visible &&
                        <Icon
                            name='close'
                            size={30}
                            color={colors.textColor}
                            onPress={this.animateSearchFieldClosed}
                            iconStyle={this.styles.field_close_icon}
                        />
                }
            </Animated.View>
        )
    }

    animateSearchFieldClosed(){
        Animated.parallel(
            [
                Animated.timing(this.search_icon_animation_value,{
                    toValue:0,
                    duration:250
                }),
                Animated.timing(this.search_field_width_animation,{
                    toValue:0,
                    duration:250
                }),
                Animated.timing(this.search_field_opacity_animation,{
                    toValue:0,
                    duration:250
                }),
                Animated.timing(this.search_field_close_icon_value,{
                    toValue:0,
                    duration:100
                 })
            ]
        ).start(this.props.toggleInput())
        
    }

    

}


