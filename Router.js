import React from 'react';
import {View} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';
import {colors} from './common_styles';

//Containers
import ListContactContainer from './containers/list_contacts/list_contacts_container';
import ContactContainer from './containers/contact/contact_container'
//Components
import Menu_Container from './containers/menu/menu_container';


export const ContactsStack = StackNavigator({
    ListContacts:{
        screen:ListContactContainer
    },
    Contact:{
        screen:ContactContainer,
        path:'contact/:mode',
    }
},
{
    initialRouteName:('ListContacts'),
    headerMode:'none'
}
)

export const Root = TabNavigator({
    Contacts:{
        screen:ContactsStack,
        navigationOptions:{
            tabBarLabel:'Contacts',
            tabBarIcon:({tintColor,focused})=>(
                <Icon name="person" size={40} color={tintColor} />
            )
        }
    },

},
{
    initialRouteName:'Contacts',
    tabBarPosition:'bottom',
    headerMode:'none',
    tabBarOptions:{
        activeTintColor:colors.accent,
        inactiveTintColor:colors.textColor,
        activeBackgroundColor:colors.background,
        inactiveBackgroundColor:colors.background,
        style:{
            backgroundColor:colors.background,
            // position:'relative',
            // left:0,
            // bottom:0,
            // zIndex:3000
        },
        indicatorStyle:{width:0},
        showIcon:true,
        iconStyle:{width:50,height:40},
        upperCaseLabel:false
    }
}

)


// let ListContacts = ({navigation})=>(<ListContactContainer navigation={navigation} coreState={props.coreState}/>);
// let MenuComp = ({navigation})=>(<Menu_Container navigation={navigation}/>);
// let Contact = ({navigation})=>(<ContactContainer navigation={navigation}/>);



// export const Router = DrawerNavigator(
//     {
//         ListContacts:{
//             screen:this.ListContacts
//         },
//         Contact:{
//             screen:this.Contact
//         }
//     },
//     {
//         initialRouteName:'Contact',
//         contentComponent: this.MenuComp,
//         drawerWidth:300
//     }
// );


// export default class Router extends React.Component{
//     constructor(props){
//         super(props)
//         this.ListContacts = ({navigation})=>(<ListContactContainer navigation={navigation} coreState={this.props.coreState}/>);
//         this.MenuComp = ({navigation})=>(<Menu_Container navigation={navigation}/>);
//         this.Contact = ({navigation})=>(<ContactContainer navigation={navigation}/>);
//         this.nav = DrawerNavigator(
//             {
//                 ListContacts:{
//                     screen:this.ListContacts
//                 },
//                 Contact:{
//                     screen:this.Contact
//                 }
//             },
//             {
//                 initialRouteName:'Contact',
//                 contentComponent: this.MenuComp,
//                 drawerWidth:300
//             }
//         ).bind(this);

//     }

    

    

//     render(){
//         return(
//             <View style={{flex:1}}>
//                 <this.nav/>
//             </View>
//         )
//     }
// }