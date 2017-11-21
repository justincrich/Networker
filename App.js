import React from 'react';
import {View,Image,Text,NativeModules} from 'react-native';
import {Provider} from 'react-redux';
import {DrawerNavigator} from 'react-navigation'
import {ContactsStack} from './Router';
import {store} from './redux/store/store';
import {colors} from './common_styles';
//Additional settings for testing
console.disableYellowBox = true;



export default class App extends React.Component {
  constructor(props){
    super(props);
    //Primary state store for the whole app
    this.state={

    }
  }


  

//   <Provider store={store}>
//   <Router coreState={this.state.coreState}/>
// </Provider>
  render() {
    // const Route = Router(this.state.coreState);
    return (
    <Provider store={store} >
      <ContactsStack/>
    </Provider>
    );
  }
}



