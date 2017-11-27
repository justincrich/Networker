import React from 'react';
import {View,Text} from 'react-native';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ContactsActions from '../../redux/actions/contacts_actions';
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
        let {data:{selectedContact:contact}} = this.props;
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
        let {data:{selectedContact:contactInView,error,status}} = this.props;
        let {mode} = this.props.navigation.state.params;
        if(mode==='edit'){
            this.props.Actions.requestUpdateContact(contactInView.id,contactUpdates);
        }else if(mode==='create'){
            this.props.Actions.requestContactCreate(contactUpdates)
        }
        console.log('cnsideration')
        if(status==='error'){
            this.props.Actions.resetContactStatus();
            throw new Error(`Update Contact Error: ${error.message}`);
        }else{
            this.props.Actions.resetContactStatus();
            this.props.navigation.goBack();
        }
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

export default connect(mapStateToProps,mapDispatchToProps)(UpsertContainer);