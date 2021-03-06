import React, { Component } from 'react';
import {AppRegistry, StyleSheet} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from '../actions/Login'
import BroadList from '../actions/Broadcast'
import App from '../App'
import AColor from '../config/AColor'

export default Router = StackNavigator({

        Login: { screen: Login },
        BroadList: { screen: BroadList },
        App: { screen: App }

    }, {
        initialRouteName: 'Login', // 默认显示界面
        navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
            //顶部标题栏的样式
            headerStyle: {backgroundColor: AColor.color_white},
            //顶部标题栏文字的样式
            headerTitleStyle: {color: AColor.color_blue},
        },
        mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
        headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
        onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
        onTransitionEnd: ()=>{ console.log('导航栏切换结束'); }  // 回调
    });




