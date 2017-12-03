import React from 'react';
import {View,TouchableOpacity,Animated,StyleSheet,Platform} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Icon} from 'react-native-elements';
import {JTextInput,JText,JDivider} from '../../../base_components/JLibrary';
import {colors,fonts} from '../../../../common_styles';

export default class InteractionDate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dateSet:false,
            datePickerVisible:false,
            dynamicStyling:{}
        }
        this.styles = StyleSheet.create({
            optionsButton:{
                height:40,
                borderRadius:20,
                backgroundColor:colors.accent,
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                backgroundColor:colors.accent,
                justifyContent:'center',
                alignItems:'center'
            },
        })
        this.getDynamicStyles = this.getDynamicStyles.bind(this);
        //this.toggleDatePicker = this.toggleDatePicker.bind(this);
    }

    componentWillMount(){
        this.getDynamicStyles(this.props.dateValue);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.dateValue != nextProps.dateValue){
            this.getDynamicStyles(nextProps.dateValue);
        }
    }

    render(){
        return(
            <TouchableOpacity
                style={[this.styles.optionsButton, this.state.dynamicStyling]}
                onPress={()=>this.setState({datePickerVisible:!this.state.datePickerVisible})}
            >
                    { this.props.dateValue &&
                        <JText
                            style={{color:colors.textColorDarkBkg, marginRight:10}}
                        >{`${moment(this.props.dateValue).format("M/D/YYYY")}`}
                        </JText>
                    }
                    <Icon
                        name={'today'}
                        color={colors.textColorDarkBkg}
                    />
                    <DateTimePicker
                        date={!this.props.dateValue? new Date():this.props.dateValue}
                        isVisible={this.state.datePickerVisible}
                        onConfirm={(date)=>this.props.setDate(date)}
                        onCancel={()=>this.setState({datePickerVisible:false})}
                    />
            </TouchableOpacity>
        )
    }

    getDynamicStyles(newDateValue){

        if(newDateValue){
            this.setState({
                dynamicStyling:{
                    paddingLeft:10,
                    paddingRight:10,
                },
            });
        }else{
            this.setState({
                dynamicStyling:{
                    width:40,
                },
            });
        }
    }

    // toggleDatePicker(){
    //     let defaultDate = !this.state.dateValue? new Date() : this.state.dateValue;
    //     let result = (date)=>{
    //         console.log(date)
    //     }
    //     try{
    //         Platform.select({
    //             ios:DatePickerIOS.open({
    //                 date: defaultDate,
    //                 mode: 'date'
    //             }),
    //             android:DatePickerAndroid.open({
    //                 date: defaultDate,
    //                 mode:'calendar'
    //               }).then((tda)=console.log('hii'))
    //         })
    //         // //date=>{
    //         //     this.setState({dateValue:new Date(date.year,date.month,date.day)})
    //         // }
    //     }catch({code,message}){
    //         console.warn('Cannot open date picker',message);
    //     }
        
    // }
}
