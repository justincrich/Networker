import React from 'react';
import {View,
        StyleSheet,
        Animated,
        ScrollView,
        TouchableOpacity,
        Linking
        } from 'react-native';
import {colors,fonts} from '../../../common_styles';
import { Icon } from 'react-native-elements';
export default class ContactInfoMoreOptions extends React.Component{
    constructor(props){
        super(props);
        //animated values
        this.container_opacity = new Animated.Value(0);
        this.more_contacts_open_animation = new Animated.Value(0);
        this.more_contacts_width = this.more_contacts_open_animation.interpolate({
            inputRange:[0,1],
            outputRange:["0%","100%"],
            extrapolate:"clamp"
        });
        this.opacity_animated = new Animated.Value(0);
        this.styles=StyleSheet.create({
            body:{
                position:'absolute',
                zIndex:1000,
                backgroundColor:colors.accent,
                display:'flex',
                flexDirection:'row',
                justifyContent:'flex-start',
                paddingLeft:10,
                paddingRight:10,
                borderRadius:30,
                width:'100%',
                right:0
                
                
            },
            iconStyle:{
                padding:10
            },
            socialContainer:{
                display:'flex',
                flexDirection:'row',
                width:50,
            },
            closeContainer:{
                marginLeft:'auto'
            },
            iconClose:{
                
            }
        });
        this.state = {};
        this.openLink = this.openLink.bind(this);
    }

    componentDidMount(){
        
        Animated.sequence([
            Animated.timing(this.opacity_animated,{
                toValue:1,
                duration:50
            }),
            Animated.parallel([
                Animated.timing(this.container_opacity,{
                    toValue:1,
                    duration:100
                }),
                Animated.timing(this.more_contacts_open_animation,{
                    toValue:1,
                    duration:250
                })
            ]),

            
        ]).start()
    }


    render(){
        return(
            <Animated.View style={[this.styles.body,{width:this.more_contacts_width,opacity:this.container_opacity}]}>
                <Animated.View style={{opacity:this.opacity_animated,display:'flex',flexDirection:'row',width:'100%'}}>
                    <ScrollView 
                        style={[this.styles.socialContainer]}
                        horizontal={true}
                    >
                        {
                            this.props.social.facebook &&
                            <TouchableOpacity
                                onPress={()=>{
                                    let appUrl = `fb://profile/${this.props.social.facebook.id}`;
                                    let webUrl = this.props.social.facebook.id;
                                    this.openLink(appUrl,webUrl);
                                }}
                            >
                                <Icon
                                    type='material-community'
                                    name='facebook'
                                    color={colors.background}
                                    iconStyle={this.styles.iconStyle}
                                    size={30}
                                />
                            </TouchableOpacity>
                        }
                        {
                            this.props.social.linkedin &&
                            <TouchableOpacity
                                onPress={()=>{
                                    let appUrl = `linkedin://${this.props.social.linkedin.id}`;
                                    let webUrl = this.props.social.linkedin.url;
                                    this.openLink(appUrl,webUrl)
                                }}
                            >
                                <Icon
                                    type='material-community'
                                    name='linkedin'
                                    color={colors.background}
                                    iconStyle={this.styles.iconStyle}
                                    size={30}
                                />
                            </TouchableOpacity>
                        }
                        {
                            this.props.social.twitter &&
                            <TouchableOpacity
                                onPress={()=>{
                                    let appUrl = `twitter://user?screen_name=${this.props.social.twitter.username}`;
                                    let webUrl = `https://twitter.com/${this.props.social.twitter.username}`;
                                    this.openLink(appUrl,webUrl)
                                }}
                            >
                                <Icon
                                    type='material-community'
                                    name='twitter'
                                    color={colors.background}
                                    iconStyle={this.styles.iconStyle}
                                    size={30}
                                />
                            </TouchableOpacity>
                        }
                        {
                            this.props.social.pinterest&&
                            <TouchableOpacity
                                onPress={()=>{
                                    let appUrl = `pinterest://www.pinterest.com/${this.props.social.pinterest.username}`;
                                    let webUrl = `https://pinterest.com/${this.props.social.pinterest.username}`;
                                    this.openLink(appUrl,webUrl)
                                }}
                            >
                                <Icon
                                    type='material-community'
                                    name='pinterest'
                                    color={colors.background}
                                    iconStyle={this.styles.iconStyle}
                                    size={30}
                                />
                            </TouchableOpacity>
                        }
                        {
                            this.props.social.snapchat&&
                            <TouchableOpacity
                            onPress={()=>{
                                let appUrl = `snapchat://add/${this.props.social.snapchat.username}`;
                                this.openLink(appUrl)
                            }}
                            >
                                <Icon
                                    type='material-community'
                                    name='snapchat'
                                    color={colors.background}
                                    iconStyle={this.styles.iconStyle}
                                    size={30}
                                />
                            </TouchableOpacity>
                        }
                        {
                            this.props.social.instagram &&
                            <TouchableOpacity
                            onPress={()=>{
                                let appUrl = `instagram://user?username=${this.props.social.instagram.username}`;
                                this.openLink(appUrl)
                            }}
                            >
                                <Icon
                                    type='material-community'
                                    name='instagram'
                                    color={colors.background}
                                    iconStyle={this.styles.iconStyle}
                                    size={30}
                                />
                            </TouchableOpacity>
                        }

                    </ScrollView>
                <TouchableOpacity
                    style={this.styles.closeContainer}
                    onPress={()=>{
                        Animated.sequence([
                            Animated.parallel([
                                Animated.timing(this.more_contacts_open_animation,{
                                    toValue:.2,
                                    duration:250
                                }),
                                Animated.timing(this.opacity_animated,{
                                    toValue:0,
                                    duration:100
                                }),
                                
                            ]),
                            Animated.timing(this.container_opacity,{
                                toValue:0,
                                duration:50
                            })
                        ]).start(this.props.closeView)
                        
                        
                    }}
                    >
                        <Icon
                            type='material-community'
                            name='close'
                            color={colors.background}
                            iconStyle={[this.styles.iconClose,this.styles.iconStyle]}
                            size={30}
                            
                        />
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        )
    }

    openLink(appUrl,webUrl){
        Linking.canOpenURL(appUrl)
        .then((supported)=>{
            if(!supported && webUrl){
                Linking.openURL(webUrl);
            }else{
                Linking.openURL(appUrl);
            }
        }).catch(err=>console.error('An error occurred',err.message))
    }
}

