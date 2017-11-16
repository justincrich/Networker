import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

//components
import Menu_Component from '../../components/menu/menu_component';


class Menu_Container extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        
        return(
            <Menu_Component navigation={this.props.navigation}/>
        )
    }
}

const mapStateToProps = state =>{
    return (
        {
            data:state
        }
    )
}

export default connect(mapStateToProps)(Menu_Container);