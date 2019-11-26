
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { showCompleted, showAll, showProcessing } from '../redux/actionCreators';

class Filter extends Component {
    getTextStyle(statusName) {
        const { btnStatus } = this.props;
        if (statusName ===  btnStatus) return { color: 'yellow', fontWeight: 'bold' };
        return styles.buttonText;
    }

    setFilterStatus(actionType) {
        this.props.dispatch({ type: actionType });
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.showAll()}>
                    <Text style={this.getTextStyle('SHOW_ALL')}>SHOW ALL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.showProcessing()}>
                    <Text style={this.getTextStyle('PROCESSING')} >PROCESSING</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.showCompleted()}>
                    <Text style={this.getTextStyle('COMPLETED')} >COMPLETED</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
}






//     render() {
//         return (
//             <View style={styles.container}>
//                 <TouchableOpacity onPress={() => this.props.showAll()}>
//                     <Text style={this.getTextStyle('SHOW_ALL')}>SHOW ALL</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => this.props.showMemorized()}>
//                     <Text style={this.getTextStyle('MEMORIZED')}>MEMORIZED</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => this.props.showNeedPractice()}>
//                     <Text style={this.getTextStyle('NEED_PRACTICE')}>NEED PRACTICE</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }

function mapStateToProps(state) {
    return { btnStatus: state.filterStatus };
}

export default connect(mapStateToProps,{showCompleted, showAll, showProcessing})(Filter);
   


const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#583C3C', 
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around', 
        padding :10,
        marginTop: 6,
        borderRadius: 5,
    },
    buttonText: { color: 'white' }
});