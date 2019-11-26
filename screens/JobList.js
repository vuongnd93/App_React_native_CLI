import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, AsyncStorage } from 'react-native';
// import Constants from 'expo-constants';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import JobListItems from './JobListItems';
import Filter from './Filter';

class JobList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myData: '',
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerTitle = 'List Đơn Hàng';
    let headerTitleStyle = { color: '#dc143c' };
    let headerRight = (<Button
        containerStyle={{ margin: 10, padding: 10, borderRadius: 50, backgroundColor: '#00ffff' }}
        style={{ fontSize: 15, color: 'white' }}
        onPress={() => {
            // params.onsave();
        }}
    >
    </Button>);
    let headerBackTitle = 'Back';
    return {
        headerTitle, headerTitleStyle, headerRight, headerBackTitle,
    }
};

  componentWillMount() {
    console.log('#jobList.status_current')
    // const { params } = this.props.navigation.state;
    //  const oder_detail_id = params.oder_detail_id;
    //  const { btnStatus, myData } = this.props;
    //  let status= "";
    //     myData.map(e=>{
    //      e.oder_detail.map(e1=>{
    //        if(e1.Oder_detail_id==oder_detail_id){
    //             status=e1.status 
    //        }              
    //      });     
    //    });
    //  console.log('#joblist: status_curent:',status);
  
   }
  get_Oder_Detail(){
       const { params } = this.props.navigation.state;
    let job_id = params.job_id;
    let myData = this.props.myData;
    let btnStatus=this.props.btnStatus;
    let oder_detail= "";
       myData.map(e=>{
         if(e.Oder_id==job_id){
          oder_detail=e.oder_detail;
         }
      });
      if (btnStatus === 'PROCESSING') return oder_detail.filter(e => e.status === 'PROCESSING');
      if (btnStatus === 'COMPLETED') return oder_detail.filter(e => e.status === 'COMPLETED');
    return oder_detail;
  }

  // getWordList() {
  //     // const { btnStatus, myData } = this.props;
  //    let myData = this.state.myData;
  //     let { params } = this.props.navigation.state;
  //     let job_id = params.job_id;
  //     //  const job_id = this.state.job_id;
  //     // const oder_detail=params.oder_detail
  //     let oder_detail= "";
  //      myData.map(e=>{
  //        if(e.Oder_id==job_id){
  //         oder_detail=e.oder_detail;
  //        }
  //     });
  //     // console.log('#joblistitem.e1.status',status);
  //     // return status
  //     return oder_detail       
  // }

  render() {
    const { params } = this.props.navigation.state;
    let job_id = params.job_id;
    // let myData = this.props.myData;
    // let oder_detail= "";
    //    myData.map(e=>{
    //      if(e.Oder_id==job_id){
    //       oder_detail=e.oder_detail;
    //      }
    //   });
    // const job_id = this.state.job_id
    return (
      <View style={styles.container}>
        <View style={styles.listjob}>
          <FlatList

            data={this.get_Oder_Detail()}
            renderItem={({ item }) => <JobListItems
              Oder_detail_id={item.Oder_detail_id}
              id={item.Order}
              time={item.Odertime}
              status={item.status}
              onPress={() => this.props.navigation.navigate('JobDetail', { job_id:job_id,oder_detail_id:item.Oder_detail_id,item })}
            />}
            keyExtractor={item => item.Oder_detail_id}
          />
        </View>
        <Filter />

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    myData: state.DataJob.Job,
    btnStatus: state.filterStatus,
    // oder_detail=[]
  };
}
export default connect(mapStateToProps)(JobList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  listjob: {
    flex: 10,
  },

});
