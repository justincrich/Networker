import React from 'react';
import {View,Text} from 'react-native';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ContactsActions from '../../redux/actions/contacts_actions';
import UpsertContact from '../../components/contact/upsert_contact_component';
import ViewContact from '../../components/contact/view_contact_component';
import {colors} from '../../common_styles';
// import realm from '../../data/realm';
// import {ContactSchema} from '../../data/schemas';
class ContactContainer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
        }
        this.saveContact = this.saveContact.bind(this);
        this.getView = this.getView.bind(this);
        
    }

    componentWillReceiveProps(nextProps) {
        
        switch(nextProps.data.status){
            case 'complete':{
                console.log('complete')
                nextProps.Actions.resetContactStatus();
                nextProps.navigation.goBack();
            }
            break;
            case 'error':{
                nextProps.Actions.resetContactStatus();
                //throw error
            }
        }
    }
    /* 
        <UpsertContact 
                    saveContact={this.saveContact}
                    goBack={this.props.navigation.goBack}
                    type='upsert'
                />
    */

    render(){
        console.log(this.props)
        return(
            <View style={{
                position:'relative',
                flex:1,
                backgroundColor:colors.background,
                }}>
                {this.getView(this.props.navigation.state.params)}
            </View>
        )
    }
    getView(navParams){
        //const {mode} = navParams;
        let mode = 'view';
        if(mode === 'create'){
            return (
                <UpsertContact 
                    saveContact={this.saveContact}
                    goBack={this.props.navigation.goBack}
                    type='upsert'
                />
            )
        }else if(mode === 'view'){
            return(
                <ViewContact/>
            )
        }
    }
    saveContact(contact){
        this.props.Actions.requestContactCreate(contact);
        
        // this.props.navigation.goBack();
        
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