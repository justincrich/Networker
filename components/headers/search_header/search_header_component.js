import React from 'react';
import {Dimensions, 
        Animated, 
        View, 
        Text, 
        StyleSheet, 
        Image, 
        TextInput, 
        TouchableWithoutFeedback} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../common_styles'
// import {LinearGradient} from 'expo';
import { Icon } from 'react-native-elements'
//components
import SearchInput from './search_input_component';

export default class SearchHeader extends React.Component{
    constructor(props){
        super(props);
        this.styles = StyleSheet.create({
            header_body:{
                backgroundColor:'transparent',
                borderBottomWidth:0,
                borderColor:colors.divider,
                zIndex:1000,
                display:'flex',
                flexDirection:'row',
                
                width:'100%'
            },
            menu_icon_container:{
                justifyContent:'center'
            }
            
        });
        this.state={
            search:false,
        }
        //Class Methods
        this.generateMenuButton=this.generateMenuButton.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);

    }

    
    componentWillMount() {
        this.menu_icon_animation = new Animated.Value(1);
    }
    
    render(){
        
        return(
            <View style={this.styles.header_body}>
                <SearchInput visible={this.state.search} toggleInput={this.toggleSearch} />
                <LinearGradient 
                    end={{x:0.0,y:.0}}
                    start={{x:0,y:1}}
                    locations={[0,.1,1]}
                    colors={['rgba(255,255,255,.1)','rgba(255,255,255,.5)','rgba(255,255,255,1)']} 
                    style={this.styles.linearGradient}
                />
            </View>
        );
    }

    generateMenuButton(){
        return(
            <Animated.View
                style={[this.styles.menu_icon_container,{opacity:this.menu_icon_animation}]}
            >
                <Icon
                    type='ionicon'
                    name='ios-menu'
                    size={30}
                    color={colors.accent}
                    iconStyle={this.styles.menu_button}
                    onPress={()=>this.props.navigate('DrawerToggle')}
                />
            </Animated.View>
        )
    }

    toggleSearch(){
        Animated.timing(this.menu_icon_animation,{
            toValue:(this.state.search?1:0),
            duration:250
        }).start()
        this.setState({
            search:!this.state.search
        })
        
        
    }

    
    



    
}


