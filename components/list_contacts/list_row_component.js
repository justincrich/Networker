import React from 'react';
import {View,Image,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {colors,fonts} from '../../common_styles';
import defaultPic from '../../media/default_profile_img.png'

export default class ContactListRow extends React.Component{
    constructor(props){
        super(props);
        this.styles = StyleSheet.create({
            list_row:{
                marginLeft:30,
                marginRight:30,
                paddingTop:10,
                paddingBottom:10,
                borderBottomWidth:.5,
                borderBottomColor:colors.divider,
                display:'flex',
                flexDirection:'row',
                alignItems:'center'
                
            },
            row_img:{
                width:50,
                height:50,
                borderRadius:25
            },
            row_content:{
                marginLeft:10
            },
            name_company_text:{
                display:'flex',
                flexDirection:'row',
            },
            view_text:{
                color:colors.textColor,
            },
            name_text:{
                fontWeight:'bold'
            },
            sectionStyle:{
                backgroundColor:'transparent',
                marginLeft:10
            },
            job_title:{
                color:colors.textColorLight,
                fontSize:fonts.sizes.p
            }
        });
        this.generateRowTemplate = this.generateRowTemplate.bind(this);
        this.generateContactInformation = this.generateContactInformation.bind(this);
    }

    render(){
        return this.generateRowTemplate(this.props.item);
    }

    generateRowTemplate(item){
        // console.log('picture',item.pictureUri,!item.pictureUri)
        let picture = !item.pictureUri? defaultPic:{uri:item.pictureUri};
        return(
            <TouchableOpacity 
                style={this.styles.list_row}
                onPress={()=>this.props.openContact(item)}
            >
                <Image 
                    source={picture}
                    style={this.styles.row_img}
                /> 
                {this.generateContactInformation(item)}
            </TouchableOpacity>
        );
    }
    generateContactInformation(item){
        
        return(
            <View style={this.styles.row_content}>
                <View style={this.styles.name_company_text}>
                    <Text style={[this.styles.view_text,this.styles.name_text]}>
                        {`${item.firstName} ${item.lastName}`}
                    </Text>
                    {
                        (item.company!='') &&
                            <Text style={this.styles.view_text}>
                                {` - ${item.company}`}
                            </Text>
                    }
                </View>
                {
                    (item.jobTitle!='') &&
                    <Text style={this.styles.job_title}>{item.jobTitle}</Text>
                }
            </View>
        )
    }
}


