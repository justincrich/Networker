import React from 'react';
import {View,StyleSheet,ListView,Image,Text} from 'react-native';
import {contacts} from './test_data';
import _ from 'lodash';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ContactsActions from '../../redux/actions/contacts/contacts_actions';
import * as ToastActions from '../../redux/actions/toast/toast_actions';
import {colors} from '../../common_styles';
import {NavigationActions} from 'react-navigation';

//components
import Header from '../../components/headers/header_container';
import ListContactComponent from '../../components/list_contacts/list_contacts_component';
import ActionButton from '../../components/action_button/action_button_component';
import Menu from '../../components/menu/menu_component';

class ListContactContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={

        };
        this.createContact = this.createContact.bind(this);
        this.createContact = this.createContact.bind(this);
        this.openContact = this.openContact.bind(this);
        
    }

    
    componentWillMount() {
        // // let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        // let sortedContacts = _(Object.values(this.props.data.contacts))
        //                     .groupBy(contact=>contact.name.last.charAt(0).toUpperCase())
        //                     .map((value,key)=>({key:key,data:value}))
        //                     .sortBy(person=>person.key)
        //                     .value();

        // this.setState({
        //     contacts:sortedContacts
        // })

        this.props.ContactsActions.getAllContacts();
        
    }

 
    
    

    render(){
        console.log('PROPS',this.props)
        let {contacts}=this.props.contacts;
        return(
                
                <View style={{position:'relative',top:0, flex:1}}>
                    <Header 
                                type='search' 
                                  routeName={this.props.navigation.state.routeName}
                                  navigate={this.props.navigation.navigate}
                    />
                    <ActionButton name='md-add' type='ionicon' onPress={this.createContact}/>
                    <ListContactComponent contacts={contacts} openContact={this.openContact}/> 
                </View>
            );
    }

    createContact(){
        const createAction = NavigationActions.navigate({
            routeName:'Upsert',
            params:{
                mode:'create'
            }
        });
        this.props.navigation.dispatch(createAction);
    }
    openContact(item){
        this.props.ContactsActions.getContact(item.id)
        const viewAction = NavigationActions.navigate({
            routeName:'Contact',
            params:{
                mode:'view',
                id:item.id
            }
        });
        this.props.navigation.dispatch(viewAction);
    }
}

const mapStateToProps = state => {
    return(
        {
            contacts:state.contacts,
            toast:state.toast
        }
    )
}

const mapDispatchToProps = dispatch => {
    return{
        ContactsActions:bindActionCreators(ContactsActions,dispatch),
        ToastActions:bindActionCreators(ToastActions,dispatch)
    }
  }

export default  connect(mapStateToProps,mapDispatchToProps)(ListContactContainer)