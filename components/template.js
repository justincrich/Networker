import React from 'react';
import {View,Text} from 'react-native';

export default class TestA extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    
    componentWillMount() {
        this.props.navigation.navigate('DrawerToggle')
    }
    
    
    render(){
        return(
            <View>
                <Text>Hii</Text>
            </View>
        )
    }
}