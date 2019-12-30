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

  // componentWillMount() {
  //  }
  get_Oder_Detail(){
       const { params } = this.props.navigation.state;
    let job_id = params.job_id;
    let myData = this.props.myData;
    let btnStatus=this.props.btnStatus;
    let orders= "";
       myData.map(e=>{
         if(e.delivery_id==job_id){
          orders=e.orders;
         }
      });
      if (btnStatus === 'PROCESSING') return orders.filter(e => e.status === 'PROCESSING');
      if (btnStatus === 'COMPLETED') return orders.filter(e => e.status === 'COMPLETED');
    return orders;
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
            order_id={item.order_id}
              id={item.đơn_hàng}
              time={item.Odertime}
              status={item.status}
              onPress={() => this.props.navigation.navigate('ProductDetail', { job_id:job_id,order_id:item.order_id,item })}
            />}
            keyExtractor={item => item.order_id}
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
