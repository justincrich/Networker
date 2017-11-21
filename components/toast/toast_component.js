import React from 'react';
import {View,Animated,ScrollView,StyleSheet,Dimensions} from 'react-native';
import {colors,fonts} from '../../common_styles';
import JText from '../base_components/jtext_component';
export default class Toast extends React.Component{
    constructor(props){
        super(props);
        this.toast_animation = new Animated.Value(0);
        this.styles = StyleSheet.create({
            body:{
                position:'absolute',
                bottom:10,
                zIndex:1500,
                width:'100%',
                display:'flex',
                flexDirection:'row',
                justifyContent:'center'
            },
            tag:{
                
                
                backgroundColor:'rgba(0,0,0,.5)',
                borderRadius:20,
                
            },
            text:{
                fontSize:fonts.sizes.h6,
                color:colors.textColorDarkBkg,
                padding:10
            }
        });
        this.state = {};
    }
    
    componentDidMount(){
        let time = 500;
        Animated.timing(this.toast_animation,{
            toValue:1,
            duration:time
        }).start(()=>{
            console.log('hiii')
            setTimeout(() => {
                Animated.timing(this.toast_animation,{
                    toValue:0,
                    duration:time
                }).start(this.props.removeToast)
            }, this.props.displayTime);
        });
    }

    render(){
        return(
            <View style={this.styles.body}>
                <Animated.View style={[this.styles.tag, {opacity:this.toast_animation}]}>
                    <JText style={this.styles.text}>
                        {this.props.message}
                    </JText>
                </Animated.View>
            </View>
        )
    }
}