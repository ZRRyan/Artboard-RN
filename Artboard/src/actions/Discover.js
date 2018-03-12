import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';




export default class Discover extends Component {
    // state = {selected: (new Map(): Map<string, boolean>)};

    constructor(props) {
        super(props);

        this.state = {refreshing: false}
    }

    render() {
        return(
            <FlatList
                data={[{key: 'a'}, {key: 'b'}]}
                renderItem={({item}) => <Text>{item.key}</Text>}
                refreshing={ this.state.refreshing }
                onRefresh={ this._renderRefresh }
            />
        )
    }


    // 下拉刷新
    _renderRefresh = () => {
        this.setState({refreshing: true}) // 开始刷新
        // 这里模拟请求网络，拿到数据，3s后停止刷新
        setTimeout(() => {
            // TODO 提示没有可刷新的内容！
            this.setState({refreshing: false});
        }, 3000);
    };
}