import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import AColor from "../config/AColor";
import NetRequest from "../util/NetRequest";
import Global from "../config/Global";
import Storage from "../storage/Storage";
import Login from "../actions/Login";
import BroadcastItem from '../components/BroadcastItem'


export default class BroadcastRecommend extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1,
            pageCount: 10,
            broadcasts: null
        };
    }

    componentWillMount() {
        this.getRecommendBroadcast()
    }

    /*获取推荐广播*/
    getRecommendBroadcast() {
        let url = `${NetRequest.SERVER_DOMAIN}/broadcast/getStrangeBroadcast`;
        let params = {
            uid: Global.user.uid,
            token: Global.user.token,
            pageNo: this.state.pageNo,
            pageCount: this.state.pageCount,
        };

        NetRequest.get(url, params, (responseJson)=>{
            if (responseJson.code == 200) {
                this.setState({
                    broadcasts: responseJson.data
                })
            } else  {
                Login.showAlert(responseJson.msg)
            }
        }, (error) => {
            alert(error)
        })

    }

    render() {
        return (
            <View>
                <FlatList
                    data = {this.state.broadcasts}
                    renderItem={({item}) => <BroadcastItem broadcast={item}/>}
                    // renderItem={<BroadcastItem />}
                />

            </View>
        )
    }
}