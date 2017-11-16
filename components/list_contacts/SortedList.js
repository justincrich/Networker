import React from 'react';
import {View, Text, StyleSheet, Image, SectionList} from 'react-native';
import {colors,fonts} from '../../common_styles';

export default function ListContactComponent(props){
    this.styles = StyleSheet.create({
        view_text:{
            color:colors.textColorAlt,
            fontSize:fonts.sizes.h6
        },
        list_body:{
            paddingTop:110,
            height:'100%',
            backgroundColor:colors.background,
            
            
        },
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
            flexDirection:'row'
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

    return generateSectionList();

    function generateSectionList(){
        return(
            <SectionList 
                style={this.styles.list_body}
                sections={props.contacts}
                renderSectionHeader={({section}) => <Text style={this.styles.sectionStyle}>{section.key}</Text>}
                renderItem={({item})=> generateRowTemplate(item)}
                
            >

            </SectionList>
        )
    }

    function generateRowTemplate(item){
        return(
            <View style={this.styles.list_row}>
                {/* <Image 
                    source={{uri:item.picture}}
                    style={this.styles.row_img}
                /> */}
                {generateContactInformation(item)}
            </View>
        );
    }

    function generateContactInformation(item){
        return(
            <View style={this.styles.row_content}>
                <View style={this.styles.name_company_text}>
                    <Text style={this.styles.view_text}>
                        {`${item.name.first.charAt(0).toUpperCase()+item.name.first.slice(1)} ${item.name.last.charAt(0).toUpperCase()+item.name.last.slice(1)}`}
                    </Text>
                    {
                        (item.job && item.job.company) &&
                            <Text style={this.styles.view_text}>
                                {` - ${item.job.company}`}
                            </Text>
                    }
                </View>
                {
                    (item.job && item.job.title) &&
                    <Text style={this.styles.job_title}>{item.job.title}</Text>
                }
            </View>
        )
    }
}

