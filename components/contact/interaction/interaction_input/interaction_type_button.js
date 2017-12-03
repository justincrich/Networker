import React from 'react';
import {View,TouchableOpacity,Animated,StyleSheet,ScrollView,Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import {JTextInput,JText,JDivider} from '../../../base_components/JLibrary';
import {colors,fonts} from '../../../../common_styles';

export default class InteractionTypeButton extends React.Component{
    constructor(props){
        super(props);
        this.iconTypes = {
            phone:{
                name:'phone',
                title:'Phone Call',
                type:'material'
            },
            email:{
                name:'email',
                title:'Email',
                type:'material'
            },
            textsms:{
                name:'textsms',
                title:'Text Message',
                type:'material'
            },
            person:{
                name:'person',
                title:'In Person',
                type:'material'
            },
            twitter:{
                name:'twitter',
                title:'Twitter',
                type:'material-community'
            },
            facebook:{
                name:'facebook',
                title:'Facebook',
                type:'material-community'
            },
            snapchat:{
                name:'snapchat',
                title:'Snapchat',
                type:'material-community'
            },
            web:{
                name:'web',
                title:'Web',
                type:'material-community'
            }
        }
        this.state={
            dynamicStyle:{},
            selectedType:''
        }
        this.styles=StyleSheet.create({
            button:{
                position:'relative',
                
                width:40,
                height:40,
                alignItems:'center',
                justifyContent:'center',

                marginLeft:'auto'
            },
            optionsButton:{
                flex:1,
                borderRadius:20,
                backgroundColor:colors.accent,
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
            },
            saveContainer:{
                display:'flex',
                flexDirection:'column'
            },
            typeText:{
                marginRight:20,
                color:colors.textColorDarkBkg,
                fontSize:fonts.sizes.lil
            },
            iconStyle:{
                marginLeft:5,
                marginRight:5
            }

        });
        this.getDynamicStyles = this.getDynamicStyles.bind(this);
        this.setType = this.setType.bind(this);
        this.getIcons = this.getIcons.bind(this);
    }

    componentWillMount(){
        this.getDynamicStyles(this.props.typeValue);
        
    }

    componentWillReceiveProps(nextProps){
        this.getDynamicStyles(nextProps.typeValue,nextProps.typeOpen);
        
    }


    render(){        
        return(
            <View
                style={[
                    this.styles.optionsButton,
                    this.state.dynamicStyle.container
                ]}
            >
                    <ScrollView
                        style={{
                            marginRight:'auto',
                            display:'flex',
                            flexDirection:'row',
                            marginLeft:this.props.typeOpen? 10:0
                        }}
                        horizontal={true}
                    >
                        {this.getIcons()}
                    </ScrollView>
                
                <TouchableOpacity
                    onPress={this.props.toggleOpen}
                    style={this.styles.button}
                >
                    <Icon
                        name={this.state.dynamicStyle.iconName}
                        color={colors.textColorDarkBkg}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    getIcons(){
        let {selectedType} = this.state;
        let getIcon = (item)=>{
            let {type,name} = item;
            return(
                <Icon
                    name={name}
                    type={type}
                    size={30}
                    color={'#fff'}
                    iconStyle={this.styles.iconStyle}
                />
            )
        }
        if(this.props.typeOpen){
            return Object.values(this.iconTypes).map(item=>{
                let {type,name} = item;
                return(
                    <TouchableOpacity
                    onPress={()=>this.setType(item)}
                    >
                        {/* <JText
                                style={this.styles.typeText}
                            >
                                In Person
                        </JText> */}
                        {getIcon(item)}
                    </TouchableOpacity>
                )
            })
        }else if(selectedType){
            return getIcon(selectedType)
        }else{
            return(
                <View/>
            )
        }


        
    }

    setType(type){
        console.log('type',type)
        this.props.setTypeValue(type)
        this.setState({selectedType:type})
    }
    
    getDynamicStyles(typeValue,typeOpen){
        let styling = {};
        let isDisabled;
        
        if(typeOpen){
            styling.container ={
                justifyContent:'flex-end'
            }
            styling.iconStyle = {marginLeft:'auto'};
            isDisabled = true;
            styling.iconName = 'close';
            
        }else{
            
            styling.container = {
                marginRight:10,
            }
            isDisabled = false;
            styling.iconName = 'forum';

        }


        

        this.setState({
            dynamicStyle:styling,
            buttonDisabled:isDisabled
        });
    }
}