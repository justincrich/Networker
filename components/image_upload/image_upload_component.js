import React from 'react';
import {
    ActivityIndicator,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native';
import {Icon} from 'react-native-elements';
var ImagePicker = require('react-native-image-picker');

import {colors,fonts} from '../../common_styles';
import defaultProfilePic from '../../media/profileimg.png';
export default class ImageUpload extends React.Component {
    constructor(props){
        super(props);
        this.styles=StyleSheet.create({
            imageContainer:{
                
                position:'relative',
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
            actionTextContainer:{
                zIndex:200,
                width:'100%',
                height:'100%',
                
                alignItems:'center',
                justifyContent:'center'
            },
            actionText:{
                zIndex:200,
                position:'absolute',
                bottom:10,
                color:colors.accent
            }
        })
        this.state = {
            image:null,
            uploading:false
        };
        this.selectImage = this.selectImage.bind(this);
    }

    componentWillMount(){
        this.setState({
            image:{uri:this.props.contactUri}
        });
    }

    render(){
        return(
            <TouchableWithoutFeedback
                onPress={this.selectImage}
                
            >
                <View style={this.styles.imageContainer}>
                    {
                        this.state.image&&
                            <Image
                                source={this.state.image}
                                style={this.styles.image}
                            />
                    }
                    <View style={this.styles.actionTextContainer}>
                        <Icon
                            name='camera-alt'
                            size={30}
                            color={colors.textColor}
                            
                            
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            
        )
    }

    selectImage(){
        let options = {
            title:null,
            quality:.5,
            storageOptions: {
                skipBackup: true,
                path: 'images'
              }
        }

        ImagePicker.showImagePicker(options,(response)=>{
            console.log('Response = ',response)
            this.setState({image:{uri:response.uri}});
            this.props.setPicture(response.uri)
        })
    }

    getDefaultImage(){
        switch(this.props.type){
            case 'user': return defaultProfilePic
            break;
            default: console.log('no image')

        }
    }
}