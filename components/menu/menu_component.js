import React from 'react';
import {View,
        Text,
        Link,
        StyleSheet,
        Dimensions,
        TouchableWithoutFeedback,
        Animated
    } from 'react-native'
import {colors,fonts} from '../../common_styles'
import { Icon } from 'react-native-elements'
import { DrawerNavigator } from 'react-navigation'


export default class Menu_Component extends React.Component{
    constructor(props){
        super(props);
        this.route_in_view = this.props.navigation.state.routes[0].key;
        this.styles = StyleSheet.create({
            menu_body:{
                position:'relative',
                flex:1,
                backgroundColor:'#fff',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                zIndex:1200,
                marginTop:30
                
            },
            menu_title:{
                fontSize:fonts.sizes.h3,
                marginBottom:30
            },
            table_of_contents:{
                padding:20,
                display:'flex',
                flexDirection:'column'
            },
            route_link_container:{
                position:'relative',
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                padding:15
            },
            route_link_name:{
                color:colors.accent,
                marginLeft:10
            },

    
        });
        this.state={
            destinations: [
                {
                    routeName:'ListContacts',
                    title:'List Contacts',
                    iconType:'ionicon',
                    iconNameInactive:'ios-people-outline',
                    iconNameActive:'ios-people'
                },
                {
                    routeName:'TargetCompanies',
                    title:'Target Companies',
                    iconType:'ionicon',
                    iconNameInactive:'ios-briefcase-outline',
                    iconNameActive:'ios-briefcase'
                },
                {
                    routeName:'SavedJobs',
                    title:'Saved Jobs',
                    iconType:'ionicon',
                    iconNameInactive:'ios-folder-outline',
                    iconNameActive:'ios-folder'
                },
                {
                    routeName:'Settings',
                    title:'Settings',
                    iconType:'ionicon',
                    iconNameInactive:'ios-settings-outline',
                    iconNameActive:'ios-settings'
                }
            ]
        }     
    }
  
    

    render(){
        return (
            <View 
                style={this.styles.menu_body}
            >
                <Text style={this.styles.menu_title}>Rolodex</Text>
                <View style={this.styles.table_of_contents}>
                    {this.generateContentsLineItems()}
                </View>
                    
            </View>
        )
    }

    generateContentsLineItems(){
        return this.state.destinations.map(destination=>{
            return(
                <View style={this.styles.route_link_container}>
                    <Icon
                        type={destination.iconType}
                        name={
                            this.isCurrentView(destination.routeName)?
                            destination.iconNameActive
                            :
                            destination.iconNameInactive
                        }
                        color={colors.accent}
                        size={30}
                        
                    />
                    <Text style={[
                        this.styles.route_link_name,
                        {fontWeight:(
                            this.isCurrentView(destination.routeName)?
                            'bold'
                            :
                            'normal'
                        )}
                        ]}>
                        {destination.title}
                    </Text>
                </View>
            )
        })
    }

    isCurrentView(routeName){
        return this.route_in_view === routeName;
    }

    
    
}