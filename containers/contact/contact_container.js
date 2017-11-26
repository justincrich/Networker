import React from 'react';
import {View,Text} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ContactsActions from '../../redux/actions/contacts_actions';
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
        
    }

 

    render(){
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
        const {mode,id} = navParams;
        // let mode = 'view';
        // let id =  1510816587249;
        
        let {data:{selectedContact:contact}} = this.props;
        // let contact={
        //     id:12345,
        //     firstName:'Justin',
        //     lastName:'Rich',
        //     pictureUri:defaultImg,
        //     email:'justinrich2008@gmail.com',
        //     phoneNumber:'801-636-6098',
        //     notes:'JUSTIN IS COOL',
        //     jobTitle:'Engineer',
        //     company:'Google',
        //     social:{
        //         facebook:{
        //             url:'https://www.facebook.com/justincrich',
        //             id:'17810103',
        //             note:'entity_id holds the user id on the page'
        //         },
        //         linkedin:{
        //             url:'https://www.linkedin.com/in/jcrich/',
        //             id:'jrich'
        //         },
        //         twitter:{
        //             username:'justincrich',
        //             id:'34618102',
        //             notes:'search the ttft_boot_data script on the profle page, will contain user_id'
        //         },
        //         pinterest:{
        //             username:'justinrich'
        //         },
        //         snapchat:{
        //             username:'nehowdy'
        //         },
        //         instagram:{
        //             username:'justinrich'
        //         }
        //     }
        // }
        
        return(
            <ViewContact 
                contact={contact}
                goBack={this.props.navigation.goBack}
                editContact={this.editContact}
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
            routeName:'Upsert'
        });
        this.props.navigation.dispatch(viewAction);
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