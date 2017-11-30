import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors,fonts} from '../../common_styles';
import LinearGradient from 'react-native-linear-gradient';


//header types
import UpsertHeader from './upsert_header/upsert_header_component';
import SearchHeader from './search_header/search_header_component';
import ViewHeader from './view_header/view_header_component';
export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.menuOverlayOpacity;
        this.styles = StyleSheet.create({
            body:{
                position:'absolute',
                top:0,
                left:0,
                width:'100%',
                height:80,
                zIndex:500,
                backgroundColor:'transparent',
                zIndex:1000
            },
            // linearGradientAnimation:{
            //     position:'absolute',
            //     flex:1,
            //     width:'100%',
            //     height:'100%',
            //     zIndex:1900
            // },
            container:{
                display:'flex',
                justifyContent:'center',
                backgroundColor:'transparent',
                width:'100%',
                height:'100%',
                flex:1,
                paddingLeft:20,
                paddingRight:20,
                
            },
            linearGradient:{
                width:'100%',
                height:'100%',
                flex:1,
                position:'absolute',
                left:0

            }

        });
        this.state = {}
        // this.showGradient = this.showGradient.bind(this);
        // this.hideGradient = this.hideGradient.bind(this);
        this.getViewType = this.getViewType.bind(this);
    }

    
    // componentWillMount() {
    //     this.menuOverlayOpacity = new Animated.Value(0);
    // }

    // componentWillUpdate (nextProps, nextState) {
    //   if(nextProps.verticalOffset > 40){
    //       this.showGradient();
    //   }else{
    //       this.hideGradient();
    //   }
    // }
    
    render(){
        return(
            <View style={this.styles.body}>
                <LinearGradient 
                    end={{x:0.0,y:.0}}
                    start={{x:0,y:1}}
                    locations={[0,.1,1]}
                    colors={['rgba(255,255,255,.1)','rgba(255,255,255,.5)','rgba(255,255,255,1)']} 
                    style={this.styles.linearGradient}
                />
                <View style={this.styles.container}>
                    {this.getViewType(this.props.type)}
                </View>
            </View>
        )
    }

    getViewType(type){
        if(type==='upsert'){
            return(
                <UpsertHeader 
                    title={this.props.title} 
                    saveContact={this.props.saveContact}
                    goBack={this.props.goBack}
                />
            )
        }else if(type==='search'){
            return(
                <SearchHeader/>
            )
        }else if(type==='view'){
            return(
                <ViewHeader 
                    user={this.props.user}
                    goBack={this.props.goBack}
                    editContact={this.props.editContact}
                    deleteContact={this.props.deleteContact}
                />
            )
        }
        
    }

    // showGradient(){
    //     Animated.timing(this.menuOverlayOpacity,{
    //         toValue:1,
    //         duration:250
    //     }).start();
    // }

    // hideGradient(){
    //     Animated.timing(this.menuOverlayOpacity,{
    //         toValue:0,
    //         duration:250
    //     }).start();
    // }
}