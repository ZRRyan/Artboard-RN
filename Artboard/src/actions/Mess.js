import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import AColor from "../config/AColor";
import RNFS from "react-native-fs";
import TimeTool from "../util/TimeTool";


export default class Mess extends Component {

    pageCount = 1;
    pageNo = 0;
    conversions = [];

    //设置顶部导航栏的内容
    static navigationOptions = ({navigation, screenProps}) => ({
        //左侧标题
        headerTitle: '聊天'
    });



    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            sourceData: []
        };
    }

    componentWillMount() {
        this.conversions = [{id:'1', name: '张三', lastMsg: '张娜你个傻蛋', time:'10:23'}, {id:'1', name: '李四', lastMsg: '张娜你个傻蛋', time:'11:40'}]
        this.setState({
            sourceData: this.conversions
        })
    }

    refresh() {

    }

    loadMore() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={[styles.placeImage, {display: this.state.sourceData.length > 0 ? true : false}]} source={require('../images/login_hello.png')} resizeMode='contain'/>
                <FlatList
                    data = {this.state.sourceData}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={ this.renderItemSeparatorComponent }
                    ListEmptyComponent={ this.renderEmptyView() }
                    refreshing={ this.state.refreshing }
                    onRefresh={ this.refresh }
                    onEndReachedThreshold={0.1}
                    onEndReached = {this.loadMore}
                    getItemLayout={(data, index) => ( { length: 40, offset: (40 + 1) * index + 50, index } )}
                />
            </View>
        );
    }


    renderItemSeparatorComponent = ({highlighted}) => (
        <View style={{ height:1, backgroundColor: AColor.color_lightGray_alpha}}></View>
    );

    renderEmptyView = () => (
        <View style={{backgroundColor: 'red'}}></View>
    );

    renderItem = ({item}) => (
        <View style={styles.itemStyle}>
            {/*<Image style={styles.left} source={require('../images/header_place.png')} resizeMode='cover'/>*/}
            {/*<Image style={styles.left} source={require('../images/header_place.png')} resizeMode='cover'/>*/}
            {/*<View style={styles.right}>*/}

                {/*<View style={styles.nickname_time}>*/}
                    {/*<Text style={styles.nickname}>{item.name}</Text>*/}
                    {/*<Text style={styles.time}>{item.time}</Text>*/}
                {/*</View>*/}
                {/*<Text style={styles.lastMsg}>{item.lastMsg}</Text>*/}
            {/*</View>*/}

            <View style={styles.left}>
                <Image style={styles.header} source={require('../images/header_place.png')} resizeMode='cover'/>

            </View>
            <View style={styles.right}>
                <View style={styles.nickname_time}>
                    <Text style={styles.nickname}>
                        {item.name}
                    </Text>
                    <Text style={styles.time}>
                        {item.time}
                    </Text>
                </View>
                <Text style={styles.lastMsg} >
                    {item.lastMsg}
                </Text>

            </View>
        </View>

    );


}


const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    placeImage:{
        marginTop: 300,
        height:35,
    },
    itemStyle: {
        flex:1,
        flexDirection: 'row',
        height: 69
    },
    left: {
        marginLeft: 15,
        marginTop: 12,
        width: 45,
    },
    right: {
        flex: 1,
        marginLeft: 12,
        marginRight: 15,
        marginTop: 12,
    },
    header: {
        width: 45,
        height:45,
        borderRadius: 22.5,
    },
    nickname_time: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nickname: {
        fontSize: 15,
        fontWeight: 'bold',
        color:AColor.color_black,
        marginTop: 2
    },
    time: {
        fontSize: 10,
        color:AColor.color_lightGray
    },
    lastMsg: {
        fontSize: 13,
        color:AColor.color_gray,
        marginTop: 11
    }

});
