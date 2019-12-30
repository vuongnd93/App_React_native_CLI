import * as React from 'react';
import {
    Text, View, StyleSheet, Image
    , Alert, TouchableOpacity, ScrollView,
    Dimensions, StatusBar, TextInput, Modal, TouchableHighlight
    , FlatList, RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from 'react-native-button';
import Filter from './Filter';
import JobTypeItems from './JobTypeItems';
import { FETCH_JOB } from '../redux/actionCreators';





class JobType extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            deletedRowKey: null,
            ColorConnect: '#00ffff',
        });
    }
    // static navigationOptions = ({navigation})=>{
    //   return { 
    //     title : 'List công việc'    
    //   }    
    //  };
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let headerTitle = 'Công Việc';
        let headerTitleStyle = { color: '#dc143c' };
        let headerRight = (<Button
            containerStyle={{ margin: 10, padding: 10, borderRadius: 50, backgroundColor: '#00ffff' }}
            style={{ fontSize: 15, color: 'white' }}
            onPress={() => {
                params.onsave();
            }}
        >
        </Button>);
        let headerBackTitle = 'Back';
        return {
            headerTitle, headerTitleStyle, headerRight, headerBackTitle,
        }
    };

    refreshFlatList = (activeKey) => {
        this.setState((prevState) => {
            return {
                deletedRowKey: activeKey
            };
        });

    }
    _renderMessage = () => {
        return (
            <View style={styles.view_message}>
                <Text style={styles.message}>{this.getJobMessage()}</Text>
            </View>)
    }

    getJobMessage() {
        const { error, isLoading } = this.props;
        if (isLoading) return '...Loading';
        if (error) return 'Vui Lòng Thử Lại....';
    }

    render() {

        const { btnStatus, myData } = this.props;
        // console.log(myData);
        return (

            <View style={styles.wrapper}>
               <View  style={styles.view_header}>
                <Text style={styles.view_header_text}>Danh sách công việc</Text>
                <TouchableOpacity style={styles.view_button} onPress={() => this.props.FETCH_JOB()}>
                    <Text style={styles.textGetjob}>Show Job</Text>
                </TouchableOpacity>
                </View> 
                {this.props.error ? this._renderMessage() : null}

                <View style={styles.activeStyle}>
                    <FlatList
                        data={myData}
                        renderItem={({ item, index }) => <JobTypeItems
                            index={index}
                            parentFlatList={this}
                            method={item.hình_thức}
                            car_number={item.số_xe}
                            timestart={item.từ_giờ}
                            timeend={item.đến_giờ}
                            id={item.delivery_id}
                            onPress={() => this.props.navigation.navigate('JobList', { oder_detail: item.orders, job_id: item.delivery_id})}
                        />}
                        keyExtractor={item => item.mã}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                            />
                        }
                    />
                </View>
            </View>


        )
    }
}

function mapStateToProps(state) {
    return {
        myData: state.DataJob.Job,
        error: state.DataJob.error,
        isLoading: state.DataJob.isLoading,
        btnStatus: state.filterStatus
    };
}
export default connect(mapStateToProps, { FETCH_JOB })(JobType);

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#fff' },
    activeStyle: {
        flex: 90,
        marginHorizontal: 10,
    },
    header: {
        backgroundColor: '#27B397',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    view_header:{
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor:'#fff',
    borderBottomColor:'#dcdcdc',
    borderBottomWidth:1,
    marginBottom:5,
    },
    text_header: {
        alignItems: 'center',
        color: '#fff'
    },
    view_button: {
        flexDirection:'row',      
        // marginTop: 15,
        backgroundColor: '#0A5FAE',
        // marginHorizontal: 10,
        // width: 130,
        // height: 50,
        // borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal:15,
        // marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    view_header_text:{
    paddingVertical: 15,
    paddingHorizontal:15,
    fontSize:20,
    fontWeight:'300',

    },
    message: {
        color: 'blueviolet',
        fontSize: 30,
        alignItems: 'center',
    },
    view_message: {
        backgroundColor: '#fff',
        flex: 30,
        alignItems: 'center',
    },
    textGetjob: {
        color: 'yellow',
        fontSize: 15,
    },
});