import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image
} from 'react-native';
import {StackNavigator, TabNavigator} from "react-navigation";

import AColor from '../src/config/AColor'
import BroadList from '../src/actions/BroadList'
import Discover from '../src/actions/Discover'
import Mess from '../src/actions/Mess'
import Me from '../src/actions/Me'
import Login from '../src/actions/Login'


export default Tab = TabNavigator({
    BroadList: {
        screen: BroadList,
        navigationOptions: {
            tabBarLabel: '广场',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image style={{width: 21, height: 21}} resizeMode='contain'
                       source={focused ? require('../src/images/tabBar_list_selected.png') : require('../src/images/tabBar_list.png')}
                />
            )
        },
    },
    Discover: {
        screen: Discover,
        navigationOptions: {
            tabBarLabel: '发现',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image style={{width: 21, height: 21}} resizeMode='contain'
                       source={focused ? require('../src/images/tabBar_home_selected.png') : require('../src/images/tabBar_home.png')}
                />
            )
        },
    },
    Mess: {
        screen: Discover,
        navigationOptions: {
            tabBarLabel: '聊天',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image style={{width: 21, height: 21}} resizeMode='contain'
                       source={focused ? require('../src/images/tabBar_chat_selected.png') : require('../src/images/tabBar_chat.png')}
                />
            )
        },
    },
    Me: {
        screen: Me,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image style={{width: 21, height: 21}} resizeMode='contain'
                       source={focused ? require('../src/images/tabBar_me_selected.png') : require('../src/images/tabBar_me.png')}
                />
            )
        },
    },
}, {
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 是否可以左右滑动切换tab
    backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
        activeTintColor: AColor.color_blue,
        inactiveTintColor: AColor.color_lightBlue,
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
        style: {
            backgroundColor: '#fff', // TabBar 背景色
            // height: 44
        },
        labelStyle: {
            fontSize: 10, // 文字大小
        },
    },
});
