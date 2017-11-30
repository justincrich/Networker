import React from 'react';
import {View,Text} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ContactsActions from '../../redux/actions/contacts/contacts_actions';
import UpsertContact from '../../components/contact/upsert_contact_component';
import ViewContact from '../../components/contact/view_contact_component';
import {colors} from '../../common_styles';
import defaultImg from '../../media/profileimg.png'
// import realm from '../../data/realm';
// import {ContactSchema} from '../../data/schemas';
class ContactContainer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
        }

        this.getView = this.getView.bind(this);
        this.editContact = this.editContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
    }

 

    render(){
        //let {data:{selectedContact:contact}} = this.props;
        
        const contact =     {
        id: 1511821971418,
        firstName: 'Luke',
        lastName: 'Skywalker',
        pictureUri: 'file:///storage/emulated/0/Android/data/com.networker/files/Pictures/image-fc525719-52d5-489a-98ac-fbd3118385c6.jpg',
        email: 'luke@force.net',
        phoneNumber: '(555) 555-5555',
        notes: 'Use the force',
        jobTitle: 'Jedi',
        company: 'Rebels'
      }
        
        return(
            <View style={{
                position:'relative',
                flex:1,
                backgroundColor:colors.background,
                }}>
                {
                    this.getView(contact)
                }
            </View>
        )
    }
    getView(contact){
        //const {mode,id} = this.props.navigation.state.params;
        let mode = 'view';
        let id =  1510816587249;
        
        return(
            <ViewContact 
                contact={contact}
                goBack={()=>this.props.navigation.goBack()}
                editContact={this.editContact}
                deleteContact={this.deleteContact}
            />
        )
    }
    // saveContact(contact){
        
    //     this.props.Actions.requestContactCreate(contact);
    //     this.props.Actions.resetContactStatus();
    //     this.props.navigation.goBack();
    //     // this.props.navigation.goBack();
        
    // }
    editContact(){
        const viewAction = NavigationActions.navigate({
            routeName:'Upsert',
            params:{
                mode:'edit'
            }
        });
        this.props.navigation.dispatch(viewAction);
    }
    deleteContact(){
        let {data:{selectedContact:contact}} = this.props;
        this.props.navigation.goBack();
        this.props.Actions.requestDeleteContact(contact.id);
        
        
    }

}

const mapStateToProps = state => {

    return(
        {
            data:state
        }
    )
}

const mapDispatchToProps = dispatch => {
    return {
        Actions:bindActionCreators(ContactsActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ContactContainer);