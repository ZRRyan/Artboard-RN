import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView} from 'react-native';
import { StackNavigator } from 'react-navigation';
import BroadcastHeaderTab from '../components/BroadcastHeaderTab'
import Global from "../config/Global";
import Storage from "../storage/Storage";
import BroadcastRecommend from '../components/BroadcastRecommend'
import BroadcastFollow from '../components/BroadcastFollow'

export default class Broadcast extends Component {

    //设置顶部导航栏的内容
    static navigationOptions = ({navigation, screenProps}) => ({
        //左侧标题
        // headerTitle: '广场'
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            budge: 0
        };
    }


    titleBtnClick(budge) {
        this.setState({
            budge: budge
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <BroadcastHeaderTab callback={(budge) => {this.titleBtnClick(budge)}}></BroadcastHeaderTab>'
                <View style={styles.content}>
                    <BroadcastRecommend/>

                    {/*<BroadcastFollow/>*/}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    content: {
        flex:1
    }
});

