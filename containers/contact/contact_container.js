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
class ContactContainer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
        }
        this.saveContact = this.saveContact.bind(this);
        this.getView = this.getView.bind(this);
        
        
    }

    componentWillMount(){
        // console.log('this.props',this.props)
        // let {navigation:{state:{params:{mode:mode,id:id}}}} = this.props;
        // mode = !mode? 'view':mode;
        // id = !id? 1510816587249:id;
        // console.log('id',id)
        // this.props.Actions.getContact(id);
    }

    componentWillReceiveProps(nextProps) {
        //this.props.navigation.state.params
        //let {data:{selectedContact:contact}} = this.props;
        // let {navigation:{state:{params:{mode:mode='view',id:id=1510816587249}}}} = nextProps;
        // mode = !mode? 'view':mode;
        // id = !id? 1510816587249:id;
        // if(mode === 'create'){
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
        // }else if(mode === 'view'){

        // }
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
        //const {mode,id} = navParams;
        let mode = 'view';
        let id =  1510816587249;
        
        //let {data:{selectedContact:contact}} = this.props;
        let contact={
            id:12345,
            firstName:'Justin',
            lastName:'Rich',
            pictureUri:defaultImg,
            email:'justinrich2008@gmail.com',
            phoneNumber:'801-636-6098',
            notes:'JUSTIN IS COOL',
            jobTitle:'Engineer',
            company:'Google',
            social:{
                facebook:{
                    url:'https://www.facebook.com/justincrich',
                    id:'17810103'
                },
                linkedin:'https://www.linkedin.com/in/jcrich/',
                twitter:'justincrich',
                pinterest:'https://www.pinterest.com/justinrich/',
                snapchat:'nehowdy',
                instagram:'justinrich'
            }
        }
        
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
                <ViewContact contact={contact}/>
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