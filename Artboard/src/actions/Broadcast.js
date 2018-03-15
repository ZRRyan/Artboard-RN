import React, { Component } from 'react';
import {Text, StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import { StackNavigator } from 'react-navigation';
import BroadcastHeaderTab from '../components/BroadcastHeaderTab'
import Global from "../config/Global";
import Storage from "../storage/Storage";
import BroadcastRecommend from '../components/BroadcastRecommend'
import BroadcastFollow from '../components/BroadcastFollow'


const listWidth = Dimensions.get('window').width
const listHeight = Dimensions.get('window').height - 64 - 44

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
            budge: budge,
        })

        var scrollView = this.refs.scrollView;
        scrollView.scrollResponderScrollTo({x: listWidth * budge, animated: true})
    }


    onAnnotationEnd(e){
        const offSetX = e.nativeEvent.contentOffset.x;

        index = offSetX >= listWidth ? 1 : 0
    }



    render() {
        return (
            <View style={styles.container}>

                <BroadcastHeaderTab ref='header' callback={(budge) => {this.titleBtnClick(budge)}}></BroadcastHeaderTab>'

                <ScrollView horizontal={true} alwaysBounceHorizontal={false} ref="scrollView" scrollEnabled={false} onMomentumScrollEnd={this.onAnnotationEnd}>
                    <BroadcastRecommend style={[styles.content]}/>

                    <BroadcastFollow style={[styles.content]}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    content: {
        width: listWidth,
        height: listHeight
    }
});

