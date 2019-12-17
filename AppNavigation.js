import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainComponent from './components/MainComponent';
import DetailComponent from './components/DetailComponent';
import ThirdComponent from './components/ThirdComponent';
// import Getapex from './screens/getapex';
import Login from './screens/Login';
import JobType  from  './screens/JobType';
import JobList  from  './screens/JobList';
import JobDetail  from  './screens/JobDetail';
import EventComponent  from  './screens/EventComponent';
import EventOnGo  from  './screens/EventOnGo';
// import ShowMapView  from  './screens/ShowMapView';




const MainNavigator = createStackNavigator({  
      Home: {screen: Login},
      JobType: {screen: JobType},
      JobList: {screen :JobList },
      JobDetail: {screen: JobDetail},
      EventComponent: {screen: EventComponent },  
      EvenOnGo: {screen: EventOnGo },
    //  ShowMapView: {screen: ShowMapView },
      MainScreen: {
        screen: MainComponent,        
    },
    DetailScreen: {
        screen: DetailComponent,        
    },
    ThirdScreen: {
        screen: ThirdComponent,
        navigationOptions: {
            headerTitle: 'Third',
        },
    },
  });
  

export default MainNavigator;  