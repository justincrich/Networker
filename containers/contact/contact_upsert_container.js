import React from 'react';
import {View,Text} from 'react-native';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ContactsActions from '../../redux/actions/contacts/contacts_actions';
import * as ToastActions from '../../redux/actions/toast/toast_actions';
import UpsertContact from '../../components/contact/upsert_contact_component';
import ViewContact from '../../components/contact/view_contact_component';
import {colors} from '../../common_styles';
import defaultImg from '../../media/profileimg.png'
// import realm from '../../data/realm';
// import {ContactSchema} from '../../data/schemas';
class UpsertContainer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
        }
        this.saveContact = this.saveContact.bind(this);
        
        
    }


    render(){
        let {selectedContact:contact} = this.props.contacts;
        return(
            <View style={{
                position:'relative',
                flex:1,
                backgroundColor:colors.background,
                }}>
                <UpsertContact 
                    saveContact={this.saveContact}
                    goBack={this.props.navigation.goBack}
                    type='upsert'
                    contact={contact}
                />
            </View>
        )
    }

    saveContact(contactUpdates){
        let {selectedContact:contactInView,error,status} = this.props.contacts;
        let {mode} = this.props.navigation.state.params;
        if(mode==='edit'){
            this.props.ContactsActions.requestUpdateContact(contactInView.id,contactUpdates);
        }else if(mode==='create'){
            this.props.ContactsActions.requestContactCreate(contactUpdates)
        }
        if(status==='error'){
            this.props.ContactsActions.resetContactStatus();
            throw new Error(`Update Contact Error: ${error.message}`);
        }else{
            this.props.ContactsActions.resetContactStatus();
            this.props.navigation.goBack();
        }
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
    return {
        ContactsActions:bindActionCreators(ContactsActions,dispatch),
        ToastActions:bindActionCreators(ToastActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UpsertContainer);