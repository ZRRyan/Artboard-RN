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


export default class BroadcastFollow extends Component {

    pageCount = 3;
    pageNo = 1;
    broadcasts = [];



    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            sourceData: [],
        };
    }

    componentWillMount() {
        this.getFolllowBroadcast()
    }

    /*获取推荐广播*/
    getFolllowBroadcast() {
        let url = `${NetRequest.SERVER_DOMAIN}/broadcast/getFollowBroadcast`;
        let params = {
            uid: Global.user.uid,
            token: Global.user.token,
            pageNo: this.pageNo,
            pageCount: this.pageCount,
        };
        NetRequest.get(url, params, (responseJson)=>{
            if (responseJson.code == 200) {



                if (this.pageNo == 1) {
                    this.broadcasts = responseJson.data
                } else {
                    this.broadcasts = this.broadcasts.concat(responseJson.data)
                }

                this.setState({
                    refreshing: false,
                    sourceData: this.broadcasts
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

            <FlatList
                data = {this.state.sourceData}
                renderItem={({item}) => <BroadcastItem broadcast={item}/>}
                ItemSeparatorComponent={ this.renderItemSeparatorComponent }
                ListEmptyComponent={ this.renderEmptyView() }
                refreshing={ this.state.refreshing }
                onRefresh={ this.refresh }
                onEndReachedThreshold={0.1}
                onEndReached = {this.loadMore}
                getItemLayout={(data, index) => ( { length: 40, offset: (40 + 1) * index + 50, index } )}
            />


        )
    }

    renderItemSeparatorComponent = ({highlighted}) => (
        <View style={{ height:2, backgroundColor: '#FCF9FF'}}></View>
    );

    renderEmptyView = () => (
        <View style={{backgroundColor: 'red'}}></View>
    );

    // 下拉刷新
    refresh = () => {

        this.setState({
            refreshing: true,
        });
        this.pageNo = 1
        this.getFolllowBroadcast()
    };

    // 上拉加载更多
    loadMore = () => {

        this.setState({
            refreshing: true,
        });
        this.pageNo = this.pageNo + 1

        this.getFolllowBroadcast()
    };
}